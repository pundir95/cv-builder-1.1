(function initializeTheme() {
  try {
    if (
      localStorage.theme === "light" ||
      // eslint-disable-next-line lingui/no-unlocalized-strings
      window.matchMedia("(prefers-color-scheme: light").matches
    ) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  } catch {
    // pass
  }
})();
