'use strict';
/* Ascend Prep — single-page app (no build step). */
const $app = document.getElementById('app');
const state = { user: null, overview: null, progress: null };

// ---------- utilities ----------
async function api(method, path, body) {
  const res = await fetch(path, { method, headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined, credentials: 'same-origin' });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) { const e = new Error(data.error || `Request failed (${res.status})`); e.status = res.status; throw e; }
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
// DOM append/replaceChildren drop null/false children (so conditional children never render as "null")
for (const m of ['append', 'replaceChildren', 'prepend']) { const orig = Element.prototype[m]; Element.prototype[m] = function (...k) { return orig.apply(this, k.flat(Infinity).filter(x => x !== null && x !== undefined && x !== false)); }; }
// SVG must be created in its namespace: build it from markup.
function svg(attrs, inner) { const w = document.createElement('div'); w.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')}>${inner}</svg>`; return w.firstChild; }
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function inline(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(^|[^*])\*([^*\n]+?)\*/g, '$1<i>$2</i>').replace(/`([^`]+?)`/g, '<code>$1</code>'); }
// Minimal markdown: headings, lists, blockquotes, tables, paragraphs.
function md(text) {
  const lines = String(text || '').replace(/\r/g, '').split('\n'); let out = ''; let list = null; let para = [];
  const flushPara = () => { if (para.length) { out += `<p>${inline(para.join(' '))}</p>`; para = []; } };
  const closeList = () => { if (list) { out += `</${list}>`; list = null; } };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^\s*$/.test(l)) { flushPara(); closeList(); continue; }
    let m;
    if ((m = /^(#{1,4})\s+(.*)/.exec(l))) { flushPara(); closeList(); out += `<h3>${inline(m[2])}</h3>`; continue; }
    if ((m = /^\s*[-*•]\s+(.*)/.exec(l))) { flushPara(); if (list !== 'ul') { closeList(); out += '<ul>'; list = 'ul'; } out += `<li>${inline(m[1])}</li>`; continue; }
    if ((m = /^\s*\d+[.)]\s+(.*)/.exec(l))) { flushPara(); if (list !== 'ol') { closeList(); out += '<ol>'; list = 'ol'; } out += `<li>${inline(m[1])}</li>`; continue; }
    if ((m = /^>\s?(.*)/.exec(l))) { flushPara(); closeList(); out += `<blockquote>${inline(m[1])}</blockquote>`; continue; }
    if (/^\s*\|.*\|\s*$/.test(l)) { flushPara(); closeList(); const rows = []; while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) { if (!/^\s*\|[\s:-|]+\|\s*$/.test(lines[i])) rows.push(lines[i].trim().slice(1, -1).split('|').map(c => c.trim())); i++; } i--; out += '<table>' + rows.map((r, ri) => '<tr>' + r.map(c => `<${ri === 0 ? 'th' : 'td'}>${inline(c)}</${ri === 0 ? 'th' : 'td'}>`).join('') + '</tr>').join('') + '</table>'; continue; }
    closeList(); para.push(l.trim());
  }
  flushPara(); closeList(); return out;
}
const LETTERS = 'ABCDE';
const fmtTime = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const fmtDate = (s) => s ? new Date(s.replace(' ', 'T') + (s.endsWith('Z') ? '' : 'Z')).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '';
function toast(msg) { const t = h('div', { class: 'toast' }, msg); document.body.append(t); setTimeout(() => t.remove(), 3000); }
const go = (hash) => { location.hash = hash; };
const testName = (t) => state.overview ? state.overview.tests[t].name : t.toUpperCase();
const skillName = (s) => (state.overview && state.overview.skillNames[s]) || s;
const sectionName = (t, s) => (state.overview && state.overview.tests[t] && state.overview.tests[t].sections[s]) || s;
const isCapsStem = (q) => /^[A-Z][A-Z\s-]{2,}$/.test(q.stem.trim());
function masteryColor(m) { return m === null || m === undefined ? 'var(--border)' : m >= 80 ? 'var(--green)' : m >= 60 ? 'var(--gold)' : 'var(--accent)'; }

// ---------- shell ----------
const NAV = [['dashboard', 'Home'], ['learn', 'Learn'], ['practice', 'Practice'], ['mock', 'Mock Tests'], ['review', 'Review'], ['writing', 'Writing'], ['progress', 'Progress']];
function shell(content, active) {
  $app.innerHTML = '';
  const nav = h('nav', { class: 'nav' }, NAV.map(([k, label]) => h('a', { href: '#/' + k, class: active === k ? 'active' : '' }, label)));
  const user = state.user;
  const top = h('header', { class: 'topbar' }, h('div', { class: 'topbar-inner' },
    h('a', { href: '#/dashboard', class: 'brand' }, h('span', { class: 'mark' }, 'A'), 'Ascend Prep'),
    user ? nav : null, h('span', { class: 'spacer' }),
    user ? h('a', { href: '#/settings', class: 'row', title: 'Settings', style: { gap: '8px', color: 'inherit' } }, h('span', { class: 'small muted' }, testName(user.targetTest)), h('span', { class: 'avatar' }, user.displayName.slice(0, 1).toUpperCase())) : null));
  $app.append(top, h('main', { class: 'main' }, content));
}
function loading(msg = 'Loading…') { return h('div', { class: 'center muted', style: { padding: '60px 0' } }, msg); }
async function withLoading(active, fn) { shell(loading(), active); try { const node = await fn(); shell(node, active); } catch (e) { if (e.status === 401) { state.user = null; return renderAuth(); } shell(h('div', { class: 'alert error' }, e.message), active); } }

// ---------- auth / landing ----------
function renderAuth(mode = 'login') {
  const err = h('div', { class: 'alert error hidden' });
  const form = h('form', { class: 'stack', onsubmit: async (ev) => { ev.preventDefault(); err.classList.add('hidden'); const fd = Object.fromEntries(new FormData(ev.target).entries()); try { state.user = await post(mode === 'login' ? '/api/login' : '/api/register', fd); go('#/dashboard'); } catch (e) { err.textContent = e.message; err.classList.remove('hidden'); } } });
  const testSel = h('select', { name: 'targetTest', onchange: (e) => fillVariants(e.target.value) }, Object.entries(state.overview.tests).map(([k, t]) => h('option', { value: k }, `${t.name} — ${t.fullName}`)));
  const varSel = h('select', { name: 'variant' });
  const fillVariants = (t) => { varSel.innerHTML = ''; Object.entries(state.overview.tests[t].variants).forEach(([k, v]) => varSel.append(h('option', { value: k }, v))); };
  fillVariants('hspt');
  form.append(...[
    mode === 'register' ? h('div', null, h('label', null, 'Your name'), h('input', { name: 'displayName', required: true, maxlength: 40, placeholder: 'e.g. Maya' })) : null,
    h('div', null, h('label', null, 'Username'), h('input', { name: 'username', required: true, autocomplete: 'username', placeholder: 'letters, numbers, dots' })),
    h('div', null, h('label', null, 'Password'), h('input', { name: 'password', type: 'password', required: true, minlength: mode === 'register' ? 8 : 1, autocomplete: mode === 'register' ? 'new-password' : 'current-password' })),
    mode === 'register' ? h('div', null, h('label', null, 'I am a'), h('select', { name: 'role' }, h('option', { value: 'student' }, 'Student'), h('option', { value: 'parent' }, 'Parent or tutor (view linked students)'))) : null,
    mode === 'register' ? h('div', { class: 'grid grid-2' }, h('div', null, h('label', null, 'Target test'), testSel), h('div', null, h('label', null, 'Level'), varSel)) : null,
    mode === 'register' ? h('div', null, h('label', null, 'Current grade (optional)'), h('input', { name: 'grade', type: 'number', min: 3, max: 12, placeholder: '7' })) : null,
    err,
    h('button', { class: 'btn btn-primary btn-lg btn-block', type: 'submit' }, mode === 'login' ? 'Sign in' : 'Create my account'),
    h('p', { class: 'small muted center' }, mode === 'login' ? ['New here? ', h('a', { href: '#', onclick: (e) => { e.preventDefault(); renderAuth('register'); } }, 'Create an account')] : ['Already have an account? ', h('a', { href: '#', onclick: (e) => { e.preventDefault(); renderAuth('login'); } }, 'Sign in')])
  ].filter(Boolean));
  const c = state.overview.counts;
  const features = [['🎯', 'Adaptive practice', 'Every answer updates a per-skill rating. You always work at the edge of your ability, where learning is fastest.'], ['🧠', 'Learning-science lessons', 'Worked examples, faded practice, retrieval checks, and spaced review. The methods with the strongest evidence, built in.'], ['⏱', 'Mock tests at four tiers', 'Foundation, Standard, Advanced, Elite. Official timing and question counts; the tier is recommended from your progress.'], ['📈', 'Progress that is yours', 'Separate accounts, private progress, and a parent view by share code. Many students can use the site at once.']];
  shell(h('div', { class: 'hero' },
    h('div', null, h('div', { class: 'pill accent', style: { marginBottom: '14px' } }, 'HSPT · SSAT · ISEE'), h('h1', null, 'Expert-level prep, tuned to each student.'),
      h('p', { class: 'lead' }, 'Ascend Prep teaches the way the best tutors do: explain the idea, show the method, practice at the right difficulty, and review before you forget.'),
      h('div', { class: 'grid grid-2', style: { marginTop: '22px' } }, features.map(([ic, t, d]) => h('div', { class: 'feature' }, h('div', { class: 'ic' }, ic), h('div', null, h('b', null, t), h('span', { class: 'small muted' }, d))))),
      h('p', { class: 'small faint', style: { marginTop: '22px' } }, `${c.lessons} lessons · ${c.questions.toLocaleString()} curated questions + unlimited generated math · ${c.passages} reading passages · ${c.vocab} vocabulary words`)),
    h('div', { class: 'card auth-card' }, h('h2', null, mode === 'login' ? 'Welcome back' : 'Start for free'), form)), null);
}

// ---------- dashboard ----------
async function renderDashboard() {
  await withLoading('dashboard', async () => {
    const p = await get('/api/progress'); state.progress = p; const u = state.user;
    const goalPct = Math.min(100, Math.round(p.today / u.dailyGoal * 100));
    const days = u.testDate ? Math.ceil((new Date(u.testDate) - Date.now()) / 864e5) : null;
    const sections = Object.entries(p.bySection).filter(([k]) => !['writing', 'essay'].includes(k));
    return h('div', { class: 'stack' },
      h('div', { class: 'row between' }, h('div', null, h('h1', null, `${greeting()}, ${u.displayName}.`), h('p', { class: 'muted' }, `Preparing for the ${testName(u.targetTest)}${days !== null ? ` · ${days > 0 ? days + ' days to go' : 'test day is here'}` : ''}`)), h('div', { class: 'row' }, h('a', { class: 'btn btn-primary', href: '#/practice' }, 'Start adaptive practice'), h('a', { class: 'btn', href: '#/mock' }, 'Mock test'))),
      h('div', { class: 'grid grid-4' },
        h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, `${p.today}/${u.dailyGoal}`), h('span', { class: 'k' }, "Today's questions"), h('div', { class: 'bar green', style: { marginTop: '6px' } }, h('i', { style: { width: goalPct + '%' } }))),
        h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, `${p.streak}🔥`), h('span', { class: 'k' }, 'Day streak')),
        h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, p.recent.n ? Math.round(p.recent.right / p.recent.n * 100) + '%' : '—'), h('span', { class: 'k' }, 'Accuracy, 7 days')),
        h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, p.due), h('span', { class: 'k' }, 'Reviews due'))),
      h('div', { class: 'grid grid-2' },
        h('div', { class: 'card' }, h('h3', null, 'Your plan today'), h('p', { class: 'small muted' }, 'Chosen from your weakest skills, due reviews, and how long since your last mock.'),
          h('div', { class: 'list' }, p.recommendations.map(r => h('div', { class: 'item', onclick: () => actionGo(r.action) }, h('div', { class: 'ic' }, { review: '🔁', lesson: '📘', practice: '🎯', mock: '⏱' }[r.type]), h('div', { class: 'grow' }, h('div', { class: 't' }, r.title), h('div', { class: 'd' }, r.why)), h('span', { class: 'muted' }, '›'))))),
        h('div', { class: 'card' }, h('h3', null, 'Mastery by section'), h('p', { class: 'small muted' }, 'Estimated accuracy on test-level questions. Grey means not yet measured.'),
          h('div', { class: 'stack' }, sections.map(([k, s]) => h('div', null, h('div', { class: 'row between small' }, h('b', null, s.name), h('span', { class: 'muted' }, s.mastery === null ? 'not yet measured' : s.mastery + '%')), h('div', { class: 'bar' }, h('i', { style: { width: (s.mastery || 0) + '%', background: masteryColor(s.mastery) } })))))),
      ),
      h('div', { class: 'grid grid-2' },
        h('div', { class: 'card' }, h('h3', null, 'Recent mock tests'), p.mocks.filter(m => m.status === 'completed').length ? h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Date'), h('th', null, 'Tier'), h('th', null, 'Score'), h('th', null, 'Est. %ile'))), h('tbody', null, p.mocks.filter(m => m.status === 'completed').slice(0, 5).map(m => h('tr', { style: { cursor: 'pointer' }, onclick: () => go(`#/mock/${m.id}/results`) }, h('td', null, fmtDate(m.completed_at)), h('td', null, h('span', { class: 'pill' }, state.overview.tiers[m.tier].name)), h('td', null, `${m.results.pct}%`), h('td', null, m.results.percentile))))) : h('p', { class: 'muted small' }, 'No mock tests yet. A baseline mock is the fastest way to find out where you stand.')),
        h('div', { class: 'card' }, h('h3', null, 'Last 8 weeks'), h('p', { class: 'small muted' }, 'Questions per day. Consistency beats cramming: a little every day is what spaced practice needs.'), heatmap(p.daily))));
  });
}
function greeting() { const hr = new Date().getHours(); return hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening'; }
function actionGo(a) { if (a.page === 'lesson') go('#/lesson/' + a.id); else if (a.page === 'practice') go('#/practice' + (a.skill ? '?skill=' + a.skill : '')); else go('#/' + a.page); }
function heatmap(daily) {
  const map = new Map(daily.map(d => [d.day, d.n])); const cells = []; const d = new Date(); d.setDate(d.getDate() - 55);
  for (let i = 0; i < 56; i++) { const k = d.toISOString().slice(0, 10); const n = map.get(k) || 0; cells.push(h('i', { class: n === 0 ? '' : n < 10 ? 'l1' : n < 25 ? 'l2' : n < 50 ? 'l3' : 'l4', title: `${k}: ${n} questions` })); d.setDate(d.getDate() + 1); }
  return h('div', { class: 'heat' }, cells);
}

// ---------- learn ----------
async function renderLearn() {
  await withLoading('learn', async () => {
    const u = state.user; const { lessons } = await get('/api/lessons?test=' + u.targetTest);
    const secs = Object.keys(state.overview.tests[u.targetTest].sections);
    const done = lessons.filter(l => l.progress && l.progress.status === 'completed').length;
    const groups = secs.map(s => [s, lessons.filter(l => l.section === s)]).filter(([, ls]) => ls.length);
    return h('div', { class: 'stack' },
      h('div', { class: 'row between' }, h('div', null, h('h1', null, 'Learn'), h('p', { class: 'muted' }, `Lessons for the ${testName(u.targetTest)}. Each one: the idea, the method, a worked example, a scaffolded try, the traps, and a retrieval check.`)), h('div', { class: 'stat' }, h('span', { class: 'v' }, `${done}/${lessons.length}`), h('span', { class: 'k' }, 'completed'))),
      groups.map(([s, ls]) => h('div', null, h('h2', { style: { margin: '18px 0 10px' } }, sectionName(u.targetTest, s)),
        h('div', { class: 'grid grid-3' }, ls.map(l => h('div', { class: 'card item', style: { alignItems: 'stretch', flexDirection: 'column', gap: '6px' }, onclick: () => go('#/lesson/' + l.id) },
          h('div', { class: 'row between' }, h('span', { class: 'pill' }, l.skillName), l.progress && l.progress.status === 'completed' ? h('span', { class: 'pill green' }, `✓ ${Math.round(l.progress.score * 100)}%`) : l.progress ? h('span', { class: 'pill amber' }, 'started') : null),
          h('div', { class: 't', style: { fontSize: '16px' } }, l.title), h('div', { class: 'd' }, l.objectives[0]), h('div', { class: 'tiny faint' }, `${l.minutes} min · level ${l.level}${l.test === 'all' ? ' · all tests' : ''}`)))))));
  });
}
async function renderLesson(id) {
  await withLoading('learn', async () => {
    const l = await get('/api/lessons/' + id); post('/api/lessons/' + id + '/start');
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
      const pct = Math.round(r.score * 100);
      result.replaceChildren(h('div', { class: 'card', style: { borderColor: pct >= 75 ? 'var(--green)' : 'var(--amber)' } }, h('h2', null, `Check: ${pct}%`), h('p', { class: 'muted' }, pct >= 75 ? 'Solid. The retrieval check is logged; this skill will resurface in Review at the right time.' : 'Worth a second pass: reread the Method and Traps blocks, then drill this skill in Practice.'), h('div', { class: 'row' }, h('a', { class: 'btn btn-primary', href: `#/practice?skill=${l.skill === 'strategy' || l.skill === 'writing' ? '' : l.skill}&section=${l.section}` }, 'Practice this skill'), h('a', { class: 'btn', href: '#/learn' }, 'Back to lessons'))));
      result.scrollIntoView({ behavior: 'smooth' });
    } }, 'Submit check');
    return h('div', { class: 'stack', style: { maxWidth: '820px', margin: '0 auto' } },
      h('a', { href: '#/learn', class: 'small' }, '‹ All lessons'),
      h('div', null, h('div', { class: 'row' }, h('span', { class: 'pill' }, skillName(l.skill)), h('span', { class: 'pill' }, `${l.minutes} min`), h('span', { class: 'pill' }, l.test === 'all' ? 'All tests' : testName(l.test))), h('h1', { style: { marginTop: '8px' } }, l.title)),
      h('div', { class: 'card flat' }, h('h4', null, 'By the end you will be able to'), h('ul', { style: { margin: 0, paddingLeft: '20px' } }, l.objectives.map(o => h('li', null, o)))),
      blocks, h('div', { class: 'center' }, submit), result);
  });
}

