'use strict';
/* Tidelyne Prep v2 — tutor-centered single-page app (no build step). */
const $app = document.getElementById('app');
const state = { user: null, overview: null, progress: null, tutor: { open: false, status: null, ctx: null, history: null }, session: null };

// ---------- core helpers ----------
for (const m of ['append', 'replaceChildren', 'prepend']) { const orig = Element.prototype[m]; Element.prototype[m] = function (...k) { return orig.apply(this, k.flat(Infinity).filter(x => x !== null && x !== undefined && x !== false)); }; }
async function api(method, path, body) {
  let data;
  try { data = await window.AscendAPI.api(method, path, body); }
  catch (e) { const err = new Error(e.message || 'Something went wrong'); err.status = e.status || 500; throw err; }
  if (data && Array.isArray(data.newBadges) && data.newBadges.length) data.newBadges.forEach(showBadge);
  return data;
}
const get = (p) => api('GET', p); const post = (p, b) => api('POST', p, b || {});
function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') el.className = v; else if (k === 'html') el.innerHTML = v; else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v); else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v); else if (k === 'dataset') Object.assign(el.dataset, v); else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat(Infinity)) { if (c === null || c === undefined || c === false) continue; el.append(c instanceof Node ? c : document.createTextNode(String(c))); }
  return el;
}
function svg(attrs, inner) { const w = document.createElement('div'); w.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')}>${inner}</svg>`; return w.firstChild; }
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function inline(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(^|[^*])\*([^*\n]+?)\*/g, '$1<i>$2</i>').replace(/`([^`]+?)`/g, '<code>$1</code>'); }
function md(text) {
  const lines = String(text || '').replace(/\r/g, '').split('\n'); let out = ''; let list = null; let para = [];
  const flushPara = () => { if (para.length) { out += `<p>${inline(para.join(' '))}</p>`; para = []; } };
  const closeList = () => { if (list) { out += `</${list}>`; list = null; } };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i]; let m;
    if (/^\s*$/.test(l)) { flushPara(); closeList(); continue; }
    if ((m = /^(#{1,4})\s+(.*)/.exec(l))) { flushPara(); closeList(); out += `<h3>${inline(m[2])}</h3>`; continue; }
    if ((m = /^\s*[-*•]\s+(.*)/.exec(l))) { flushPara(); if (list !== 'ul') { closeList(); out += '<ul>'; list = 'ul'; } out += `<li>${inline(m[1])}</li>`; continue; }
    if ((m = /^\s*\d+[.)]\s+(.*)/.exec(l))) { flushPara(); if (list !== 'ol') { closeList(); out += '<ol>'; list = 'ol'; } out += `<li>${inline(m[1])}</li>`; continue; }
    if ((m = /^>\s?(.*)/.exec(l))) { flushPara(); closeList(); out += `<blockquote>${inline(m[1])}</blockquote>`; continue; }
    if (/^\s*\|.*\|\s*$/.test(l)) { flushPara(); closeList(); const rows = []; while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) { if (!/^\s*\|(\s*:?-+:?\s*\|)+\s*$/.test(lines[i])) rows.push(lines[i].trim().slice(1, -1).split('|').map(c => c.trim())); i++; } i--; out += '<table>' + rows.map((r, ri) => '<tr>' + r.map(c => `<${ri === 0 ? 'th' : 'td'}>${inline(c)}</${ri === 0 ? 'th' : 'td'}>`).join('') + '</tr>').join('') + '</table>'; continue; }
    closeList(); para.push(l.trim());
  }
  flushPara(); closeList(); return out;
}
const LETTERS = 'ABCDE';
const fmtTime = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const fmtDate = (s) => { if (!s) return ''; const iso = String(s).trim().replace(' ', 'T'); const d = /^\d{4}-\d\d-\d\d$/.test(iso) ? new Date(iso + 'T12:00:00') : new Date(/([zZ]|[+-]\d\d:?\d\d)$/.test(iso) ? iso : iso + 'Z'); return isNaN(d) ? '' : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }); };
const fmtDay = (s) => new Date(s + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
window.AscendApp = window.AscendApp || {}; window.AscendApp.toast = (m) => toast(m);
const ordinal = (n) => { const v = Math.abs(Math.round(Number(n))) % 100; return `${n}${v >= 11 && v <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' })[v % 10] || 'th'}`; }; // 1st, 2nd, 3rd, 22nd, 99th
// Phones: after an answer, scroll just enough to show Next above the bottom bar, never past the top of the explanation.
function revealFeedback(nextBtn, explainEl) { if (!nextBtn) return; nextBtn.focus({ preventScroll: true }); const nav = document.querySelector('.bottom-nav'); const navH = nav && getComputedStyle(nav).display !== 'none' ? nav.getBoundingClientRect().height : 0; let dy = Math.max(0, nextBtn.getBoundingClientRect().bottom - (window.innerHeight - navH - 8)); if (explainEl) dy = Math.min(dy, explainEl.getBoundingClientRect().top - 12); if (dy > 0) window.scrollBy({ top: dy, behavior: 'smooth' }); }
function toast(msg) { const t = h('div', { class: 'toast' }, msg); document.body.append(t); setTimeout(() => t.remove(), 3300); }
function showBadge(b) { const el = h('div', { class: 'badge-pop' }, h('span', { class: 'ic' }, b.icon), h('div', null, h('b', null, `Badge earned: ${b.name}`), h('span', { class: 'small muted' }, b.desc))); document.body.append(el); setTimeout(() => el.remove(), 5600); }
const go = (hash) => { location.hash = hash; };
const testName = (t) => state.overview ? state.overview.tests[t].name : t.toUpperCase();
const skillName = (s) => (state.overview && state.overview.skillNames[s]) || s;
const penaltyFor = (t, v) => { const T = state.overview && state.overview.tests[t]; if (!T) return false; const vr = T.variantRules && v && T.variantRules[v]; return vr && vr.penalty !== undefined ? vr.penalty : !!T.penalty; };
const sectionName = (t, s) => (state.overview && state.overview.tests[t] && state.overview.tests[t].sections[s]) || s;
const isCapsStem = (q) => /^[A-Z][A-Z\s-]{2,}$/.test(q.stem.trim());
function masteryColor(m) { return m === null || m === undefined ? 'var(--border-2)' : m >= 80 ? 'var(--teal)' : m >= 60 ? 'var(--gold)' : 'var(--accent)'; }
const tutorName = () => (state.user && state.user.tutorName) || 'Coach Ada';
function applyTheme() { let t = null; try { t = localStorage.getItem('theme'); } catch {} if (t) document.documentElement.setAttribute('data-theme', t); else document.documentElement.removeAttribute('data-theme'); }
function observeReveal(root) { const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 }); root.querySelectorAll('.reveal').forEach(el => io.observe(el)); }

// ---------- icons ----------
const I = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>', learn: '<path d="M4 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z"/><path d="M20 5h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7z"/>', practice: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>', mock: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2"/><path d="M9 2h6"/>', review: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>', writing: '<path d="M4 20h4l10-10-4-4L4 16z"/><path d="M13 7l4 4"/>', progress: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>', friends: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15 15.5a5 5 0 0 1 6.5 4.5"/>', settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>', session: '<path d="M5 3l14 9-14 9z"/>', more: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>', vocab: '<path d="M4 19V5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 0 2 2h12"/><path d="M9 7h6"/><path d="M9 11h4"/>', math: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h8"/><path d="M17 15l3 3m0-3l-3 3"/>', cards: '<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M7 4h12a2 2 0 0 1 2 2v10"/>'
};
const icon = (n) => svg({ viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.9', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, I[n]);

// ---------- brand mark: the Tidelyne waves, rising to the right (same geometry as scripts/make-logo.py) ----------
const WAVE_SPEC = [[-0.155, 0.052, 0.055, '#eef3f8'], [0.02, 0.07, 0.082, '#00d4ff'], [0.19, 0.052, 0.055, '#008cb4']];
function wavePath(size, yOff, amp, tilt = 0.1, steps = 48) { const w = size * 0.62, cx = size / 2, cy = size / 2 + size * yOff; const pts = []; for (let i = 0; i <= steps; i++) { const t = i / steps; pts.push(`${(cx - w / 2 + w * t).toFixed(1)} ${(cy + Math.sin(t * Math.PI * 2) * size * amp - (t - 0.5) * size * tilt).toFixed(1)}`); } return 'M ' + pts.join(' L '); }
function brandMark(size = 34) { const s = 128; return svg({ viewBox: `0 0 ${s} ${s}`, width: size, height: size, class: 'mark', 'aria-hidden': 'true' }, `<rect width="${s}" height="${s}" rx="28" fill="#081526"/><rect x="1" y="1" width="${s - 2}" height="${s - 2}" rx="28" fill="none" stroke="#00d4ff" stroke-opacity=".3" stroke-width="2"/>` + WAVE_SPEC.map(([y, a, th, c]) => `<path d="${wavePath(s, y, a)}" fill="none" stroke="${c}" stroke-width="${(s * th).toFixed(1)}" stroke-linecap="round"/>`).join('')); }
const brandName = () => [h('span', null, 'Tidelyne'), h('span', { class: 'brand-prep' }, ' Prep')];

// ---------- study-time tracker (counts minutes while the student is actually here) ----------
const activity = { last: Date.now(), pending: 0, tickMs: 15000 };
['keydown', 'pointerdown', 'touchstart', 'scroll', 'input'].forEach(ev => window.addEventListener(ev, () => { activity.last = Date.now(); }, { passive: true }));
setInterval(async () => {
  if (!state.user || document.visibilityState !== 'visible' || Date.now() - activity.last > 120000) return;
  activity.pending += activity.tickMs / 1000;
  if (activity.pending >= 60) { const secs = activity.pending; activity.pending = 0; try { const r = await post('/api/activity', { seconds: secs }); state.todayMinutes = r.todayMinutes; state.minutesLeft = r.minutesLeft; const el = document.querySelector('.minutes-pill'); if (el) el.textContent = `⏳ ${r.todayMinutes}/${r.dailyMinimum} min today`; } catch {} }
}, 15000);

// ---------- install as an app (PWA) ----------
const install = { prompt: null, standalone: window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true, isIOS: /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) };
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); install.prompt = e; document.querySelectorAll('.install-cta').forEach(el => el.classList.remove('hidden')); });
window.addEventListener('appinstalled', () => { install.prompt = null; install.standalone = true; toast('Tidelyne Prep is installed. Open it from your home screen or dock.'); document.querySelectorAll('.install-cta').forEach(el => el.classList.add('hidden')); });
if ('serviceWorker' in navigator) { let refreshing = false; navigator.serviceWorker.addEventListener('controllerchange', () => { if (refreshing) return; refreshing = true; toast('Tidelyne Prep updated to the newest version.'); }); }
function installApp() {
  if (install.prompt) { install.prompt.prompt(); install.prompt.userChoice.then(() => { install.prompt = null; }); return; }
  const steps = install.isIOS ? ['Open this page in Safari (installing only works from Safari on iPhone and iPad).', 'Tap the Share button (the square with an arrow). It is at the bottom of the screen on iPhone and at the top on iPad.', 'Scroll down and tap "Add to Home Screen", then tap Add.', 'Open Tidelyne Prep from your home screen. It runs full-screen and signs you in with the same account.'] : /android/i.test(navigator.userAgent) ? ['Open this page in Chrome.', 'Tap the three-dot menu in the top right.', 'Tap "Add to Home screen" or "Install app", then confirm.'] : ['In Chrome or Edge: click the install icon at the right end of the address bar (a monitor with a down arrow), or open the browser menu and choose "Install Tidelyne Prep".', 'In Safari on a Mac: choose File → Add to Dock.', 'The app opens in its own window and signs you in with the same account.'];
  const scrim = h('div', { class: 'scrim show', onclick: (e) => { if (e.target === scrim) scrim.remove(); } }, h('div', { class: 'card lift', style: { maxWidth: '460px', margin: 'min(12vh, 64px) auto 0', padding: '24px' } }, h('div', { class: 'row nowrap', style: { marginBottom: '8px' } }, h('img', { src: 'icons/icon-192.png', alt: '', width: 48, height: 48, style: { borderRadius: '12px', flex: 'none' } }), h('div', { class: 'grow' }, h('h3', null, 'Install Tidelyne Prep'), h('div', { class: 'small muted' }, 'Full-screen app, home-screen icon, same account everywhere.'))), h('ol', { style: { paddingLeft: '20px', margin: '10px 0 16px' } }, steps.map(t => h('li', { style: { margin: '6px 0' } }, t))), h('button', { class: 'btn btn-primary btn-block', onclick: () => scrim.remove() }, 'Got it')));
  document.body.append(scrim);
}
const installButton = (cls = 'btn btn-sm') => install.standalone ? null : h('button', { class: cls + ' install-cta', onclick: installApp }, '⬇ Install app');

