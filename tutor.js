'use strict';
// The tutor: a live Claude-powered coach when an API key is configured, and a built-in
// rule-based tutor otherwise. Both share the same student context so the experience is consistent.
const fs = require('fs');
const path = require('path');
const C = require('./content');
const D = require('./db');
const E = require('./engine');
const K = require('./coach');

const CONFIG_PATH = path.join(process.env.DATA_DIR || path.join(__dirname, 'data'), 'tutor.config.json');
function readConfig() { try { return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')); } catch { return {}; } }
function writeConfig(cfg) { fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true }); fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2)); }
function apiKey() { return process.env.ANTHROPIC_API_KEY || readConfig().apiKey || null; }
function modelId() { return process.env.TUTOR_MODEL || readConfig().model || 'claude-opus-5-5'; }
let Anthropic = null; let sdkError = null;
try { Anthropic = require('@anthropic-ai/sdk'); } catch (e) { sdkError = 'The @anthropic-ai/sdk package is not installed. Run: npm install'; }
function status() { const key = apiKey(); return { live: Boolean(key && Anthropic), hasKey: Boolean(key), sdkInstalled: Boolean(Anthropic), model: modelId(), note: !Anthropic ? sdkError : !key ? 'No API key configured. The built-in tutor is active.' : 'Live AI tutor active.' }; }

function tutorName(user) { return user.tutor_name || 'Coach Ada'; }
function studentContext(user) {
  const p = E.progressSummary(user);
  const weak = p.skills.filter(s => s.n >= 2).sort((a, b) => a.mastery - b.mastery).slice(0, 3);
  const strong = p.skills.filter(s => s.n >= 2).sort((a, b) => b.mastery - a.mastery).slice(0, 3);
  return { p, weak, strong, text: `Student: ${user.display_name}${user.grade ? ', grade ' + user.grade : ''}. Preparing for the ${C.TESTS[user.target_test].name} (${C.TESTS[user.target_test].variants[user.variant] || user.variant})${user.test_date ? ', test date ' + user.test_date : ''}. ${p.totals.n} questions answered all-time, ${p.recent.n ? Math.round(p.recent.right / p.recent.n * 100) + '% accuracy' : 'no activity'} in the last 7 days, streak ${p.streak} days, ${p.due} reviews due. Weakest skills: ${weak.map(s => `${s.name} (${s.mastery}% mastery)`).join(', ') || 'not yet measured'}. Strongest: ${strong.map(s => `${s.name} (${s.mastery}%)`).join(', ') || 'not yet measured'}.` };
}
function questionContext(user, ctx) {
  if (!ctx) return null;
  let q = null;
  if (ctx.servedId) { const r = D.get('SELECT payload FROM served WHERE id = ? AND user_id = ?', String(ctx.servedId), user.id); if (r) q = JSON.parse(r.payload); }
  else if (ctx.questionId && C.byId.get(ctx.questionId)) q = C.byId.get(ctx.questionId);
  else if (ctx.reviewKey) { const r = D.get('SELECT payload FROM review_items WHERE user_id = ? AND item_key = ?', user.id, String(ctx.reviewKey)); if (r) { const p = JSON.parse(r.payload); q = p.full || C.byId.get(p.id) || null; } }
  if (!q) return null;
  const passage = q.passageId ? C.passageById.get(q.passageId) : null;
  const answered = Boolean(ctx.answered || q.answered); const choice = Number.isInteger(ctx.choice) ? ctx.choice : Number.isInteger(q.choice) ? q.choice : null;
  return { q, passage, answered, choice };
}

