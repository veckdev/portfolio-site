const html = document.documentElement;
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const mobileViewport = window.matchMedia('(max-width: 600px)');
let mode = 'system';
try {
  const saved = localStorage.getItem('veck-theme');
  if (['system', 'light', 'dark'].includes(saved)) mode = saved;
} catch { /* System preference remains available without storage. */ }

function applyTheme() {
  const followSystem = mobileViewport.matches || mode === 'system';
  const resolved = followSystem ? (systemTheme.matches ? 'dark' : 'light') : mode;
  html.dataset.theme = resolved;
  const button = document.querySelector('.theme-toggle');
  if (button) {
    const label = `Switch to ${resolved === 'dark' ? 'light' : 'dark'} theme`;
    button.setAttribute('aria-label', label);
    button.title = label;
  }
}

// The shared footer is loaded with defer; wire its button after parsing finishes.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.theme-toggle')?.addEventListener('click', () => {
    mode = html.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('veck-theme', mode); } catch {}
    applyTheme();
  });
  applyTheme();
});
systemTheme.addEventListener('change', applyTheme);
mobileViewport.addEventListener('change', applyTheme);
applyTheme();
