const EMAIL = 'jihan@example.com'; // TODO: replace with your real email (also in index.html)
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// ---------- Tabs ----------
const names = $$('.tab').map(t => t.dataset.tab);
function show(n, scroll) {
  if (!names.includes(n)) n = 'about';
  $$('.panel').forEach(p => p.classList.toggle('on', p.id === n));
  $$('.tab').forEach(t => t.setAttribute('aria-selected', t.dataset.tab === n));
  if (location.hash !== '#' + n) history.replaceState(null, '', '#' + n);
  if (scroll) $('nav.tabs').scrollIntoView({ behavior: 'smooth' });
}
$$('.tab').forEach(t => t.onclick = () => show(t.dataset.tab));
$$('[data-go]').forEach(b => b.onclick = () => show(b.dataset.go, true));
addEventListener('hashchange', () => show(location.hash.slice(1)));
show(location.hash.slice(1));

// ---------- Skills (edit name, level 0-100, description) ----------
const skills = [
  ['HTML & CSS', 90, 'I build responsive layouts with semantic HTML, Flexbox, and Grid.'],
  ['JavaScript', 75, 'I add interactivity: DOM, events, and fetching data from APIs.'],
  ['PHP & Laravel', 70, 'I build login systems and CRUD apps with a MySQL database.'],
  ['MySQL', 72, 'I design tables, relationships, and write queries for real data.'],
  ['Git & GitHub', 78, 'I use branches, commits, and pull requests to keep code organized.'],
  ['UI/UX with Figma', 80, 'I sketch wireframes and make clickable prototypes before coding.'],
  ['Java & Python', 60, 'I write programs with OOP basics and solve logic problems.'],
  ['Testing & Debugging', 68, 'I test features and track down bugs step by step.']
];
const chips = $('#chips');
skills.forEach((s, i) => {
  const b = document.createElement('button');
  b.className = 'chip';
  b.textContent = s[0];
  b.setAttribute('aria-pressed', 'false');
  b.onclick = () => pick(i);
  chips.appendChild(b);
});
function pick(i) {
  $$('.chip').forEach((c, j) => c.setAttribute('aria-pressed', i === j));
  $('#sk-name').textContent = skills[i][0] + ' · ' + skills[i][1] + '%';
  $('#sk-desc').textContent = skills[i][2];
  $('#sk-bar').style.width = skills[i][1] + '%';
}
pick(0);

// ---------- Projects ----------
$$('.proj').forEach(p => p.onclick = () =>
  p.setAttribute('aria-expanded', p.getAttribute('aria-expanded') !== 'true'));

// ---------- Typing effect ----------
const words = ['building websites.', 'clean code.', 'good design.', 'solving bugs.'];
let w = 0, c = 0, del = false;
const el = $('#typed');
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
function tick() {
  const t = words[w];
  if (reduce) { el.textContent = t; setTimeout(() => { w = (w + 1) % words.length; tick(); }, 2200); return; }
  el.textContent = t.slice(0, c);
  if (!del && c === t.length) { del = true; return setTimeout(tick, 1400); }
  if (del && c === 0) { del = false; w = (w + 1) % words.length; }
  c += del ? -1 : 1;
  setTimeout(tick, del ? 40 : 80);
}
tick();

// ---------- Theme ----------
$('#theme').onclick = () => {
  const r = document.documentElement;
  const dark = getComputedStyle(r).getPropertyValue('--bg').trim().toLowerCase() === '#2a2140';
  r.dataset.theme = dark ? 'light' : 'dark';
};

// ---------- Copy email ----------
$('#copy').onclick = async () => {
  try { await navigator.clipboard.writeText(EMAIL); } catch (e) {}
  const t = $('#toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1600);
};