// ---------- live sync: this account changed on another device (or in another tab) ----------
// AscendAPI pulls the newer copy and merges it, then fires this event. Pages that only display progress re-render at once;
// an activity in progress (a practice set, a mock, a review session, an essay) keeps going and sees the update when it ends.
const SYNC_QUIET = new Set(['session', 'dashboard', 'learn', 'progress', 'friends', 'more', 'courses', 'mistakes', 'report']);
window.addEventListener('ascend:sync', async () => {
  if (!state.user) return;
  try { state.user = (await get('/api/me')).user; } catch { return; }
  state.progress = null; state.session = null; state.tutor.history = null;
  const parts = location.hash.replace(/^#\/?/, '').split('?')[0].split('/').filter(Boolean);
  const typing = document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
  const quiet = !typing && (SYNC_QUIET.has(parts[0]) || (['mock', 'vocab', 'math', 'flashcards'].includes(parts[0]) && parts.length === 1));
  if (quiet) { router(); toast('Synced: progress from your other device is here.'); }
  else { const l = document.querySelector('.side .me .l'); if (l) l.textContent = `Level ${state.user.level} · ${testName(state.user.targetTest)}`; toast('Progress from another device arrived. It shows when you finish this activity.'); }
});

// ---------- phones: every wide table scrolls inside its own box instead of widening the page ----------
new MutationObserver(() => { for (const t of $app.querySelectorAll('table.tbl, .md table')) { if (t.parentElement && !t.parentElement.classList.contains('tbl-wrap')) { const w = document.createElement('div'); w.className = 'tbl-wrap'; t.replaceWith(w); w.appendChild(t); } } }).observe($app, { childList: true, subtree: true });

// ---------- shell ----------
const NAV = [['session', 'Today', 'session'], ['dashboard', 'Home', 'home'], ['learn', 'Learn', 'learn'], ['practice', 'Practice', 'practice'], ['vocab', 'Vocabulary', 'vocab'], ['math', 'Math', 'math'], ['flashcards', 'Flashcards', 'cards'], ['mock', 'Mock Tests', 'mock'], ['review', 'Review', 'review'], ['writing', 'Writing', 'writing'], ['progress', 'Progress', 'progress'], ['friends', 'Friends', 'friends']];
let currentPage = null;
function shell(content, active) {
  currentPage = active; const u = state.user;
  const existing = $app.querySelector('.content > .main');
  if (existing && $app.querySelector('.app')) { existing.replaceChildren(content); $app.querySelectorAll('.side nav a, .bottom-nav a').forEach(a => a.classList.toggle('active', a.dataset.p === active)); return; }
  $app.innerHTML = '';
  const nav = h('nav', null, NAV.map(([k, label, ic]) => h('a', { href: '#/' + k, dataset: { p: k }, class: active === k ? 'active' : '' }, icon(ic), label, k === 'review' && state.progress && state.progress.due ? h('span', { class: 'badge-dot' }, state.progress.due) : null)));
  const xpPct = u ? Math.round((u.xp - u.levelXp) / Math.max(1, u.nextLevelXp - u.levelXp) * 100) : 0;
  const side = h('aside', { class: 'side' }, h('a', { href: '#/dashboard', class: 'brand' }, brandMark(), brandName()), courseSwitcher(), nav, h('div', { class: 'spacer' }), install.standalone ? null : h('button', { class: 'btn btn-sm btn-block install-cta', style: { marginBottom: '10px', background: 'rgba(255,255,255,.08)', borderColor: 'rgba(255,255,255,.15)', color: '#fff' }, onclick: installApp }, '⬇ Install as an app'),
    h('a', { href: '#/settings', class: 'me' }, h('span', { class: 'avatar' }, u.displayName.slice(0, 1).toUpperCase()), h('div', { class: 'grow' }, h('div', { class: 'n' }, u.displayName), h('div', { class: 'l' }, `Level ${u.level} · ${testName(u.targetTest)}`), h('div', { class: 'xpbar' }, h('i', { style: { width: xpPct + '%' } })))));
  const navLink = ([k, label, ic]) => h('a', { href: '#/' + k, dataset: { p: k }, class: active === k ? 'active' : '' }, icon(ic), label);
  const bottom = h('nav', { class: 'bottom-nav' }, [['session', 'Today', 'session'], ['learn', 'Learn', 'learn'], ['practice', 'Practice', 'practice'], ['mock', 'Tests', 'mock']].map(navLink), h('button', { type: 'button', class: 'nav-coach', 'aria-label': `Ask ${tutorName()}`, onclick: () => toggleTutor(true) }, h('span', { class: 'nav-av' }, '🎓'), 'Coach'), navLink(['more', 'More', 'more']));
  $app.append(h('div', { class: 'app' }, side, h('div', { class: 'content' }, h('main', { class: 'main' }, content))), bottom, tutorFab(), tutorPanel());
}
function loading(msg = 'Loading…') { return h('div', { class: 'stack', style: { padding: '20px 0' } }, h('div', { class: 'skel', style: { height: '36px', width: '40%' } }), h('div', { class: 'skel', style: { height: '120px' } }), h('div', { class: 'skel', style: { height: '200px' } })); }
async function withLoading(active, fn) { shell(loading(), active); try { const node = await fn(); shell(node, active); } catch (e) { if (e.status === 401) { state.user = null; return renderLanding(); } shell(h('div', { class: 'alert error' }, e.message), active); console.error(e); } }
function pageHead(eyebrow, title, sub, right) { return h('div', { class: 'page-head' }, h('div', null, eyebrow ? h('div', { class: 'eyebrow' }, eyebrow) : null, h('h1', null, title), sub ? h('p', null, sub) : null), right || null); }
function tutorSay(text, extra) { return h('div', { class: 'tutor-say' }, h('div', { class: 'av' }, '🎓'), h('div', { class: 'grow' }, h('div', { class: 'who' }, tutorName()), h('div', { class: 'txt' }, text), extra || null)); }

// ---------- tutor panel ----------
function setTutorContext(ctx) { state.tutor.ctx = ctx; const el = document.querySelector('.tutor-ctx'); if (el) el.replaceChildren(ctxLabel()); }
function ctxLabel() { const c = state.tutor.ctx; return c && c.label ? [h('span', null, '👀'), h('span', null, `Looking at: ${c.label}`)] : [h('span', null, '💬'), h('span', null, 'Ask me anything about your prep.')]; }
function tutorFab() { return h('button', { class: 'tutor-fab', onclick: () => toggleTutor(true) }, h('span', { class: 'av' }, '🎓'), h('span', { class: 't' }, `Ask ${tutorName()}`)); }
function toggleTutor(open) { state.tutor.open = open; document.querySelector('.tutor-panel').classList.toggle('open', open); document.querySelector('.scrim').classList.toggle('show', open); document.documentElement.classList.toggle('tutor-open', open); fitTutorPanel(); if (open) { loadTutorHistory(); if (!window.matchMedia('(pointer: coarse)').matches) setTimeout(() => { const i = document.querySelector('.tutor-input input'); i && i.focus(); }, 300); } }
function fitTutorPanel() { const p = document.querySelector('.tutor-panel'); const vv = window.visualViewport; if (!p) return; if (vv && state.tutor.open && window.matchMedia('(max-width: 900px)').matches) { p.style.top = vv.offsetTop + 'px'; p.style.height = vv.height + 'px'; p.style.bottom = 'auto'; } else { p.style.top = ''; p.style.height = ''; p.style.bottom = ''; } }
if (window.visualViewport) { window.visualViewport.addEventListener('resize', fitTutorPanel); window.visualViewport.addEventListener('scroll', fitTutorPanel); }
function tutorPanel() {
  const msgs = h('div', { class: 'tutor-msgs' });
  const input = h('input', { placeholder: 'Ask for a hint, an explanation, a word…', onkeydown: (e) => { if (e.key === 'Enter') send(); } });
  const chips = h('div', { class: 'tutor-chips' });
  const drawChips = () => { const c = state.tutor.ctx; const list = c && c.servedId ? (c.answered ? ['Why is that the answer?', 'Show me a similar trick', 'What should I study next?'] : ['Give me a hint', 'Where do I start?', 'What is this question testing?']) : ['What should I study today?', 'How do I guess smart?', 'Help me with pacing', 'I feel nervous about the test']; chips.replaceChildren(...list.map(t => h('button', { onclick: () => { input.value = t; send(); } }, t))); };
  const addMsg = (role, text) => { const m = h('div', { class: 'msg ' + (role === 'user' ? 'me' : 'tutor'), html: md(text) }); msgs.append(m); msgs.scrollTop = msgs.scrollHeight; return m; };
  const send = async () => {
    const text = input.value.trim(); if (!text) return; input.value = ''; addMsg('user', text);
    const typing = h('div', { class: 'msg tutor typing' }, `${tutorName()} is thinking…`); msgs.append(typing); msgs.scrollTop = msgs.scrollHeight;
    try { const c = state.tutor.ctx || {}; const r = await post('/api/tutor/chat', { message: text, context: { servedId: c.servedId, questionId: c.questionId, reviewKey: c.reviewKey, answered: c.answered, choice: c.choice, hintsUsed: c.hintsUsed || 0 } }); typing.remove(); addMsg('assistant', r.reply);
      if (r.hint && c.onHint) c.onHint(r.hint);
      if (r.actions && r.actions.length) msgs.append(h('div', { class: 'row', style: { gap: '6px' } }, r.actions.map(a => h('a', { class: 'btn btn-sm', href: a.href, onclick: () => toggleTutor(false) }, a.label))));
      if (r.note) msgs.append(h('div', { class: 'tiny faint' }, r.note));
      msgs.scrollTop = msgs.scrollHeight; drawChips();
    } catch (e) { typing.remove(); addMsg('assistant', 'Something went wrong: ' + e.message); }
  };
  const panel = h('div', { class: 'tutor-panel' },
    h('div', { class: 'tutor-head' }, h('div', { class: 'av' }, '🎓'), h('div', { class: 'grow' }, h('b', null, tutorName()), h('div', { class: 's' }, state.tutor.status ? (state.tutor.status.live ? 'Live AI tutor · ' + state.tutor.status.model : 'Built-in tutor · add an API key in Settings for live AI') : 'Your tutor')), h('button', { class: 'btn btn-sm btn-ghost', style: { color: '#fff' }, onclick: async () => { if (confirm('Clear this conversation?')) { await api('DELETE', '/api/tutor/history'); state.tutor.history = []; msgs.replaceChildren(); welcome(); } } }, 'Clear'), h('button', { class: 'btn btn-sm btn-ghost', style: { color: '#fff' }, onclick: () => toggleTutor(false) }, '✕')),
    h('div', { class: 'tutor-ctx' }, ctxLabel()), msgs, chips, h('div', { class: 'tutor-input' }, input, h('button', { class: 'btn btn-primary', onclick: send }, 'Send')));
  const welcome = () => { if (!msgs.children.length) addMsg('assistant', `Hi ${state.user.displayName}, I am ${tutorName()}. Ask me for a hint on any question, ask "why" after you answer, or ask what to study next.`); };
  panel._load = async () => { if (state.tutor.history === null) { try { const r = await get('/api/tutor/history'); state.tutor.history = r.messages; } catch { state.tutor.history = []; } msgs.replaceChildren(); state.tutor.history.forEach(m => addMsg(m.role, m.content)); } welcome(); drawChips(); msgs.scrollTop = msgs.scrollHeight; };
  const scrim = h('div', { class: 'scrim', onclick: () => toggleTutor(false) });
  return [scrim, panel];
}
function loadTutorHistory() { const p = document.querySelector('.tutor-panel'); if (p && p._load) p._load(); }

// ---------- landing ----------
function renderLanding() {
  const c = state.overview.counts; const localMode = state.overview.mode === 'local';
  const root = h('div', { class: 'land' },
    h('div', { class: 'land-nav' }, h('div', { class: 'in' }, h('a', { href: '#/', class: 'brand-lite' }, brandMark(), brandName()), h('div', { class: 'links' }, h('a', { href: '#how' }, 'How it works'), h('a', { href: '#inside' }, 'What is inside'), h('a', { href: '#tests' }, 'Tests'), h('a', { href: '#faq' }, 'FAQ')), h('span', { class: 'grow' }), h('a', { class: 'btn btn-ghost', href: '#/login' }, 'Sign in'), h('a', { class: 'btn btn-primary', href: '#/register' }, 'Start free'))),
    localMode ? h('div', { class: 'alert warn', style: { margin: '12px 24px 0', textAlign: 'center' } }, 'Preview mode: accounts are stored in this browser only. Connect Supabase (see README) for accounts that work on every device.') : null,
    h('section', { class: 'hero' }, h('div', { class: 'orb a' }), h('div', { class: 'orb b' }),
      h('div', null, h('div', { class: 'pill accent', style: { marginBottom: '16px' } }, 'HSPT · SSAT · ISEE'), h('h1', null, 'Seven days to the ', h('em', null, '99th percentile.')), h('p', { class: 'lead' }, 'Tidelyne Prep diagnoses where you are, writes a 7-day sprint that attacks your weakest skills first, coaches you through at least an hour a day, explains every mistake until it sticks, and ends every sprint with a full-length mock that proves the gain. Then it writes the next one.'), h('div', { class: 'row' }, h('a', { class: 'btn btn-primary btn-lg', href: '#/register' }, 'Start your diagnostic'), h('a', { class: 'btn btn-lg', href: '#how' }, 'See how it works')), h('p', { class: 'small muted', style: { marginTop: '14px' } }, 'Free. Private accounts for every student. Parents can follow along.')),
      h('div', { class: 'demo reveal' }, h('div', { class: 'dh' }, h('span', { class: 'av' }, '🎓'), 'Coach Ada', h('span', { class: 'grow' }), h('span', { class: 'tiny', style: { opacity: .7 } }, 'Analogies · level 3')), h('div', { class: 'db' },
        h('div', { class: 'msg me' }, 'I have no idea on this one: "Glacier is to ice as river is to ___"'), h('div', { class: 'msg tutor' }, 'Build a bridge sentence first. A glacier is a large, moving body of ice. So a river is a large, moving body of… what?'), h('div', { class: 'msg me' }, 'water?'), h('div', { class: 'msg tutor' }, 'Exactly. Check that "water" fits your bridge, not just the topic. That is the move for every analogy: bridge first, choices second.'), h('div', { class: 'row', style: { gap: '6px' } }, h('span', { class: 'pill teal' }, '+22 XP'), h('span', { class: 'pill' }, 'Analogies 58% → 63%'))))),
    h('section', { class: 'sect', id: 'inside' }, h('div', { class: 'stats-strip reveal' }, [[c.lessons, 'tutor-written lessons'], [c.questions.toLocaleString() + '+', 'curated questions, plus unlimited math'], [c.passages, 'original reading passages'], [c.vocab, 'high-yield vocabulary words'], ['4', 'difficulty tiers of mock tests']].map(([v, k]) => h('div', { class: 's' }, h('div', { class: 'v' }, v), h('div', { class: 'k' }, k))))),
    h('section', { class: 'sect', id: 'how' }, h('h2', { class: 'reveal' }, 'How your tutor works'), h('p', { class: 'sub reveal' }, 'Built on what learning science actually shows works: retrieval, spacing, interleaving, worked examples, and feedback at the moment of error.'),
      h('div', { class: 'steps' }, [['Diagnose', 'Twenty questions across every section. Each answer calibrates a rating for each skill, so the plan starts in the right place.'], ['Plan', 'A 7-day sprint: lessons on your weakest skills, a mini test at real pace every day, a checkpoint mock on day 4 and a full-length Elite mock on day 7. The next sprint is written from the results.'], ['Coach', 'Every session is guided. Ask for a hint, not the answer. Rate your confidence. After you answer, the "why" is one click away.'], ['Adapt', 'Difficulty tracks you question by question. Mistakes return just before you would forget them. The plan rewrites itself as you grow.']].map(([b, p]) => h('div', { class: 'st reveal' }, h('b', null, b), h('p', null, p))))),
    h('section', { class: 'sect' }, h('h2', { class: 'reveal' }, 'Everything a great tutor does'), h('div', { class: 'grid g3' }, [['💬', 'Ask anything', 'A coach in the corner of every page. Hints that do not spoil, explanations that name the trap, vocabulary on demand.'], ['📘', 'Lessons that teach', 'Concept, method, a worked think-aloud, a scaffolded try, the traps, then a retrieval check. Forty-six of them.'], ['🎯', 'Adaptive practice', 'Elo-style ratings per skill. Sets target ~70% success, the sweet spot for learning. Confidence ratings build self-awareness.'], ['⏱', 'Real mock tests', 'Official order, counts and timing for HSPT, SSAT and ISEE at four difficulty tiers, plus a daily 20-minute mini test with every section at the real pace.'], ['🔁', 'Spaced review', 'Misses and vocabulary come back on an SM-2 schedule. Ten minutes a day does more than an hour on Sunday.'], ['🏆', 'Friends and XP', 'Add friends by code, climb a weekly leaderboard, earn badges. Motivation that lasts past week one.']].map(([ic, b, s]) => h('div', { class: 'feat reveal' }, h('div', { class: 'ic' }, ic), h('div', null, h('b', null, b), h('span', null, s)))))),
    h('section', { class: 'sect', id: 'tests' }, h('h2', { class: 'reveal' }, 'Three tests, one method'), h('div', { class: 'grid g3' }, [['HSPT', 'High School Placement Test', ['Verbal, Quantitative, Reading, Math, Language', '298 questions in about 2.5 hours', 'No guessing penalty: strategy built in']], ['SSAT', 'Secondary School Admission Test', ['Elementary, Middle and Upper levels', 'Synonyms and analogies, quant, reading, writing', 'Quarter-point penalty: we teach when to guess']], ['ISEE', 'Independent School Entrance Exam', ['Lower, Middle and Upper levels', 'Sentence completion, quantitative comparison', 'Essay practice with rubric feedback']]].map(([n, f, items]) => h('div', { class: 'testcard reveal' }, h('div', { class: 'nm' }, n), h('div', { class: 'muted small' }, f), h('ul', null, items.map(i => h('li', null, i))))))),
    h('section', { class: 'sect', id: 'devices' }, h('div', { class: 'card navy', style: { padding: '36px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'center' } }, h('div', null, h('h2', { style: { color: '#fff' } }, 'One account. Every device.'), h('p', { class: 'muted', style: { fontSize: '17px', maxWidth: '560px' } }, 'Install Tidelyne Prep on your phone, tablet and computer. It opens full-screen like a native app, and your plan, progress, streak and tutor conversation follow you because everything lives in your account, not on the device.'), h('div', { class: 'row', style: { marginTop: '10px' } }, h('button', { class: 'btn btn-gold', onclick: installApp }, '⬇ Install the app'), h('span', { class: 'small', style: { color: '#b8c0d9' } }, 'iPhone · iPad · Android · Mac · Windows'))), h('img', { src: 'icons/icon-192.png', alt: 'Tidelyne Prep app icon', width: 120, height: 120, style: { borderRadius: '28px', boxShadow: '0 20px 40px -16px rgba(0,0,0,.6)' } }))),
    h('section', { class: 'sect', id: 'faq' }, h('h2', { class: 'reveal' }, 'Questions parents ask'), h('div', { class: 'faq reveal' }, [['Can more than one student use it?', 'Yes. Every student has their own account and their own private progress. Any number of students can use the site at the same time.'], ['Does it work on my phone?', 'Yes. Use it in any browser, or install it as an app from the browser menu (Add to Home Screen on iPhone). Sign in on as many devices as you like; progress syncs through your account.'], ['Can I see my child\'s progress?', 'Create a parent account and enter your child\'s share code from their Settings page. You will see their mastery, plan, mock scores and activity, read-only.'], ['Is the AI tutor safe?', 'The tutor only talks about test prep and is instructed never to give away an answer before the student tries. Without an API key, a built-in tutor handles hints, explanations, vocabulary and planning.'], ['Are the scores official?', 'No. Percentiles on mock results are estimates for study purposes. Real scaled scores depend on the official form and norm group.']].map(([q, a]) => h('details', null, h('summary', null, q), h('p', null, a))))),
    h('section', { class: 'sect' }, h('div', { class: 'cta-band reveal' }, h('h2', null, 'Start with the diagnostic. Twenty minutes.'), h('p', null, 'You will leave with a plan that knows exactly where you stand, and exactly how far the 99th percentile is.'), h('a', { class: 'btn btn-gold btn-lg', href: '#/register' }, 'Create a free account'))),
    h('footer', { class: 'foot' }, h('span', null, '© Tidelyne Prep. Not affiliated with the test publishers.'), h('span', null, 'Built for students, parents and tutors.')));
  $app.replaceChildren(root); window.scrollTo(0, 0); observeReveal(root);
}
function renderAuth(mode = 'login') {
  const err = h('div', { class: 'alert error hidden' });
  const testSel = h('select', { name: 'targetTest', onchange: (e) => fillVariants(e.target.value) }, Object.entries(state.overview.tests).map(([k, t]) => h('option', { value: k }, `${t.name} — ${t.fullName}`)));
  const varSel = h('select', { name: 'variant' });
  const fillVariants = (t) => { varSel.innerHTML = ''; Object.entries(state.overview.tests[t].variants).forEach(([k, v]) => varSel.append(h('option', { value: k }, v))); }; fillVariants('hspt');
  const form = h('form', { class: 'stack-sm', onsubmit: async (ev) => { ev.preventDefault(); err.classList.add('hidden'); const fd = Object.fromEntries(new FormData(ev.target).entries()); try { state.user = await post(mode === 'login' ? '/api/login' : '/api/register', fd); state.progress = null; state.tutor.history = null; try { state.tutor.status = await get('/api/tutor/status'); } catch {} go('#/session'); } catch (e) { err.textContent = e.message; err.classList.remove('hidden'); } } },
    mode === 'register' ? h('div', null, h('label', null, 'Your first name'), h('input', { name: 'displayName', required: true, maxlength: 40, placeholder: 'Maya' })) : null,
    h('div', null, h('label', null, 'Username'), h('input', { name: 'username', required: true, autocomplete: 'username', placeholder: 'letters, numbers, dots' })),
    h('div', null, h('label', null, 'Password'), h('input', { name: 'password', type: 'password', required: true, minlength: mode === 'register' ? 8 : 1, autocomplete: mode === 'register' ? 'new-password' : 'current-password', placeholder: mode === 'register' ? 'at least 8 characters' : '' })),
    mode === 'register' ? h('div', null, h('label', null, 'I am a'), h('select', { name: 'role' }, h('option', { value: 'student' }, 'Student'), h('option', { value: 'parent' }, 'Parent or tutor (follow students)'))) : null,
    mode === 'register' ? h('div', { class: 'grid g2', style: { gap: '10px' } }, h('div', null, h('label', null, 'Target test'), testSel), h('div', null, h('label', null, 'Level'), varSel)) : null,
    mode === 'register' ? h('div', { class: 'grid g2', style: { gap: '10px' } }, h('div', null, h('label', null, 'Grade (optional)'), h('input', { name: 'grade', type: 'number', min: 3, max: 12, placeholder: '7' })), h('div', null, h('label', null, 'Test date (optional)'), h('input', { name: 'testDate', type: 'date' }))) : null,
    err, h('div', { style: { marginTop: '16px' } }, h('button', { class: 'btn btn-primary btn-lg btn-block', type: 'submit' }, mode === 'login' ? 'Sign in' : 'Create my account')),
    h('p', { class: 'small muted center', style: { marginTop: '10px' } }, mode === 'login' ? ['New here? ', h('a', { href: '#/register' }, 'Create an account')] : ['Already have an account? ', h('a', { href: '#/login' }, 'Sign in')]));
  $app.replaceChildren(h('div', { class: 'auth-wrap' }, h('div', { class: 'auth-art' }, h('a', { href: '#/', class: 'brand-lite', style: { color: '#fff' } }, brandMark(), brandName()), h('div', null, h('h2', null, mode === 'login' ? 'Welcome back. Your plan is waiting.' : 'Meet your tutor in the next two minutes.'), h('p', { class: 'q' }, '“The best tutors do four things: find the gap, teach the method, make you try, and come back before you forget. This does all four.”')), h('div', { class: 'small', style: { color: '#b8c0d9' } }, 'Private accounts · progress that is yours · parent view by share code')), h('div', { class: 'auth-form' }, h('div', null, h('h2', null, mode === 'login' ? 'Sign in' : 'Create your account'), h('p', { class: 'muted' }, mode === 'login' ? 'Pick up where you left off.' : 'Choose your test; you can change it anytime.'), form))));
  window.scrollTo(0, 0);
}

// ---------- shared question card ----------
function questionCard(q, opts = {}) {
  let selected = null; const eliminated = new Set(); let holdTimer = null, held = false, touching = false;
  const toggleOut = (i) => { if (eliminated.has(i)) eliminated.delete(i); else eliminated.add(i); btns[i].classList.toggle('eliminated'); };
  const endTouch = () => { clearTimeout(holdTimer); touching = false; };
  const btns = q.choices.map((c, i) => h('button', { class: 'choice', type: 'button', onpointerdown: (e) => { if (e.pointerType !== 'touch' || card.locked) return; touching = true; held = false; clearTimeout(holdTimer); holdTimer = setTimeout(() => { if (!held) { held = true; toggleOut(i); if (navigator.vibrate) navigator.vibrate(15); } }, 500); }, onpointerup: endTouch, onpointercancel: endTouch, onpointerleave: endTouch, onclick: () => { if (held) { held = false; return; } if (card.locked) return; if (eliminated.has(i)) { eliminated.delete(i); btns[i].classList.remove('eliminated'); return; } selected = i; btns.forEach((b, k) => b.classList.toggle('selected', k === i)); opts.onSelect && opts.onSelect(i); }, oncontextmenu: (e) => { e.preventDefault(); if (card.locked) return; if (touching) { clearTimeout(holdTimer); if (!held) { held = true; toggleOut(i); } return; } toggleOut(i); } }, h('span', { class: 'l' }, LETTERS[i]), h('span', null, c)));
  const explain = h('div', { class: 'explain hidden' });
  const stemText = (opts.number ? `${opts.number}. ` : '') + q.stem.replace(/^[A-Za-z ]+ set \d+ — /, ''); const stem = /\*[^*\n]+\*/.test(stemText) ? h('div', { class: 'q-stem', html: inline(stemText) }) : h('div', { class: 'q-stem' + (isCapsStem(q) ? ' caps' : '') }, stemText);
  const el = h('div', null, stem, h('div', { class: 'choices' }, btns), explain);
  const card = { el, locked: false, get selected() { return selected; }, set selected(v) { selected = v; btns.forEach((b, k) => b.classList.toggle('selected', k === v)); },
    eliminate(idx) { for (const i of idx) { eliminated.add(i); btns[i].classList.add('eliminated'); } },
    reveal(r) { card.locked = true; btns.forEach((b, k) => { b.disabled = true; b.classList.remove('eliminated'); if (k === r.answer) b.classList.add('correct'); else if (k === r.choice) b.classList.add('wrong'); }); explain.innerHTML = `<b>${r.correct ? 'Correct.' : r.choice === null || r.choice === undefined ? 'Not answered.' : 'Not quite.'}</b> ${inline(r.explanation || '')}`; explain.classList.remove('hidden'); } };
  return card;
}
const fromSession = (params) => params && params.get('from') === 'session' ? { date: params.get('date'), index: Number(params.get('i')) } : null;
async function completeSessionStep(sess) { if (!sess) return null; try { await post('/api/plan/done', { date: sess.date, index: sess.index }); } catch {} return h('a', { class: 'btn btn-gold', href: '#/session' }, "Back to today's session ›"); }

// ---------- question set runner (practice, diagnostic, drills) ----------
function panelHolder(area) { return h('div', { class: 'stack' }, area); }
async function runSet(panel, { url, title, mode = 'practice', sess = null, onDone }) {
  const u = state.user;
  panel.replaceChildren(loading('Building your set…'));
  const { questions } = await get(url);
  if (!questions.length) { panel.replaceChildren(h('div', { class: 'alert warn' }, 'No questions available for that selection yet.'), h('a', { class: 'btn', href: '#/practice' }, 'Back')); return; }
  let i = 0; const log = []; let startT = Date.now(); let confidence = null;
  const dots = h('div', { class: 'progress-dots' }, questions.map(() => h('i')));
  const area = h('div');
  const show = () => {
    const q = questions[i]; startT = Date.now(); confidence = null; let hintsUsed = 0;
    dots.querySelectorAll('i').forEach((d, k) => d.classList.toggle('cur', k === i));
    const card = questionCard(q, {});
    const hintBox = h('div');
    const setCtx = (answered, choice) => setTutorContext({ servedId: q.servedId, label: `${skillName(q.skill)} question ${i + 1} of ${questions.length}`, answered, choice, hintsUsed, onHint: (hint) => { hintsUsed = Math.max(hintsUsed, hint.level); if (hint.eliminate) card.eliminate(hint.eliminate); hintBox.append(h('div', { class: 'hintbox' }, h('b', null, `Hint ${hint.level}: `), hint.text)); } });
    setCtx(false, null);
    const confBtns = ['Guessing', 'Unsure', 'Fairly sure', 'Certain'].map((t, k) => h('button', { onclick: () => { confidence = k + 1; confBtns.forEach((b, j) => b.classList.toggle('active', j === k)); } }, t));
    const feedback = h('div');
    const hintBtn = h('button', { class: 'btn btn-sm', onclick: async () => { if (hintsUsed >= 3) return toast('No more hints: commit to an answer.'); hintBtn.disabled = true; try { const hnt = await get('/api/practice/hint?servedId=' + q.servedId); hintsUsed = hnt.hintsUsed; if (hnt.eliminate) card.eliminate(hnt.eliminate); hintBox.append(h('div', { class: 'hintbox' }, h('b', null, `Hint ${hnt.level}: `), hnt.text)); setCtx(false, null); hintBtn.textContent = hintsUsed >= 3 ? 'No more hints' : `Hint (${3 - hintsUsed} left)`; } catch (e) { toast(e.message); } hintBtn.disabled = hintsUsed >= 3; } }, '💡 Hint (3 left)');
    const askBtn = h('button', { class: 'btn btn-sm btn-ghost', onclick: () => toggleTutor(true) }, `Ask ${tutorName()}`);
    const submit = h('button', { class: 'btn btn-primary', onclick: async () => {
      if (card.selected === null) { toast('Choose an answer first'); return; }
      submit.disabled = true; hintBtn.disabled = true;
      const r = await post('/api/practice/answer', { servedId: q.servedId, choice: card.selected, seconds: (Date.now() - startT) / 1000, confidence, test: u.targetTest });
      if (paceTimer) clearInterval(paceTimer);
      card.reveal({ ...r, choice: card.selected });
      const confWrap = confBtns[0].parentElement && confBtns[0].parentElement.parentElement; if (confWrap) confWrap.classList.add('hidden'); if (submit.parentElement) submit.parentElement.classList.add('hidden');
      log.push({ q, r, confidence, seconds: (Date.now() - startT) / 1000, hints: hintsUsed });
      if (!r.correct && mode !== 'diagnostic') { const tagRow = h('div', { class: 'row', style: { gap: '6px', marginTop: '10px' } }, h('span', { class: 'small muted' }, 'Why did you miss it?'), ...[['careless', 'Careless'], ["didn't know", "Didn't know"], ['misread', 'Misread'], ['time', 'Out of time']].map(([k, t]) => h('button', { class: 'chip', onclick: async (e) => { try { await post('/api/mistakes/tag', { servedId: q.servedId, type: k }); tagRow.replaceChildren(h('span', { class: 'pill teal' }, `Tagged: ${t}`)); } catch (err) { toast(err.message); } } }, t))); hintBox.append(tagRow); }
      dots.querySelectorAll('i')[i].classList.add(r.correct ? 'ok' : 'bad');
      setCtx(true, card.selected);
      const calib = confidence ? (r.correct && confidence <= 2 ? 'You knew more than you thought. Trust the method.' : !r.correct && confidence >= 3 ? 'Confident but wrong: the most valuable kind of miss. Read the explanation twice; it will come back in Review.' : '') : '';
      feedback.replaceChildren(h('div', { class: 'row between', style: { marginTop: '12px' } }, h('div', { class: 'row', style: { gap: '8px' } }, h('span', { class: 'pill ' + (r.correct ? 'teal' : 'red') }, `+${r.xpGain} XP`), h('span', { class: 'pill ' + (r.rating.delta >= 0 ? 'teal' : 'red') }, `${skillName(q.skill)} ${r.rating.delta >= 0 ? '+' : ''}${r.rating.delta} → ${r.rating.mastery}%`), !r.correct ? h('button', { class: 'btn btn-sm btn-ghost', onclick: () => { toggleTutor(true); setTimeout(() => { const inp = document.querySelector('.tutor-input input'); if (inp) { inp.value = 'Why is that the answer?'; inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' })); } }, 350); } }, 'Ask why') : null), h('button', { class: 'btn btn-dark', onclick: next }, i + 1 < questions.length ? 'Next ›' : 'Finish')), calib ? h('p', { class: 'small muted', style: { marginTop: '8px' } }, calib) : null);
      revealFeedback(feedback.querySelector('.btn-dark'), card.el.querySelector('.explain'));
    } }, 'Check answer');
    const paceEl = q.targetSeconds ? h('span', { class: 'pill', title: 'Seconds per question on the real test' }, `⏱ 0 / ${q.targetSeconds}s`) : null; let paceTimer = null; if (paceEl) paceTimer = setInterval(() => { const el = Math.round((Date.now() - startT) / 1000); paceEl.textContent = `⏱ ${el} / ${q.targetSeconds}s`; paceEl.className = 'pill ' + (el > q.targetSeconds * 1.5 ? 'red' : el > q.targetSeconds ? 'amber' : ''); }, 1000);
    const body = h('div', { class: 'card stack' }, h('div', { class: 'row between small muted' }, h('span', { class: 'row', style: { gap: '8px' } }, `${title} · ${i + 1} of ${questions.length} · ${skillName(q.skill)} · level ${q.level}`, paceEl), h('span', { class: 'kbd-hint' }, h('span', { class: 'kbd' }, '1-5'), ' choose · ', h('span', { class: 'kbd' }, 'Enter'), ' check · ', h('span', { class: 'kbd' }, 'H'), ' hint')), card.el, hintBox, h('div', null, h('label', null, 'How confident are you?'), h('div', { class: 'confidence' }, confBtns)), h('div', { class: 'row' }, submit, hintBtn, askBtn), feedback);
    area.replaceChildren(q.passage ? h('div', { class: 'split' }, h('div', { class: 'passage sticky-side' }, h('h3', null, q.passage.title), q.passage.text), body) : body);
    window.onkeydown = (e) => { if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return; const k = parseInt(e.key); if (k >= 1 && k <= q.choices.length && !card.locked) card.selected = k - 1; else if (e.key === 'Enter') { if (!card.locked) submit.click(); else { const b = feedback.querySelector('.btn-dark'); b && b.click(); } } else if (e.key.toLowerCase() === 'h' && !card.locked) hintBtn.click(); };
  };
  const next = () => { i++; if (i < questions.length) show(); else finish(); };
  const finish = async () => {
    window.onkeydown = null; setTutorContext(null);
    const right = log.filter(l => l.r.correct).length; const avg = log.reduce((a, l) => a + l.seconds, 0) / Math.max(1, log.length);
    const bySkill = {}; log.forEach(l => { const s = bySkill[l.q.skill] || (bySkill[l.q.skill] = { r: 0, n: 0 }); s.n++; if (l.r.correct) s.r++; });
    const overconf = log.filter(l => !l.r.correct && l.confidence >= 3).length; const xp = log.reduce((a, l) => a + l.r.xpGain, 0);
    state.progress = null; state.user = (await get('/api/me')).user;
    const back = await completeSessionStep(sess);
    const pct = Math.round(right / log.length * 100);
    const say = pct >= 80 ? `${pct}%. That is strong work. The next set will be a little harder; that is the point.` : pct >= 60 ? `${pct}%. Right in the learning zone. Look at the misses below; each one is a specific move you can learn.` : `${pct}%. Harder than you expected, and that is useful information. I have lowered the difficulty on these skills, and the misses are queued for review.`;
    area.replaceChildren(h('div', { class: 'stack' }, tutorSay(say), h('div', { class: 'card stack' }, h('h2', null, `Set complete: ${right}/${log.length}`),
      h('div', { class: 'grid g4' }, h('div', { class: 'stat' }, h('span', { class: 'v' }, `+${xp}`), h('span', { class: 'k' }, 'XP earned')), h('div', { class: 'stat' }, h('span', { class: 'v' }, fmtTime(avg)), h('span', { class: 'k' }, 'avg per question')), h('div', { class: 'stat' }, h('span', { class: 'v' }, overconf), h('span', { class: 'k' }, 'confident misses')), h('div', { class: 'stat' }, h('span', { class: 'v' }, log.filter(l => !l.r.correct).length), h('span', { class: 'k' }, 'queued for review'))),
      h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Skill'), h('th', null, 'Right'), h('th', null, 'Mastery now'))), h('tbody', null, Object.entries(bySkill).map(([s, v]) => { const last = [...log].reverse().find(l => l.q.skill === s); return h('tr', null, h('td', null, skillName(s)), h('td', null, `${v.r}/${v.n}`), h('td', null, `${last.r.rating.mastery}%`)); }))),
      h('div', { class: 'row' }, back, onDone ? onDone(log) : null, h('button', { class: 'btn btn-primary', onclick: () => runSet(panel, { url, title, mode, sess, onDone }) }, 'Another set'), h('a', { class: 'btn', href: '#/review' }, 'Review misses')))));
    if (mode === 'diagnostic') { try { const r = await post('/api/diagnostic/complete'); state.user = (await get('/api/me')).user; area.prepend(diagnosticReport(r)); $app.querySelector('.side') && $app.querySelector('.side').replaceWith(h('aside', { class: 'side' }, ...[])); $app.innerHTML = ''; shell(panelHolder(area), 'session'); } catch (e) { toast(e.message); } }
  };
  panel.replaceChildren(h('div', { class: 'stack' }, h('div', { class: 'row between' }, h('a', { href: sess ? '#/session' : '#/practice', class: 'small', onclick: () => { window.onkeydown = null; setTutorContext(null); } }, sess ? '‹ Back to session' : '‹ Change focus'), dots), area));
  show();
}
function diagnosticReport(r) {
  const p = r.progress; const secs = Object.entries(p.bySection).filter(([k]) => !['writing', 'essay'].includes(k));
  const weak = p.skills.filter(s => s.n >= 1).sort((a, b) => a.mastery - b.mastery).slice(0, 3);
  const tailored = h('div', { class: 'card' }, h('h3', null, 'What just changed for you'), h('ul', { style: { paddingLeft: '20px', margin: 0 } }, [`Study plan: ${r.plan.horizonDays} days in three phases (Foundations, Build, Rehearsal), weakest skills first.`, r.focus && r.focus.skills.length ? `Focus skills for the next two weeks: ${r.focus.skills.map(s => `${s.name} (${s.now}% → ${s.target}%)`).join(', ')}.` : null, `Daily goal set to ${state.user.dailyGoal || 20} questions based on your test date.`, 'Lessons page now opens with the lessons that move your score most.', 'Practice difficulty and math drill levels now start at your measured level in each skill.', r.projection && r.projection.overall !== null ? `Projected ${ordinal(r.projection.overall)} percentile today; goal ${ordinal(r.projection.goal)}. The report and projection update as you work.` : null, 'Mock tests recommend the right difficulty tier for you.'].filter(Boolean).map(t => h('li', { style: { margin: '4px 0' } }, t))));
  return h('div', { class: 'stack' }, tutorSay(`Thank you, ${state.user.displayName}. Now I know where to start. ${weak.length ? `We will begin with ${weak.map(w => w.name).join(', ')}, because that is where the fastest points are.` : ''} Your plan is ${r.plan.horizonDays} days long${r.plan.testDate ? ' and ends on test day' : ''}. Each day is about 35 minutes. Consistency beats intensity; show up daily and the plan does the rest.`),
    h('div', { class: 'card' }, h('h3', null, 'Starting point by section'), h('p', { class: 'small muted' }, 'Estimated accuracy on test-level questions. These numbers move with every answer from here on.'), h('div', { class: 'stack-sm' }, secs.map(([k, s]) => h('div', null, h('div', { class: 'row between small' }, h('b', null, s.name), h('span', { class: 'muted' }, s.mastery === null ? 'not measured' : s.mastery + '%')), h('div', { class: 'bar' }, h('i', { style: { width: (s.mastery || 0) + '%', background: masteryColor(s.mastery) } }))))), h('div', { class: 'row', style: { marginTop: '14px' } }, h('a', { class: 'btn btn-primary', href: '#/session' }, "Start today's session ›"))), tailored, r.focus ? focusCard(r.focus) : null, r.projection ? projectionCard(r.projection) : null);
}

// ---------- Today (guided session) ----------
async function renderSession() {
  await withLoading('session', async () => {
    const s = await get('/api/session/today'); state.session = s; state.progress = null;
    const u = state.user;
    const typeIcon = { diagnostic: '🎯', review: '🔁', lesson: '📘', drill: '✏️', mock: '⏱', mini: '🏁', vocab: '📖', flash: '🃏', vocabquiz: '🔤', sprint: '⚡', writing: '✍️', rest: '🌙' };
    const nextIdx = s.items.findIndex(it => !it.done);
    const hrefFor = (it, i) => { const q = `?from=session&date=${s.date}&i=${i}`; switch (it.type) { case 'diagnostic': return '#/diagnostic'; case 'mini': return '#/mock' + q + '&length=mini&auto=1'; case 'flash': return '#/flashcards' + q; case 'vocabquiz': return '#/vocab/quiz' + q + '&count=10'; case 'sprint': return '#/math/sprint' + q + '&level=2&seconds=60'; case 'review': return '#/review' + q; case 'lesson': return `#/lesson/${it.ref}` + q; case 'drill': return '#/practice' + q + (it.ref ? `&skill=${it.ref}${it.level ? '&level=' + it.level : ''}&auto=1` : '&auto=1'); case 'mock': return '#/mock' + q + `&length=${it.length || 'half'}`; case 'vocab': return '#/flashcards' + q; case 'writing': return '#/writing' + q; default: return '#/session'; } };
    const pct = Math.round(s.done / Math.max(1, s.total) * 100);
    const planEl = await planSection();
    return h('div', { class: 'stack' },
      pageHead(`${fmtDay(s.date)} · ${s.course}${s.sprint ? ` · Sprint day ${s.sprint.day} of ${s.sprint.of}` : s.phase ? ' · ' + s.phase : ''}`, s.sprint && s.phase ? `Day ${s.sprint.day}: ${s.phase}` : `Today's session`, s.phaseDesc || null, h('div', { class: 'row' }, h('span', { class: 'pill ' + (s.projected !== null && s.projected >= s.goal ? 'teal' : 'accent'), title: 'Projected percentile from your skill ratings, against your goal' }, s.projected === null ? `🎯 Goal: ${ordinal(s.goal)} percentile` : `🎯 ~${ordinal(s.projected)} → goal ${ordinal(s.goal)}`), h('span', { class: 'pill gold', title: 'Consecutive days with at least 60 minutes of study' }, `🔥 ${s.streak}-day full-hour streak`), s.daysLeft !== null ? h('span', { class: 'pill' }, `${s.daysLeft} days to test`) : null, h('span', { class: 'pill' }, `Level ${u.level}`))),
      tutorSay(s.narration, h('div', { style: { marginTop: '10px' } }, h('div', { class: 'row between small', style: { color: '#b8c0d9' } }, h('span', null, `${s.done} of ${s.total} steps · about ${s.minutes} min planned`), h('span', null, `${pct}%`)), h('div', { class: 'bar gold', style: { background: 'rgba(255,255,255,.12)', marginTop: '6px' } }, h('i', { style: { width: pct + '%' } })), h('div', { class: 'row between small', style: { color: '#b8c0d9', marginTop: '10px' } }, h('span', { class: 'minutes-pill' }, `⏳ ${s.todayMinutes}/${s.dailyMinimum} min today`), h('span', null, s.minutesLeft > 0 ? `${s.minutesLeft} min to the daily minimum` : '✓ daily minimum met')), h('div', { class: 'bar teal', style: { background: 'rgba(255,255,255,.12)', marginTop: '6px' } }, h('i', { style: { width: Math.min(100, Math.round(s.todayMinutes / s.dailyMinimum * 100)) + '%' } })))),
      h('div', { class: 'stack-sm' }, s.items.map((it, i) => h('div', { class: 'step ' + (it.done ? 'done' : i === nextIdx ? 'next' : '') }, h('div', { class: 'num' }, it.done ? '✓' : i + 1), h('div', null, h('div', { class: 't' }, `${typeIcon[it.type] || '•'} ${it.label}`), h('div', { class: 'd' }, it.minutes ? `${it.minutes} min` : '')), it.type === 'rest' ? h('span', { class: 'pill teal' }, 'Rest') : it.done ? h('button', { class: 'btn btn-sm btn-ghost', onclick: () => go(hrefFor(it, i)) }, 'Again') : h('a', { class: 'btn btn-sm ' + (i === nextIdx ? 'btn-primary' : ''), href: hrefFor(it, i) }, i === nextIdx ? 'Start ›' : 'Open')))),
      s.complete ? h('div', { class: 'card gold' }, h('h3', null, 'Done for today'), h('p', { class: 'muted' }, `${s.todayMinutes} minutes logged. Extra practice is always available, but rest matters too. Tomorrow's plan is ready.`), h('div', { class: 'row' }, h('a', { class: 'btn', href: '#/practice' }, 'Extra practice'), h('a', { class: 'btn', href: '#/friends' }, 'See the leaderboard'))) : null,
      planEl);
  });
}
async function planSection() {
  const { plan, today } = await get('/api/plan'); if (!plan) return null;
  const upcoming = plan.days.filter(d => d.date >= today).slice(0, 14);
  const typeIcon = { diagnostic: '🎯', review: '🔁', lesson: '📘', drill: '✏️', mock: '⏱', mini: '🏁', vocab: '📖', flash: '🃏', vocabquiz: '🔤', sprint: '⚡', writing: '✍️', rest: '🌙' };
  const clip = (t, n) => t.length <= n ? t : t.slice(0, t.lastIndexOf(' ', n) > n * 0.6 ? t.lastIndexOf(' ', n) : n) + '…';
  const pillName = (it) => it.type === 'lesson' ? clip(it.label.replace('Lesson: ', ''), 40) : it.type === 'drill' ? it.label.replace(/^(Elite )?[Dd]rill: /, (m, e) => e ? 'Elite: ' : '').replace(' (10 questions)', '') : ({ diagnostic: 'Diagnostic', review: 'Review', mock: it.length === 'full' ? 'Full mock' : 'Half mock', mini: 'Mini test', vocab: 'New words', flash: 'Flashcards', vocabquiz: 'Vocab quiz', sprint: 'Math sprint', writing: 'Writing', rest: 'Rest' })[it.type] || it.type;
  const list = h('div', { class: 'hidden' }, upcoming.map(d => h('div', { class: 'plan-day' }, h('div', { class: 'dt' }, d.date === today ? 'Today' : fmtDay(d.date)), h('div', { class: 'its' }, d.items.map(it => h('span', { class: 'pill ' + (it.done ? 'teal' : it.type === 'mock' ? 'accent' : ''), title: it.label }, `${typeIcon[it.type] || ''} ${pillName(it)}`))))));
  const toggle = h('button', { class: 'btn btn-sm btn-ghost', onclick: () => { list.classList.toggle('hidden'); toggle.textContent = list.classList.contains('hidden') ? 'Show the whole sprint' : 'Hide'; } }, 'Show the whole sprint');
  return h('div', { class: 'card' }, h('div', { class: 'row between' }, h('div', null, h('h3', null, 'Your plan'), h('p', { class: 'small muted', style: { margin: 0 } }, plan.sprint ? `A 7-day sprint to the ${ordinal(plan.goal || 99)} percentile: Baseline, Attack, Checkpoint, Elite, Prove it. At least 60 minutes a day, about 90 planned. Next week's sprint is written from this one's results${plan.testDate ? '; the last week before ' + fmtDate(plan.testDate) + ' tapers' : ''}.` : `Test week: ${plan.horizonDays} days to ${fmtDate(plan.testDate)}. Timing, pacing and review only; the taper protects your score.`)), h('div', { class: 'row' }, toggle, h('button', { class: 'btn btn-sm', onclick: async () => { if (confirm('Rebuild the plan from your current progress? Today\'s progress is kept.')) { await post('/api/plan/generate'); renderSession(); } } }, 'Rebuild plan'))), list);
}
async function renderDiagnostic() {
  await withLoading('session', async () => {
    const panel = h('div');
    panel.append(h('div', { class: 'stack', style: { maxWidth: '760px', margin: '0 auto' } }, pageHead('Step 1', 'Diagnostic', null), tutorSay(`Twenty questions across every section of the ${testName(state.user.targetTest)}. There is no grade here. Answer honestly, rate your confidence, and skip nothing: a wrong answer tells me as much as a right one. About 15 minutes.`), h('div', { class: 'card' }, h('ul', { class: 'small muted', style: { paddingLeft: '18px', margin: '0 0 14px' } }, h('li', null, 'Hints are available, but use them only when truly stuck; they lower the question\'s weight.'), h('li', null, 'You will see the explanation after each answer. Read it even when you are right.'), h('li', null, 'At the end I build your day-by-day plan.')), h('button', { class: 'btn btn-primary btn-lg', onclick: () => runSet(panel, { url: '/api/practice/next?mode=diagnostic', title: 'Diagnostic', mode: 'diagnostic' }) }, 'Begin diagnostic'))));
    return panel;
  });
}

// ---------- dashboard ----------
async function renderDashboard() {
  await withLoading('dashboard', async () => {
    const [p, g, L] = await Promise.all([get('/api/progress'), get('/api/gamification'), get('/api/learner')]); state.progress = p; const u = state.user;
    const goalPct = Math.min(100, Math.round(p.today / u.dailyGoal * 100));
    const sections = Object.entries(p.bySection).filter(([k]) => !['writing', 'essay'].includes(k));
    const earned = g.badges.filter(b => b.earnedAt);
    const weak = p.skills.filter(s => s.n >= 2).sort((a, b) => a.mastery - b.mastery)[0];
    const say = !u.diagnosticDone ? `Welcome, ${u.displayName}. Start with the diagnostic so I can build your plan.` : p.minutesLeft === 0 ? `Sixty minutes done today. ${weak ? `If you want more, ${weak.name} is the skill with the most room to grow.` : 'Nice work.'}` : p.todayMinutes > 0 ? `${p.todayMinutes} minutes so far; ${p.minutesLeft} to go to today's minimum. ${weak ? `${weak.name} is where the next points are.` : ''}` : `${greeting()}, ${u.displayName}. ${p.due ? `${p.due} reviews are due; they take about ${Math.ceil(p.due * 0.5)} minutes and they are the highest-value thing you can do right now.` : weak ? `Your weakest skill is ${weak.name} at ${weak.mastery}%. Today's session targets it.` : 'Your session for today is ready.'}`;
    return h('div', { class: 'stack' },
      pageHead(`${testName(u.targetTest)} · ${state.overview.tests[u.targetTest].variants[u.variant] || ''}`, `${greeting()}, ${u.displayName}.`, null, h('div', { class: 'row' }, h('a', { class: 'btn btn-primary', href: '#/session' }, "Today's session"), h('a', { class: 'btn', href: '#/vocab' }, 'Vocab'), h('a', { class: 'btn', href: '#/math' }, 'Math'), h('a', { class: 'btn', href: '#/flashcards' }, 'Flashcards'))),
      tutorSay(say, h('div', { class: 'row', style: { marginTop: '10px' } }, p.recommendations.slice(0, 3).map(r => h('button', { class: 'btn btn-sm', style: { background: 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.2)', color: '#fff' }, onclick: () => actionGo(r.action) }, r.title)))),
      h('div', { class: 'grid g4' },
        h('div', { class: 'card tight stat' }, h('span', { class: 'v minutes-pill' }, `${p.todayMinutes}/${p.dailyMinimum} min`), h('span', { class: 'k' }, "Today's study time (60 min minimum)"), h('div', { class: 'bar teal', style: { marginTop: '6px' } }, h('i', { style: { width: Math.min(100, Math.round(p.todayMinutes / p.dailyMinimum * 100)) + '%' } }))),
        h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, `${p.streak}🔥`), h('span', { class: 'k' }, 'Full-hour streak'), h('div', { class: 'tiny faint' }, `${p.today} questions today`)),
        h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, p.recent.n ? Math.round(p.recent.right / p.recent.n * 100) + '%' : '—'), h('span', { class: 'k' }, 'Accuracy, 7 days')),
        h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, `Lv ${g.level}`), h('span', { class: 'k' }, `${g.xp} XP · ${g.nextLevelXp - g.xp} to next`), h('div', { class: 'bar gold', style: { marginTop: '6px' } }, h('i', { style: { width: Math.round((g.xp - g.levelXp) / Math.max(1, g.nextLevelXp - g.levelXp) * 100) + '%' } })))),
      u.diagnosticDone ? h('div', { class: 'grid g2' }, focusCard(L.focus), projectionCard(L.projection)) : h('div', { class: 'card gold' }, h('h3', null, 'Start with the diagnostic'), h('p', { class: 'muted' }, `Twenty questions calibrate every skill for the ${testName(u.targetTest)}. After it, your plan, focus skills, drill levels, vocabulary level and daily goal are all set to you.`), h('a', { class: 'btn btn-primary', href: '#/diagnostic' }, 'Take the diagnostic')),
      L.profile.insights.length ? h('div', { class: 'card' }, h('div', { class: 'row between' }, h('h3', null, 'What I notice'), h('div', { class: 'row', style: { gap: '6px' } }, h('a', { class: 'btn btn-sm', href: '#/mistakes' }, 'Mistake journal'), h('a', { class: 'btn btn-sm', href: '#/report' }, 'Weekly report'))), h('ul', { style: { margin: '6px 0 0', paddingLeft: '20px' } }, L.profile.insights.slice(0, 4).map(t => h('li', { style: { margin: '4px 0' } }, t)))) : null,
      h('div', { class: 'grid g2' },
        h('div', { class: 'card' }, h('h3', null, 'Mastery by section'), h('p', { class: 'small muted' }, 'Estimated accuracy on test-level questions.'), h('div', { class: 'stack-sm' }, sections.map(([k, s]) => h('div', null, h('div', { class: 'row between small' }, h('b', null, s.name), h('span', { class: 'muted' }, s.mastery === null ? 'not yet measured' : s.mastery + '%')), h('div', { class: 'bar' }, h('i', { style: { width: (s.mastery || 0) + '%', background: masteryColor(s.mastery) } })))))),
        h('div', { class: 'card' }, h('div', { class: 'row between' }, h('h3', null, 'Badges'), h('a', { class: 'small', href: '#/friends' }, 'All badges ›')), earned.length ? h('div', { class: 'row', style: { gap: '8px' } }, earned.slice(-8).map(b => h('span', { class: 'pill gold', title: b.desc }, b.icon, ' ', b.name))) : h('p', { class: 'muted small' }, 'Your first badge is 10 questions away.'), h('h3', { style: { marginTop: '16px' } }, 'Last 8 weeks'), heatmap(p.daily))),
      h('div', { class: 'grid g2' },
        h('div', { class: 'card' }, h('h3', null, 'Recent mock tests'), p.mocks.filter(m => m.status === 'completed').length ? h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Date'), h('th', null, 'Tier'), h('th', null, 'Score'), h('th', null, 'Est. %ile'))), h('tbody', null, p.mocks.filter(m => m.status === 'completed').slice(0, 5).map(m => h('tr', { class: 'click', onclick: () => go(`#/mock/${m.id}/results`) }, h('td', null, fmtDate(m.completed_at)), h('td', null, h('span', { class: 'pill' }, state.overview.tiers[m.tier].name)), h('td', null, `${m.results.pct}%`), h('td', null, m.results.percentile))))) : h('p', { class: 'muted small' }, 'No mock tests yet. Your plan schedules the first one at the end of week one.')),
        h('div', { class: 'card' }, h('h3', null, 'Recommended now'), h('div', { class: 'list' }, p.recommendations.map(r => h('div', { class: 'item', onclick: () => actionGo(r.action) }, h('div', { class: 'ic' }, { review: '🔁', lesson: '📘', practice: '🎯', mock: '⏱' }[r.type]), h('div', { class: 'grow' }, h('div', { class: 't' }, r.title), h('div', { class: 'd' }, r.why)), h('span', { class: 'muted' }, '›')))))));
  });
}
function greeting() { const hr = new Date().getHours(); return hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening'; }
function actionGo(a) { if (a.page === 'lesson') go('#/lesson/' + a.id); else if (a.page === 'practice') go('#/practice' + (a.skill ? '?skill=' + a.skill + '&auto=1' : '')); else go('#/' + a.page); }
function heatmap(daily) { const map = new Map(daily.map(d => [d.day, d.n])); const cells = []; const d = new Date(); d.setDate(d.getDate() - 55); for (let i = 0; i < 56; i++) { const k = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); const n = map.get(k) || 0; cells.push(h('i', { class: n === 0 ? '' : n < 10 ? 'l1' : n < 25 ? 'l2' : n < 50 ? 'l3' : 'l4', title: `${k}: ${n} questions` })); d.setDate(d.getDate() + 1); } return h('div', { class: 'heat' }, cells); }

// ---------- practice ----------
async function renderPractice(params) {
  await withLoading('practice', async () => {
    const u = state.user; const ov = state.overview; const secSkills = ov.sectionSkills[u.targetTest];
    const sel = { section: params.get('section') || '', skill: params.get('skill') || '', count: 10, level: params.get('level') || '' };
    if (sel.skill && !sel.section) sel.section = Object.keys(secSkills).find(s => secSkills[s].includes(sel.skill)) || '';
    const sess = fromSession(params);
    const panel = h('div');
    const urlFor = () => { const qs = new URLSearchParams({ test: u.targetTest, count: sel.count }); if (sel.section) qs.set('section', sel.section); if (sel.skill) qs.set('skill', sel.skill); if (sel.level) qs.set('level', sel.level); return '/api/practice/next?' + qs; };
    if (params.get('auto') === '1') { runSet(panel, { url: urlFor(), title: (sel.skill ? skillName(sel.skill) : 'Adaptive mix') + (sel.level ? ` · level ${sel.level}` : ''), sess }); return panel; }
    if (!state.progress) state.progress = await get('/api/progress');
    const secChips = h('div', { class: 'chips' }); const skillChips = h('div', { class: 'chips' });
    const draw = () => {
      secChips.replaceChildren(h('button', { class: 'chip' + (!sel.section ? ' active' : ''), onclick: () => { sel.section = ''; sel.skill = ''; draw(); } }, 'Adaptive mix'), ...Object.keys(secSkills).filter(s => !['writing', 'essay'].includes(s)).map(s => h('button', { class: 'chip' + (sel.section === s ? ' active' : ''), onclick: () => { sel.section = s; sel.skill = ''; draw(); } }, sectionName(u.targetTest, s))));
      const skills = sel.section ? secSkills[sel.section].filter(s => s !== 'writing') : [];
      skillChips.replaceChildren(...(skills.length ? [h('button', { class: 'chip' + (!sel.skill ? ' active' : ''), onclick: () => { sel.skill = ''; draw(); } }, 'All skills in section'), ...skills.map(s => { const r = state.progress.skills.find(x => x.skill === s); return h('button', { class: 'chip' + (sel.skill === s ? ' active' : ''), onclick: () => { sel.skill = s; draw(); } }, skillName(s), r ? h('span', { class: 'tiny', style: { marginLeft: '6px', color: masteryColor(r.mastery) } }, `${r.mastery}%`) : null); })] : [h('span', { class: 'small muted' }, 'Pick a section to target one skill, or keep the adaptive mix.')]));
    };
    draw();
    const countSel = h('select', { style: { width: 'auto' }, onchange: (e) => { sel.count = Number(e.target.value); } }, [5, 10, 15, 20, 30].map(n => h('option', { value: n, selected: n === 10 }, `${n} questions`)));
    const fx = (await get('/api/focus').catch(() => ({ focus: null }))).focus;
    panel.append(h('div', { class: 'stack' }, fx && fx.skills.length ? h('div', { class: 'card gold' }, h('div', { class: 'row between' }, h('h3', null, 'Your focus skills'), h('span', { class: 'small muted' }, `${fx.daysLeft} days to targets`)), h('div', { class: 'row' }, fx.skills.map(s => h('button', { class: 'btn btn-sm ' + (s.done ? '' : 'btn-primary'), onclick: () => { sel.section = ''; sel.skill = s.skill; runSet(panel, { url: urlFor(), title: skillName(s.skill), sess }); } }, `${s.name} ${s.now}%→${s.target}%`)))) : null, pageHead('Practice', 'Adaptive practice', 'Sets aim for about 70% success: hard enough to learn from, easy enough to keep going. Hints cost a little XP; asking why after you answer is free.'),
      h('div', { class: 'card stack' }, h('div', null, h('label', null, 'Section'), secChips), h('div', null, h('label', null, 'Skill'), skillChips), h('div', { class: 'row' }, countSel, h('button', { class: 'btn btn-primary btn-lg', onclick: () => runSet(panel, { url: urlFor(), title: sel.skill ? skillName(sel.skill) : sel.section ? sectionName(u.targetTest, sel.section) : 'Adaptive mix', sess }) }, 'Start set'), h('span', { class: 'small faint' }, window.matchMedia('(pointer: coarse)').matches ? 'Press and hold a choice to cross it out.' : 'Right-click a choice to cross it out.')))));
    return panel;
  });
}

// ---------- learn ----------
async function renderLearn() {
  await withLoading('learn', async () => {
    const u = state.user; const { lessons, recommended } = await get('/api/lessons?test=' + u.targetTest);
    const secs = Object.keys(state.overview.tests[u.targetTest].sections);
    const done = lessons.filter(l => l.progress && l.progress.status === 'completed').length;
    const groups = secs.map(s => [s, lessons.filter(l => l.section === s)]).filter(([, ls]) => ls.length);
    return h('div', { class: 'stack' },
      pageHead('Learn', 'Lessons', `Each lesson: the idea, the method, a worked think-aloud, a scaffolded try, the traps, then a retrieval check that feeds your ratings.`, h('div', { class: 'stat' }, h('span', { class: 'v' }, `${done}/${lessons.length}`), h('span', { class: 'k' }, 'completed'))),
      recommended && recommended.length ? h('div', { class: 'card gold' }, h('h3', null, 'Recommended for you'), h('p', { class: 'small muted' }, 'Ordered by where a lesson will move your score most right now.'), h('div', { class: 'list' }, recommended.map(l => h('div', { class: 'item', onclick: () => go('#/lesson/' + l.id) }, h('div', { class: 'ic' }, '📘'), h('div', { class: 'grow' }, h('div', { class: 't' }, l.title), h('div', { class: 'd' }, l.why)), h('span', { class: 'pill' }, `${l.minutes} min`))))) : null,
      groups.map(([s, ls]) => h('div', null, h('h2', { style: { margin: '18px 0 10px' } }, sectionName(u.targetTest, s)),
        h('div', { class: 'grid g3' }, ls.map(l => h('div', { class: 'card item', style: { alignItems: 'stretch', flexDirection: 'column', gap: '6px' }, onclick: () => go('#/lesson/' + l.id) },
          h('div', { class: 'row between' }, h('span', { class: 'pill' }, l.skillName), l.progress && l.progress.status === 'completed' ? h('span', { class: 'pill teal' }, `✓ ${Math.round(l.progress.score * 100)}%`) : l.progress ? h('span', { class: 'pill amber' }, 'started') : null),
          h('div', { class: 't', style: { fontSize: '16px' } }, l.title), h('div', { class: 'd' }, l.objectives[0]), h('div', { class: 'tiny faint' }, `${l.minutes} min · level ${l.level}${l.test === 'all' ? ' · all tests' : ''}`)))))));
  });
}
async function renderLesson(id, params) {
  await withLoading('learn', async () => {
    const l = await get('/api/lessons/' + id); post('/api/lessons/' + id + '/start'); const sess = fromSession(params);
    const answers = []; const qBlocks = []; let qi = 0;
    const blocks = l.blocks.map(b => {
      const kindLabel = { concept: 'Concept', strategy: 'Method', worked: 'Worked example', faded: 'Your turn (scaffolded)', trap: 'Traps to avoid', check: 'Retrieval check', summary: 'Summary' }[b.type] || b.type;
      const el = h('section', { class: 'lesson-block ' + b.type }, h('div', { class: 'kind' }, kindLabel), b.title ? h('h3', null, b.title) : null, b.md ? h('div', { class: 'md', html: md(b.md) }) : null);
      const qs = b.type === 'faded' ? [b.question] : b.type === 'check' ? b.questions : [];
      qs.forEach((q, k) => { const idx = qi++; answers[idx] = null; const qe = questionCard(q, { number: b.type === 'check' ? k + 1 : null, onSelect: (c) => { answers[idx] = c; } }); qBlocks.push(qe); el.append(h('div', { style: { marginTop: '14px' } }, qe.el)); });
      return el;
    });
    const result = h('div');
    const submit = h('button', { class: 'btn btn-primary btn-lg', onclick: async () => {
      if (answers.some(a => a === null)) { if (!confirm('Some questions are unanswered. Submit anyway?')) return; }
      submit.disabled = true; const r = await post(`/api/lessons/${id}/check`, { answers });
      r.results.forEach((res, i) => qBlocks[i].reveal(res));
      const pct = Math.round(r.score * 100); state.progress = null;
      const back = await completeSessionStep(sess);
      result.replaceChildren(tutorSay(pct >= 75 ? `${pct}% on the check. Solid. This skill will resurface in Review at the right moment; that is how it becomes permanent.` : `${pct}% on the check. Worth a second pass: reread the Method and Traps blocks, then drill this skill. I would rather you struggle now than on test day.`, h('div', { class: 'row', style: { marginTop: '10px' } }, back, h('a', { class: 'btn btn-gold', href: `#/practice?${l.skill === 'strategy' || l.skill === 'writing' ? '' : 'skill=' + l.skill + '&'}section=${l.section}&auto=1` }, 'Drill this skill'), h('a', { class: 'btn', style: { background: 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.2)', color: '#fff' }, href: '#/learn' }, 'All lessons'))));
      result.scrollIntoView({ behavior: 'smooth' });
    } }, 'Submit check');
    setTutorContext({ label: `Lesson: ${l.title}` });
    return h('div', { class: 'stack', style: { maxWidth: '840px', margin: '0 auto' } },
      h('a', { href: sess ? '#/session' : '#/learn', class: 'small' }, sess ? '‹ Back to session' : '‹ All lessons'),
      h('div', null, h('div', { class: 'row' }, h('span', { class: 'pill' }, skillName(l.skill)), h('span', { class: 'pill' }, `${l.minutes} min`), h('span', { class: 'pill' }, l.test === 'all' ? 'All tests' : testName(l.test))), h('h1', { style: { marginTop: '8px' } }, l.title)),
      h('div', { class: 'card flat' }, h('h4', null, 'By the end you will be able to'), h('ul', { style: { margin: 0, paddingLeft: '20px' } }, l.objectives.map(o => h('li', null, o)))),
      blocks, h('div', { class: 'center' }, submit), result);
  });
}

// ---------- mock tests ----------
async function renderMockHome(params) {
  await withLoading('mock', async () => {
    const u = state.user; const o = await get('/api/mock/options?test=' + u.targetTest); const sess = fromSession(params);
    const sel = { test: u.targetTest, variant: u.variant, tier: o.recommended.tier, length: ['full', 'half', 'section', 'mini'].includes(params.get('length')) ? params.get('length') : 'full', section: '', realism: false };
    if (params.get('auto') === '1' && sel.length === 'mini') { try { const r = await post('/api/mock/start', sel); go('#/mock/' + r.id + (sess ? `?from=session&date=${sess.date}&i=${sess.index}` : '')); return loading(); } catch (e) { toast(e.message); } }
    const bpList = h('div'); const tierWrap = h('div', { class: 'grid g4' }); const secSel = h('div');
    const drawBp = () => { if (sel.length === 'mini') { const mp = o.miniPreview[sel.variant] || []; const tot = mp.reduce((a, s) => a + s.seconds, 0); bpList.replaceChildren(h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Section'), h('th', null, 'Questions'), h('th', null, 'Time'), h('th', null, 'Pace'))), h('tbody', null, mp.map(s => h('tr', null, h('td', null, s.label || sectionName(sel.test, s.section)), h('td', null, s.count), h('td', null, fmtTime(s.seconds)), h('td', null, `${s.spq}s each`))), h('tr', null, h('td', null, h('b', null, 'Total')), h('td', null, h('b', null, mp.reduce((a, s) => a + s.count, 0))), h('td', null, h('b', null, fmtTime(tot))), h('td', { class: 'small muted' }, 'exactly the real test\'s pace'))))); return; } const secs = o.blueprint[sel.variant] || []; const f = sel.length === 'half' ? 0.5 : 1; const shown = sel.length === 'section' ? secs.filter(s => s.section === (sel.section || secs[0].section)) : secs; const totalQ = shown.reduce((a, s) => a + (s.writing ? 0 : Math.round(s.count * f)), 0), totalM = shown.reduce((a, s) => a + Math.max(5, Math.round(s.minutes * f)), 0); const vis = shown.filter(s => sel.length === 'full' || !(s.break || s.experimental)); const totalMin2 = vis.reduce((a, s) => a + (s.break ? s.minutes : Math.max(5, Math.round(s.minutes * f))), 0); const totalQ2 = vis.reduce((a, s) => a + (s.writing || s.break ? 0 : Math.round(s.count * f)), 0); bpList.replaceChildren(h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Section'), h('th', null, 'Questions'), h('th', null, 'Minutes'))), h('tbody', null, vis.map(s => h('tr', { style: s.break ? { color: 'var(--muted)' } : null }, h('td', null, s.break ? 'Break' : (s.label || (s.experimental ? 'Experimental (unscored)' : sectionName(sel.test, s.section)))), h('td', null, s.writing ? (s.promptChoice ? 'choose 1 of 2 prompts' : 'prompt') : s.break ? '—' : Math.round(s.count * f)), h('td', null, s.break ? s.minutes : Math.max(5, Math.round(s.minutes * f))))), h('tr', null, h('td', null, h('b', null, 'Total')), h('td', null, h('b', null, totalQ2)), h('td', null, h('b', null, `${totalMin2} min`)))))); };
    const drawTiers = () => tierWrap.replaceChildren(...Object.entries(o.tiers).map(([k, t]) => h('div', { class: 'tier' + (sel.tier === k ? ' active' : ''), onclick: () => { sel.tier = k; drawTiers(); } }, h('div', { class: 'row between' }, h('b', null, t.name), k === o.recommended.tier ? h('span', { class: 'pill teal' }, 'Recommended') : null), h('div', { class: 'small muted' }, t.desc))));
    const drawSec = () => { if (sel.length !== 'section') { secSel.replaceChildren(); return; } const secs = (o.blueprint[sel.variant] || []).filter(s => !s.break && !s.experimental); if (!sel.section || !secs.some(s => s.section === sel.section)) sel.section = secs[0].section; secSel.replaceChildren(h('label', null, 'Which section?'), h('div', { class: 'chips' }, secs.map(s => h('button', { class: 'chip' + (sel.section === s.section ? ' active' : ''), onclick: () => { sel.section = s.section; drawSec(); drawBp(); } }, s.label || sectionName(sel.test, s.section))))); };
    drawTiers(); drawBp(); drawSec();
    const variantSel = h('select', { style: { width: 'auto' }, onchange: (e) => { sel.variant = e.target.value; sel.section = ''; drawBp(); drawSec(); } }, Object.entries(o.variants).map(([k, v]) => h('option', { value: k, selected: k === sel.variant }, v)));
    const lengthChips = h('div', { class: 'chips' }, [['mini', 'Mini (20 min, every section, real pace)'], ['full', 'Full-length'], ['half', 'Half-length (practice, not test-length)'], ['section', 'Single section']].map(([k, t]) => h('button', { class: 'chip' + (sel.length === k ? ' active' : ''), onclick: () => { sel.length = k; lengthChips.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.textContent === t)); drawBp(); drawSec(); } }, t)));
    const startBtn = h('button', { class: 'btn btn-primary btn-lg', onclick: async () => { startBtn.disabled = true; try { const r = await post('/api/mock/start', sel); go('#/mock/' + r.id + (sess ? `?from=session&date=${sess.date}&i=${sess.index}` : '')); } catch (e) { toast(e.message); startBtn.disabled = false; } } }, 'Begin test');
    const history = (await get('/api/mocks')).mocks;
    return h('div', { class: 'stack' },
      pageHead('Mock tests', 'Test-day rehearsal', 'Real section order, counts and timing. The timer runs per section on the server, so a closed tab does not stop the clock. Answers save as you go.'),
      tutorSay(`Recommendation: ${o.recommended.reason} ${penaltyFor(sel.test, sel.variant) ? 'Remember the SSAT rule: guess only when you can eliminate a choice.' : 'No penalty on this test: never leave a blank.'}`),
      o.inProgress ? h('div', { class: 'alert info row between' }, h('span', null, `You have a ${state.overview.tiers[o.inProgress.tier].name} ${testName(o.inProgress.test)} test in progress (section ${o.inProgress.section_index + 1}).`), h('div', { class: 'row' }, h('a', { class: 'btn btn-sm btn-primary', href: '#/mock/' + o.inProgress.id }, 'Resume'), h('button', { class: 'btn btn-sm', onclick: async () => { await post(`/api/mock/${o.inProgress.id}/abandon`); renderMockHome(params); } }, 'Discard'))) : null,
      h('div', { class: 'card stack' },
        h('div', { class: 'row' }, h('div', { class: 'field' }, h('label', null, 'Test level'), variantSel), h('div', { class: 'field wide' }, h('label', null, 'Length'), lengthChips)), secSel,
        h('div', null, h('label', null, 'Difficulty tier'), tierWrap),
        h('div', { class: 'card flat' }, h('label', { style: { marginTop: 0 } }, h('input', { type: 'checkbox', style: { width: 'auto', marginRight: '8px' }, onchange: (e) => { sel.realism = e.target.checked; } }), 'Test-day mode (recommended in the last two weeks)'), h('p', { class: 'small muted', style: { margin: '4px 0 0' } }, 'No question palette, no flags, no running countdown: only a clock, a halfway announcement and a five-minute warning, as on the real test. Finishing early keeps you in the section until time is called.')),
        h('div', { class: 'grid g2' }, h('div', null, h('label', null, 'What you will take'), bpList), h('div', { class: 'card flat' }, h('h4', null, 'Before you begin'), h('ul', { class: 'small', style: { paddingLeft: '18px', margin: 0 } }, h('li', null, 'Scratch paper and a pencil. No calculator.'), h('li', null, 'Phone away; a quiet room. The value of a mock is realistic conditions.'), h('li', null, 'The tutor is off during a test, as on test day. It returns for the review.'), h('li', null, 'Flag questions you are unsure of and come back if time remains.'), h('li', null, 'Full-length includes the real scheduled breaks' + (sel.test === 'ssat' ? ' and the unscored experimental section at the end' : '') + '; mini, half and single-section skip them.')))),
        h('div', { class: 'row' }, startBtn)),
      history.filter(m => m.status === 'completed').length ? h('div', { class: 'card' }, h('h3', null, 'Past tests'), h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Date'), h('th', { class: 'hide-sm' }, 'Test'), h('th', null, 'Tier'), h('th', { class: 'hide-sm' }, 'Length'), h('th', null, 'Score'), h('th', null, 'Est. %ile'))), h('tbody', null, history.filter(m => m.status === 'completed').map(m => h('tr', { class: 'click', onclick: () => go(`#/mock/${m.id}/results`) }, h('td', null, fmtDate(m.completed_at)), h('td', { class: 'hide-sm' }, `${testName(m.test)} ${m.variant}`), h('td', null, state.overview.tiers[m.tier].name), h('td', { class: 'hide-sm' }, m.length), h('td', null, `${m.results.totalRight}/${m.results.totalCount} (${m.results.pct}%)`), h('td', null, m.results.percentile)))))) : null);
  });
}
let mockTimer = null;
async function renderMockRun(id, params) {
  clearInterval(mockTimer); window.onkeydown = null; const sess = fromSession(params);
  await withLoading('mock', async () => {
    const m = await get('/api/mock/' + id);
    if (m.status !== 'in_progress') { go(`#/mock/${id}/results` + (sess ? `?from=session&date=${sess.date}&i=${sess.index}` : '')); return loading(); }
    const cur = m.current; const penalty = penaltyFor(m.test, m.variant);
    const responses = { ...cur.responses }; const flagged = new Set(); let idx = 0; let lastQ = -1; let remaining = cur.remaining; const deadline = Date.now() + cur.remaining * 1000; const realism = !!m.realism; const totalSecs = cur.seconds || cur.minutes * 60; let halfSaid = false, fiveSaid = false;
    const root = h('div', { class: 'stack' });
    const timerEl = h('span', { class: 'timer' }, fmtTime(remaining));
    const save = (() => { let t; const pending = {}; return (k, v) => { pending[k] = v; clearTimeout(t); t = setTimeout(async () => { const batch = { ...pending }; for (const kk in pending) delete pending[kk]; try { await post(`/api/mock/${id}/answer`, { responses: batch }); } catch (e) { toast('Could not save: ' + e.message); } }, 400); }; })();
    const flushSave = () => post(`/api/mock/${id}/answer`, { responses }).catch(() => {});
    const endSection = async (auto) => { clearInterval(mockTimer); window.onkeydown = null; await flushSave(); const r = await post(`/api/mock/${id}/next`); if (r.status === 'completed') go(`#/mock/${id}/results` + (sess ? `?from=session&date=${sess.date}&i=${sess.index}` : '')); else { toast(auto ? 'Time is up. Moving to the next section.' : 'Section submitted.'); renderMockRun(id, params); } };
    const tick = () => { remaining = Math.max(0, Math.round((deadline - Date.now()) / 1000)); if (realism) { timerEl.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); if (!halfSaid && remaining <= totalSecs / 2 && remaining > 300) { halfSaid = true; toast('Proctor: you are halfway through the time for this section.'); } if (!fiveSaid && remaining <= 300 && remaining > 0) { fiveSaid = true; toast('Proctor: five minutes remaining.'); } } else { timerEl.textContent = fmtTime(Math.max(0, remaining)); timerEl.classList.toggle('low', remaining <= 120); } if (remaining <= 0) endSection(true); };
    const startTimer = () => { clearInterval(mockTimer); mockTimer = setInterval(tick, 1000); };
    const header = (extra) => h('div', { class: 'mock-bar' }, h('b', { class: 'mb-t' }, `${testName(m.test)} · ${cur.label}`), h('span', { class: 'small muted mb-s' }, `Section ${m.sectionIndex + 1} of ${m.sectionCount}`), h('span', { class: 'grow' }), extra ? h('span', { class: 'mb-x' }, extra) : null, timerEl);
    const palette = h('div', { class: 'palette' });
    const drawPalette = () => palette.replaceChildren(...cur.questions.map((q, k) => h('button', { class: (Number.isInteger(responses[q.id]) ? 'answered ' : '') + (flagged.has(q.id) ? 'flagged ' : '') + (k === idx ? 'current' : ''), onclick: () => { idx = k; drawQ(); } }, k + 1)));
    const qArea = h('div');
    const confirmEnd = () => { if (realism && !cur.break) { toast('Test-day mode: review your answers until time is called.'); return; } const blank = cur.writing ? 0 : cur.questions.filter(q => !Number.isInteger(responses[q.id])).length; if (confirm(`Submit this section${blank ? ` with ${blank} unanswered question${blank > 1 ? 's' : ''}` : ''}? You cannot return to it.`)) endSection(false); };
    const drawQ = () => {
      const q = cur.questions[idx]; drawPalette();
      const card = questionCard(q, { number: idx + 1, onSelect: (c) => { responses[q.id] = c; save(q.id, c); drawPalette(); } });
      if (Number.isInteger(responses[q.id])) card.selected = responses[q.id];
      const clearBtn = h('button', { class: 'btn btn-sm btn-ghost', onclick: () => { delete responses[q.id]; save(q.id, null); card.selected = null; drawPalette(); } }, 'Clear');
      const flagBtn = realism ? h('span') : h('button', { class: 'btn btn-sm' + (flagged.has(q.id) ? ' btn-dark' : ''), onclick: () => { flagged.has(q.id) ? flagged.delete(q.id) : flagged.add(q.id); drawQ(); } }, flagged.has(q.id) ? '⚑ Flagged' : '⚐ Flag');
      const body = h('div', { class: 'card stack' }, h('div', { class: 'row between small muted' }, h('span', null, skillName(q.skill)), h('div', { class: 'row' }, clearBtn, flagBtn)), card.el,
        h('div', { class: 'row between' }, h('button', { class: 'btn', disabled: idx === 0, onclick: () => { idx--; drawQ(); } }, '‹ Previous'), idx + 1 < cur.questions.length ? h('button', { class: 'btn btn-dark', onclick: () => { idx++; drawQ(); } }, 'Next ›') : (realism ? h('span', { class: 'small muted' }, 'Review until time is called') : h('button', { class: 'btn btn-primary', onclick: confirmEnd }, 'Submit section'))));
      const passage = q.passageId && cur.passages[q.passageId];
      const oldSplit = qArea.firstElementChild && qArea.firstElementChild.classList.contains('split') ? qArea.firstElementChild : null; const oldP = oldSplit && oldSplit.querySelector('.passage');
      if (passage && oldP && oldP.dataset.pid === String(q.passageId)) oldSplit.replaceChild(body, oldSplit.lastElementChild); // same passage: the reader keeps their place in it
      else qArea.replaceChildren(passage ? h('div', { class: 'split' }, h('div', { class: 'passage sticky-side', dataset: { pid: String(q.passageId) } }, h('h3', null, passage.title), passage.text), body) : body);
      if (lastQ !== idx) { const first = lastQ === -1; lastQ = idx; const st = body.querySelector('.q-stem'); const bar = document.querySelector('.main .mock-bar'); if (!first && st && bar) { const top = st.getBoundingClientRect().top; const below = bar.getBoundingClientRect().bottom; if (top < below + 8 || top > window.innerHeight - 160) window.scrollBy({ top: top - below - 12 }); } }
      window.onkeydown = (e) => { if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return; const k = parseInt(e.key); if (k >= 1 && k <= q.choices.length) { card.selected = k - 1; responses[q.id] = k - 1; save(q.id, k - 1); drawPalette(); } else if (e.key === 'ArrowRight' && idx + 1 < cur.questions.length) { idx++; drawQ(); } else if (e.key === 'ArrowLeft' && idx > 0) { idx--; drawQ(); } else if (e.key.toLowerCase() === 'f') flagBtn.click(); };
    };
    const renderSection = () => {
      startTimer();
      if (cur.break) {
        root.replaceChildren(header(h('button', { class: 'btn btn-sm', onclick: () => endSection(false) }, 'End break early')), h('div', { class: 'card stack center', style: { maxWidth: '640px', margin: '40px auto', padding: '36px' } }, h('div', { style: { fontSize: '44px' } }, '☕'), h('h1', null, `${cur.minutes}-minute break`), h('p', { class: 'muted' }, (cur.breakNote ? cur.breakNote + ' ' : 'Scheduled exactly where the real test puts it. ') + 'Stand up, stretch, drink water, do not look at notes. The next section starts automatically when the break ends.'), h('div', { class: 'timer', style: { fontSize: '34px', display: 'inline-block' } }, fmtTime(remaining))));
        const big = root.querySelector('.card .timer'); clearInterval(mockTimer); mockTimer = setInterval(() => { remaining = Math.max(0, Math.round((deadline - Date.now()) / 1000)); timerEl.textContent = fmtTime(Math.max(0, remaining)); if (big) big.textContent = fmtTime(Math.max(0, remaining)); if (remaining <= 0) endSection(true); }, 1000);
        return;
      }
      if (cur.writing) {
        const key = `w:${cur.section}`; let picked = responses[`p:${cur.section}`] || cur.promptPick || (cur.promptAlt ? null : 'main'); const ta = h('textarea', { class: 'editor', placeholder: 'Plan for 2–3 minutes, then write. Your work saves automatically.', oninput: (e) => { responses[key] = e.target.value; save(key, e.target.value); wc.textContent = `${e.target.value.trim().split(/\s+/).filter(Boolean).length} words`; } }, responses[key] || '');
        const wc = h('span', { class: 'small muted' }, `${(responses[key] || '').trim().split(/\s+/).filter(Boolean).length} words`);
        const promptBox = h('div', { class: 'card' });
        const drawPrompt = () => { const active = picked === 'alt' && cur.promptAlt ? cur.promptAlt : cur.prompt; promptBox.replaceChildren(h('h3', null, cur.promptAlt ? 'Choose one prompt' : (active.type === 'picture' ? 'Look at the picture' : 'Prompt')), active.type === 'picture' ? pictureCard(active) : null, cur.promptAlt ? h('div', { class: 'stack-sm', style: { marginBottom: '10px' } }, [['main', cur.prompt], ['alt', cur.promptAlt]].map(([k, p]) => h('button', { class: 'choice' + (picked === k ? ' selected' : ''), onclick: () => { picked = k; responses[`p:${cur.section}`] = k; save(`p:${cur.section}`, k); drawPrompt(); } }, h('span', { class: 'l' }, k === 'main' ? 'A' : 'B'), h('span', null, h('b', null, p.type === 'creative' ? 'Creative: ' : 'Essay: '), p.prompt)))) : h('p', { class: 'serif', style: { fontSize: '18px' } }, active.prompt), picked && active.tips ? h('div', null, h('h4', null, 'Reminders'), h('ul', { class: 'small', style: { paddingLeft: '18px' } }, active.tips.map(t => h('li', null, t)))) : null); };
        drawPrompt();
        root.replaceChildren(header(wc), h('div', { class: 'split' }, promptBox, h('div', { class: 'card stack' }, ta, h('div', { class: 'row between' }, h('span', { class: 'small faint' }, 'Ideas, organization and voice are what readers look for.'), h('button', { class: 'btn btn-primary', onclick: confirmEnd }, 'Submit section')))));
        return;
      }
      root.replaceChildren(header(realism ? h('span', { class: 'pill' }, 'Test-day mode') : h('button', { class: 'btn btn-sm', onclick: confirmEnd }, 'Submit section')), realism ? h('div', { style: { maxWidth: '820px' } }, qArea) : h('div', { class: 'grid mock-grid' }, qArea, h('div', { class: 'card tight sticky-side' }, h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'Questions'), palette, h('div', { class: 'tiny faint kbd-hint', style: { marginTop: '10px' } }, h('span', { class: 'kbd' }, '←'), ' ', h('span', { class: 'kbd' }, '→'), ' move · ', h('span', { class: 'kbd' }, 'F'), ' flag'))));
      drawQ();
    };
    if (cur.break) { renderSection(); document.body.classList.add('no-coach'); return root; }
    root.replaceChildren(h('div', { class: 'card stack', style: { maxWidth: '640px', margin: '40px auto' } }, h('div', { class: 'pill' }, `Section ${m.sectionIndex + 1} of ${m.sectionCount}`), h('h1', null, cur.label), h('p', { class: 'muted' }, cur.writing ? `${cur.minutes} minutes. One prompt. Plan briefly, write a full response, and leave two minutes to reread.` : `${cur.questions.length} questions · ${fmtTime(cur.seconds || cur.minutes * 60)} · ${cur.spq || Math.round((cur.seconds || cur.minutes * 60) / cur.questions.length)} seconds per question${m.length === 'mini' ? ', exactly the real test\'s pace' : ''}.`),
      h('ul', { class: 'small muted', style: { paddingLeft: '18px' } }, cur.experimental ? h('li', null, 'This section is unscored on the real test, but you do not know which one it is on test day. Treat it like any other.') : null, h('li', null, penalty ? 'Wrong answers cost ¼ point. Skip only when you cannot eliminate anything.' : 'No penalty for wrong answers. Answer everything.'), h('li', null, 'The timer is already running for this section; it keeps going even if you close the page.'), h('li', null, 'Use the question palette to jump around and flag items to revisit.')),
      h('div', { class: 'row' }, h('button', { class: 'btn btn-primary btn-lg', onclick: renderSection }, 'Start section'), h('a', { class: 'btn btn-ghost', href: '#/mock' }, 'Pause & exit'))));
    startTimer();
    document.body.classList.add('no-coach');
    return root;
  });
}
async function renderMockResults(id, params) {
  clearInterval(mockTimer); window.onkeydown = null; const sess = fromSession(params);
  await withLoading('mock', async () => {
    const r = await get(`/api/mock/${id}/results` + (viewingStudent() ? `?student=${viewingStudent()}` : '')); const R = r.results; state.progress = null;
    const back = await completeSessionStep(sess);
    const ring = (pct) => { const rad = 56, c = 2 * Math.PI * rad; return svg({ class: 'score-ring', viewBox: '0 0 140 140' }, `<circle cx="70" cy="70" r="${rad}" fill="none" stroke="var(--surface-3)" stroke-width="12"/><circle cx="70" cy="70" r="${rad}" fill="none" stroke="${masteryColor(pct)}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}" transform="rotate(-90 70 70)"/><text x="70" y="66" text-anchor="middle" font-size="30" font-weight="700" fill="var(--ink)" font-family="Fraunces, serif">${pct}%</text><text x="70" y="88" text-anchor="middle" font-size="12" fill="var(--muted)">correct</text>`); };
    const secTabs = R.sections.filter(s => !s.writing); let cur = 0; const reviewArea = h('div');
    const drawReview = () => {
      const s = secTabs[cur]; if (!s) return; const list = h('div', { class: 'stack' }); const filterSel = { mode: 'wrong' };
      const draw = () => { const items = s.items.filter(it => filterSel.mode === 'all' || !it.correct); list.replaceChildren(...(items.length ? items.map(it => { const card = questionCard({ stem: it.stem, choices: it.choices }, { number: it.n }); card.reveal({ correct: it.correct, answer: it.answer, choice: it.choice, explanation: it.explanation }); const passage = it.passageId && s.passages && s.passages[it.passageId]; return h('div', { class: 'card' }, h('div', { class: 'row between small muted', style: { marginBottom: '8px' } }, h('span', null, `${skillName(it.skill)} · level ${it.level}`), h('div', { class: 'row' }, h('span', { class: 'pill ' + (it.correct ? 'teal' : it.choice === null ? 'amber' : 'red') }, it.correct ? 'Correct' : it.choice === null ? 'Blank' : 'Wrong'), !it.correct && it.id && !it.id.startsWith('gen-') ? h('button', { class: 'btn btn-sm btn-ghost', onclick: () => { setTutorContext({ questionId: it.id, label: `Mock question ${it.n}`, answered: true, choice: it.choice }); toggleTutor(true); } }, 'Ask why') : null)), passage ? h('details', null, h('summary', { class: 'small' }, `Passage: ${passage.title}`), h('div', { class: 'passage', style: { marginTop: '8px' } }, passage.text)) : null, card.el); }) : [h('p', { class: 'muted' }, 'Nothing to show here.')])); };
      draw();
      reviewArea.replaceChildren(h('div', { class: 'tabs' }, secTabs.map((t, k) => h('button', { class: k === cur ? 'active' : '', onclick: () => { cur = k; drawReview(); } }, `${t.label} (${t.right}/${t.count})`))), h('div', { class: 'chips', style: { marginBottom: '12px' } }, [['wrong', 'Wrong & blank'], ['all', 'All questions']].map(([k, t]) => h('button', { class: 'chip' + (filterSel.mode === k ? ' active' : ''), onclick: (e) => { filterSel.mode = k; e.target.parentElement.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === e.target)); draw(); } }, t))), list);
    };
    drawReview();
    const writing = R.sections.find(s => s.writing);
    const say = R.pct >= 80 ? `${R.pct}%. That is a strong result at the ${state.overview.tiers[r.tier].name} tier. ${R.weakest.length ? `The only soft spot was ${R.weakest[0].name}; one lesson and a drill will close it.` : ''}` : R.pct >= 60 ? `${R.pct}%. A real baseline. ${R.weakest.length ? `${R.weakest.map(w => w.name).join(' and ')} cost you the most points, so they move to the top of your plan.` : ''} Rework every miss below on paper before you read the explanation.` : `${R.pct}%. Not where you want to end up, and that is fine for today: a mock is for finding the gaps, not for proving anything. ${R.weakest.length ? `We start with ${R.weakest[0].name}.` : ''} I have rebuilt your plan around these results.`;
    return h('div', { class: 'stack' },
      h('div', { class: 'row between' }, h('div', null, h('a', { href: '#/mock', class: 'small' }, '‹ Mock tests'), h('h1', null, `${testName(r.test)} ${state.overview.tests[r.test].variants[r.variant] || r.variant} · ${state.overview.tiers[r.tier].name} tier`), h('p', { class: 'muted' }, `${fmtDate(r.completedAt)} · ${r.length === 'section' ? 'single section' : r.length + '-length'}`)), back),
      tutorSay(say),
      h('div', { class: 'card' }, h('div', { class: 'row', style: { gap: '28px' } }, ring(R.pct), h('div', { class: 'grid g3 grow' }, h('div', { class: 'stat' }, h('span', { class: 'v' }, `${R.totalRight}/${R.totalCount}`), h('span', { class: 'k' }, 'correct')), h('div', { class: 'stat' }, h('span', { class: 'v' }, R.penalty ? R.raw : R.totalBlank), h('span', { class: 'k' }, R.penalty ? 'raw score (−¼ per wrong)' : 'left blank')), h('div', { class: 'stat' }, h('span', { class: 'v' }, `~${R.percentile}`), h('span', { class: 'k' }, 'est. percentile')))), h('p', { class: 'tiny faint', style: { marginTop: '10px' } }, 'The percentile is an estimate from percent correct adjusted for tier difficulty. It is a study signal, not an official score.')),
      h('div', { class: 'grid g2' },
        h('div', { class: 'card' }, h('h3', null, 'By section'), h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Section'), h('th', null, 'Right'), h('th', { class: 'hide-sm' }, 'Wrong'), h('th', { class: 'hide-sm' }, 'Blank'), h('th', null, '%'), h('th', null, '%ile'), h('th', null, 'Stanine'))), h('tbody', null, R.sections.map(s => s.writing ? h('tr', null, h('td', null, s.label), h('td', { colspan: 6, class: 'muted' }, `${s.wordCount} words written (not scored)`)) : h('tr', { style: s.experimental ? { color: 'var(--muted)' } : null }, h('td', null, s.label), h('td', null, s.right), h('td', { class: 'hide-sm' }, s.wrong), h('td', { class: 'hide-sm' }, s.blank), h('td', null, h('b', null, `${s.pct}%`)), h('td', null, s.experimental ? '—' : s.percentile), h('td', null, s.experimental ? '—' : (s.stanine || '—')))))), h('p', { class: 'tiny faint', style: { marginTop: '8px' } }, `Overall estimated stanine: ${R.stanine || '—'} (1–9, from the estimated percentile).`)),
        h('div', { class: 'card' }, h('h3', null, 'What to work on'), R.weakest.length ? h('div', { class: 'stack' }, h('div', null, h('h4', null, 'Weakest skills'), R.weakest.map(s => h('div', { class: 'row between', style: { padding: '6px 0' } }, h('span', null, s.name), h('div', { class: 'row' }, h('span', { class: 'pill red' }, `${s.right}/${s.total}`), h('a', { class: 'btn btn-sm', href: `#/practice?skill=${s.skill}&auto=1` }, 'Drill'))))), h('div', null, h('h4', null, 'Strongest'), h('div', { class: 'row' }, R.strongest.map(s => h('span', { class: 'pill teal' }, `${s.name} ${s.pct}%`))))) : h('p', { class: 'muted small' }, 'Not enough questions per skill to rank.'))),
      writing && writing.text ? h('div', { class: 'card' }, h('h3', null, 'Your writing sample'), h('p', { class: 'small muted' }, `${writing.wordCount} words. Submit it on the Writing page for rubric feedback.`), h('div', { class: 'passage', style: { maxHeight: '300px' } }, writing.text)) : null,
      h('div', null, h('h2', null, 'Question review'), h('p', { class: 'muted small' }, 'Rework each miss on paper before reading the explanation; that effort is what makes it stick. Ask the tutor "why" on any one.'), reviewArea));
  });
}

// ---------- review (spaced repetition) ----------
async function renderReview(params) {
  await withLoading('review', async () => {
    const { items, counts } = await get('/api/review/due?limit=30'); const sess = fromSession(params);
    const root = h('div', { class: 'stack' });
    root.append(pageHead('Review', 'Spaced review', items.length ? null : 'Items come back right before you would forget them. Missed questions and your vocabulary deck live here.', h('div', { class: 'row' }, h('div', { class: 'stat' }, h('span', { class: 'v' }, counts.due), h('span', { class: 'k' }, 'due now')), h('div', { class: 'stat' }, h('span', { class: 'v' }, counts.total), h('span', { class: 'k' }, 'in rotation')), h('a', { class: 'btn', href: '#/vocab' }, 'Vocabulary deck'))));
    if (!items.length) { const back = await completeSessionStep(sess); root.append(tutorSay(counts.total ? 'Nothing is due right now; the schedule is set. Practice adds new material, and I will bring it back at the right time.' : 'Your review queue fills itself with practice misses. Add a vocabulary level to get started.', h('div', { class: 'row', style: { marginTop: '10px' } }, back, h('a', { class: 'btn btn-gold', href: '#/vocab' }, 'Add vocabulary'), h('a', { class: 'btn', style: { background: 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.2)', color: '#fff' }, href: '#/practice' }, 'Practice')))); return root; }
    let i = 0; let doneCount = 0; const area = h('div'); const revealItem = () => { const t = area.getBoundingClientRect().top; if (t < 0) window.scrollBy({ top: t - 12 }); }; const prog = h('div', { class: 'bar blue' }, h('i', { style: { width: '0%' } }));
    const grade = async (key, quality, extra) => { const r = await post('/api/review/grade', { key, quality, ...extra }); doneCount++; prog.firstChild.style.width = Math.round(doneCount / items.length * 100) + '%'; return r; };
    const show = () => {
      if (i >= items.length) { setTutorContext(null); completeSessionStep(sess).then(back => area.replaceChildren(tutorSay(`${doneCount} items reviewed. Each one is rescheduled based on how well you knew it; the ones you nailed will not bother you for a while.`, h('div', { class: 'row', style: { marginTop: '10px' } }, back, h('button', { class: 'btn btn-gold', onclick: () => renderReview(params) }, 'Check for more'))))); return; }
      const it = items[i];
      if (it.kind === 'vocab') {
        const v = it.vocab; let flipped = false; const startT = Date.now();
        const back = h('div', { class: 'hidden stack-sm' }, h('div', { class: 'def' }, h('span', { class: 'muted small' }, v.pos, ' · '), v.definition), h('div', { class: 'small muted serif' }, `“${v.example}”`), v.synonyms && v.synonyms.length ? h('div', { class: 'small' }, h('b', null, 'Synonyms: '), v.synonyms.join(', '), v.antonyms && v.antonyms.length ? [' · ', h('b', null, 'Antonyms: '), v.antonyms.join(', ')] : null) : null, v.roots ? h('div', { class: 'tiny faint' }, v.roots) : null);
        const gradeBar = h('div', { class: 'row hidden grade-bar', style: { justifyContent: 'center' } }, [[1, 'Forgot', 'red'], [3, 'Hard', 'amber'], [4, 'Good', 'blue'], [5, 'Easy', 'teal']].map(([qv, t, c]) => h('button', { class: 'btn', style: { borderColor: `var(--${c})`, color: `var(--${c})` }, onclick: async () => { await grade(it.key, qv, { seconds: (Date.now() - startT) / 1000 }); i++; show(); revealItem(); } }, t)));
        const card = h('div', { class: 'flashcard', onclick: () => { if (flipped) return; flipped = true; back.classList.remove('hidden'); gradeBar.classList.remove('hidden'); gradeBar.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); hint.textContent = 'How well did you know it?'; } }, h('div', { class: 'w' }, v.word), back);
        const hint = h('p', { class: 'small muted center' }, 'Say the definition out loud, then tap to flip.');
        area.replaceChildren(h('div', { class: 'stack', style: { maxWidth: '640px', margin: '0 auto' } }, h('div', { class: 'small muted center' }, `${i + 1} of ${items.length} · vocabulary · level ${v.level}`), card, hint, gradeBar));
        window.onkeydown = (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!flipped) card.click(); } const k = parseInt(e.key); if (flipped && k >= 1 && k <= 4) gradeBar.children[k - 1].click(); };
      } else {
        const q = it.question; const startT = Date.now(); const card = questionCard(q, {}); const fb = h('div');
        setTutorContext({ reviewKey: it.key, label: `Review: ${skillName(q.skill)}`, answered: false });
        const submit = h('button', { class: 'btn btn-primary', onclick: async () => { if (card.selected === null) return toast('Choose an answer'); submit.disabled = true; const r = await grade(it.key, null, { choice: card.selected, seconds: (Date.now() - startT) / 1000 }); card.reveal({ ...r.feedback, choice: card.selected }); setTutorContext({ reviewKey: it.key, label: `Review: ${skillName(q.skill)}`, answered: true, choice: card.selected }); fb.replaceChildren(h('div', { class: 'row between', style: { marginTop: '10px' } }, h('span', { class: 'small muted' }, r.feedback.correct ? `Next review in ${r.next.interval_days < 1 ? 'a few hours' : Math.round(r.next.interval_days) + ' day(s)'}.` : 'Back again soon. Rework it on paper first next time.'), h('button', { class: 'btn btn-dark', onclick: () => { i++; show(); revealItem(); } }, 'Next ›'))); revealFeedback(fb.querySelector('.btn-dark'), card.el.querySelector('.explain')); } }, 'Check');
        const body = h('div', { class: 'card stack' }, h('div', { class: 'small muted' }, `${i + 1} of ${items.length} · ${skillName(q.skill)} · ${it.reps === 0 ? 'missed recently' : `review #${it.reps + 1}`}`), card.el, h('div', { class: 'row' }, submit, h('button', { class: 'btn btn-sm btn-ghost', onclick: () => toggleTutor(true) }, `Ask ${tutorName()}`)), fb);
        area.replaceChildren(it.passage ? h('div', { class: 'split' }, h('div', { class: 'passage' }, h('h3', null, it.passage.title), it.passage.text), body) : body);
        window.onkeydown = (e) => { if (e.target.tagName === 'INPUT') return; const k = parseInt(e.key); if (k >= 1 && k <= q.choices.length && !card.locked) card.selected = k - 1; else if (e.key === 'Enter') { if (!card.locked) submit.click(); else { const b = fb.querySelector('button'); b && b.click(); } } };
      }
    };
    root.append(prog, area); show(); return root;
  });
}
async function renderVocab(params) {
  await withLoading('review', async () => {
    let level = Number(params.get('level')) || 0; const sess = fromSession(params);
    const root = h('div', { class: 'stack' });
    const draw = async () => {
      const { words, levels } = await get('/api/vocab' + (level ? '?level=' + level : ''));
      const back = sess ? h('button', { class: 'btn btn-gold', onclick: async () => { const next = levels.find(l => l.added < l.count); if (next) { const r = await post('/api/vocab/add', { level: next.level, limit: 10 }); toast(`Added ${r.added} level ${next.level} words to your deck`); } const b = await completeSessionStep(sess); go('#/session'); } }, 'Add 10 new words & finish step') : null;
      root.replaceChildren(h('a', { href: '#/vocab', class: 'small' }, '‹ Vocabulary trainer'), pageHead('Vocabulary', 'Word list', 'Every word in the bank, tiered by difficulty. Add words or whole levels to your flashcard deck.', back),
        h('div', { class: 'grid g4' }, levels.map(l => h('div', { class: 'card tight' }, h('div', { class: 'row between' }, h('b', null, `Level ${l.level}`), h('span', { class: 'small muted' }, `${l.added}/${l.count}`)), h('div', { class: 'bar blue', style: { margin: '8px 0' } }, h('i', { style: { width: Math.round(l.added / Math.max(1, l.count) * 100) + '%' } })), h('div', { class: 'row' }, h('button', { class: 'btn btn-sm', onclick: () => { level = l.level; draw(); } }, 'Browse'), l.added < l.count ? h('button', { class: 'btn btn-sm btn-primary', onclick: async () => { const r = await post('/api/vocab/add', { level: l.level }); toast(`Added ${r.added} words to your deck`); draw(); } }, 'Add all') : h('span', { class: 'pill teal' }, '✓ added'))))),
        h('div', { class: 'card' }, h('div', { class: 'row between' }, h('h3', null, level ? `Level ${level} words` : 'All words'), h('div', { class: 'chips' }, h('button', { class: 'chip' + (!level ? ' active' : ''), onclick: () => { level = 0; draw(); } }, 'All'), [1, 2, 3, 4, 5].map(l => h('button', { class: 'chip' + (level === l ? ' active' : ''), onclick: () => { level = l; draw(); } }, `L${l}`)))),
          h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Word'), h('th', null, 'Meaning'), h('th', { class: 'hide-sm' }, 'Example'), h('th', null, ''))), h('tbody', null, words.map(w => h('tr', null, h('td', null, h('b', { class: 'serif', style: { fontWeight: 600 } }, w.word), h('div', { class: 'tiny faint' }, w.pos)), h('td', null, w.definition, w.synonyms && w.synonyms.length ? h('div', { class: 'tiny muted' }, '≈ ' + w.synonyms.join(', ')) : null), h('td', { class: 'small muted serif hide-sm' }, w.example), h('td', null, w.inDeck ? h('span', { class: 'pill teal' }, 'in deck') : h('button', { class: 'btn btn-sm', onclick: async (e) => { await post('/api/vocab/add', { words: [w.word] }); e.target.replaceWith(h('span', { class: 'pill teal' }, 'in deck')); } }, '+ Add'))))))));
    };
    await draw(); return root;
  });
}

// ---------- writing ----------
async function renderWriting(params) {
  await withLoading('writing', async () => {
    const u = state.user; const all = (await get('/api/writing/prompts?test=' + u.targetTest)).prompts; const vl = ({ 'hspt:standard': 3, 'ssat:elementary': 1, 'ssat:middle': 3, 'ssat:upper': 4, 'isee:lower': 2, 'isee:middle': 3, 'isee:upper': 4 })[u.targetTest + ':' + u.variant] || 3; const prompts = all.filter(p => Math.abs(p.level - vl) <= 1.5).length ? all.filter(p => Math.abs(p.level - vl) <= 1.5) : all; const { submissions } = await get('/api/writing/mine'); const sess = fromSession(params);
    const root = h('div', { class: 'stack' });
    const list = () => root.replaceChildren(pageHead('Writing', 'Writing practice', u.targetTest === 'hspt' ? 'The HSPT has no essay, but many schools request a writing sample. These persuasive prompts build the skill.' : u.targetTest === 'ssat' ? 'The SSAT writing sample is unscored but sent to schools. Practice timed, then self-score with the rubric.' : 'The ISEE essay is unscored but sent to every school you apply to. Practice under time with real prompts.'),
      state.tutor.status && state.tutor.status.live ? h('div', { class: 'alert success' }, `${tutorName()} will read your essay and give rubric-based feedback with a rewritten opening.`) : h('div', { class: 'alert info' }, 'Structural feedback is automatic. Add an API key in Settings and your tutor will also grade against the rubric and rewrite your opening.'),
      h('div', { class: 'grid g2' }, prompts.map(p => h('div', { class: 'card item', style: { flexDirection: 'column', alignItems: 'stretch', gap: '6px' }, onclick: () => editor(p) }, h('div', { class: 'row' }, h('span', { class: 'pill' }, p.type), h('span', { class: 'pill' }, `${p.minutes} min`), h('span', { class: 'pill' }, `level ${p.level}`)), p.type === 'picture' ? h('div', { class: 'scene', style: { fontSize: '34px' } }, p.scene) : null, h('div', { class: 'serif', style: { fontSize: '16px' } }, p.type === 'picture' ? p.description : p.prompt)))),
      submissions.length ? h('div', { class: 'card' }, h('h3', null, 'Your past responses'), h('div', { class: 'list' }, submissions.map(s => h('details', null, h('summary', { class: 'small' }, `${fmtDate(s.createdAt)} · ${s.wordCount} words · ${prompts.find(p => p.id === s.promptId) ? prompts.find(p => p.id === s.promptId).prompt.slice(0, 80) + '…' : s.promptId}`), h('div', { class: 'passage', style: { marginTop: '8px', maxHeight: '240px' } }, s.text))))) : null);
    const editor = (p) => {
      let secs = p.minutes * 60; const timer = h('span', { class: 'timer' }, fmtTime(secs)); const startT = Date.now();
      const iv = setInterval(() => { secs--; timer.textContent = fmtTime(Math.max(0, secs)); timer.classList.toggle('low', secs <= 120); if (secs <= 0) { clearInterval(iv); toast('Time! Finish your sentence and submit.'); } }, 1000);
      const ta = h('textarea', { class: 'editor', placeholder: 'Plan first: thesis or story arc, two specific examples or scenes, a closing line. Then write.', oninput: (e) => { wc.textContent = `${e.target.value.trim().split(/\s+/).filter(Boolean).length} words`; } });
      const wc = h('span', { class: 'small muted' }, '0 words'); const out = h('div');
      const rubric = h('div', { class: 'stack-sm' }, p.rubric.map((r, k) => { const sel = h('select', { style: { width: 'auto' }, dataset: { k } }, [1, 2, 3, 4, 5].map(n => h('option', { value: n, selected: n === 3 }, n))); return h('div', { class: 'row between small' }, h('span', { class: 'grow' }, r), sel); }));
      const submit = h('button', { class: 'btn btn-primary', onclick: async () => { submit.disabled = true; submit.textContent = `${tutorName()} is reading…`; try { const scores = [...rubric.querySelectorAll('select')].map(s => Number(s.value)); const r = await post('/api/writing/submit', { promptId: p.id, text: ta.value, minutes: (Date.now() - startT) / 60000, selfScores: scores }); clearInterval(iv); const back = await completeSessionStep(sess); const ai = r.ai;
        out.replaceChildren(h('div', { class: 'stack' }, ai && ai.summary ? tutorSay(ai.summary) : null, h('div', { class: 'card', style: { borderColor: 'var(--gold)' } }, h('h3', null, 'Feedback'), h('div', { class: 'row small muted' }, h('span', null, `${r.wordCount} words`), h('span', null, `${r.paragraphs} paragraphs`), h('span', null, `${r.sentences} sentences, avg ${r.avgSentenceLength} words`), h('span', null, `self-score ${Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10}/5`)),
          ai && ai.scores ? h('div', { class: 'grid g4', style: { margin: '12px 0' } }, Object.entries(ai.scores).map(([k, v]) => h('div', { class: 'stat' }, h('span', { class: 'v' }, `${v}/5`), h('span', { class: 'k' }, k)))) : null,
          ai && ai.strengths ? h('div', null, h('h4', null, 'What works'), h('ul', null, ai.strengths.map(t => h('li', null, t)))) : null,
          h('h4', null, ai && ai.improvements ? 'Make it better' : 'Suggestions'), h('ul', null, (ai && ai.improvements ? ai.improvements : r.tips).map(t => h('li', null, t))),
          ai && ai.rewrittenOpening ? h('div', null, h('h4', null, 'Your opening, sharpened'), h('p', { class: 'serif', style: { fontSize: '16px', padding: '12px 14px', background: 'var(--surface-2)', borderRadius: '10px' } }, ai.rewrittenOpening)) : null,
          h('div', { class: 'row' }, back, h('button', { class: 'btn', onclick: () => renderWriting(params) }, 'Back to prompts'))))); out.scrollIntoView({ behavior: 'smooth' }); } catch (e) { toast(e.message); submit.disabled = false; submit.textContent = 'Submit & get feedback'; } } }, 'Submit & get feedback');
      root.replaceChildren(h('div', { class: 'mock-bar' }, h('a', { href: '#/writing', class: 'small', onclick: () => clearInterval(iv) }, '‹ Prompts'), h('b', null, p.type === 'creative' ? 'Creative writing' : p.type === 'picture' ? 'Picture story' : p.type === 'essay' ? 'Essay' : 'Persuasive essay'), h('span', { class: 'grow' }), wc, timer),
        h('div', { class: 'split' }, h('div', { class: 'stack' }, h('div', { class: 'card' }, h('h3', null, p.type === 'picture' ? 'Look at the picture' : 'Prompt'), p.type === 'picture' ? pictureCard(p) : null, h('p', { class: 'serif', style: { fontSize: '18px' } }, p.prompt), h('h4', null, 'How to approach it'), h('ul', { class: 'small', style: { paddingLeft: '18px' } }, p.tips.map(t => h('li', null, t))))), h('div', { class: 'stack' }, h('div', { class: 'card stack' }, ta), h('div', { class: 'card' }, h('h3', null, 'Self-score when done (1–5)'), h('p', { class: 'small muted' }, 'Honest self-assessment against a rubric is one of the best-documented ways to improve writing.'), rubric, h('div', { class: 'row', style: { marginTop: '12px' } }, submit)), out)));
    };
    if (params.get('prompt')) { const p = prompts.find(x => x.id === params.get('prompt')); if (p) { editor(p); return root; } }
    list(); return root;
  });
}

// ---------- progress ----------
let _viewingStudent = null; const viewingStudent = () => _viewingStudent;
async function renderProgress(params) {
  await withLoading('progress', async () => {
    const u = state.user; let students = [];
    if (u.role === 'parent' || u.role === 'admin') students = (await get('/api/family/students')).students;
    _viewingStudent = params.get('student') || null;
    const qs = _viewingStudent ? `?student=${_viewingStudent}` : '';
    const [p, g, L] = await Promise.all([get('/api/progress' + qs), get('/api/gamification' + qs), get('/api/learner' + qs).catch(() => null)]); state._learner = L; if (!_viewingStudent) state.progress = p;
    const t = p.user; const sections = Object.entries(p.bySection).filter(([k]) => !['writing', 'essay'].includes(k));
    const trend = p.daily.slice(-28); const maxN = Math.max(1, ...trend.map(d => d.n));
    const spark = (vals, color) => { if (vals.length < 2) return h('div', { class: 'small muted' }, 'More data needed.'); const w = 600, hh = 60; const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * w},${hh - 4 - v * (hh - 8)}`).join(' '); return svg({ class: 'sparkline', viewBox: `0 0 ${w} ${hh}`, preserveAspectRatio: 'none' }, `<polyline fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" points="${pts}"/>`); };
    const mocks = p.mocks.filter(m => m.status === 'completed').reverse();
    return h('div', { class: 'stack' },
      pageHead('Progress', _viewingStudent ? `${t.displayName}'s progress` : 'Your progress', `${testName(p.test)} · ${p.totals.n} questions answered all-time · Level ${g.level} · ${g.xp} XP`, students.length || u.role !== 'student' ? h('div', null, h('label', null, 'View'), h('select', { style: { width: 'auto' }, onchange: (e) => go('#/progress' + (e.target.value ? '?student=' + e.target.value : '')) }, h('option', { value: '' }, 'Me'), students.map(s => h('option', { value: s.id, selected: s.id === _viewingStudent }, s.displayName)))) : null),
      (u.role === 'parent' && !students.length) ? h('div', { class: 'alert info' }, 'Link a student from Settings using their share code to see their progress here.') : null,
      h('div', { class: 'grid g4' }, h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, p.streak), h('span', { class: 'k' }, 'day streak')), h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, p.totals.n ? Math.round(p.totals.right / p.totals.n * 100) + '%' : '—'), h('span', { class: 'k' }, 'all-time accuracy')), h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, p.recent.n ? Math.round(p.recent.right / p.recent.n * 100) + '%' : '—'), h('span', { class: 'k' }, '7-day accuracy')), h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, p.lessonsDone.filter(l => l.status === 'completed').length), h('span', { class: 'k' }, 'lessons completed'))),
      h('div', { class: 'grid g2' },
        h('div', { class: 'card' }, h('h3', null, 'Daily accuracy (last 4 weeks)'), spark(trend.map(d => d.n ? d.right / d.n : 0), 'var(--teal)'), h('h3', { style: { marginTop: '14px' } }, 'Daily volume'), spark(trend.map(d => d.n / maxN), 'var(--blue)'), h('p', { class: 'tiny faint' }, 'Accuracy near 70% in adaptive practice is the goal: it means the difficulty is tracking you correctly.')),
        h('div', { class: 'card' }, h('h3', null, 'Mock test history'), mocks.length ? h('div', null, spark(mocks.map(m => m.results.pct / 100), 'var(--accent)'), h('table', { class: 'tbl' }, h('tbody', null, mocks.slice(-6).reverse().map(m => h('tr', { class: 'click', onclick: () => go(`#/mock/${m.id}/results` + (_viewingStudent ? '?student=' + _viewingStudent : '')) }, h('td', null, fmtDate(m.completed_at)), h('td', null, state.overview.tiers[m.tier].name), h('td', null, `${m.results.pct}%`), h('td', null, `~${ordinal(m.results.percentile)}`)))))) : h('p', { class: 'muted small' }, 'No completed mock tests yet.'))),
      (() => { const L = state._learner; if (!L) return null; const pr = L.profile; return h('div', { class: 'grid g2' }, h('div', { class: 'card' }, h('h3', null, 'Learner profile'), h('ul', { style: { paddingLeft: '20px', margin: '6px 0' } }, pr.insights.map(t => h('li', { style: { margin: '4px 0' } }, t))), pr.pace.length ? h('table', { class: 'tbl', style: { marginTop: '8px' } }, h('thead', null, h('tr', null, h('th', null, 'Section'), h('th', null, 'Your pace'), h('th', null, 'Test pace'), h('th', null, 'Verdict'))), h('tbody', null, pr.pace.map(x => h('tr', null, h('td', null, x.name), h('td', null, `${x.avg}s`), h('td', null, x.target ? `${x.target}s` : '—'), h('td', null, h('span', { class: 'pill ' + (x.verdict === 'on pace' ? 'teal' : x.verdict === 'slow' ? 'red' : 'amber') }, x.verdict)))))) : null, h('div', { class: 'row', style: { marginTop: '10px' } }, h('a', { class: 'btn btn-sm', href: '#/mistakes' }, 'Mistake journal'), h('a', { class: 'btn btn-sm', href: '#/report' + (_viewingStudent ? '?student=' + _viewingStudent : '') }, 'Weekly report'))), h('div', { class: 'stack' }, projectionCard(L.projection), focusCard(L.focus, { readOnly: !!_viewingStudent }))); })(),
      h('div', { class: 'card' }, h('h3', null, 'Skill mastery'), h('p', { class: 'small muted' }, 'Each skill has its own rating that moves with every answer, weighted by question difficulty (like chess Elo). Mastery is the estimated accuracy on a test-level question.'),
        h('div', { class: 'grid g2' }, sections.map(([k, s]) => h('div', null, h('div', { class: 'row between' }, h('h4', null, s.name), h('span', { class: 'small muted' }, s.mastery !== null ? `${s.mastery}% avg` : '')), h('div', { class: 'stack-sm' }, s.skills.map(sk => h('div', { class: 'skill-row' }, h('span', { class: 'small' }, sk.name), h('div', { class: 'bar' }, h('i', { style: { width: (sk.mastery || 0) + '%', background: masteryColor(sk.mastery) } })), h('span', { class: 'small muted', style: { textAlign: 'right' } }, sk.mastery === null ? 'not measured' : `${sk.mastery}% · ${sk.n} q`), !_viewingStudent ? h('a', { class: 'btn btn-sm btn-ghost', href: `#/practice?skill=${sk.skill}&auto=1` }, 'Drill') : h('span')))))))),
      h('div', { class: 'card' }, h('h3', null, 'Badges'), h('div', { class: 'badge-grid' }, g.badges.map(b => h('div', { class: 'badge' + (b.earnedAt ? '' : ' locked'), title: b.earnedAt ? 'Earned ' + fmtDate(b.earnedAt) : b.desc }, h('div', { class: 'ic' }, b.icon), h('b', null, b.name), h('div', { class: 'd' }, b.desc))))));
  });
}

// ---------- friends ----------
async function renderFriends() {
  await withLoading('friends', async () => {
    const u = state.user; const { friends, leaderboard } = await get('/api/friends'); const g = await get('/api/gamification');
    const code = h('input', { placeholder: 'Friend\'s code, e.g. 4F9A2C', style: { width: '220px', textTransform: 'uppercase' } });
    const add = async () => { try { const r = await post('/api/friends/add', { code: code.value }); toast(`You and ${r.friend.displayName} are now friends`); renderFriends(); } catch (e) { toast(e.message); } };
    return h('div', { class: 'stack' },
      pageHead('Friends', 'Study together', 'Add friends by code, climb the weekly leaderboard, and collect badges. Everyone studies for their own test; XP is comparable across tests.'),
      h('div', { class: 'grid g2' },
        h('div', { class: 'card' }, h('h3', null, 'Weekly leaderboard'), h('p', { class: 'small muted' }, 'XP earned in the last 7 days. Resets rolling, so a strong week always counts.'), h('div', { class: 'stack-sm' }, leaderboard.map((r, i) => h('div', { class: 'lb' + (r.me ? ' me' : '') }, h('span', { class: 'rank' }, i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1), h('div', null, h('div', { class: 'n' }, r.displayName, r.me ? ' (you)' : ''), h('div', { class: 's' }, `Level ${r.level} · ${testName(r.test)} · ${r.badges} badges`)), h('span', { class: 'pill gold' }, `${r.weekXp} XP`), h('div', { class: 'pills' }, h('span', { class: 'pill' }, `🔥 ${r.streak}-day streak`), h('span', { class: 'pill' }, r.weekAccuracy === null ? 'no answers this week' : `${r.weekAccuracy}% accuracy`), h('span', { class: 'pill' }, `${r.weekQuestions} questions`))))), leaderboard.length === 1 ? h('p', { class: 'muted small', style: { marginTop: '10px' } }, 'Just you so far. Add a friend to make it a race.') : null),
        h('div', { class: 'stack' }, h('div', { class: 'card' }, h('h3', null, 'Add a friend'), h('p', { class: 'small muted' }, 'Share your code and enter theirs. Friends see your weekly XP, streak and accuracy, nothing else.'), h('div', { class: 'row' }, h('span', { class: 'small muted' }, 'Your code:'), h('span', { class: 'pill accent', style: { fontSize: '16px', letterSpacing: '.1em' } }, u.shareCode)), h('div', { class: 'row', style: { marginTop: '10px' } }, code, h('button', { class: 'btn btn-primary', onclick: add }, 'Add')), friends.length ? h('div', { class: 'list', style: { marginTop: '12px' } }, friends.map(f => h('div', { class: 'item', style: { cursor: 'default' } }, h('span', { class: 'avatar' }, f.displayName.slice(0, 1).toUpperCase()), h('div', { class: 'grow' }, h('div', { class: 't' }, f.displayName), h('div', { class: 'd' }, `@${f.username} · ${testName(f.targetTest)}`)), h('button', { class: 'btn btn-sm btn-ghost', onclick: async () => { if (confirm(`Remove ${f.displayName}?`)) { await api('DELETE', '/api/friends/' + f.id); renderFriends(); } } }, 'Remove')))) : null),
          h('div', { class: 'card' }, h('div', { class: 'row between' }, h('h3', null, `Level ${g.level}`), h('span', { class: 'small muted' }, `${g.xp} XP · ${g.nextLevelXp - g.xp} to level ${g.level + 1}`)), h('div', { class: 'bar gold' }, h('i', { style: { width: Math.round((g.xp - g.levelXp) / Math.max(1, g.nextLevelXp - g.levelXp) * 100) + '%' } })), h('p', { class: 'tiny faint', style: { marginTop: '8px' } }, 'XP: 10 + 4 × level per correct answer, 2 for a miss, a little less when hints were used.')))),
      h('div', { class: 'card' }, h('h3', null, 'Badges'), h('div', { class: 'badge-grid' }, g.badges.map(b => h('div', { class: 'badge' + (b.earnedAt ? '' : ' locked'), title: b.earnedAt ? 'Earned ' + fmtDate(b.earnedAt) : b.desc }, h('div', { class: 'ic' }, b.icon), h('b', null, b.name), h('div', { class: 'd' }, b.desc))))));
  });
}

// ---------- settings ----------
async function renderSettings() {
  await withLoading('settings', async () => {
    const u = state.user; const ov = state.overview; const msg = h('div', { class: 'alert hidden' });
    const testSel = h('select', { name: 'targetTest', onchange: (e) => fill(e.target.value) }, Object.entries(ov.tests).map(([k, t]) => h('option', { value: k, selected: k === u.targetTest }, `${t.name} — ${t.fullName}`)));
    const varSel = h('select', { name: 'variant' }); const fill = (t) => { varSel.innerHTML = ''; Object.entries(ov.tests[t].variants).forEach(([k, v]) => varSel.append(h('option', { value: k, selected: t === u.targetTest && k === u.variant }, v))); }; fill(u.targetTest);
    const form = h('form', { class: 'stack-sm', onsubmit: async (e) => { e.preventDefault(); const fd = Object.fromEntries(new FormData(e.target).entries()); try { const changedTest = fd.targetTest !== u.targetTest || fd.testDate !== (u.testDate || ''); state.user = await api('PATCH', '/api/me', fd); state.progress = null; if (changedTest) await post('/api/plan/generate'); msg.className = 'alert success'; msg.textContent = changedTest ? 'Saved. Your plan was rebuilt for the new test or date.' : 'Saved.'; e.target.querySelector('[name=newPassword]').value = ''; } catch (err) { msg.className = 'alert error'; msg.textContent = err.message; } } },
      h('div', { class: 'grid g2', style: { gap: '10px' } }, h('div', null, h('label', null, 'Display name'), h('input', { name: 'displayName', value: u.displayName })), h('div', null, h('label', null, 'Daily question goal (the 60-minute minimum always applies)'), h('input', { name: 'dailyGoal', type: 'number', min: 5, max: 200, value: u.dailyGoal }))),
      h('div', { class: 'grid g2', style: { gap: '10px' } }, h('div', null, h('label', null, 'Target test'), testSel), h('div', null, h('label', null, 'Level'), varSel)),
      h('div', { class: 'grid g2', style: { gap: '10px' } }, h('div', null, h('label', null, 'Test date'), h('input', { name: 'testDate', type: 'date', value: u.testDate || '' })), h('div', null, h('label', null, 'Grade'), h('input', { name: 'grade', type: 'number', min: 3, max: 12, value: u.grade || '' }))),
      h('div', { class: 'grid g2', style: { gap: '10px' } }, h('div', null, h('label', null, 'Your tutor\'s name'), h('input', { name: 'tutorName', value: u.tutorName, placeholder: 'Coach Ada' })), h('div', null, h('label', null, 'Goal percentile for this course'), h('input', { name: 'goalPercentile', type: 'number', min: 50, max: 99, value: u.goalPercentile || 99 }))),
      h('div', null, h('label', null, 'New password (leave blank to keep)'), h('input', { name: 'newPassword', type: 'password', autocomplete: 'new-password' })),
      h('p', { class: 'small muted' }, 'Test and level above apply to the active course. ', h('a', { href: '#/courses' }, 'Manage courses ›')),
      msg, h('div', { class: 'row', style: { marginTop: '12px' } }, h('button', { class: 'btn btn-primary', type: 'submit' }, 'Save changes'), h('button', { class: 'btn btn-ghost', type: 'button', onclick: async () => { await post('/api/logout'); state.user = null; state.progress = null; state.tutor.history = null; go('#/'); } }, 'Sign out')));
    const family = h('div', { class: 'card stack-sm' });
    const drawFamily = async () => { const { students } = await get('/api/family/students'); const code = h('input', { placeholder: 'Student share code', style: { width: '220px', textTransform: 'uppercase' } }); family.replaceChildren(h('h3', null, 'Family & tutors'), h('p', { class: 'small muted' }, 'Your share code lets a parent or tutor follow your progress (read-only). To follow a student, enter their code.'), h('div', { class: 'row' }, h('span', { class: 'small muted' }, 'Your share code:'), h('span', { class: 'pill accent', style: { fontSize: '16px', letterSpacing: '.1em' } }, u.shareCode)), h('div', { class: 'row' }, code, h('button', { class: 'btn', onclick: async () => { try { const r = await post('/api/family/link', { code: code.value }); toast(`Linked ${r.student.displayName}`); drawFamily(); } catch (e) { toast(e.message); } } }, 'Link student')), students.length ? h('div', { class: 'list' }, students.map(s => h('div', { class: 'item', style: { cursor: 'default' } }, h('div', { class: 'grow' }, h('div', { class: 't' }, s.displayName), h('div', { class: 'd' }, `@${s.username} · ${testName(s.targetTest)}`)), h('a', { class: 'btn btn-sm', href: '#/progress?student=' + s.id }, 'View progress'), h('button', { class: 'btn btn-sm btn-ghost', onclick: async () => { await api('DELETE', '/api/family/link/' + s.id); drawFamily(); } }, 'Unlink')))) : null); };
    drawFamily();
    const sessions = await get('/api/sessions').catch(() => ({ count: 1 }));
    const devices = h('div', { class: 'card stack-sm' }, h('div', { class: 'row between' }, h('h3', null, 'Your devices'), installButton(), sessions.count ? h('span', { class: 'pill' }, `${sessions.count} signed-in device${sessions.count === 1 ? '' : 's'}`) : null), h('p', { class: 'small muted' }, 'Sign in with the same username and password on any phone, tablet or computer; your plan, progress, streak and tutor chat are stored in your account, not on the device. Install it as an app for a full-screen experience and a home-screen icon.'), h('div', { class: 'row' }, installButton('btn btn-primary btn-sm'), install.standalone ? h('span', { class: 'pill teal' }, '✓ Running as an installed app') : null, h('button', { class: 'btn btn-sm btn-ghost', onclick: async () => { if (confirm('Sign out of every device, including this one? You will need to sign in again everywhere.')) { await post('/api/logout-all'); state.user = null; state.progress = null; go('#/'); } } }, 'Sign out everywhere')));
    const theme = h('div', { class: 'card' }, h('h3', null, 'Appearance'), h('div', { class: 'chips' }, [['', 'System'], ['light', 'Light'], ['dark', 'Dark']].map(([v, t]) => h('button', { class: 'chip' + ((localStorage.getItem('theme') || '') === v ? ' active' : ''), onclick: (e) => { try { v ? localStorage.setItem('theme', v) : localStorage.removeItem('theme'); } catch {} applyTheme(); e.target.parentElement.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === e.target)); } }, t))));
    let admin = null;
    if (u.role === 'admin') {
      const ts = await get('/api/tutor/status'); const { users } = await get('/api/admin/users');
      const keyIn = h('input', { type: 'password', placeholder: ts.hasKey ? 'A key is saved. Paste a new one to replace it.' : 'sk-ant-…', autocomplete: 'off' });
      const modelIn = h('input', { value: ts.model, placeholder: 'claude-opus-5-5' });
      const tmsg = h('div', { class: 'small muted' }, ts.note);
      admin = h('div', { class: 'stack' },
        h('div', { class: 'card stack-sm' }, h('div', { class: 'row between' }, h('h3', null, 'Live AI tutor'), h('span', { class: 'pill ' + (ts.live ? 'teal' : 'amber') }, ts.live ? 'Active' : 'Built-in mode')), h('p', { class: 'small muted' }, 'With an Anthropic API key, the tutor can answer anything in the student\'s own words, explain any question Socratically, and grade essays against a rubric. The key is stored in your Supabase database where only the tutor function can read it; it is never sent to browsers. Usage is billed to the key\'s account.'), tmsg,
          h('div', { class: 'grid g2', style: { gap: '10px' } }, h('div', null, h('label', null, 'Anthropic API key'), keyIn), h('div', null, h('label', null, 'Model'), modelIn)),
          h('div', { class: 'row', style: { marginTop: '8px' } }, h('button', { class: 'btn btn-primary', onclick: async () => { try { const r = await post('/api/admin/tutor-config', { apiKey: keyIn.value || undefined, model: modelIn.value }); state.tutor.status = r; tmsg.textContent = r.note; toast(r.live ? 'Live AI tutor is on' : 'Saved'); keyIn.value = ''; } catch (e) { toast(e.message); } } }, 'Save'), ts.hasKey ? h('button', { class: 'btn btn-ghost', onclick: async () => { if (confirm('Remove the saved API key?')) { const r = await post('/api/admin/tutor-config', { apiKey: '' }); state.tutor.status = r; tmsg.textContent = r.note; renderSettings(); } } }, 'Remove key') : null)),
        h('div', { class: 'card' }, h('h3', null, 'All accounts (admin)'), h('p', { class: 'small muted' }, 'You created the first account, so you administer this site. Each account\'s progress is private to it.'), h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'User'), h('th', { class: 'hide-sm' }, 'Role'), h('th', null, 'Test'), h('th', null, 'Questions'), h('th', { class: 'hide-sm' }, 'Last active'))), h('tbody', null, users.map(x => h('tr', null, h('td', null, `${x.displayName} `, h('span', { class: 'faint' }, `@${x.username}`)), h('td', { class: 'hide-sm' }, x.role), h('td', null, testName(x.targetTest)), h('td', null, x.attempts), h('td', { class: 'hide-sm' }, x.lastActive ? fmtDate(x.lastActive) : '—')))))));
    }
    return h('div', { class: 'stack', style: { maxWidth: '840px' } }, pageHead('Settings', 'Settings', null), h('div', { class: 'card' }, form), devices, family, theme, admin);
  });
}

// ---------- router ----------
async function router() {
  clearInterval(mockTimer); window.onkeydown = null; setTutorContext(null); if (state.tutor.open && document.querySelector('.tutor-panel')) toggleTutor(false);
  document.body.classList.remove('no-coach');
  const raw = location.hash.replace(/^#\/?/, '') || ''; const [pathPart, qs] = raw.split('?'); const params = new URLSearchParams(qs || ''); const parts = pathPart.split('/').filter(Boolean);
  if (!state.user) { if (parts[0] === 'register') return renderAuth('register'); if (parts[0] === 'login') return renderAuth('login'); return renderLanding(); }
  if (!parts[0] || parts[0] === 'login' || parts[0] === 'register') return go('#/session');
  window.scrollTo(0, 0);
  switch (parts[0]) {
    case 'session': return renderSession();
    case 'diagnostic': return renderDiagnostic();
    case 'dashboard': return renderDashboard();
    case 'learn': return renderLearn();
    case 'lesson': return renderLesson(parts[1], params);
    case 'practice': return renderPractice(params);
    case 'mock': if (parts[1] && parts[2] === 'results') return renderMockResults(parts[1], params); if (parts[1]) return renderMockRun(parts[1], params); return renderMockHome(params);
    case 'review': return renderReview(params);
    case 'vocab': if (parts[1] === 'quiz') return renderVocabQuiz(params); if (parts[1] === 'words') return renderVocab(params); return renderVocabHub(params);
    case 'math': if (parts[1] === 'sprint') return renderSprint(params); return renderMathHub(params);
    case 'flashcards': if (parts[1] === 'study') return renderFlashStudy(decodeURIComponent(parts[2] || ''), params); if (parts[1] === 'deck') return renderDeckEditor(parts[2]); return renderFlashcards(params);
    case 'more': return renderMore();
    case 'courses': return renderCourses();
    case 'mistakes': return renderMistakes();
    case 'report': return renderReport(params);
    case 'writing': return renderWriting(params);
    case 'progress': return renderProgress(params);
    case 'friends': return renderFriends();
    case 'settings': return renderSettings();
    default: return renderSession();
  }
}
(async function init() {
  applyTheme();
  $app.replaceChildren(h('div', { class: 'main' }, loading()));
  try { const [ov, me] = await Promise.all([get('/api/content/overview'), get('/api/me')]); state.overview = ov; state.user = me.user; if (state.user) { try { state.tutor.status = await get('/api/tutor/status'); } catch {} } } catch (e) { $app.replaceChildren(h('div', { class: 'main' }, h('div', { class: 'alert error' }, 'Could not start: ' + e.message))); return; }
  window.addEventListener('hashchange', router);
  router();
})();

// ======================= Flashcards =======================
async function renderFlashcards(params) {
  await withLoading('flashcards', async () => {
    const d = await get('/api/flash/decks'); const sess = fromSession(params);
    const root = h('div', { class: 'stack' });
    const deckCard = (deck) => h('div', { class: 'card tight', style: { display: 'flex', flexDirection: 'column', gap: '8px' } }, h('div', { class: 'row between' }, h('b', null, deck.name), deck.due ? h('span', { class: 'pill red' }, `${deck.due} due`) : deck.learning ? h('span', { class: 'pill teal' }, `${deck.learning} learning`) : null), h('div', { class: 'small muted', style: { flex: 1 } }, deck.desc), h('div', { class: 'bar blue' }, h('i', { style: { width: Math.round(deck.learning / Math.max(1, deck.total) * 100) + '%' } })), h('div', { class: 'row between' }, h('span', { class: 'tiny faint' }, `${deck.learning}/${deck.total} started`), h('div', { class: 'row', style: { gap: '6px' } }, deck.kind === 'custom' ? h('a', { class: 'btn btn-sm btn-ghost', href: `#/flashcards/deck/${deck.id.slice(7)}` }, 'Edit') : null, deck.kind === 'missed' ? h('a', { class: 'btn btn-sm btn-primary', href: '#/review' }, 'Review') : h('button', { class: 'btn btn-sm btn-primary', onclick: () => studyDeck(deck, 'smart') }, 'Study'))));
    const newDeckName = h('input', { placeholder: 'New deck name, e.g. Latin roots, Chapter 5…', style: { maxWidth: '320px' } });
    const studyDeck = (deck, mode) => go(`#/flashcards/study/${encodeURIComponent(deck.id)}?mode=${mode}` + (sess ? `&from=session&date=${sess.date}&i=${sess.index}` : ''));
    root.append(pageHead('Flashcards', 'Flashcards', 'Every deck runs on spaced repetition: grade each card and it comes back right before you would forget it. Make as many of your own decks as you like.', h('div', { class: 'row' }, d.dueTotal ? h('a', { class: 'btn btn-primary', href: '#/review' }, `Review ${d.dueTotal} due`) : null, h('a', { class: 'btn', href: '#/vocab' }, 'Vocab trainer'))),
      sess ? h('div', { class: 'alert info row between' }, h('span', null, 'Session step: learn 10 new words.'), h('button', { class: 'btn btn-sm btn-primary', onclick: () => { const lvl = Math.max(1, Math.min(5, Math.round(state.overview.tests[state.user.targetTest] ? ({ 'hspt:standard': 3, 'ssat:elementary': 1, 'ssat:middle': 3, 'ssat:upper': 4, 'isee:lower': 2, 'isee:middle': 3, 'isee:upper': 4 }[state.user.targetTest + ':' + state.user.variant] || 3) : 3))); go(`#/flashcards/study/vocab:${lvl}?mode=new&count=10&from=session&date=${sess.date}&i=${sess.index}`); } }, 'Start ›')) : null,
      h('div', null, h('h2', null, 'My decks'), h('p', { class: 'small muted' }, 'Type or paste cards as "front | back", one per line. Unlimited.'), h('div', { class: 'row', style: { marginBottom: '12px' } }, newDeckName, h('button', { class: 'btn btn-primary', onclick: async () => { if (!newDeckName.value.trim()) return toast('Give the deck a name'); const deck = await post('/api/cards/deck', { name: newDeckName.value }); go('#/flashcards/deck/' + deck.id); } }, '+ New deck')), d.custom.length ? h('div', { class: 'grid g3' }, d.custom.map(deckCard)) : h('p', { class: 'muted small' }, 'No custom decks yet.')),
      h('div', null, h('h2', null, 'Vocabulary'), h('div', { class: 'grid g3' }, d.vocab.map(deckCard))),
      h('div', null, h('h2', null, 'Word parts'), h('div', { class: 'grid g3' }, deckCard(d.roots))),
      h('div', null, h('h2', null, 'Math facts'), h('div', { class: 'grid g3' }, d.facts.map(deckCard))),
      h('div', null, h('h2', null, 'From your practice'), h('div', { class: 'grid g3' }, deckCard(d.missed))));
    return root;
  });
}
async function renderDeckEditor(id) {
  await withLoading('flashcards', async () => {
    const { deck, cards } = await get('/api/cards/deck/' + id);
    const ta = h('textarea', { placeholder: 'photosynthesis | the process plants use to turn light into food\nmitosis | cell division that makes two identical cells', style: { minHeight: '160px', fontFamily: 'ui-monospace, Menlo, monospace', fontSize: '16px' } });
    const list = h('div', { class: 'list' });
    const drawList = (items) => list.replaceChildren(...(items.length ? items.map(c => h('div', { class: 'item', style: { cursor: 'default' } }, h('div', { class: 'grow' }, h('div', { class: 't' }, c.front), h('div', { class: 'd' }, c.back)), h('button', { class: 'btn btn-sm btn-ghost', onclick: async () => { await api('DELETE', '/api/cards/' + c.id); renderDeckEditor(id); } }, 'Delete'))) : [h('p', { class: 'muted small' }, 'No cards yet. Add some above.')]));
    drawList(cards);
    return h('div', { class: 'stack', style: { maxWidth: '840px' } }, h('a', { href: '#/flashcards', class: 'small' }, '‹ All decks'), pageHead('My deck', deck.name, `${cards.length} card${cards.length === 1 ? '' : 's'}`, h('div', { class: 'row' }, cards.length ? h('a', { class: 'btn btn-primary', href: `#/flashcards/study/custom:${id}?mode=smart` }, 'Study') : null, h('button', { class: 'btn btn-ghost', onclick: async () => { if (confirm('Delete this deck and all its cards?')) { await api('DELETE', '/api/cards/deck/' + id); go('#/flashcards'); } } }, 'Delete deck'))),
      h('div', { class: 'card stack-sm' }, h('h3', null, 'Add cards'), h('p', { class: 'small muted' }, 'One card per line: front | back. You can paste a whole list from your notes.'), ta, h('div', { class: 'row' }, h('button', { class: 'btn btn-primary', onclick: async () => { const r = await post('/api/cards', { deck: id, text: ta.value }); toast(`Added ${r.added} card${r.added === 1 ? '' : 's'}`); ta.value = ''; renderDeckEditor(id); } }, 'Add cards'))),
      h('div', { class: 'card' }, h('h3', null, 'Cards'), list));
  });
}
async function renderFlashStudy(deckId, params) {
  await withLoading('flashcards', async () => {
    const mode = params.get('mode') || 'smart'; const count = Number(params.get('count')) || 20; const sess = fromSession(params);
    const { cards } = await get(`/api/flash/study?deck=${encodeURIComponent(deckId)}&mode=${mode}&count=${count}`);
    const root = h('div', { class: 'stack', style: { maxWidth: '680px', margin: '0 auto' } }); const area = h('div'); const prog = h('div', { class: 'bar blue' }, h('i', { style: { width: '0%' } }));
    root.append(h('div', { class: 'row between' }, h('a', { href: sess ? '#/session' : '#/flashcards', class: 'small' }, sess ? '‹ Back to session' : '‹ All decks'), h('span', { class: 'small muted' }, `${cards.length} cards · ${mode === 'new' ? 'new only' : mode === 'due' ? 'due only' : 'due first, then new'}`)), prog, area);
    if (!cards.length) { area.append(tutorSay(mode === 'new' ? 'You have started every card in this deck. Study it in smart mode to review what is due.' : 'Nothing is due in this deck right now. Pick another deck or learn new cards.', h('div', { class: 'row', style: { marginTop: '10px' } }, h('a', { class: 'btn btn-gold', href: '#/flashcards' }, 'All decks')))); return root; }
    let i = 0; const results = { known: 0, hard: 0, forgot: 0 };
    const show = () => {
      if (i >= cards.length) { completeSessionStep(sess).then(back => { setTutorContext(null); area.replaceChildren(tutorSay(`${cards.length} cards done: ${results.known} known, ${results.hard} hard, ${results.forgot} to relearn. The ones you forgot come back today; the easy ones will not bother you for a while.`, h('div', { class: 'row', style: { marginTop: '10px' } }, back, h('a', { class: 'btn btn-gold', href: `#/flashcards/study/${encodeURIComponent(deckId)}?mode=${mode}&count=${count}` }, 'Another round'), h('a', { class: 'btn', style: { background: 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.2)', color: '#fff' }, href: '#/flashcards' }, 'All decks')))); }); return; }
      const c = cards[i]; let flipped = false; prog.firstChild.style.width = Math.round(i / cards.length * 100) + '%';
      const ex = c.extra || {};
      const back = h('div', { class: 'hidden stack-sm' }, h('div', { class: 'def' }, ex.pos ? h('span', { class: 'muted small' }, ex.pos, ' · ') : null, c.back), ex.example ? h('div', { class: 'small muted serif' }, `“${ex.example}”`) : null, ex.synonyms && ex.synonyms.length ? h('div', { class: 'small' }, h('b', null, 'Synonyms: '), ex.synonyms.join(', '), ex.antonyms && ex.antonyms.length ? [' · ', h('b', null, 'Antonyms: '), ex.antonyms.join(', ')] : null) : null, ex.examples ? h('div', { class: 'small' }, h('b', null, 'Examples: '), ex.examples.join(', ')) : null, ex.roots ? h('div', { class: 'tiny faint' }, ex.roots) : null);
      const gradeBar = h('div', { class: 'row hidden grade-bar', style: { justifyContent: 'center' } }, [[1, 'Forgot', 'red'], [3, 'Hard', 'amber'], [4, 'Good', 'blue'], [5, 'Easy', 'teal']].map(([qv, t, col], k) => h('button', { class: 'btn', style: { borderColor: `var(--${col})`, color: `var(--${col})` }, onclick: async () => { await post('/api/flash/grade', { card: c, quality: qv }); if (qv >= 4) results.known++; else if (qv === 3) results.hard++; else results.forgot++; i++; show(); } }, t, ' ', h('span', { class: 'kbd' }, k + 1))));
      const card = h('div', { class: 'flashcard', onclick: () => { if (flipped) return; flipped = true; back.classList.remove('hidden'); gradeBar.classList.remove('hidden'); gradeBar.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); hint.textContent = 'How well did you know it?'; } }, c.isNew ? h('span', { class: 'pill gold' }, 'New') : h('span', { class: 'pill' }, `Review ${c.reps + 1}`), h('div', { class: 'w' + (c.front.length > 40 ? ' long' : '') }, c.front), ex.kind ? h('div', { class: 'tiny faint' }, ex.kind) : null, back);
      const hint = h('p', { class: 'small muted center' }, 'Say the answer out loud, then tap to flip (or press Space).');
      area.replaceChildren(h('div', { class: 'stack' }, h('div', { class: 'small muted center' }, `${i + 1} of ${cards.length}`), card, hint, gradeBar));
      window.onkeydown = (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!flipped) card.click(); } const k = parseInt(e.key); if (flipped && k >= 1 && k <= 4) gradeBar.children[k - 1].click(); };
    };
    show(); return root;
  });
}

// ======================= Vocabulary trainer =======================
async function renderVocabHub(params) {
  await withLoading('vocab', async () => {
    const st = await get('/api/vocab/stats'); const sess = fromSession(params);
    const sel = { level: state.user.vocabLevel || 0, source: '', count: 10, types: [] };
    const levelChips = h('div', { class: 'chips' }); const draw = () => levelChips.replaceChildren(h('button', { class: 'chip' + (!sel.level && !sel.source ? ' active' : ''), onclick: () => { sel.level = 0; sel.source = ''; draw(); } }, 'All levels'), ...[1, 2, 3, 4, 5].map(l => h('button', { class: 'chip' + (sel.level === l ? ' active' : ''), onclick: () => { sel.level = l; sel.source = ''; draw(); } }, `Level ${l}`)), h('button', { class: 'chip' + (sel.source === 'deck' ? ' active' : ''), onclick: () => { sel.source = 'deck'; sel.level = 0; draw(); } }, 'My deck'), h('button', { class: 'chip' + (sel.source === 'weak' ? ' active' : ''), onclick: () => { sel.source = 'weak'; sel.level = 0; draw(); } }, `Weak words (${st.weak.length})`));
    draw();
    const typeChips = h('div', { class: 'chips' }, [['definition', 'Definitions'], ['word', 'Word from meaning'], ['synonym', 'Synonyms'], ['antonym', 'Antonyms'], ['blank', 'Fill the blank'], ['spell', 'Spelling']].map(([k, t]) => h('button', { class: 'chip', onclick: (e) => { if (sel.types.includes(k)) sel.types = sel.types.filter(x => x !== k); else sel.types.push(k); e.target.classList.toggle('active', sel.types.includes(k)); } }, t)));
    const countSel = h('select', { style: { width: 'auto' }, onchange: (e) => { sel.count = Number(e.target.value); } }, [10, 15, 20, 30].map(n => h('option', { value: n, selected: n === 10 }, `${n} questions`)));
    const startQuiz = () => { const qs = new URLSearchParams({ count: sel.count }); if (sel.level) qs.set('level', sel.level); if (sel.source) qs.set('source', sel.source); if (sel.types.length) qs.set('types', sel.types.join(',')); go('#/vocab/quiz?' + qs + (sess ? `&from=session&date=${sess.date}&i=${sess.index}` : '')); };
    const w = st.wordOfDay;
    return h('div', { class: 'stack' },
      pageHead('Vocabulary', 'Vocabulary trainer', `${st.totalWords.toLocaleString()} words across five levels, plus ${st.roots} word parts. Quizzes adapt to the words you miss; every miss joins your flashcard deck.`, h('div', { class: 'row' }, h('a', { class: 'btn', href: '#/flashcards' }, 'Flashcards'), h('a', { class: 'btn', href: '#/vocab/words' }, 'Word list'))),
      sess ? h('div', { class: 'alert info row between' }, h('span', null, 'Session step: learn 10 new words.'), h('a', { class: 'btn btn-sm btn-primary', href: `#/flashcards?from=session&date=${sess.date}&i=${sess.index}` }, 'Start ›')) : null,
      h('div', { class: 'grid g4' }, h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, st.totalSeen), h('span', { class: 'k' }, 'words practiced')), h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, st.accuracy === null ? '—' : st.accuracy + '%'), h('span', { class: 'k' }, 'quiz accuracy')), h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, st.byLevel.reduce((a, l) => a + l.mastered, 0)), h('span', { class: 'k' }, 'words mastered')), h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, st.inDeck), h('span', { class: 'k' }, 'in flashcard deck'))),
      h('div', { class: 'grid g2' },
        h('div', { class: 'card stack-sm' }, h('h3', null, 'Quiz'), h('div', null, h('label', null, 'Words'), levelChips), h('div', null, h('label', null, 'Question types (none selected = mix)'), typeChips), h('div', { class: 'row', style: { marginTop: '10px' } }, countSel, h('button', { class: 'btn btn-primary', onclick: startQuiz }, 'Start quiz'), h('a', { class: 'btn', href: '#/vocab/quiz?source=roots&count=10' }, 'Word-parts quiz'))),
        h('div', { class: 'stack' }, h('div', { class: 'card gold' }, h('h4', null, 'Word of the day'), h('div', { class: 'display', style: { fontSize: '30px', fontWeight: 600 } }, w.word), h('div', null, h('span', { class: 'muted small' }, w.pos, ' · '), w.definition), h('p', { class: 'small muted serif', style: { margin: '6px 0 0' } }, `“${w.example}”`), w.roots ? h('div', { class: 'tiny faint' }, w.roots) : null),
          h('div', { class: 'card' }, h('h3', null, 'Mastery by level'), h('p', { class: 'small muted' }, 'A word counts as mastered after three or more quiz answers at 80%+ accuracy.'), h('div', { class: 'stack-sm' }, st.byLevel.map(l => h('div', null, h('div', { class: 'row between small' }, h('b', null, `Level ${l.level}`), h('span', { class: 'muted' }, `${l.mastered} mastered · ${l.seen} seen · ${l.total} total`)), h('div', { class: 'bar teal' }, h('i', { style: { width: Math.round(l.mastered / Math.max(1, l.total) * 100) + '%' } })))))))),
      st.weak.length ? h('div', { class: 'card' }, h('div', { class: 'row between' }, h('h3', null, 'Words that keep slipping'), h('button', { class: 'btn btn-sm btn-primary', onclick: () => go('#/vocab/quiz?source=weak&count=10') }, 'Quiz these')), h('div', { class: 'row', style: { gap: '8px' } }, st.weak.map(x => h('span', { class: 'pill red', title: x.def || '' }, `${x.word} ${x.right}/${x.seen}`)))) : null);
  });
}
async function renderVocabQuiz(params) {
  await withLoading('vocab', async () => {
    const sess = fromSession(params); const qs = new URLSearchParams(); for (const k of ['level', 'source', 'count', 'types']) if (params.get(k)) qs.set(k, params.get(k));
    const { items } = await get('/api/vocab/quiz?' + qs);
    const root = h('div', { class: 'stack', style: { maxWidth: '720px', margin: '0 auto' } }); const area = h('div'); const dots = h('div', { class: 'progress-dots' }, items.map(() => h('i')));
    root.append(h('div', { class: 'row between' }, h('a', { href: '#/vocab', class: 'small' }, '‹ Vocabulary trainer'), dots), area);
    if (!items.length) { area.append(h('div', { class: 'alert warn' }, 'No words match that selection yet. Try another level or source.')); return root; }
    let i = 0; const log = [];
    const show = () => {
      const q = items[i]; const startT = Date.now(); dots.querySelectorAll('i').forEach((d, k) => d.classList.toggle('cur', k === i));
      const fb = h('div'); let locked = false;
      const finishQ = async (payload) => { if (locked) return; locked = true; const r = await post('/api/vocab/answer', { servedId: q.servedId, seconds: (Date.now() - startT) / 1000, ...payload }); log.push({ q, r }); dots.querySelectorAll('i')[i].classList.add(r.correct ? 'ok' : 'bad'); return r; };
      let body;
      if (q.input) {
        const inp = h('input', { placeholder: 'type the word', autocomplete: 'off', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false', style: { fontSize: '20px', fontFamily: 'var(--display)' } });
        const check = async () => { const r = await finishQ({ text: inp.value }); if (!r) return; inp.disabled = true; fb.replaceChildren(h('div', { class: 'explain' }, h('b', null, r.correct ? 'Correct. ' : `Not quite. The word is ${r.answer}. `), r.explanation), h('div', { class: 'row between', style: { marginTop: '10px' } }, h('span', { class: 'pill ' + (r.correct ? 'teal' : 'red') }, `+${r.xpGain} XP`), h('button', { class: 'btn btn-dark', onclick: next }, i + 1 < items.length ? 'Next ›' : 'Finish'))); fb.querySelector('.btn-dark').focus(); };
        body = h('div', { class: 'card stack' }, h('div', { class: 'small muted' }, `${i + 1} of ${items.length} · spelling · level ${q.level}`), h('div', { class: 'q-stem' }, q.stem), h('p', { class: 'small muted' }, q.prompt), inp, h('div', { class: 'row' }, h('button', { class: 'btn btn-primary', onclick: check }, 'Check')), fb);
        inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { if (!locked) check(); else { const b = fb.querySelector('.btn-dark'); b && b.click(); } } });
        setTimeout(() => inp.focus(), 50);
      } else {
        const card = questionCard({ stem: q.stem, choices: q.choices }, {});
        const check = async () => { if (card.selected === null) return toast('Choose an answer'); const r = await finishQ({ choice: card.selected }); if (!r) return; card.reveal({ ...r, choice: card.selected }); fb.replaceChildren(h('div', { class: 'row between', style: { marginTop: '10px' } }, h('span', { class: 'pill ' + (r.correct ? 'teal' : 'red') }, `+${r.xpGain} XP`), h('button', { class: 'btn btn-dark', onclick: next }, i + 1 < items.length ? 'Next ›' : 'Finish'))); fb.querySelector('.btn-dark').focus(); };
        body = h('div', { class: 'card stack' }, h('div', { class: 'row between small muted' }, h('span', null, `${i + 1} of ${items.length} · ${q.type.replace('-', ' ')} · level ${q.level}`), h('span', { class: 'kbd-hint' }, h('span', { class: 'kbd' }, '1-4'), ' choose · ', h('span', { class: 'kbd' }, 'Enter'), ' check')), h('p', { class: 'small muted', style: { margin: 0 } }, q.prompt), card.el, h('div', { class: 'row' }, h('button', { class: 'btn btn-primary', onclick: check }, 'Check')), fb);
        window.onkeydown = (e) => { if (e.target.tagName === 'INPUT') return; const k = parseInt(e.key); if (k >= 1 && k <= q.choices.length && !card.locked) card.selected = k - 1; else if (e.key === 'Enter') { if (!card.locked) check(); else { const b = fb.querySelector('.btn-dark'); b && b.click(); } } };
      }
      area.replaceChildren(body);
    };
    const next = () => { i++; if (i < items.length) show(); else finish(); };
    const finish = async () => { window.onkeydown = null; const right = log.filter(l => l.r.correct).length; const back = await completeSessionStep(sess); const misses = log.filter(l => !l.r.correct); area.replaceChildren(h('div', { class: 'stack' }, tutorSay(`${right} of ${log.length}. ${misses.length ? `The ${misses.length} you missed are now in your flashcard deck; they will come back today.` : 'Clean sweep. Time to move up a level.'}`), misses.length ? h('div', { class: 'card' }, h('h3', null, 'Review the misses'), h('div', { class: 'stack-sm' }, misses.map(l => h('div', { class: 'small' }, h('b', null, l.q.word), ': ', l.r.explanation)))) : null, h('div', { class: 'row' }, back, h('button', { class: 'btn btn-primary', onclick: () => renderVocabQuiz(params) }, 'Another quiz'), h('a', { class: 'btn', href: '#/vocab' }, 'Vocabulary trainer')))); };
    show(); return root;
  });
}

// ======================= Math trainer =======================
async function renderMathHub(params) {
  await withLoading('math', async () => {
    const o = await get('/api/math/overview'); const sess = fromSession(params);
    const rankColor = { Master: 'teal', Expert: 'teal', Solid: 'blue', Developing: 'amber', Beginner: 'red', Unrated: '' };
    const sprintSel = { level: 2, seconds: 60 };
    const lvlChips = h('div', { class: 'chips' }, [1, 2, 3, 4, 5].map(l => h('button', { class: 'chip' + (sprintSel.level === l ? ' active' : ''), onclick: (e) => { sprintSel.level = l; e.target.parentElement.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === e.target)); } }, `Level ${l}`)));
    const secChips = h('div', { class: 'chips' }, [60, 90, 120].map(s => h('button', { class: 'chip' + (sprintSel.seconds === s ? ' active' : ''), onclick: (e) => { sprintSel.seconds = s; e.target.parentElement.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === e.target)); } }, `${s}s`)));
    const panel = h('div');
    return h('div', { class: 'stack' },
      pageHead('Math', 'Math trainer', 'Unlimited generated problems in every skill, five difficulty levels, timed speed sprints, and math-facts flashcards. Your rating in each skill moves with every answer.', h('div', { class: 'row' }, h('a', { class: 'btn', href: '#/flashcards' }, 'Math facts cards'), h('a', { class: 'btn', href: '#/learn' }, 'Math lessons'))),
      h('div', { class: 'grid g2' },
        h('div', { class: 'card' }, h('h3', null, 'Speed sprint'), h('p', { class: 'small muted' }, 'Mental math against the clock. Type the answer, press Enter. Beat your best.'), h('div', null, h('label', null, 'Level'), lvlChips), h('div', null, h('label', null, 'Time'), secChips), h('div', { class: 'row', style: { marginTop: '12px' } }, h('button', { class: 'btn btn-primary', onclick: () => go(`#/math/sprint?level=${sprintSel.level}&seconds=${sprintSel.seconds}`) }, '🏁 Start sprint'), Object.keys(o.bests).length ? h('span', { class: 'small muted' }, 'Bests: ' + Object.entries(o.bests).map(([k, v]) => `L${k.split(':')[0]}/${k.split(':')[1]}s → ${v}`).join(' · ')) : null)),
        h('div', { class: 'card' }, h('h3', null, 'Recent sprints'), o.sprints.length ? h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'When'), h('th', null, 'Level'), h('th', null, 'Time'), h('th', null, 'Score'), h('th', null, 'Accuracy'))), h('tbody', null, o.sprints.map(s => h('tr', null, h('td', null, fmtDate(s.at)), h('td', null, s.level), h('td', null, `${s.seconds}s`), h('td', null, h('b', null, s.score)), h('td', null, s.attempted ? Math.round(s.score / s.attempted * 100) + '%' : '—'))))) : h('p', { class: 'muted small' }, 'No sprints yet. Sixty seconds is all it takes.'))),
      h('div', { class: 'card' }, h('h3', null, 'Skill ladder'), h('p', { class: 'small muted' }, 'Pick a skill and a level. Drills are endless: every set is freshly generated. Your rank climbs with mastery (estimated accuracy on test-level problems).'),
        h('div', { class: 'stack-sm' }, o.ladder.map(s => h('div', { class: 'skill-row ladder' }, h('div', null, h('div', { class: 'small', style: { fontWeight: 600 } }, s.name), h('span', { class: 'pill ' + (rankColor[s.rank] || ''), style: { marginTop: '2px' } }, s.rank)), h('div', { class: 'bar' }, h('i', { style: { width: (s.mastery || 0) + '%', background: masteryColor(s.mastery) } })), h('span', { class: 'small muted', style: { textAlign: 'right' } }, s.mastery === null ? 'not rated' : `${s.mastery}% · ${s.n} q`), h('div', { class: 'row', style: { gap: '4px' } }, [1, 2, 3, 4, 5].map(l => h('a', { class: 'btn btn-sm' + (l === s.level ? ' btn-dark' : ' btn-ghost'), title: `Drill at level ${l}`, href: `#/practice?skill=${s.skill}&level=${l}&auto=1` }, l)), h('a', { class: 'btn btn-sm btn-primary', href: `#/practice?skill=${s.skill}&auto=1` }, 'Drill')))))),
      panel);
  });
}
async function renderSprint(params) {
  await withLoading('math', async () => {
    const level = Number(params.get('level')) || 2; const seconds = Number(params.get('seconds')) || 60;
    const { items } = await get('/api/math/sprint?level=' + level);
    const root = h('div', { class: 'stack', style: { maxWidth: '640px', margin: '0 auto' } });
    let i = 0, score = 0, attempted = 0, left = seconds, timer = null; const log = [];
    const timerEl = h('span', { class: 'timer' }, fmtTime(left)); const scoreEl = h('span', { class: 'pill teal', style: { fontSize: '16px' } }, 'Score 0');
    const stem = h('div', { class: 'display center', style: { fontSize: '52px', fontWeight: 600, margin: '20px 0' } }, '');
    const inp = h('input', { type: 'text', inputmode: 'numeric', enterkeyhint: 'go', autocomplete: 'off', 'aria-label': 'Your answer', style: { fontSize: '28px', textAlign: 'center', fontFamily: 'var(--display)' } });
    const keep = (e) => e.preventDefault(); // tapping these buttons must not take focus from the answer box (that would close the keyboard)
    const signBtn = level >= 4 ? h('button', { type: 'button', class: 'btn btn-lg', 'aria-label': 'Toggle minus sign', onmousedown: keep, onclick: () => { inp.value = inp.value.startsWith('-') ? inp.value.slice(1) : '-' + inp.value; inp.focus(); } }, '±') : null;
    const goBtn = h('button', { type: 'button', class: 'btn btn-primary btn-lg grow', onmousedown: keep, onclick: () => { submit(); inp.focus(); } }, 'Check ↵');
    const flash = h('div', { class: 'center small', style: { minHeight: '20px' } });
    const show = () => { stem.textContent = items[i % items.length].stem; inp.value = ''; inp.focus(); };
    const submit = () => { const val = inp.value.trim().replace(/,/g, '').replace(/^[−–]/, '-'); if (!val || val === '-') return; const it = items[i % items.length]; const ok = val === it.answer || (Number(val) === Number(it.answer)); attempted++; if (ok) score++; log.push({ stem: it.stem, answer: it.answer, given: val, ok }); flash.textContent = ok ? '✓' : `✗ ${it.stem} = ${it.answer}`; flash.style.color = ok ? 'var(--teal)' : 'var(--red)'; scoreEl.textContent = `Score ${score}`; i++; show(); };
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
    const end = async () => { clearInterval(timer); window.onkeydown = null; inp.disabled = true; const r = await post('/api/math/sprint', { level, seconds, score, attempted }); const sessBack = await completeSessionStep(fromSession(params)); const misses = log.filter(l => !l.ok); root.replaceChildren(tutorSay(`${score} correct in ${seconds} seconds${attempted ? ` (${Math.round(score / attempted * 100)}% accuracy)` : ''}. ${r.isBest ? 'That is a new personal best. ' : `Your best at this level is ${r.best}. `}${misses.length ? 'Look at the misses below: speed comes from fixing the facts that slow you down.' : 'Perfect accuracy. Push the level up next time.'}`, h('div', { class: 'row', style: { marginTop: '10px' } }, h('span', { class: 'pill gold' }, `+${r.xp} XP`))), misses.length ? h('div', { class: 'card' }, h('h3', null, 'Misses'), h('div', { class: 'row', style: { gap: '8px' } }, misses.map(m => h('span', { class: 'pill red' }, `${m.stem} = ${m.answer} (you: ${m.given})`)))) : null, h('div', { class: 'row' }, sessBack, h('button', { class: 'btn btn-primary', onclick: () => renderSprint(params) }, 'Again'), h('a', { class: 'btn', href: `#/math/sprint?level=${Math.min(5, level + 1)}&seconds=${seconds}` }, 'Level up'), h('a', { class: 'btn', href: '#/math' }, 'Math trainer'))); };
    const start = () => { const deadline = Date.now() + left * 1000; timer = setInterval(() => { left = Math.max(0, Math.round((deadline - Date.now()) / 1000)); timerEl.textContent = fmtTime(Math.max(0, left)); timerEl.classList.toggle('low', left <= 10); if (left <= 0) end(); }, 1000); root.replaceChildren(h('div', { class: 'mock-bar' }, h('a', { href: '#/math', class: 'small', onclick: () => clearInterval(timer) }, '‹ Quit'), h('b', null, `Sprint · level ${level}`), h('span', { class: 'grow' }), scoreEl, timerEl), h('div', { class: 'card' }, stem, inp, h('div', { class: 'row nowrap', style: { marginTop: '10px' } }, signBtn, goBtn), flash, h('p', { class: 'tiny faint center', style: { marginTop: '10px' } }, `Enter or Check submits${level >= 4 ? '; ± adds a minus sign' : ''}. Wrong answers do not cost points, so keep moving.`))); show(); };
    root.append(h('div', { class: 'card stack center', style: { padding: '36px' } }, h('div', { class: 'pill' }, `Level ${level} · ${seconds} seconds`), h('h1', null, 'Speed sprint'), h('p', { class: 'muted' }, 'As many as you can. Type the answer and press Enter. Skip nothing; a wrong guess costs no points.'), h('div', { class: 'row', style: { justifyContent: 'center' } }, h('button', { class: 'btn btn-primary btn-lg', onclick: start }, 'Go'), h('a', { class: 'btn btn-ghost', href: '#/math' }, 'Back'))));
    return root;
  });
}
async function renderMore() {
  await withLoading('more', async () => h('div', { class: 'stack' }, pageHead('Menu', 'Everything', null), (() => { const cs = courseSwitcher(); return cs ? h('div', { class: 'card tight' }, h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'Your course (tap to switch)'), cs) : null; })(), install.standalone ? null : h('div', { class: 'card row between', style: { gap: '12px' } }, h('div', { class: 'grow' }, h('b', null, 'Install Tidelyne Prep on this device'), h('div', { class: 'small muted' }, 'Home-screen icon, full screen, and the same account and progress everywhere.')), installButton('btn btn-primary btn-sm')), h('div', { class: 'list' }, [['session', 'Today', 'Your guided session'], ['dashboard', 'Home', 'Overview and recommendations'], ['learn', 'Learn', 'Lessons'], ['practice', 'Practice', 'Adaptive sets'], ['vocab', 'Vocabulary trainer', 'Quizzes and word mastery'], ['math', 'Math trainer', 'Drills, sprints, ladder'], ['flashcards', 'Flashcards', 'Vocabulary, roots, math facts, your decks'], ['mock', 'Mock tests', 'Timed, full-length'], ['review', 'Review', 'Spaced repetition'], ['writing', 'Writing', 'Timed prompts and feedback'], ['progress', 'Progress', 'Mastery and history'], ['friends', 'Friends', 'Leaderboard and badges'], ['courses', 'Courses', 'Prepare for several tests'], ['mistakes', 'Mistake journal', 'Why you miss, and the fix'], ['report', 'Weekly report', 'Share progress with a parent'], ['settings', 'Settings', 'Account, devices, tutor']].map(([k, t, d]) => h('a', { class: 'item', href: '#/' + k, style: { color: 'inherit', textDecoration: 'none' } }, h('div', { class: 'grow' }, h('div', { class: 't' }, t), h('div', { class: 'd' }, d)), h('span', { class: 'muted' }, '›'))))));
}

