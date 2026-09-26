// Shared footer for every page; typography is defined once in footer.css.
(() => {
  const footer = document.querySelector('[data-site-footer]');
  if (!footer) return;

  const inner = document.createElement('div');
  inner.className = 'site-footer-inner';
  const signature = document.createElement('span');
  signature.className = 'site-footer-signature';
  signature.setAttribute('role', 'img');
  signature.setAttribute('aria-label', 'victor in binary');
  signature.title = 'victor';

  for (const letter of 'victor') {
    const byte = document.createElement('span');
    byte.setAttribute('aria-hidden', 'true');
    byte.textContent = letter.charCodeAt(0).toString(2).padStart(8, '0');
    signature.append(byte);
  }

  const year = document.createElement('span');
  year.className = 'site-footer-year';
  year.textContent = new Date().getFullYear();
  inner.append(signature, year);
  footer.replaceChildren(inner);
})();
