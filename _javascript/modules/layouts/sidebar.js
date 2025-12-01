const ATTR_DISPLAY = 'sidebar-display';
const $sidebar = document.getElementById('sidebar');
const $trigger = document.getElementById('sidebar-trigger');
const $mask = document.getElementById('mask');

class SidebarUtil {
  static #isExpanded = false;

  static toggle() {
    this.#isExpanded = !this.#isExpanded;
    document.body.toggleAttribute(ATTR_DISPLAY, this.#isExpanded);
    $sidebar.classList.toggle('z-2', this.#isExpanded);
    $mask.classList.toggle('d-none', !this.#isExpanded);
  }
}

export function initSidebar() {
  $trigger.onclick = $mask.onclick = () => SidebarUtil.toggle();
}

// Language switcher
window.toggleLanguage = function() {
  try {
    const path = window.location.pathname;
    let newPath;

    // Check if the path starts with /en, indicating it's an English page.
    if (path.startsWith('/en')) {
      // English to Korean: Remove the /en prefix.
      newPath = path.substring(3);
      // If the result is an empty string (from /en), it should be the root path.
      if (newPath === '') {
        newPath = '/';
      }
    } else {
      // Korean to English: Add the /en prefix.
      if (path === '/') {
        newPath = '/en/';
      } else {
        newPath = '/en' + path;
      }
    }
    
    // Simple, robust URL construction without 'new URL()'
    const finalUrl = window.location.origin + newPath;

    // Only navigate if the URL is actually different.
    // Compare against the URL without any hash to prevent unnecessary reloads.
    if (finalUrl !== window.location.href.split('#')[0]) {
      window.location.href = finalUrl;
    }
  } catch (e) {
    // If any error occurs, log it to the browser console for debugging.
    console.error("Error in toggleLanguage function:", e);
  }
};