// A reusable question card. opts: { number, onSelect, letters }. Returns { el, reveal(result), selected }.
function questionCard(q, opts = {}) {
  let selected = null; const eliminated = new Set();
  const btns = q.choices.map((c, i) => h('button', { class: 'choice', type: 'button', onclick: () => { if (card.locked) return; if (eliminated.has(i)) { eliminated.delete(i); btns[i].classList.remove('eliminated'); return; } selected = i; btns.forEach((b, k) => b.classList.toggle('selected', k === i)); opts.onSelect && opts.onSelect(i); }, oncontextmenu: (e) => { e.preventDefault(); if (card.locked) return; if (eliminated.has(i)) eliminated.delete(i); else eliminated.add(i); btns[i].classList.toggle('eliminated'); } }, h('span', { class: 'l' }, LETTERS[i]), h('span', null, c)));
  const explain = h('div', { class: 'explain hidden' });
  const stem = h('div', { class: 'q-stem' + (isCapsStem(q) ? ' caps' : '') }, (opts.number ? `${opts.number}. ` : '') + q.stem.replace(/^[A-Za-z ]+ set \d+ — /, ''));
  const el = h('div', null, stem, h('div', { class: 'choices' }, btns), explain);
  const card = { el, locked: false, get selected() { return selected; }, set selected(v) { selected = v; btns.forEach((b, k) => b.classList.toggle('selected', k === v)); },
    reveal(r) { card.locked = true; btns.forEach((b, k) => { b.disabled = true; b.classList.remove('eliminated'); if (k === r.answer) b.classList.add('correct'); else if (k === r.choice) b.classList.add('wrong'); }); explain.innerHTML = `<b>${r.correct ? 'Correct.' : r.choice === null || r.choice === undefined ? 'Not answered.' : 'Not quite.'}</b> ${inline(r.explanation || '')}`; explain.classList.remove('hidden'); } };
  return card;
}

