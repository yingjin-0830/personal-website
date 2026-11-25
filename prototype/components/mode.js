/* Run synchronously in <head>; the first paint already has the saved mode. */
(() => {
  let mode = 'dark';
  try {
    const saved = localStorage.getItem('yj-mode');
    if (saved === 'light' || saved === 'dark') mode = saved;
  } catch {}
  document.documentElement.dataset.mode = mode;
})();
