const html = document.documentElement;
let mode = localStorage.getItem('veck-theme') || 'dark';

function apply(m) {
  mode = m;
  localStorage.setItem('veck-theme', m);
  const resolved = m === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : m;
  html.setAttribute('data-theme', resolved);
  document.querySelectorAll('.th-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.mode === m)
  );
}

document.querySelectorAll('.th-btn').forEach(b =>
  b.addEventListener('click', () => apply(b.dataset.mode))
);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (mode === 'system') apply('system');
});

apply(mode);
document.getElementById("foot-year").textContent = new Date().getFullYear();