// ---------- practice ----------
async function renderPractice(params) {
  await withLoading('practice', async () => {
    const u = state.user; const ov = state.overview; const secSkills = ov.sectionSkills[u.targetTest];
    const sel = { section: params.get('section') || '', skill: params.get('skill') || '', count: 10 };
    if (sel.skill && !sel.section) sel.section = Object.keys(secSkills).find(s => secSkills[s].includes(sel.skill)) || '';
    const panel = h('div');
    const secChips = h('div', { class: 'chips' }); const skillChips = h('div', { class: 'chips' });
    const draw = () => {
      secChips.replaceChildren(h('button', { class: 'chip' + (!sel.section ? ' active' : ''), onclick: () => { sel.section = ''; sel.skill = ''; draw(); } }, 'Adaptive mix (all sections)'), ...Object.keys(secSkills).filter(s => !['writing', 'essay'].includes(s)).map(s => h('button', { class: 'chip' + (sel.section === s ? ' active' : ''), onclick: () => { sel.section = s; sel.skill = ''; draw(); } }, sectionName(u.targetTest, s))));
      const skills = sel.section ? secSkills[sel.section].filter(s => s !== 'writing') : [];
      skillChips.replaceChildren(...(skills.length ? [h('button', { class: 'chip' + (!sel.skill ? ' active' : ''), onclick: () => { sel.skill = ''; draw(); } }, 'All skills in section'), ...skills.map(s => { const r = state.progress && state.progress.skills.find(x => x.skill === s); return h('button', { class: 'chip' + (sel.skill === s ? ' active' : ''), onclick: () => { sel.skill = s; draw(); } }, skillName(s), r ? h('span', { class: 'tiny', style: { marginLeft: '6px', color: masteryColor(r.mastery) } }, `${r.mastery}%`) : null); })] : [h('span', { class: 'small muted' }, 'Pick a section to target one skill, or keep the adaptive mix.')]));
    };
    if (!state.progress) state.progress = await get('/api/progress');
    draw();
    const countSel = h('select', { style: { width: 'auto' }, onchange: (e) => { sel.count = Number(e.target.value); } }, [5, 10, 15, 20, 30].map(n => h('option', { value: n, selected: n === 10 }, `${n} questions`)));
    const start = h('button', { class: 'btn btn-primary btn-lg', onclick: () => runPractice(sel, panel) }, 'Start set');
    panel.append(h('div', { class: 'stack' }, h('div', null, h('h1', null, 'Practice'), h('p', { class: 'muted' }, 'Adaptive sets target ~70% success: hard enough to learn, easy enough to stay motivated. Rate your confidence before you answer; it sharpens your self-knowledge, which is the strongest predictor of score growth.')),
      h('div', { class: 'card stack' }, h('div', null, h('label', null, 'Section'), secChips), h('div', null, h('label', null, 'Skill'), skillChips), h('div', { class: 'row' }, countSel, start, h('span', { class: 'small faint' }, 'Tip: right-click a choice to cross it out.')))));
    return panel;
  });
}
async function runPractice(sel, panel) {
  const u = state.user;
  const qs = new URLSearchParams({ test: u.targetTest, count: sel.count }); if (sel.section) qs.set('section', sel.section); if (sel.skill) qs.set('skill', sel.skill);
  panel.replaceChildren(loading('Building your set…'));
  const { questions } = await get('/api/practice/next?' + qs);
  if (!questions.length) { panel.replaceChildren(h('div', { class: 'alert warn' }, 'No questions available for that selection yet.'), h('a', { class: 'btn', href: '#/practice' }, 'Back')); return; }
  let i = 0; const log = []; let startT = Date.now(); let confidence = null;
  const dots = h('div', { class: 'progress-dots' }, questions.map(() => h('i')));
  const area = h('div'); const summaryEl = h('div');
  const show = () => {
    const q = questions[i]; startT = Date.now(); confidence = null;
    dots.querySelectorAll('i').forEach((d, k) => d.classList.toggle('cur', k === i));
    const card = questionCard(q, {});
    const confBtns = ['Guessing', 'Unsure', 'Fairly sure', 'Certain'].map((t, k) => h('button', { onclick: () => { confidence = k + 1; confBtns.forEach((b, j) => b.classList.toggle('active', j === k)); } }, t));
    const feedback = h('div');
    const submit = h('button', { class: 'btn btn-primary', onclick: async () => {
      if (card.selected === null) { toast('Choose an answer first'); return; }
      submit.disabled = true;
      const r = await post('/api/practice/answer', { servedId: q.servedId, choice: card.selected, seconds: (Date.now() - startT) / 1000, confidence, test: u.targetTest });
      card.reveal({ ...r, choice: card.selected });
      log.push({ q, r, confidence, seconds: (Date.now() - startT) / 1000 });
      dots.querySelectorAll('i')[i].classList.add(r.correct ? 'ok' : 'bad');
      const calib = confidence ? (r.correct && confidence <= 2 ? 'You knew more than you thought. Trust the method.' : !r.correct && confidence >= 3 ? 'Confident but wrong: this is the most important kind of miss. Read the explanation twice and it will come up again in Review.' : '') : '';
      feedback.replaceChildren(h('div', { class: 'row between', style: { marginTop: '12px' } }, h('div', { class: 'small' }, h('span', { class: 'pill ' + (r.rating.delta >= 0 ? 'green' : 'red') }, `${skillName(q.skill)} ${r.rating.delta >= 0 ? '+' : ''}${r.rating.delta} → ${r.rating.mastery}% mastery`), calib ? h('span', { class: 'muted', style: { marginLeft: '10px' } }, calib) : null), h('button', { class: 'btn btn-dark', onclick: next }, i + 1 < questions.length ? 'Next ›' : 'Finish set')));
      feedback.querySelector('button').focus();
    } }, 'Check answer');
    const body = h('div', { class: 'card stack' }, h('div', { class: 'row between small muted' }, h('span', null, `Question ${i + 1} of ${questions.length} · ${skillName(q.skill)} · level ${q.level}`), h('span', null, h('span', { class: 'kbd' }, '1-5'), ' choose · ', h('span', { class: 'kbd' }, 'Enter'), ' check')), card.el, h('div', null, h('label', null, 'How confident are you?'), h('div', { class: 'confidence' }, confBtns)), h('div', { class: 'row' }, submit), feedback);
    area.replaceChildren(q.passage ? h('div', { class: 'split' }, h('div', { class: 'passage' }, h('h3', null, q.passage.title), q.passage.text), body) : body);
    window.onkeydown = (e) => { if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return; const k = parseInt(e.key); if (k >= 1 && k <= q.choices.length && !card.locked) card.selected = k - 1; else if (e.key === 'Enter') { if (!card.locked) submit.click(); else { const b = feedback.querySelector('button'); b && b.click(); } } };
  };
  const next = () => { i++; if (i < questions.length) show(); else finish(); };
  const finish = () => {
    window.onkeydown = null; const right = log.filter(l => l.r.correct).length; const avg = log.reduce((a, l) => a + l.seconds, 0) / Math.max(1, log.length);
    const bySkill = {}; log.forEach(l => { const s = bySkill[l.q.skill] || (bySkill[l.q.skill] = { r: 0, n: 0 }); s.n++; if (l.r.correct) s.r++; });
    const overconf = log.filter(l => !l.r.correct && l.confidence >= 3).length;
    area.replaceChildren(h('div', { class: 'card stack' }, h('h2', null, `Set complete: ${right}/${log.length} (${Math.round(right / log.length * 100)}%)`),
      h('div', { class: 'grid grid-3' }, h('div', { class: 'stat' }, h('span', { class: 'v' }, fmtTime(avg)), h('span', { class: 'k' }, 'avg time / question')), h('div', { class: 'stat' }, h('span', { class: 'v' }, overconf), h('span', { class: 'k' }, 'confident misses')), h('div', { class: 'stat' }, h('span', { class: 'v' }, log.filter(l => !l.r.correct).length), h('span', { class: 'k' }, 'added to Review'))),
      h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Skill'), h('th', null, 'Right'), h('th', null, 'Now'))), h('tbody', null, Object.entries(bySkill).map(([s, v]) => { const last = [...log].reverse().find(l => l.q.skill === s); return h('tr', null, h('td', null, skillName(s)), h('td', null, `${v.r}/${v.n}`), h('td', null, `${last.r.rating.mastery}% mastery`)); }))),
      h('div', { class: 'row' }, h('button', { class: 'btn btn-primary', onclick: () => runPractice(sel, panel) }, 'Another set'), h('a', { class: 'btn', href: '#/practice' }, 'Change focus'), h('a', { class: 'btn', href: '#/review' }, 'Review misses'))));
    state.progress = null;
  };
  panel.replaceChildren(h('div', { class: 'stack' }, h('div', { class: 'row between' }, h('a', { href: '#/practice', class: 'small', onclick: () => { window.onkeydown = null; } }, '‹ Change focus'), dots), area, summaryEl));
  show();
}

