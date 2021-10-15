(() => {
  const manualDark = localStorage.getItem('dark');
  const darkMatcher = window.matchMedia('(prefers-color-scheme: dark)').matches;

  manualDark
    ? document.body.classList.toggle('dark', manualDark === 'true')
    : document.body.classList.toggle('dark', darkMatcher);
})();
