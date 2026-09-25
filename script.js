const html = document.documentElement;
let mode = 'dark';
try { mode = localStorage.getItem('veck-theme') || 'dark'; } catch {}
if (!['system', 'light', 'dark'].includes(mode)) mode = 'dark';

function apply(m) {
  mode = m;
  try { localStorage.setItem('veck-theme', m); } catch {}
  const resolved = m === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : m;
  html.setAttribute('data-theme', resolved);
  document.querySelectorAll('.th-btn').forEach(b => {
    const selected = b.dataset.mode === m;
    b.classList.toggle('active', selected);
    b.setAttribute('aria-pressed', String(selected));
  });
}

document.querySelectorAll('.th-btn').forEach(b =>
  b.addEventListener('click', () => apply(b.dataset.mode))
);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (mode === 'system') apply('system');
});

apply(mode);
document.getElementById("foot-year").textContent = new Date().getFullYear();