// ---------- mock tests ----------
async function renderMockHome() {
  await withLoading('mock', async () => {
    const u = state.user; const o = await get('/api/mock/options?test=' + u.targetTest);
    const sel = { test: u.targetTest, variant: u.variant, tier: o.recommended.tier, length: 'full', section: '' };
    const bpList = h('div'); const tierWrap = h('div', { class: 'grid grid-4' }); const secSel = h('div');
    const drawBp = () => { const secs = o.blueprint[sel.variant] || []; const f = sel.length === 'half' ? 0.5 : 1; const shown = sel.length === 'section' ? secs.filter(s => s.section === (sel.section || secs[0].section)) : secs; const totalQ = shown.reduce((a, s) => a + (s.writing ? 0 : Math.round(s.count * f)), 0), totalM = shown.reduce((a, s) => a + Math.max(5, Math.round(s.minutes * f)), 0); bpList.replaceChildren(h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Section'), h('th', null, 'Questions'), h('th', null, 'Minutes'))), h('tbody', null, shown.map(s => h('tr', null, h('td', null, s.label || sectionName(sel.test, s.section)), h('td', null, s.writing ? 'prompt' : Math.round(s.count * f)), h('td', null, Math.max(5, Math.round(s.minutes * f))))), h('tr', null, h('td', null, h('b', null, 'Total')), h('td', null, h('b', null, totalQ)), h('td', null, h('b', null, `${totalM} min`)))))); };
    const drawTiers = () => tierWrap.replaceChildren(...Object.entries(o.tiers).map(([k, t]) => h('div', { class: 'tier' + (sel.tier === k ? ' active' : ''), onclick: () => { sel.tier = k; drawTiers(); } }, h('div', { class: 'row between' }, h('b', null, t.name), k === o.recommended.tier ? h('span', { class: 'pill green' }, 'Recommended') : null), h('div', { class: 'small muted' }, t.desc))));
    const drawSec = () => { if (sel.length !== 'section') { secSel.replaceChildren(); return; } const secs = o.blueprint[sel.variant] || []; if (!sel.section) sel.section = secs[0].section; secSel.replaceChildren(h('label', null, 'Which section?'), h('div', { class: 'chips' }, secs.map((s, i) => h('button', { class: 'chip' + (sel.section === s.section && (s.label || '') === (secs.find(x => x.section === sel.section).label || '') ? ' active' : ''), onclick: () => { sel.section = s.section; drawSec(); drawBp(); } }, s.label || sectionName(sel.test, s.section))))); };
    drawTiers(); drawBp(); drawSec();
    const variantSel = h('select', { style: { width: 'auto' }, onchange: (e) => { sel.variant = e.target.value; sel.section = ''; drawBp(); drawSec(); } }, Object.entries(o.variants).map(([k, v]) => h('option', { value: k, selected: k === sel.variant }, v)));
    const lengthChips = h('div', { class: 'chips' }, [['full', 'Full-length (official timing)'], ['half', 'Half-length'], ['section', 'Single section']].map(([k, t]) => h('button', { class: 'chip' + (sel.length === k ? ' active' : ''), onclick: () => { sel.length = k; lengthChips.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.textContent === t)); drawBp(); drawSec(); } }, t)));
    const startBtn = h('button', { class: 'btn btn-primary btn-lg', onclick: async () => { startBtn.disabled = true; try { const r = await post('/api/mock/start', sel); go('#/mock/' + r.id); } catch (e) { toast(e.message); startBtn.disabled = false; } } }, 'Begin test');
    const history = (state.progress && state.progress.mocks) || (await get('/api/mocks')).mocks;
    return h('div', { class: 'stack' },
      h('div', null, h('h1', null, 'Mock tests'), h('p', { class: 'muted' }, 'Real section order, question counts and timing. The timer runs per section and the test auto-advances, exactly like test day. Answers save as you go, so a closed tab does not lose a test.')),
      o.inProgress ? h('div', { class: 'alert info row between' }, h('span', null, `You have a ${state.overview.tiers[o.inProgress.tier].name} ${testName(o.inProgress.test)} test in progress (section ${o.inProgress.section_index + 1}).`), h('div', { class: 'row' }, h('a', { class: 'btn btn-sm btn-primary', href: '#/mock/' + o.inProgress.id }, 'Resume'), h('button', { class: 'btn btn-sm', onclick: async () => { await post(`/api/mock/${o.inProgress.id}/abandon`); renderMockHome(); } }, 'Discard'))) : null,
      h('div', { class: 'card stack' },
        h('div', { class: 'row' }, h('div', null, h('label', null, 'Test level'), variantSel), h('div', { class: 'grow' }, h('label', null, 'Length'), lengthChips)), secSel,
        h('div', null, h('label', null, 'Difficulty tier'), tierWrap, h('p', { class: 'small muted', style: { marginTop: '8px' } }, `Recommendation: ${o.recommended.reason}`)),
        h('div', { class: 'grid grid-2' }, h('div', null, h('label', null, 'What you will take'), bpList), h('div', { class: 'card flat' }, h('h4', null, 'Before you begin'), h('ul', { class: 'small', style: { paddingLeft: '18px', margin: 0 } }, h('li', null, 'Scratch paper and a pencil. No calculator (none is allowed on these tests).'), h('li', null, 'Phone away; a quiet room. The value of a mock is realistic conditions.'), h('li', null, state.overview.tests[sel.test].penalty ? 'SSAT scoring: +1 right, −¼ wrong, 0 blank. Guess only when you can eliminate at least one choice.' : 'No guessing penalty: never leave a question blank.'), h('li', null, 'Flag questions you are unsure of and return to them if time remains.')))),
        h('div', { class: 'row' }, startBtn)),
      history.filter(m => m.status === 'completed').length ? h('div', { class: 'card' }, h('h3', null, 'Past tests'), h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Date'), h('th', null, 'Test'), h('th', null, 'Tier'), h('th', null, 'Length'), h('th', null, 'Score'), h('th', null, 'Est. percentile'))), h('tbody', null, history.filter(m => m.status === 'completed').map(m => h('tr', { style: { cursor: 'pointer' }, onclick: () => go(`#/mock/${m.id}/results`) }, h('td', null, fmtDate(m.completed_at)), h('td', null, `${testName(m.test)} ${m.variant}`), h('td', null, state.overview.tiers[m.tier].name), h('td', null, m.length), h('td', null, `${m.results.totalRight}/${m.results.totalCount} (${m.results.pct}%)`), h('td', null, m.results.percentile)))))) : null);
  });
}
let mockTimer = null;
async function renderMockRun(id) {
  clearInterval(mockTimer); window.onkeydown = null;
  await withLoading('mock', async () => {
    const m = await get('/api/mock/' + id);
    if (m.status !== 'in_progress') { go(`#/mock/${id}/results`); return loading(); }
    const cur = m.current; const u = state.user; const penalty = state.overview.tests[m.test].penalty;
    const responses = { ...cur.responses }; const flagged = new Set(); let idx = 0; let intro = true; let remaining = cur.remaining;
    const root = h('div', { class: 'stack' });
    const timerEl = h('span', { class: 'timer' }, fmtTime(remaining));
    const save = (() => { let t; const pending = {}; return (k, v) => { pending[k] = v; clearTimeout(t); t = setTimeout(async () => { const batch = { ...pending }; for (const kk in pending) delete pending[kk]; try { await post(`/api/mock/${id}/answer`, { responses: batch }); } catch (e) { toast('Could not save: ' + e.message); } }, 400); }; })();
    const flushSave = () => post(`/api/mock/${id}/answer`, { responses }).catch(() => {});
    const endSection = async (auto) => { clearInterval(mockTimer); window.onkeydown = null; await flushSave(); const r = await post(`/api/mock/${id}/next`); if (r.status === 'completed') go(`#/mock/${id}/results`); else { toast(auto ? 'Time is up. Moving to the next section.' : 'Section submitted.'); renderMockRun(id); } };
    const tick = () => { remaining--; timerEl.textContent = fmtTime(Math.max(0, remaining)); timerEl.classList.toggle('low', remaining <= 120); if (remaining <= 0) endSection(true); };
    const startTimer = () => { clearInterval(mockTimer); mockTimer = setInterval(tick, 1000); };
    const header = (extra) => h('div', { class: 'mock-bar' }, h('b', null, `${testName(m.test)} · ${cur.label}`), h('span', { class: 'small muted' }, `Section ${m.sectionIndex + 1} of ${m.sectionCount}`), h('span', { class: 'grow' }), extra, timerEl);
    const palette = h('div', { class: 'palette' });
    const drawPalette = () => palette.replaceChildren(...cur.questions.map((q, k) => h('button', { class: (Number.isInteger(responses[q.id]) ? 'answered ' : '') + (flagged.has(q.id) ? 'flagged ' : '') + (k === idx ? 'current' : ''), onclick: () => { idx = k; drawQ(); } }, k + 1)));
    const qArea = h('div');
    const drawQ = () => {
      const q = cur.questions[idx]; drawPalette();
      const card = questionCard(q, { number: idx + 1, onSelect: (c) => { responses[q.id] = c; save(q.id, c); drawPalette(); } });
      if (Number.isInteger(responses[q.id])) card.selected = responses[q.id];
      const clearBtn = h('button', { class: 'btn btn-sm btn-ghost', onclick: () => { delete responses[q.id]; save(q.id, null); card.selected = null; drawPalette(); } }, 'Clear');
      const flagBtn = h('button', { class: 'btn btn-sm' + (flagged.has(q.id) ? ' btn-dark' : ''), onclick: () => { flagged.has(q.id) ? flagged.delete(q.id) : flagged.add(q.id); drawQ(); } }, flagged.has(q.id) ? '⚑ Flagged' : '⚐ Flag');
      const body = h('div', { class: 'card stack' }, h('div', { class: 'row between small muted' }, h('span', null, skillName(q.skill)), h('div', { class: 'row' }, clearBtn, flagBtn)), card.el,
        h('div', { class: 'row between' }, h('button', { class: 'btn', disabled: idx === 0, onclick: () => { idx--; drawQ(); } }, '‹ Previous'), idx + 1 < cur.questions.length ? h('button', { class: 'btn btn-dark', onclick: () => { idx++; drawQ(); } }, 'Next ›') : h('button', { class: 'btn btn-primary', onclick: confirmEnd }, 'Submit section')));
      const passage = q.passageId && cur.passages[q.passageId];
      qArea.replaceChildren(passage ? h('div', { class: 'split' }, h('div', { class: 'passage sticky-side' }, h('h3', null, passage.title), passage.text), body) : body);
      window.onkeydown = (e) => { if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return; const k = parseInt(e.key); if (k >= 1 && k <= q.choices.length) { card.selected = k - 1; responses[q.id] = k - 1; save(q.id, k - 1); drawPalette(); } else if (e.key === 'ArrowRight' && idx + 1 < cur.questions.length) { idx++; drawQ(); } else if (e.key === 'ArrowLeft' && idx > 0) { idx--; drawQ(); } else if (e.key.toLowerCase() === 'f') flagBtn.click(); };
    };
    const confirmEnd = () => { const blank = cur.writing ? 0 : cur.questions.filter(q => !Number.isInteger(responses[q.id])).length; if (confirm(`Submit this section${blank ? ` with ${blank} unanswered question${blank > 1 ? 's' : ''}` : ''}? You cannot return to it.`)) endSection(false); };
    const renderSection = () => {
      intro = false; startTimer();
      if (cur.writing) {
        const key = `w:${cur.section}`; const ta = h('textarea', { class: 'editor', placeholder: 'Plan for 2–3 minutes, then write. Your work saves automatically.', oninput: (e) => { responses[key] = e.target.value; save(key, e.target.value); wc.textContent = `${e.target.value.trim().split(/\s+/).filter(Boolean).length} words`; } }, responses[key] || '');
        const wc = h('span', { class: 'small muted' }, `${(responses[key] || '').trim().split(/\s+/).filter(Boolean).length} words`);
        root.replaceChildren(header(wc), h('div', { class: 'split' }, h('div', { class: 'card' }, h('h3', null, 'Prompt'), h('p', { class: 'serif', style: { fontSize: '18px' } }, cur.prompt.prompt), cur.prompt.tips ? h('div', null, h('h4', null, 'Reminders'), h('ul', { class: 'small', style: { paddingLeft: '18px' } }, cur.prompt.tips.map(t => h('li', null, t)))) : null), h('div', { class: 'card stack' }, ta, h('div', { class: 'row between' }, h('span', { class: 'small faint' }, 'Spelling and handwriting are not graded on the real test; ideas, organization and voice are.'), h('button', { class: 'btn btn-primary', onclick: confirmEnd }, 'Submit section')))));
        return;
      }
      root.replaceChildren(header(h('button', { class: 'btn btn-sm', onclick: confirmEnd }, 'Submit section')), h('div', { class: 'grid', style: { gridTemplateColumns: 'minmax(0,1fr) 220px' } }, qArea, h('div', { class: 'card tight sticky-side' }, h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'Questions'), palette, h('div', { class: 'tiny faint', style: { marginTop: '10px' } }, h('span', { class: 'kbd' }, '←'), ' ', h('span', { class: 'kbd' }, '→'), ' move · ', h('span', { class: 'kbd' }, 'F'), ' flag'))));
      drawQ();
    };
    // Section intro screen (timer does not start until the student begins; the server clock already started at section open, so we show remaining honestly)
    root.replaceChildren(h('div', { class: 'card stack', style: { maxWidth: '640px', margin: '40px auto' } }, h('div', { class: 'pill' }, `Section ${m.sectionIndex + 1} of ${m.sectionCount}`), h('h1', null, cur.label), h('p', { class: 'muted' }, cur.writing ? `${cur.minutes} minutes. One prompt. Plan briefly, write a full response, and leave two minutes to reread.` : `${cur.questions.length} questions · ${cur.minutes} minutes · about ${Math.round(cur.minutes * 60 / cur.questions.length)} seconds per question.`),
      h('ul', { class: 'small muted', style: { paddingLeft: '18px' } }, h('li', null, penalty ? 'Wrong answers cost ¼ point. Skip only when you cannot eliminate anything.' : 'No penalty for wrong answers. Answer everything.'), h('li', null, 'The timer is already running for this section; it keeps going even if you close the page.'), h('li', null, 'Use the question palette to jump around and flag items to revisit.')),
      h('div', { class: 'row' }, h('button', { class: 'btn btn-primary btn-lg', onclick: renderSection }, 'Start section'), h('a', { class: 'btn btn-ghost', href: '#/mock' }, 'Pause & exit'))));
    remaining = cur.remaining; startTimer();
    return root;
  });
}
async function renderMockResults(id) {
  clearInterval(mockTimer); window.onkeydown = null;
  await withLoading('mock', async () => {
    const r = await get(`/api/mock/${id}/results` + (viewingStudent() ? `?student=${viewingStudent()}` : '')); const R = r.results; state.progress = null;
    const ring = (pct, size = 140) => { const rad = 56, c = 2 * Math.PI * rad; return svg({ class: 'score-ring', viewBox: '0 0 140 140' }, `<circle cx="70" cy="70" r="${rad}" fill="none" stroke="var(--surface-2)" stroke-width="12"/><circle cx="70" cy="70" r="${rad}" fill="none" stroke="${masteryColor(pct)}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}" transform="rotate(-90 70 70)"/><text x="70" y="66" text-anchor="middle" font-size="30" font-weight="700" fill="var(--text)">${pct}%</text><text x="70" y="88" text-anchor="middle" font-size="12" fill="var(--muted)">correct</text>`); };
    const secTabs = R.sections.filter(s => !s.writing); let cur = 0; const reviewArea = h('div');
    const drawReview = () => {
      const s = secTabs[cur]; if (!s) return;
      const list = h('div', { class: 'stack' });
      const filterSel = { mode: 'all' };
      const draw = () => list.replaceChildren(...s.items.filter(it => filterSel.mode === 'all' || (filterSel.mode === 'wrong' && !it.correct)).map(it => { const card = questionCard({ stem: it.stem, choices: it.choices }, { number: it.n }); card.reveal({ correct: it.correct, answer: it.answer, choice: it.choice, explanation: it.explanation }); const passage = it.passageId && s.passages && s.passages[it.passageId]; return h('div', { class: 'card' }, h('div', { class: 'row between small muted', style: { marginBottom: '8px' } }, h('span', null, `${skillName(it.skill)} · level ${it.level}`), h('span', { class: 'pill ' + (it.correct ? 'green' : it.choice === null ? 'amber' : 'red') }, it.correct ? 'Correct' : it.choice === null ? 'Blank' : 'Wrong')), passage ? h('details', null, h('summary', { class: 'small' }, `Passage: ${passage.title}`), h('div', { class: 'passage', style: { marginTop: '8px' } }, passage.text)) : null, card.el); }));
      draw();
      reviewArea.replaceChildren(h('div', { class: 'tabs' }, secTabs.map((t, k) => h('button', { class: k === cur ? 'active' : '', onclick: () => { cur = k; drawReview(); } }, `${t.label} (${t.right}/${t.count})`))), h('div', { class: 'row', style: { marginBottom: '12px' } }, h('div', { class: 'chips' }, [['all', 'All questions'], ['wrong', 'Wrong & blank only']].map(([k, t]) => h('button', { class: 'chip' + (filterSel.mode === k ? ' active' : ''), onclick: (e) => { filterSel.mode = k; e.target.parentElement.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === e.target)); draw(); } }, t)))), list);
    };
    drawReview();
    const writing = R.sections.find(s => s.writing);
    return h('div', { class: 'stack' },
      h('div', { class: 'row between' }, h('div', null, h('a', { href: '#/mock', class: 'small' }, '‹ Mock tests'), h('h1', null, `${testName(r.test)} ${state.overview.tests[r.test].variants[r.variant] || r.variant} · ${state.overview.tiers[r.tier].name} tier`), h('p', { class: 'muted' }, `${fmtDate(r.completedAt)} · ${r.length === 'section' ? 'single section' : r.length + '-length'}`))),
      h('div', { class: 'card' }, h('div', { class: 'row', style: { gap: '28px', alignItems: 'center' } }, ring(R.pct), h('div', { class: 'grid grid-3 grow' },
        h('div', { class: 'stat' }, h('span', { class: 'v' }, `${R.totalRight}/${R.totalCount}`), h('span', { class: 'k' }, 'correct')),
        h('div', { class: 'stat' }, h('span', { class: 'v' }, R.penalty ? R.raw : R.totalBlank), h('span', { class: 'k' }, R.penalty ? 'raw score (−¼ per wrong)' : 'left blank')),
        h('div', { class: 'stat' }, h('span', { class: 'v' }, `~${R.percentile}`), h('span', { class: 'k' }, 'est. percentile')))),
        h('p', { class: 'tiny faint', style: { marginTop: '10px' } }, 'The percentile is an estimate from percent correct adjusted for tier difficulty. It is a study signal, not an official score; real scaled scores depend on the specific form and norm group.')),
      h('div', { class: 'grid grid-2' },
        h('div', { class: 'card' }, h('h3', null, 'By section'), h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Section'), h('th', null, 'Right'), h('th', null, 'Wrong'), h('th', null, 'Blank'), h('th', null, '%'), h('th', null, 'Est. %ile'))), h('tbody', null, R.sections.map(s => s.writing ? h('tr', null, h('td', null, s.label), h('td', { colspan: 5, class: 'muted' }, `${s.wordCount} words written (not scored)`)) : h('tr', null, h('td', null, s.label), h('td', null, s.right), h('td', null, s.wrong), h('td', null, s.blank), h('td', null, h('b', null, `${s.pct}%`)), h('td', null, s.percentile)))))),
        h('div', { class: 'card' }, h('h3', null, 'What to work on'), R.weakest.length ? h('div', { class: 'stack' }, h('div', null, h('h4', null, 'Weakest skills'), R.weakest.map(s => h('div', { class: 'row between', style: { padding: '6px 0' } }, h('span', null, s.name), h('div', { class: 'row' }, h('span', { class: 'pill red' }, `${s.right}/${s.total}`), h('a', { class: 'btn btn-sm', href: `#/practice?skill=${s.skill}` }, 'Drill'))))), h('div', null, h('h4', null, 'Strongest'), h('div', { class: 'row' }, R.strongest.map(s => h('span', { class: 'pill green' }, `${s.name} ${s.pct}%`))))) : h('p', { class: 'muted small' }, 'Not enough questions per skill to rank.'))),
      writing && writing.text ? h('div', { class: 'card' }, h('h3', null, 'Your writing sample'), h('p', { class: 'small muted' }, `${writing.wordCount} words. Use the rubric in the Writing page to self-score; schools read this sample alongside your scores.`), h('div', { class: 'passage', style: { maxHeight: '300px' } }, writing.text)) : null,
      h('div', null, h('h2', null, 'Question review'), h('p', { class: 'muted small' }, 'Every explanation names the method and the trap. Rework each miss on paper before reading the explanation; that effort is what makes it stick.'), reviewArea));
  });
}

