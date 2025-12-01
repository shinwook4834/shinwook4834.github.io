document.addEventListener("DOMContentLoaded", () => {
  window.toggleLang = function () {
    try {
      const currentPathname = window.location.pathname;
      const isEnglish = /^\/en(\/|$)/.test(currentPathname);
      let newPathname;

      if (isEnglish) {
        // English to Korean: Remove /en prefix
        newPathname = currentPathname.replace(/^\/en/, '');
        if (newPathname === '') {
          newPathname = '/';
        }
      } else {
        // Korean to English: Add /en prefix
        if (currentPathname === '/') {
          newPathname = '/en/';
        } else {
          newPathname = '/en' + currentPathname;
        }
      }
      
      // Use location.href for navigation
      window.location.href = newPathname;

    } catch (e) {
      console.error("Error in toggleLang:", e);
    }
  };
});
