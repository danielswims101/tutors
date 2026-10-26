'use strict';
/* Ascend Prep data store. Two backends with one interface:
   - Supabase (accounts that work on every device) when docs/config.js has SUPABASE_URL + SUPABASE_ANON_KEY
   - Local (this browser only) otherwise, so the site still works before Supabase is configured. */
window.AscendStore = (function () {
  const cfg = window.ASCEND_CONFIG || {};
  const useSupabase = Boolean(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);
  const EMAIL_DOMAIN = 'users.ascendprep.app';
  const emailFor = (username) => `${username}@${EMAIL_DOMAIN}`;
  const emptyData = () => ({ ratings: {}, daily: {}, totals: { n: 0, right: 0, secs: 0, xp: 0 }, seen: {}, reviews: {}, plan: null, lessons: {}, badges: {}, tutor: [], cards: {}, training: {}, courses: {} });
  const DATA_COLS = ['ratings', 'daily', 'totals', 'seen', 'reviews', 'plan', 'lessons', 'badges', 'tutor', 'cards', 'training', 'courses'];
  const genCode = () => Array.from(crypto.getRandomValues(new Uint8Array(3))).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  const USERNAME_RE = /^[a-zA-Z0-9_.-]{3,24}$/;
  function profileFromRow(r) { return { id: r.id, username: r.username, displayName: r.display_name, role: r.role, targetTest: r.target_test, variant: r.variant, grade: r.grade, testDate: r.test_date, dailyGoal: r.daily_goal, shareCode: r.share_code, diagnosticDone: !!r.diagnostic_done, tutorName: r.tutor_name, createdAt: r.created_at }; }
  function profileToRow(p) { return { display_name: p.displayName, target_test: p.targetTest, variant: p.variant, grade: p.grade, test_date: p.testDate || null, daily_goal: p.dailyGoal, diagnostic_done: !!p.diagnosticDone, tutor_name: p.tutorName || null }; }

  // ---------------- Supabase backend ----------------
  function supabaseBackend() {
    const sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    const fnUrl = (name) => `${cfg.SUPABASE_URL.replace(/\/$/, '')}/functions/v1/${name}`;
    const errOf = (e) => { const m = (e && (e.message || e.error_description || e.error)) || String(e); if (/invalid login credentials/i.test(m)) return 'Incorrect username or password.'; if (/already registered|already exists|duplicate/i.test(m)) return 'That username is taken.'; return m; };
    async function authHeaders() { const { data } = await sb.auth.getSession(); return { 'Content-Type': 'application/json', Authorization: `Bearer ${data.session ? data.session.access_token : cfg.SUPABASE_ANON_KEY}`, apikey: cfg.SUPABASE_ANON_KEY }; }
    return {
      mode: 'supabase',
      async currentUserId() { const { data: sess } = await sb.auth.getSession(); if (sess.session && sess.session.user) return sess.session.user.id; const { data } = await sb.auth.getUser(); return data.user ? data.user.id : null; },
      async signUp({ username, password, displayName, role, targetTest, variant, grade, testDate }) {
        username = String(username || '').trim().toLowerCase(); if (!USERNAME_RE.test(username)) throw new Error('Username must be 3–24 letters, numbers, dots, dashes or underscores.'); if (!displayName) throw new Error('Please enter a display name.'); if (String(password).length < 8) throw new Error('Password must be at least 8 characters.');
        const res = await fetch(fnUrl('signup'), { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: cfg.SUPABASE_ANON_KEY, Authorization: `Bearer ${cfg.SUPABASE_ANON_KEY}` }, body: JSON.stringify({ username, password, displayName, role, targetTest, variant, grade: grade ? Number(grade) : null, testDate: testDate || null }) });
        const body = await res.json().catch(() => ({})); if (!res.ok) throw new Error(body.error || 'Could not create the account.');
        const { error } = await sb.auth.signInWithPassword({ email: emailFor(username), password }); if (error) throw new Error(errOf(error));
      },
      async signIn({ username, password }) { const { error } = await sb.auth.signInWithPassword({ email: emailFor(String(username || '').trim().toLowerCase()), password: String(password || '') }); if (error) throw new Error(errOf(error)); },
      async signOut() { await sb.auth.signOut(); },
      async signOutAll() { await sb.auth.signOut({ scope: 'global' }); },
      async changePassword(p) { if (String(p).length < 8) throw new Error('New password must be at least 8 characters.'); const { error } = await sb.auth.updateUser({ password: p }); if (error) throw new Error(errOf(error)); },
      async loadUser(uid) {
        const [{ data: prof, error: e1 }, { data: dat }, { data: mocks }, { data: writings }, { data: fr }, { data: lk }] = await Promise.all([
          sb.from('profiles').select('*').eq('id', uid).single(), sb.from('user_data').select('*').eq('user_id', uid).maybeSingle(),
          sb.from('mocks').select('id,test,variant,tier,length,status,section_index,started_at,completed_at,results').eq('user_id', uid).order('started_at', { ascending: false }),
          sb.from('writings').select('id,prompt_id,text,word_count,minutes,self_scores,created_at').eq('user_id', uid).order('created_at', { ascending: false }).limit(30),
          sb.from('friendships').select('friend_id').eq('user_id', uid), sb.from('links').select('student_id,parent_id').or(`parent_id.eq.${uid},student_id.eq.${uid}`)]);
        if (e1 || !prof) throw new Error('Profile not found. Please sign in again.');
        const data = emptyData(); if (dat) for (const c of DATA_COLS) if (dat[c] !== null && dat[c] !== undefined) data[c] = dat[c];
        return { profile: profileFromRow(prof), data, mocksIndex: (mocks || []).map(m => ({ ...m, results: m.results ? { pct: m.results.pct, percentile: m.results.percentile, totalRight: m.results.totalRight, totalCount: m.results.totalCount, sections: (m.results.sections || []).map(s => ({ label: s.label, pct: s.pct, percentile: s.percentile, right: s.right, count: s.count, writing: s.writing })) } : null })), writings: (writings || []).map(w => ({ id: w.id, promptId: w.prompt_id, text: w.text, wordCount: w.word_count, minutes: w.minutes, selfScores: w.self_scores, createdAt: w.created_at })), friends: (fr || []).map(f => f.friend_id), students: (lk || []).filter(l => l.parent_id === uid).map(l => l.student_id), viewers: (lk || []).filter(l => l.student_id === uid).map(l => l.parent_id) };
      },
      async saveData(uid, data, cols) { const patch = { user_id: uid, updated_at: new Date().toISOString() }; for (const c of cols) patch[c] = data[c]; const { error } = await sb.from('user_data').upsert(patch, { onConflict: 'user_id' }); if (error) throw new Error(errOf(error)); },
      async saveProfile(uid, profile) { const { error } = await sb.from('profiles').update(profileToRow(profile)).eq('id', uid); if (error) throw new Error(errOf(error)); },
      async savePublic(uid, stats) { const { error } = await sb.from('public_stats').upsert({ user_id: uid, ...stats, updated_at: new Date().toISOString() }, { onConflict: 'user_id' }); if (error) console.warn('public stats', error.message); },
      async profilesOf(ids) { if (!ids.length) return []; const { data } = await sb.from('public_stats').select('*').in('user_id', ids); return (data || []).map(r => ({ id: r.user_id, displayName: r.display_name, username: r.username, targetTest: r.test, stats: r })); },
      async mockInsert(uid, row) { const { data, error } = await sb.from('mocks').insert({ user_id: uid, ...row }).select('id').single(); if (error) throw new Error(errOf(error)); return data.id; },
      async mockGet(uid, id) { const { data, error } = await sb.from('mocks').select('*').eq('id', id).eq('user_id', uid).single(); if (error || !data) throw new Error('Mock test not found'); return data; },
      async mockUpdate(uid, id, patch) { const { error } = await sb.from('mocks').update(patch).eq('id', id).eq('user_id', uid); if (error) throw new Error(errOf(error)); },
      async writingInsert(uid, row) { const { data, error } = await sb.from('writings').insert({ user_id: uid, ...row }).select('id').single(); if (error) throw new Error(errOf(error)); return data.id; },
      async linkStudent(code) { const { data, error } = await sb.rpc('link_student', { p_code: String(code || '').trim().toUpperCase() }); if (error) throw new Error(errOf(error)); return data; },
      async unlinkStudent(uid, studentId) { await sb.from('links').delete().eq('parent_id', uid).eq('student_id', studentId); },
      async addFriend(code) { const { data, error } = await sb.rpc('add_friend', { p_code: String(code || '').trim().toUpperCase() }); if (error) throw new Error(errOf(error)); return data; },
      async removeFriend(uid, fid) { await sb.from('friendships').delete().or(`and(user_id.eq.${uid},friend_id.eq.${fid}),and(user_id.eq.${fid},friend_id.eq.${uid})`); },
      async sessionsCount() { return null; },
      async tutorStatus() { const { data, error } = await sb.rpc('tutor_status'); if (error) return { live: false, note: 'Built-in tutor active.' }; return data; },
      async setTutorConfig(apiKey, model) { const { data, error } = await sb.rpc('set_tutor_config', { p_key: apiKey === undefined ? null : apiKey, p_model: model || null, p_clear: apiKey === '' }); if (error) throw new Error(errOf(error)); return data; },
      async adminUsers() { const { data, error } = await sb.rpc('admin_users'); if (error) throw new Error(errOf(error)); return data; },
      async tutorChat(payload) { const res = await fetch(fnUrl('tutor'), { method: 'POST', headers: await authHeaders(), body: JSON.stringify(payload) }); const body = await res.json().catch(() => ({})); if (!res.ok) throw new Error(body.error || `Tutor error (${res.status})`); return body; }
    };
  }

  // ---------------- Local backend (this browser only) ----------------
  function localBackend() {
    const LS = window.localStorage; const key = (k) => `ascend:${k}`;
    const read = (k, d) => { try { const v = LS.getItem(key(k)); return v ? JSON.parse(v) : d; } catch { return d; } };
    const write = (k, v) => { try { LS.setItem(key(k), JSON.stringify(v)); } catch (e) { console.warn('localStorage full', e); } };
    async function hash(pw, salt) { const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + ':' + pw)); return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join(''); }
    const users = () => read('users', {}); // username -> {id, hash, salt}
    return {
      mode: 'local',
      async currentUserId() { return read('session', null); },
      async signUp({ username, password, displayName, role, targetTest, variant, grade, testDate }) {
        username = String(username || '').trim().toLowerCase(); if (!USERNAME_RE.test(username)) throw new Error('Username must be 3–24 letters, numbers, dots, dashes or underscores.'); if (!displayName) throw new Error('Please enter a display name.'); if (String(password).length < 8) throw new Error('Password must be at least 8 characters.');
        const u = users(); if (u[username]) throw new Error('That username is taken.');
        const id = 'local-' + genCode() + genCode(); const salt = genCode(); u[username] = { id, salt, hash: await hash(password, salt) }; write('users', u);
        const first = Object.keys(u).length === 1;
        write(`profile:${id}`, { id, username, display_name: displayName, role: first ? 'admin' : (role === 'parent' ? 'parent' : 'student'), target_test: targetTest || 'hspt', variant, grade: grade ? Number(grade) : null, test_date: testDate || null, daily_goal: 20, share_code: genCode(), diagnostic_done: false, tutor_name: null, created_at: new Date().toISOString() });
        write('session', id);
      },
      async signIn({ username, password }) { const u = users()[String(username || '').trim().toLowerCase()]; if (!u || (await hash(password, u.salt)) !== u.hash) throw new Error('Incorrect username or password.'); write('session', u.id); },
      async signOut() { LS.removeItem(key('session')); }, async signOutAll() { LS.removeItem(key('session')); },
      async changePassword(p) { const id = read('session'); const u = users(); const name = Object.keys(u).find(k => u[k].id === id); if (!name) return; u[name].salt = genCode(); u[name].hash = await hash(p, u[name].salt); write('users', u); },
      async loadUser(uid) { const prof = read(`profile:${uid}`); if (!prof) throw new Error('Profile not found'); const data = { ...emptyData(), ...read(`data:${uid}`, {}) }; const mocks = read(`mocks:${uid}`, []); return { profile: profileFromRow(prof), data, mocksIndex: mocks.map(m => ({ id: m.id, test: m.test, variant: m.variant, tier: m.tier, length: m.length, status: m.status, section_index: m.section_index, started_at: m.started_at, completed_at: m.completed_at, results: m.results ? { pct: m.results.pct, percentile: m.results.percentile, totalRight: m.results.totalRight, totalCount: m.results.totalCount, sections: m.results.sections.map(s => ({ label: s.label, pct: s.pct, percentile: s.percentile, right: s.right, count: s.count, writing: s.writing })) } : null })).sort((a, b) => b.started_at.localeCompare(a.started_at)), writings: read(`writings:${uid}`, []), friends: read(`friends:${uid}`, []), students: read(`students:${uid}`, []), viewers: [] }; },
      async saveData(uid, data) { write(`data:${uid}`, data); },
      async saveProfile(uid, profile) { const row = read(`profile:${uid}`); write(`profile:${uid}`, { ...row, ...profileToRow(profile) }); },
      async savePublic(uid, stats) { write(`public:${uid}`, stats); },
      async profilesOf(ids) { return ids.map(id => { const p = read(`profile:${id}`); const s = read(`public:${id}`, null); return p ? { id, displayName: p.display_name, username: p.username, targetTest: p.target_test, stats: s } : null; }).filter(Boolean); },
      async mockInsert(uid, row) { const list = read(`mocks:${uid}`, []); const id = Date.now(); list.unshift({ id, user_id: uid, ...row, started_at: new Date().toISOString() }); write(`mocks:${uid}`, list); return id; },
      async mockGet(uid, id) { const m = read(`mocks:${uid}`, []).find(x => x.id === Number(id)); if (!m) throw new Error('Mock test not found'); return m; },
      async mockUpdate(uid, id, patch) { const list = read(`mocks:${uid}`, []); const m = list.find(x => x.id === Number(id)); if (m) Object.assign(m, patch); write(`mocks:${uid}`, list); },
      async writingInsert(uid, row) { const list = read(`writings:${uid}`, []); const id = Date.now(); list.unshift({ id, promptId: row.prompt_id, text: row.text, wordCount: row.word_count, minutes: row.minutes, selfScores: row.self_scores, createdAt: new Date().toISOString() }); write(`writings:${uid}`, list); return id; },
      async linkStudent(code) { const u = users(); for (const name of Object.keys(u)) { const p = read(`profile:${u[name].id}`); if (p && p.share_code === String(code).trim().toUpperCase()) { const me = read('session'); if (p.id === me) throw new Error('That is your own code.'); const list = read(`students:${me}`, []); if (!list.includes(p.id)) list.push(p.id); write(`students:${me}`, list); return { id: p.id, display_name: p.display_name, username: p.username }; } } throw new Error('No one has that code.'); },
      async unlinkStudent(uid, sid) { write(`students:${uid}`, read(`students:${uid}`, []).filter(x => x !== sid)); },
      async addFriend(code) { const u = users(); const me = read('session'); for (const name of Object.keys(u)) { const p = read(`profile:${u[name].id}`); if (p && p.share_code === String(code).trim().toUpperCase()) { if (p.id === me) throw new Error('That is your own code.'); const a = read(`friends:${me}`, []); if (!a.includes(p.id)) a.push(p.id); write(`friends:${me}`, a); const b = read(`friends:${p.id}`, []); if (!b.includes(me)) b.push(me); write(`friends:${p.id}`, b); return { id: p.id, display_name: p.display_name, username: p.username }; } } throw new Error('No one has that code. Ask your friend for the code shown in their Settings.'); },
      async removeFriend(uid, fid) { write(`friends:${uid}`, read(`friends:${uid}`, []).filter(x => x !== fid)); write(`friends:${fid}`, read(`friends:${fid}`, []).filter(x => x !== uid)); },
      async sessionsCount() { return 1; },
      async tutorStatus() { return { live: false, hasKey: false, model: 'claude-opus-5-5', note: 'This is the local (single-browser) mode. Connect Supabase to turn on accounts that sync and the live AI tutor.' }; },
      async setTutorConfig() { throw new Error('Available only when Supabase is connected.'); },
      async adminUsers() { const u = users(); return Object.keys(u).map(n => { const p = read(`profile:${u[n].id}`); const d = read(`data:${u[n].id}`, {}); return { id: p.id, username: p.username, displayName: p.display_name, role: p.role, targetTest: p.target_test, attempts: (d.totals || {}).n || 0, lastActive: null }; }); },
      async tutorChat() { throw new Error('Live tutor needs Supabase.'); }
    };
  }
  const backend = useSupabase ? supabaseBackend() : localBackend();
  return backend;
})();