// ---------- review (spaced repetition) ----------
async function renderReview() {
  await withLoading('review', async () => {
    const { items, counts } = await get('/api/review/due?limit=30');
    const root = h('div', { class: 'stack' });
    const head = h('div', { class: 'row between' }, h('div', null, h('h1', null, 'Review'), h('p', { class: 'muted' }, 'Spaced repetition: items come back right before you would forget them. Missed questions and your vocabulary deck live here.')), h('div', { class: 'row' }, h('div', { class: 'stat' }, h('span', { class: 'v' }, counts.due), h('span', { class: 'k' }, 'due now')), h('div', { class: 'stat' }, h('span', { class: 'v' }, counts.total), h('span', { class: 'k' }, 'in rotation')), h('a', { class: 'btn', href: '#/vocab' }, 'Vocabulary deck')));
    root.append(head);
    if (!items.length) { root.append(h('div', { class: 'card center', style: { padding: '40px' } }, h('h2', null, 'Nothing due right now'), h('p', { class: 'muted' }, counts.total ? 'Come back later; the schedule is set. Meanwhile, practice adds new material.' : 'Your review queue fills automatically with practice misses. Add vocabulary to get started.'), h('div', { class: 'row', style: { justifyContent: 'center' } }, h('a', { class: 'btn btn-primary', href: '#/vocab' }, 'Add vocabulary'), h('a', { class: 'btn', href: '#/practice' }, 'Practice')))); return root; }
    let i = 0; let doneCount = 0; const area = h('div'); const prog = h('div', { class: 'bar blue' }, h('i', { style: { width: '0%' } }));
    const grade = async (key, quality, extra) => { const r = await post('/api/review/grade', { key, quality, ...extra }); doneCount++; prog.firstChild.style.width = Math.round(doneCount / items.length * 100) + '%'; return r; };
    const show = () => {
      if (i >= items.length) { area.replaceChildren(h('div', { class: 'card center', style: { padding: '40px' } }, h('h2', null, 'Session complete'), h('p', { class: 'muted' }, `${doneCount} items reviewed. Each one is rescheduled based on how well you knew it.`), h('button', { class: 'btn btn-primary', onclick: renderReview }, 'Check for more'))); return; }
      const it = items[i];
      if (it.kind === 'vocab') {
        const v = it.vocab; let flipped = false; const startT = Date.now();
        const back = h('div', { class: 'hidden stack' }, h('div', { class: 'def' }, h('span', { class: 'muted small' }, v.pos, ' · '), v.definition), h('div', { class: 'small muted serif' }, `“${v.example}”`), v.synonyms && v.synonyms.length ? h('div', { class: 'small' }, h('b', null, 'Synonyms: '), v.synonyms.join(', '), v.antonyms && v.antonyms.length ? [' · ', h('b', null, 'Antonyms: '), v.antonyms.join(', ')] : null) : null, v.roots ? h('div', { class: 'tiny faint' }, v.roots) : null);
        const gradeBar = h('div', { class: 'row hidden', style: { justifyContent: 'center' } }, [[1, 'Forgot', 'red'], [3, 'Hard', 'amber'], [4, 'Good', 'blue'], [5, 'Easy', 'green']].map(([qv, t, c]) => h('button', { class: 'btn', style: { borderColor: `var(--${c})`, color: `var(--${c})` }, onclick: async () => { await grade(it.key, qv, { seconds: (Date.now() - startT) / 1000 }); i++; show(); } }, t)));
        const card = h('div', { class: 'flashcard', onclick: () => { if (flipped) return; flipped = true; back.classList.remove('hidden'); gradeBar.classList.remove('hidden'); hint.textContent = 'How well did you know it?'; } }, h('div', { class: 'w' }, v.word), back);
        const hint = h('p', { class: 'small muted center' }, 'Say the definition out loud, then tap to flip.');
        area.replaceChildren(h('div', { class: 'stack', style: { maxWidth: '640px', margin: '0 auto' } }, h('div', { class: 'small muted center' }, `${i + 1} of ${items.length} · vocabulary · level ${v.level}`), card, hint, gradeBar));
        window.onkeydown = (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!flipped) card.click(); } const k = parseInt(e.key); if (flipped && k >= 1 && k <= 4) gradeBar.children[k - 1].click(); };
      } else {
        const q = it.question; const startT = Date.now(); const card = questionCard(q, {}); const fb = h('div');
        const submit = h('button', { class: 'btn btn-primary', onclick: async () => { if (card.selected === null) return toast('Choose an answer'); submit.disabled = true; const r = await grade(it.key, null, { choice: card.selected, seconds: (Date.now() - startT) / 1000 }); card.reveal({ ...r.feedback, choice: card.selected }); fb.replaceChildren(h('div', { class: 'row between', style: { marginTop: '10px' } }, h('span', { class: 'small muted' }, r.feedback.correct ? `Next review in ${r.next.interval_days < 1 ? 'a few hours' : Math.round(r.next.interval_days) + ' day(s)'}.` : 'Back again soon. Rework it on paper first next time.'), h('button', { class: 'btn btn-dark', onclick: () => { i++; show(); } }, 'Next ›'))); } }, 'Check');
        const body = h('div', { class: 'card stack' }, h('div', { class: 'small muted' }, `${i + 1} of ${items.length} · ${skillName(q.skill)} · ${it.reps === 0 ? 'missed recently' : `review #${it.reps + 1}`}`), card.el, h('div', { class: 'row' }, submit), fb);
        area.replaceChildren(it.passage ? h('div', { class: 'split' }, h('div', { class: 'passage' }, h('h3', null, it.passage.title), it.passage.text), body) : body);
        window.onkeydown = (e) => { const k = parseInt(e.key); if (k >= 1 && k <= q.choices.length && !card.locked) card.selected = k - 1; else if (e.key === 'Enter') { if (!card.locked) submit.click(); else { const b = fb.querySelector('button'); b && b.click(); } } };
      }
    };
    root.append(prog, area); show(); return root;
  });
}
async function renderVocab(params) {
  await withLoading('review', async () => {
    let level = Number(params.get('level')) || 0;
    const root = h('div', { class: 'stack' });
    const draw = async () => {
      const { words, levels } = await get('/api/vocab' + (level ? '?level=' + level : ''));
      root.replaceChildren(h('div', { class: 'row between' }, h('div', null, h('a', { href: '#/review', class: 'small' }, '‹ Review'), h('h1', null, 'Vocabulary deck'), h('p', { class: 'muted' }, 'High-yield words for all three tests, tiered by difficulty. Add a level to your deck and it enters spaced review. The Learn page has a lesson on how to make words stick.')), null),
        h('div', { class: 'grid grid-4' }, levels.map(l => h('div', { class: 'card tight' }, h('div', { class: 'row between' }, h('b', null, `Level ${l.level}`), h('span', { class: 'small muted' }, `${l.added}/${l.count} in deck`)), h('div', { class: 'bar blue', style: { margin: '8px 0' } }, h('i', { style: { width: Math.round(l.added / Math.max(1, l.count) * 100) + '%' } })), h('div', { class: 'row' }, h('button', { class: 'btn btn-sm', onclick: () => { level = l.level; draw(); } }, 'Browse'), l.added < l.count ? h('button', { class: 'btn btn-sm btn-primary', onclick: async () => { const r = await post('/api/vocab/add', { level: l.level }); toast(`Added ${r.added} words to your deck`); draw(); } }, 'Add all') : h('span', { class: 'pill green' }, '✓ added'))))),
        h('div', { class: 'card' }, h('div', { class: 'row between' }, h('h3', null, level ? `Level ${level} words` : 'All words'), h('div', { class: 'chips' }, h('button', { class: 'chip' + (!level ? ' active' : ''), onclick: () => { level = 0; draw(); } }, 'All'), [1, 2, 3, 4, 5].map(l => h('button', { class: 'chip' + (level === l ? ' active' : ''), onclick: () => { level = l; draw(); } }, `L${l}`)))),
          h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'Word'), h('th', null, 'Meaning'), h('th', null, 'Example'), h('th', null, ''))), h('tbody', null, words.map(w => h('tr', null, h('td', null, h('b', { class: 'serif' }, w.word), h('div', { class: 'tiny faint' }, w.pos)), h('td', null, w.definition, w.synonyms && w.synonyms.length ? h('div', { class: 'tiny muted' }, '≈ ' + w.synonyms.join(', ')) : null), h('td', { class: 'small muted serif' }, w.example), h('td', null, w.inDeck ? h('span', { class: 'pill green' }, 'in deck') : h('button', { class: 'btn btn-sm', onclick: async (e) => { await post('/api/vocab/add', { words: [w.word] }); e.target.replaceWith(h('span', { class: 'pill green' }, 'in deck')); } }, '+ Add'))))))));
    };
    await draw(); return root;
  });
}