// ---- Built-in tutor ----
function findVocab(word) { const w = word.toLowerCase(); return C.vocab.find(v => v.word.toLowerCase() === w) || null; }
function findLesson(user, text) {
  const t = text.toLowerCase();
  const scored = C.lessons.filter(l => l.test === user.target_test || l.test === 'all').map(l => { let s = 0; const hay = (l.title + ' ' + (C.SKILL_NAMES[l.skill] || '') + ' ' + l.skill).toLowerCase(); for (const w of t.split(/\W+/).filter(x => x.length > 3)) if (hay.includes(w)) s += w.length; return [s, l]; }).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]);
  return scored.length ? scored[0][1] : null;
}
function builtinReply(user, message, ctx, qc) {
  const name = tutorName(user); const m = message.toLowerCase(); const t = C.TESTS[user.target_test];
  const actions = [];
  const vocabMatch = /(?:what does|define|meaning of|what is)\s+["“']?([a-z-]+)["”']?\s*(?:mean)?\??$/i.exec(message.trim());
  if (vocabMatch) { const v = findVocab(vocabMatch[1]); if (v) return { reply: `**${v.word}** (${v.pos}): ${v.definition}\n\nExample: *${v.example}*\n\nSynonyms: ${v.synonyms.join(', ')}${v.antonyms && v.antonyms.length ? `. Antonyms: ${v.antonyms.join(', ')}` : ''}.${v.roots ? `\n\nRoot clue: ${v.roots}` : ''}\n\nWant it in your review deck? Open Vocabulary and tap Add.`, actions: [{ label: 'Open vocabulary', href: '#/vocab' }] }; }
  if (qc && /hint|stuck|clue|help me|where do i start|how do i start|don't know|dont know|no idea/.test(m)) {
    const lvl = Math.min(3, (Number(ctx.hintsUsed) || 0) + 1); const h = K.hintFor(qc.q, lvl);
    return { reply: `${lvl === 1 ? 'Here is the method, not the answer:' : lvl === 2 ? 'Let me narrow it down:' : 'Last hint:'} ${h.text}${lvl < 3 ? '\n\nTry it. If you are still stuck, ask for another hint.' : '\n\nCommit to one of the two and check it. Being wrong after reasoning is more useful than being right by guessing.'}`, hint: h };
  }
  if (qc && /why|explain|wrong|understand|don't get|dont get|confus|walk me|show me|answer/.test(m)) {
    if (qc.answered) return { reply: `${qc.choice === qc.q.answer ? 'You got it. Here is the reasoning so it sticks:' : 'Here is where it went wrong and why:'}\n\n${qc.q.explanation}\n\nThe skill here is **${C.SKILL_NAMES[qc.q.skill]}**. ${K.STRATEGY[qc.q.skill] ? 'Method to remember: ' + K.STRATEGY[qc.q.skill] : ''}`, actions: [{ label: `Drill ${C.SKILL_NAMES[qc.q.skill]}`, href: `#/practice?skill=${qc.q.skill}` }] };
    const h = K.hintFor(qc.q, 1); return { reply: `I will not give it away before you try; that is how it sticks. Here is the method: ${h.text}\n\nMake your best choice and check it. Then ask me "why" and I will walk through the full reasoning.`, hint: h };
  }
  if (/what should i (study|do|practice|work on)|what('s| is) next|plan|where am i|how am i doing|progress/.test(m)) {
    const { p, weak } = studentContext(user);
    const lines = [`Here is the picture, ${user.display_name}:`];
    if (!p.totals.n) lines.push('You have not answered anything yet, so start with the diagnostic. Twenty questions and I will know exactly where to focus.');
    else { lines.push(`${p.totals.n} questions so far, ${p.streak}-day streak, ${p.due} reviews due.`); if (weak.length) lines.push(`Your weakest areas are ${weak.map(s => `${s.name} (${s.mastery}%)`).join(', ')}. That is where the fastest gains are.`); }
    for (const r of p.recommendations) lines.push(`• ${r.title}: ${r.why}`);
    return { reply: lines.join('\n'), actions: [{ label: "Today's session", href: '#/session' }, { label: 'Progress', href: '#/progress' }] };
  }
  if (/nervous|anxious|anxiety|scared|stress|worried|panic/.test(m)) return { reply: `Nerves are normal and they are not the enemy; they mean you care. Three things that work, backed by research:\n\n1. **Rehearse the day.** Full-length mocks under real timing make the real thing feel familiar. Familiar things are not scary.\n2. **Have a first move.** On every section, your first move is fixed: read the question, decide what is asked, then look at choices. A routine crowds out panic.\n3. **Reframe the feeling.** Say "I'm excited" instead of "I'm nervous." It sounds silly, but studies show it improves performance because the body feels the same either way.\n\nAnd the night before: sleep, not cramming. You know more than you think.`, actions: [{ label: 'Take a mock test', href: '#/mock' }] };
  if (/guess|penalty|skip|leave (it )?blank/.test(m)) return { reply: t.penalty ? `On the SSAT a wrong answer costs ¼ point and a blank costs nothing. The math: if you can eliminate even one choice, guessing is worth it on average (expected gain is positive). If you truly cannot eliminate anything, leave it blank. In practice, you can almost always eliminate one.` : `On the ${t.name} there is no penalty for wrong answers, so never leave a question blank. If time is running out, fill in the rest with your "letter of the day" and move on.`, actions: [{ label: 'Strategy lesson', href: '#/learn' }] };
  if (/time|pacing|fast|slow|run out/.test(m)) { const bp = C.BLUEPRINTS[user.target_test][user.variant] || []; return { reply: `Pacing for the ${t.name}:\n${bp.filter(s => !s.writing).map(s => `• ${s.label || t.sections[s.section]}: ${s.count} questions in ${s.minutes} min, about ${Math.round(s.minutes * 60 / s.count)} seconds each`).join('\n')}\n\nThe rule: two passes. First pass, answer what you can in under the average time and flag the rest. Second pass, return to flags. Never let one question eat three questions' worth of time.`, actions: [{ label: 'Practice under time', href: '#/mock' }] }; }
  if (/how (do|to|can) i|teach me|lesson|learn/.test(m)) { const l = findLesson(user, message); if (l) return { reply: `Good question. I have a lesson built exactly for that: **${l.title}** (${l.minutes} minutes). It covers: ${l.objectives.slice(0, 2).join('; ')}.\n\nWork through the worked example slowly and do the check at the end; I will log it to your progress.`, actions: [{ label: 'Open the lesson', href: `#/lesson/${l.id}` }] }; }
  if (/^(hi|hello|hey|yo|sup)\b/.test(m)) return { reply: `Hi ${user.display_name}. I am ${name}, your ${t.name} tutor. Ask me for a hint on any question, ask "why" after you answer, ask what a word means, or ask what you should study next. What are we working on?`, actions: [{ label: "Today's session", href: '#/session' }] };
  if (qc) return { reply: `I am looking at this ${C.SKILL_NAMES[qc.q.skill]} question with you. You can ask me for a **hint** (I will not spoil it), or answer first and then ask **why** for the full reasoning.`, actions: [] };
  return { reply: `I can help with:\n• **Hints** on the question in front of you ("give me a hint")\n• **Explanations** after you answer ("why is that right?")\n• **Vocabulary** ("what does *candid* mean?")\n• **Your plan** ("what should I study?")\n• **Strategy** (guessing, pacing, nerves)\n\nTip: the live AI tutor, which can answer anything in your own words, turns on when an API key is added in Settings.`, actions: [{ label: "Today's session", href: '#/session' }] };
}

// ---- Live tutor (Claude) ----
function systemPrompt(user, qc) {
  const sc = studentContext(user);
  const t = C.TESTS[user.target_test];
  let s = `You are ${tutorName(user)}, a world-class private tutor for the ${t.name} (${t.fullName}) on Ascend Prep. You teach the way the best tutors do: Socratic, warm, precise, never condescending. Your student is a middle-school or early high-school student.

${sc.text}

Test facts: ${t.penalty ? 'SSAT: wrong answers cost 1/4 point, blanks cost nothing.' : `${t.name}: no guessing penalty.`} Sections: ${Object.values(t.sections).join(', ')}.

How you teach:
- Keep replies short (under 120 words) unless the student asks for a full walkthrough. One idea at a time. Ask a guiding question when it helps the student think.
- If a current question is provided and the student has NOT answered it yet, never reveal the correct answer or the letter. Give the method, then a narrowing hint, then eliminate one choice. Only after they answer, explain fully.
- When explaining, name the skill, the method, and the trap. End with one sentence they can reuse on similar questions.
- Use plain language. Light markdown only (bold, short lists). No headings.
- You may use the student's weaknesses to connect ideas ("this is the same move as in analogies").
- Encourage effort over talent. Never shame a wrong answer.`;
  if (qc) s += `\n\nCURRENT QUESTION (skill: ${C.SKILL_NAMES[qc.q.skill]}, level ${qc.q.level}/5):\n${qc.passage ? 'PASSAGE: ' + qc.passage.title + '\n' + qc.passage.text + '\n\n' : ''}${qc.q.stem}\nChoices: ${qc.q.choices.map((c, i) => `${'ABCDE'[i]}) ${c}`).join('  ')}\nCorrect answer: ${'ABCDE'[qc.q.answer]}\nOfficial explanation: ${qc.q.explanation}\nStudent status: ${qc.answered ? `answered ${qc.choice !== null ? 'ABCDE'[qc.choice] : 'nothing'} (${qc.choice === qc.q.answer ? 'correct' : 'incorrect'}); you may explain fully now.` : 'has NOT answered yet; do not reveal the answer.'}`;
  return s;
}
async function liveReply(user, message, history, qc) {
  const client = new Anthropic({ apiKey: apiKey() });
  const messages = [...history.map(h => ({ role: h.role, content: h.content })), { role: 'user', content: message }];
  const response = await client.beta.messages.create({ model: modelId(), max_tokens: 1200, output_config: { effort: 'low' }, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default', system: systemPrompt(user, qc), messages });
  if (response.stop_reason === 'refusal') return { reply: 'I cannot help with that one. Let us get back to the test prep; ask me about the question in front of you or what to study next.', source: 'ai' };
  const text = response.content.filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
  return { reply: text || 'Let me try that again; ask me once more.', source: 'ai', usage: { input: response.usage.input_tokens, output: response.usage.output_tokens } };
}
function describeError(e) {
  if (!Anthropic) return 'SDK not installed';
  if (e instanceof Anthropic.AuthenticationError) return 'The API key was rejected. Check it in Settings.';
  if (e instanceof Anthropic.RateLimitError) return 'The AI tutor is rate-limited right now. Try again in a minute.';
  if (e instanceof Anthropic.APIConnectionError) return 'Could not reach the AI service. Check the internet connection.';
  if (e instanceof Anthropic.APIError) return `AI service error (${e.status}): ${e.message}`;
  return e.message;
}

async function chat(user, message, ctx = {}) {
  message = String(message || '').trim().slice(0, 4000); if (!message) throw new Error('Say something first.');
  const qc = questionContext(user, ctx);
  const history = D.all('SELECT role, content FROM tutor_messages WHERE user_id = ? ORDER BY id DESC LIMIT 12', user.id).reverse();
  let out; let note = null;
  if (status().live) { try { out = await liveReply(user, message, history, qc); } catch (e) { note = describeError(e); console.error('[tutor] live reply failed:', e.message); } }
  if (!out) { out = { ...builtinReply(user, message, ctx, qc), source: 'builtin' }; if (note) out.note = note; }
  D.run('INSERT INTO tutor_messages (user_id, role, content) VALUES (?, ?, ?)', user.id, 'user', message);
  D.run('INSERT INTO tutor_messages (user_id, role, content) VALUES (?, ?, ?)', user.id, 'assistant', out.reply);
  D.run(`DELETE FROM tutor_messages WHERE user_id = ? AND id NOT IN (SELECT id FROM tutor_messages WHERE user_id = ? ORDER BY id DESC LIMIT 60)`, user.id, user.id);
  return out;
}

// Essay feedback with the live tutor (falls back to heuristics in the server when unavailable)
async function essayFeedback(user, prompt, text) {
  if (!status().live) return null;
  try {
    const client = new Anthropic({ apiKey: apiKey() });
    const t = C.TESTS[user.target_test];
    const response = await client.beta.messages.create({ model: modelId(), max_tokens: 2500, output_config: { effort: 'medium' }, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default',
      system: `You are ${tutorName(user)}, an expert writing tutor for ${t.name} admissions essays, grading a student in grade ${user.grade || '6-9'}. Return ONLY a JSON object with keys: scores (object with ideas, organization, evidence, language, mechanics, each 1-5), strengths (array of 3 short strings), improvements (array of 3 specific, actionable strings quoting the student's own words where useful), rewrittenOpening (an improved version of their first 2-3 sentences in their own voice), summary (two encouraging but honest sentences).`,
      messages: [{ role: 'user', content: `Prompt: ${prompt}\n\nStudent response:\n${text}` }] });
    if (response.stop_reason === 'refusal') return null;
    const raw = response.content.filter(b => b.type === 'text').map(b => b.text).join('').trim();
    const json = raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1);
    return JSON.parse(json);
  } catch (e) { console.error('[tutor] essay feedback failed:', e.message); return null; }
}

module.exports = { chat, status, essayFeedback, tutorName, readConfig, writeConfig, CONFIG_PATH };
