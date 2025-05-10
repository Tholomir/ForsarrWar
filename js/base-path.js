// Base path detection script
(function() {
  // Create a global variable to store the base path
  window.FORSARR_BASE_PATH = '';
  
  // Determine if we're in a subpage or the root
  const path = window.location.pathname;
  if (path.includes('/pages/')) {
    window.FORSARR_BASE_PATH = '..';
  } else {
    window.FORSARR_BASE_PATH = '.';
  }
  
  console.log('Base path set to:', window.FORSARR_BASE_PATH);
})();