// ---------- writing ----------
async function renderWriting(params) {
  await withLoading('writing', async () => {
    const u = state.user; const { prompts } = await get('/api/writing/prompts?test=' + u.targetTest); const { submissions } = await get('/api/writing/mine');
    const root = h('div', { class: 'stack' });
    const list = () => root.replaceChildren(h('div', null, h('h1', null, 'Writing'), h('p', { class: 'muted' }, u.targetTest === 'hspt' ? 'The HSPT has no essay, but many schools request a writing sample. These persuasive prompts build the skill.' : u.targetTest === 'ssat' ? 'The SSAT writing sample is unscored but sent to schools. Practice timed, then self-score with the rubric.' : 'The ISEE essay is unscored but sent to every school you apply to. Practice under time with real prompts.')),
      h('div', { class: 'grid grid-2' }, prompts.map(p => h('div', { class: 'card item', style: { flexDirection: 'column', alignItems: 'stretch', gap: '6px' }, onclick: () => editor(p) }, h('div', { class: 'row' }, h('span', { class: 'pill' }, p.type), h('span', { class: 'pill' }, `${p.minutes} min`), h('span', { class: 'pill' }, `level ${p.level}`)), h('div', { class: 'serif', style: { fontSize: '16px' } }, p.prompt)))),
      submissions.length ? h('div', { class: 'card' }, h('h3', null, 'Your past responses'), h('div', { class: 'list' }, submissions.map(s => h('details', null, h('summary', { class: 'small' }, `${fmtDate(s.createdAt)} · ${s.wordCount} words · ${prompts.find(p => p.id === s.promptId) ? prompts.find(p => p.id === s.promptId).prompt.slice(0, 80) + '…' : s.promptId}`), h('div', { class: 'passage', style: { marginTop: '8px', maxHeight: '240px' } }, s.text))))) : null);
    const editor = (p) => {
      let secs = p.minutes * 60; const timer = h('span', { class: 'timer' }, fmtTime(secs)); const startT = Date.now();
      const iv = setInterval(() => { secs--; timer.textContent = fmtTime(Math.max(0, secs)); timer.classList.toggle('low', secs <= 120); if (secs <= 0) { clearInterval(iv); toast('Time! Finish your sentence and submit.'); } }, 1000);
      const ta = h('textarea', { class: 'editor', placeholder: 'Plan first: thesis or story arc, two specific examples or scenes, a closing line. Then write.', oninput: (e) => { wc.textContent = `${e.target.value.trim().split(/\s+/).filter(Boolean).length} words`; } });
      const wc = h('span', { class: 'small muted' }, '0 words'); const out = h('div');
      const rubric = h('div', { class: 'stack' }, p.rubric.map((r, k) => { const sel = h('select', { style: { width: 'auto' }, dataset: { k } }, [1, 2, 3, 4, 5].map(n => h('option', { value: n, selected: n === 3 }, n))); return h('div', { class: 'row between small' }, h('span', { class: 'grow' }, r), sel); }));
      const submit = h('button', { class: 'btn btn-primary', onclick: async () => { try { const scores = [...rubric.querySelectorAll('select')].map(s => Number(s.value)); const r = await post('/api/writing/submit', { promptId: p.id, text: ta.value, minutes: (Date.now() - startT) / 60000, selfScores: scores }); clearInterval(iv); out.replaceChildren(h('div', { class: 'card', style: { borderColor: 'var(--gold)' } }, h('h3', null, 'Feedback'), h('div', { class: 'row small muted' }, h('span', null, `${r.wordCount} words`), h('span', null, `${r.paragraphs} paragraphs`), h('span', null, `${r.sentences} sentences, avg ${r.avgSentenceLength} words`), h('span', null, `self-score ${Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10}/5`)), h('ul', null, r.tips.map(t => h('li', null, t))), h('p', { class: 'small muted' }, 'Next step: read it aloud once, then rewrite your opening paragraph only. Openings improve fastest with deliberate practice.'), h('button', { class: 'btn', onclick: () => renderWriting(params) }, 'Back to prompts'))); out.scrollIntoView({ behavior: 'smooth' }); } catch (e) { toast(e.message); } } }, 'Submit & get feedback');
      root.replaceChildren(h('div', { class: 'mock-bar' }, h('a', { href: '#/writing', class: 'small', onclick: () => clearInterval(iv) }, '‹ Prompts'), h('b', null, p.type === 'creative' ? 'Creative writing' : p.type === 'essay' ? 'Essay' : 'Persuasive essay'), h('span', { class: 'grow' }), wc, timer),
        h('div', { class: 'split' }, h('div', { class: 'stack' }, h('div', { class: 'card' }, h('h3', null, 'Prompt'), h('p', { class: 'serif', style: { fontSize: '18px' } }, p.prompt), h('h4', null, 'How to approach it'), h('ul', { class: 'small', style: { paddingLeft: '18px' } }, p.tips.map(t => h('li', null, t)))), h('div', { class: 'card' }, h('h3', null, 'Self-score when done (1–5)'), h('p', { class: 'small muted' }, 'Honest self-assessment against a rubric is one of the best-documented ways to improve writing.'), rubric)), h('div', { class: 'stack' }, h('div', { class: 'card stack' }, ta, h('div', { class: 'row' }, submit)), out)));
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
    _viewingStudent = params.get('student') ? Number(params.get('student')) : null;
    const p = await get('/api/progress' + (_viewingStudent ? `?student=${_viewingStudent}` : '')); if (!_viewingStudent) state.progress = p;
    const t = p.user; const sections = Object.entries(p.bySection).filter(([k]) => !['writing', 'essay'].includes(k));
    const trend = p.daily.slice(-28); const maxN = Math.max(1, ...trend.map(d => d.n));
    const spark = (vals, color) => { if (vals.length < 2) return h('div', { class: 'small muted' }, 'More data needed.'); const w = 600, hh = 60; const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * w},${hh - 4 - v * (hh - 8)}`).join(' '); return svg({ class: 'sparkline', viewBox: `0 0 ${w} ${hh}`, preserveAspectRatio: 'none' }, `<polyline fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" points="${pts}"/>`); };
    const accVals = trend.map(d => d.n ? d.right / d.n : 0);
    const mocks = p.mocks.filter(m => m.status === 'completed').reverse();
    return h('div', { class: 'stack' },
      h('div', { class: 'row between' }, h('div', null, h('h1', null, _viewingStudent ? `${t.displayName}'s progress` : 'Your progress'), h('p', { class: 'muted' }, `${testName(p.test)} · ${p.totals.n} questions answered all-time · ${Math.round((p.totals.secs || 0) / 60)} minutes of focused work`)),
        students.length || u.role !== 'student' ? h('div', null, h('label', null, 'View'), h('select', { style: { width: 'auto' }, onchange: (e) => go('#/progress' + (e.target.value ? '?student=' + e.target.value : '')) }, h('option', { value: '' }, 'Me'), students.map(s => h('option', { value: s.id, selected: s.id === _viewingStudent }, s.displayName)))) : null),
      (u.role === 'parent' && !students.length) ? h('div', { class: 'alert info' }, 'Link a student from Settings using their share code to see their progress here.') : null,
      h('div', { class: 'grid grid-4' }, h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, p.streak), h('span', { class: 'k' }, 'day streak')), h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, p.totals.n ? Math.round(p.totals.right / p.totals.n * 100) + '%' : '—'), h('span', { class: 'k' }, 'all-time accuracy')), h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, p.recent.n ? Math.round(p.recent.right / p.recent.n * 100) + '%' : '—'), h('span', { class: 'k' }, '7-day accuracy')), h('div', { class: 'card tight stat' }, h('span', { class: 'v' }, p.lessonsDone.filter(l => l.status === 'completed').length), h('span', { class: 'k' }, 'lessons completed'))),
      h('div', { class: 'grid grid-2' },
        h('div', { class: 'card' }, h('h3', null, 'Daily accuracy (last 4 weeks)'), spark(accVals, 'var(--green)'), h('h3', { style: { marginTop: '14px' } }, 'Daily volume'), spark(trend.map(d => d.n / maxN), 'var(--blue)'), h('p', { class: 'tiny faint' }, 'Accuracy near 70% in adaptive practice is the goal: it means the difficulty is tracking you correctly.')),
        h('div', { class: 'card' }, h('h3', null, 'Mock test history'), mocks.length ? h('div', null, spark(mocks.map(m => m.results.pct / 100), 'var(--accent)'), h('table', { class: 'tbl' }, h('tbody', null, mocks.slice(-6).reverse().map(m => h('tr', { style: { cursor: 'pointer' }, onclick: () => go(`#/mock/${m.id}/results` + (_viewingStudent ? '?student=' + _viewingStudent : '')) }, h('td', null, fmtDate(m.completed_at)), h('td', null, state.overview.tiers[m.tier].name), h('td', null, `${m.results.pct}%`), h('td', null, `~${m.results.percentile}th`)))))) : h('p', { class: 'muted small' }, 'No completed mock tests yet.'))),
      h('div', { class: 'card' }, h('h3', null, 'Skill mastery'), h('p', { class: 'small muted' }, 'Each skill has its own rating that moves with every answer, weighted by question difficulty (like chess Elo). Mastery is the estimated accuracy on a test-level question.'),
        h('div', { class: 'grid grid-2' }, sections.map(([k, s]) => h('div', null, h('div', { class: 'row between' }, h('h4', null, s.name), h('span', { class: 'small muted' }, s.mastery !== null ? `${s.mastery}% avg` : '')), h('div', { class: 'stack', style: { gap: '6px' } }, s.skills.map(sk => h('div', { class: 'skill-row' }, h('span', { class: 'small' }, sk.name), h('div', { class: 'bar' }, h('i', { style: { width: (sk.mastery || 0) + '%', background: masteryColor(sk.mastery) } })), h('span', { class: 'small muted', style: { textAlign: 'right' } }, sk.mastery === null ? 'not measured' : `${sk.mastery}% · ${sk.n} q`), !_viewingStudent ? h('a', { class: 'btn btn-sm btn-ghost', href: `#/practice?skill=${sk.skill}` }, 'Drill') : h('span')))))))),
      h('div', { class: 'card' }, h('h3', null, 'Recommended next steps'), h('div', { class: 'list' }, p.recommendations.map(r => h('div', { class: 'item', onclick: () => !_viewingStudent && actionGo(r.action) }, h('div', { class: 'grow' }, h('div', { class: 't' }, r.title), h('div', { class: 'd' }, r.why)))))));
  });
}