// ======================= Courses, focus, mistakes, report =======================
function pictureCard(p) { return h('div', { class: 'picture-card' }, h('div', { class: 'scene' }, p.scene || '🖼'), h('div', { class: 'small muted' }, p.description || '')); }
function courseSwitcher() {
  const u = state.user; if (!u || !u.courses) return null;
  return h('div', { class: 'course-switch' }, u.courses.map(c => h('button', { class: 'cs' + (c.active ? ' active' : ''), title: `${c.name} · ${state.overview.tests[c.test].variants[c.variant] || c.variant}${c.diagnosticDone ? '' : ' · diagnostic pending'}`, onclick: async () => { if (c.active) return; try { state.user = await post('/api/courses/switch', { test: c.test }); state.progress = null; state.tutor.history = null; toast(`Switched to ${c.name}`); $app.innerHTML = ''; router(); } catch (e) { toast(e.message); } } }, c.name, c.diagnosticDone ? null : h('span', { class: 'dot' }))), h('a', { class: 'cs add', href: '#/courses', title: 'Add or manage courses' }, '+'));
}
async function renderCourses() {
  await withLoading('courses', async () => {
    const d = await get('/api/courses'); const u = state.user;
    const testSel = h('select', { style: { width: 'auto' } }, d.available.filter(a => !a.enrolled).map(a => h('option', { value: a.test }, `${a.name} — ${a.fullName}`)));
    const varSel = h('select', { style: { width: 'auto' } }); const fill = () => { varSel.innerHTML = ''; const a = d.available.find(x => x.test === testSel.value); if (a) Object.entries(a.variants).forEach(([k, v]) => varSel.append(h('option', { value: k }, v))); }; testSel.addEventListener('change', fill); fill();
    const dateIn = h('input', { type: 'date', style: { width: 'auto' } });
    const canAdd = d.available.some(a => !a.enrolled);
    return h('div', { class: 'stack', style: { maxWidth: '900px' } },
      pageHead('Courses', 'Your courses', 'Prepare for more than one test at once. Each course has its own diagnostic, study plan, focus skills, ratings and mock tests. Switch any time from the course buttons (in the sidebar on a computer, at the top of More on a phone); everything on the site follows the active course.'),
      h('div', { class: 'grid g2' }, d.courses.map(c => h('div', { class: 'card' + (c.active ? ' gold' : '') }, h('div', { class: 'row between' }, h('h3', null, c.name), c.active ? h('span', { class: 'pill accent' }, 'Active') : null), h('div', { class: 'small muted' }, `${state.overview.tests[c.test].variants[c.variant] || c.variant}${c.testDate ? ' · test on ' + fmtDate(c.testDate) : ''}`), h('div', { class: 'row', style: { margin: '10px 0' } }, h('span', { class: 'pill ' + (c.diagnosticDone ? 'teal' : 'amber') }, c.diagnosticDone ? '✓ Diagnostic done' : 'Diagnostic pending')), h('div', { class: 'row' }, !c.active ? h('button', { class: 'btn btn-sm btn-primary', onclick: async () => { state.user = await post('/api/courses/switch', { test: c.test }); state.progress = null; $app.innerHTML = ''; go('#/session'); } }, 'Switch to this course') : h('a', { class: 'btn btn-sm btn-primary', href: c.diagnosticDone ? '#/session' : '#/diagnostic' }, c.diagnosticDone ? "Today's session" : 'Take the diagnostic'), d.courses.length > 1 ? h('button', { class: 'btn btn-sm btn-ghost', onclick: async () => { if (confirm(`Remove the ${c.name} course? Its plan and focus are deleted; your question ratings are kept.`)) { state.user = await api('DELETE', '/api/courses/' + c.test); state.progress = null; $app.innerHTML = ''; renderCourses(); } } }, 'Remove') : null)))),
      canAdd ? h('div', { class: 'card stack-sm' }, h('h3', null, 'Add a course'), h('div', { class: 'row' }, h('div', { class: 'field' }, h('label', null, 'Test'), testSel), h('div', { class: 'field' }, h('label', null, 'Level'), varSel), h('div', { class: 'field' }, h('label', null, 'Test date (optional)'), dateIn)), h('div', { class: 'row', style: { marginTop: '8px' } }, h('button', { class: 'btn btn-primary', onclick: async () => { try { state.user = await post('/api/courses/add', { test: testSel.value, variant: varSel.value, testDate: dateIn.value || null }); state.progress = null; toast(`Enrolled in ${testName(testSel.value)}. Start with its diagnostic.`); $app.innerHTML = ''; go('#/diagnostic'); } catch (e) { toast(e.message); } } }, '+ Enroll'))) : h('p', { class: 'muted small' }, 'You are enrolled in all three tests.'));
  });
}
function focusCard(focus, opts = {}) {
  if (!focus || !focus.skills.length) return null;
  return h('div', { class: 'card' }, h('div', { class: 'row between' }, h('h3', null, 'Focus skills'), h('span', { class: 'pill' }, `${focus.daysLeft} days left`)), h('p', { class: 'small muted' }, 'Chosen from your diagnostic and ratings: the three skills where points come cheapest. Targets reset when you hit them.'), h('div', { class: 'stack-sm' }, focus.skills.map(s => h('div', null, h('div', { class: 'row between small' }, h('b', null, s.name), h('span', { class: s.done ? 'pill teal' : 'muted' }, s.done ? '✓ target reached' : `${s.now}% → ${s.target}%`)), h('div', { class: 'bar teal' }, h('i', { style: { width: s.pct + '%' } })), !opts.readOnly ? h('div', { class: 'row', style: { gap: '6px', marginTop: '4px' } }, h('a', { class: 'btn btn-sm btn-ghost', href: `#/practice?skill=${s.skill}&auto=1` }, 'Drill'), h('a', { class: 'btn btn-sm btn-ghost', href: '#/learn' }, 'Lesson')) : null))));
}
function projectionCard(p) {
  if (!p || p.overall === null) return h('div', { class: 'card' }, h('h3', null, 'Road to the 99th'), h('p', { class: 'muted small' }, 'Answer a few questions in each section and your projected percentile appears here, with the gap to the 99th.'));
  return h('div', { class: 'card' }, h('div', { class: 'row between' }, h('h3', null, p.goal >= 99 ? 'Road to the 99th' : 'Score projection'), h('span', { class: 'pill ' + (p.overall >= p.goal ? 'teal' : 'amber') }, `~${ordinal(p.overall)} · goal ${ordinal(p.goal)}`)), h('div', { class: 'bar gold', style: { margin: '6px 0 10px' } }, h('i', { style: { width: Math.round(p.overall / p.goal * 100) + '%' } })), h('p', { class: 'small muted' }, p.outlook), h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Section'), h('th', null, 'Projected'), h('th', { class: 'hide-xs' }, 'On Elite items'), h('th', null, 'Weakest skill'))), h('tbody', null, p.sections.map(s => h('tr', null, h('td', null, s.name), h('td', null, s.percentile === null ? h('span', { class: 'faint' }, 'not measured') : h('b', { style: { color: s.percentile >= p.goal ? 'var(--teal)' : 'inherit' } }, `~${ordinal(s.percentile)}`)), h('td', { class: 'hide-xs' }, s.eliteAccuracy === null ? '—' : `${s.eliteAccuracy}%${p.goal >= 99 ? ' / 79%' : ''}`), h('td', null, s.weakest ? h('a', { class: 'small', href: `#/practice?skill=${s.weakest.skill}&auto=1` }, `${s.weakest.name} ${s.weakest.mastery}%`) : '—'))))), p.trend !== null ? h('p', { class: 'tiny faint', style: { marginTop: '8px' } }, `Mastery ${p.trend >= 0 ? '+' : ''}${p.trend} points over the last 7 days.`) : null, h('p', { class: 'tiny faint' }, 'Projection is an estimate from your skill ratings, not an official score. The 99th percentile corresponds to roughly 79% accuracy on Elite-level questions.'));
}
async function renderMistakes() {
  await withLoading('mistakes', async () => {
    const m = await get('/api/mistakes'); const typeName = Object.fromEntries(m.types.map(t => [t[0], t[1]]));
    return h('div', { class: 'stack' },
      pageHead('Mistake journal', 'Why you miss', 'Tag each miss by cause and patterns appear. The fix for a careless slip is different from the fix for a gap in knowledge.', h('a', { class: 'btn', href: '#/practice' }, 'Practice')),
      m.total === 0 ? tutorSay('No tagged mistakes yet. After a wrong answer in practice, tap the reason. Within a week I can tell you whether your points are leaking from speed, reading, or knowledge.') : h('div', { class: 'grid g2' },
        h('div', { class: 'card' }, h('h3', null, 'By cause'), h('p', { class: 'small muted' }, `${m.total} tagged, ${m.recent} in the last 30 days.`), h('div', { class: 'stack-sm' }, m.types.map(([k, name]) => { const n = m.byType[k] || 0; return h('div', null, h('div', { class: 'row between small' }, h('b', null, name), h('span', { class: 'muted' }, `${n} · ${Math.round(n / Math.max(1, m.total) * 100)}%`)), h('div', { class: 'bar' }, h('i', { style: { width: Math.round(n / Math.max(1, m.total) * 100) + '%' } }))); })), m.advice.length ? h('div', { style: { marginTop: '12px' } }, m.advice.map(a => h('p', { class: 'small' }, '→ ', a))) : null),
        h('div', { class: 'card' }, h('h3', null, 'By skill'), h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Skill'), h('th', null, 'Misses'), h('th', null, 'Main cause'), h('th', null, ''))), h('tbody', null, m.skills.slice(0, 10).map(s => { const top = Object.entries(s.types).sort((a, b) => b[1] - a[1])[0]; return h('tr', null, h('td', null, s.name), h('td', null, s.n), h('td', null, top ? typeName[top[0]] : ''), h('td', null, h('a', { class: 'btn btn-sm', href: `#/practice?skill=${s.skill}&auto=1` }, 'Drill'))); }))))),
      m.latest.length ? h('div', { class: 'card' }, h('h3', null, 'Latest'), h('div', { class: 'list' }, m.latest.map(e => h('div', { class: 'item', style: { cursor: 'default' } }, h('span', { class: 'pill ' + ({ careless: 'amber', "didn't know": 'red', misread: 'blue', time: 'purple' }[e.type] || '') }, typeName[e.type] || e.type), h('div', { class: 'grow' }, h('div', { class: 't', style: { fontWeight: 500 } }, e.stem.replace(/^[A-Za-z ]+ set \d+ — /, '')), h('div', { class: 'd' }, `${skillName(e.skill)} · ${fmtDate(e.at)}`)))))) : null);
  });
}
async function renderReport(params) {
  await withLoading('report', async () => {
    const r = await get('/api/report' + (params.get('student') ? '?student=' + params.get('student') : ''));
    const delta = (a, b) => a === null || b === null ? '' : (a - b >= 0 ? ' (+' : ' (') + (a - b) + ')';
    return h('div', { class: 'stack', style: { maxWidth: '900px' } },
      pageHead('Weekly report', 'This week', 'A one-page summary you can share with a parent or tutor.', h('button', { class: 'btn', onclick: async () => { try { await navigator.clipboard.writeText(r.text); toast('Report copied'); } catch { toast('Could not copy'); } } }, 'Copy as text')),
      h('div', { class: 'grid g4' }, h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, r.thisWeek.n), h('span', { class: 'k' }, `questions${delta(r.thisWeek.n, r.lastWeek.n)}`)), h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, r.thisWeek.acc === null ? '—' : r.thisWeek.acc + '%'), h('span', { class: 'k' }, `accuracy${delta(r.thisWeek.acc, r.lastWeek.acc)}`)), h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, r.thisWeek.secs), h('span', { class: 'k' }, 'focused minutes')), h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, `${r.thisWeek.days}/7`), h('span', { class: 'k' }, 'active days'))),
      h('div', { class: 'grid g2' },
        h('div', { class: 'card' }, h('h3', null, 'Mastery changes'), r.deltas.length ? h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Skill'), h('th', null, 'Now'), h('th', null, 'Change'))), h('tbody', null, r.deltas.slice(0, 12).map(d => h('tr', null, h('td', null, d.name), h('td', null, `${d.now}%`), h('td', null, d.delta === null ? h('span', { class: 'faint' }, 'new') : h('span', { class: 'pill ' + (d.delta > 0 ? 'teal' : d.delta < 0 ? 'red' : '') }, `${d.delta > 0 ? '+' : ''}${d.delta}`)))))) : h('p', { class: 'muted small' }, 'No rated skills yet.')),
        h('div', { class: 'stack' }, projectionCard(r.projection), focusCard(r.focus, { readOnly: true }))),
      h('div', { class: 'card' }, h('h3', null, 'Summary'), h('pre', { style: { whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '14.5px', margin: 0 } }, r.text)));
  });
}