// ---------- settings ----------
async function renderSettings() {
  await withLoading('settings', async () => {
    const u = state.user; const ov = state.overview; const msg = h('div', { class: 'alert hidden' });
    const testSel = h('select', { name: 'targetTest', onchange: (e) => fill(e.target.value) }, Object.entries(ov.tests).map(([k, t]) => h('option', { value: k, selected: k === u.targetTest }, `${t.name} — ${t.fullName}`)));
    const varSel = h('select', { name: 'variant' }); const fill = (t) => { varSel.innerHTML = ''; Object.entries(ov.tests[t].variants).forEach(([k, v]) => varSel.append(h('option', { value: k, selected: t === u.targetTest && k === u.variant }, v))); }; fill(u.targetTest);
    const form = h('form', { class: 'stack', onsubmit: async (e) => { e.preventDefault(); const fd = Object.fromEntries(new FormData(e.target).entries()); try { state.user = await api('PATCH', '/api/me', fd); state.progress = null; msg.className = 'alert success'; msg.textContent = 'Saved.'; e.target.querySelector('[name=newPassword]').value = ''; } catch (err) { msg.className = 'alert error'; msg.textContent = err.message; } } },
      h('div', { class: 'grid grid-2' }, h('div', null, h('label', null, 'Display name'), h('input', { name: 'displayName', value: u.displayName })), h('div', null, h('label', null, 'Daily goal (questions)'), h('input', { name: 'dailyGoal', type: 'number', min: 5, max: 200, value: u.dailyGoal }))),
      h('div', { class: 'grid grid-2' }, h('div', null, h('label', null, 'Target test'), testSel), h('div', null, h('label', null, 'Level'), varSel)),
      h('div', { class: 'grid grid-2' }, h('div', null, h('label', null, 'Test date'), h('input', { name: 'testDate', type: 'date', value: u.testDate || '' })), h('div', null, h('label', null, 'Grade'), h('input', { name: 'grade', type: 'number', min: 3, max: 12, value: u.grade || '' }))),
      h('div', null, h('label', null, 'New password (leave blank to keep)'), h('input', { name: 'newPassword', type: 'password', autocomplete: 'new-password' })),
      msg, h('div', { class: 'row' }, h('button', { class: 'btn btn-primary', type: 'submit' }, 'Save changes'), h('button', { class: 'btn btn-ghost', type: 'button', onclick: async () => { await post('/api/logout'); state.user = null; state.progress = null; go('#/'); } }, 'Sign out')));
    const family = h('div', { class: 'card stack' });
    const drawFamily = async () => { const { students } = await get('/api/family/students'); const code = h('input', { placeholder: 'Student share code, e.g. 4F9A2C', style: { width: '240px', textTransform: 'uppercase' } }); family.replaceChildren(h('h3', null, 'Family & tutors'), h('p', { class: 'small muted' }, 'Your share code lets a parent or tutor follow your progress (read-only). To follow a student, enter their code below.'), h('div', { class: 'row' }, h('span', { class: 'small muted' }, 'Your share code:'), h('span', { class: 'pill accent', style: { fontSize: '16px', letterSpacing: '.1em' } }, u.shareCode)), h('div', { class: 'row' }, code, h('button', { class: 'btn', onclick: async () => { try { const r = await post('/api/family/link', { code: code.value }); toast(`Linked ${r.student.displayName}`); drawFamily(); } catch (e) { toast(e.message); } } }, 'Link student')), students.length ? h('div', { class: 'list' }, students.map(s => h('div', { class: 'item', style: { cursor: 'default' } }, h('div', { class: 'grow' }, h('div', { class: 't' }, s.displayName), h('div', { class: 'd' }, `@${s.username} · ${testName(s.targetTest)}`)), h('a', { class: 'btn btn-sm', href: '#/progress?student=' + s.id }, 'View progress'), h('button', { class: 'btn btn-sm btn-ghost', onclick: async () => { await api('DELETE', '/api/family/link/' + s.id); drawFamily(); } }, 'Unlink')))) : null); };
    drawFamily();
    const theme = h('div', { class: 'card' }, h('h3', null, 'Appearance'), h('div', { class: 'chips' }, [['', 'System'], ['light', 'Light'], ['dark', 'Dark']].map(([v, t]) => h('button', { class: 'chip' + ((localStorage.getItem('theme') || '') === v ? ' active' : ''), onclick: (e) => { try { v ? localStorage.setItem('theme', v) : localStorage.removeItem('theme'); } catch {} applyTheme(); e.target.parentElement.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === e.target)); } }, t))));
    let admin = null; if (u.role === 'admin') { const { users } = await get('/api/admin/users'); admin = h('div', { class: 'card' }, h('h3', null, 'All accounts (admin)'), h('p', { class: 'small muted' }, 'You created the first account, so you administer this site. Each account’s progress is private to it.'), h('table', { class: 'tbl' }, h('thead', null, h('tr', null, h('th', null, 'User'), h('th', null, 'Role'), h('th', null, 'Test'), h('th', null, 'Questions'), h('th', null, 'Last active'))), h('tbody', null, users.map(x => h('tr', null, h('td', null, `${x.displayName} `, h('span', { class: 'faint' }, `@${x.username}`)), h('td', null, x.role), h('td', null, testName(x.targetTest)), h('td', null, x.attempts), h('td', null, x.lastActive ? fmtDate(x.lastActive) : '—')))))); }
    return h('div', { class: 'stack', style: { maxWidth: '820px', margin: '0 auto' } }, h('h1', null, 'Settings'), h('div', { class: 'card' }, form), family, theme, admin);
  });
}
function applyTheme() { let t = null; try { t = localStorage.getItem('theme'); } catch {} if (t) document.documentElement.setAttribute('data-theme', t); else document.documentElement.removeAttribute('data-theme'); }

// ---------- router ----------
async function router() {
  clearInterval(mockTimer); window.onkeydown = null;
  const raw = location.hash.replace(/^#\/?/, '') || ''; const [pathPart, qs] = raw.split('?'); const params = new URLSearchParams(qs || ''); const parts = pathPart.split('/').filter(Boolean);
  if (!state.user) { if (parts[0] === 'register') return renderAuth('register'); return renderAuth('login'); }
  window.scrollTo(0, 0);
  switch (parts[0]) {
    case '': case 'dashboard': case 'register': case 'login': return renderDashboard();
    case 'learn': return renderLearn();
    case 'lesson': return renderLesson(parts[1]);
    case 'practice': return renderPractice(params);
    case 'mock': if (parts[1] && parts[2] === 'results') return renderMockResults(parts[1]); if (parts[1]) return renderMockRun(parts[1]); return renderMockHome();
    case 'review': return renderReview();
    case 'vocab': return renderVocab(params);
    case 'writing': return renderWriting(params);
    case 'progress': return renderProgress(params);
    case 'settings': return renderSettings();
    default: return renderDashboard();
  }
}
(async function init() {
  applyTheme();
  shell(loading('Starting Ascend Prep…'), null);
  try { const [ov, me] = await Promise.all([get('/api/content/overview'), get('/api/me')]); state.overview = ov; state.user = me.user; } catch (e) { shell(h('div', { class: 'alert error' }, 'Could not reach the server: ' + e.message), null); return; }
  window.addEventListener('hashchange', router);
  router();
})();
