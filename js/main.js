// Forsarr War Campaign - Main JavaScript File

// Set copyright year in footer
document.addEventListener('DOMContentLoaded', function() {
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Initialize any dynamic content
  initializePageContent();
});

// Function to initialize dynamic content based on the current page
function initializePageContent() {
  // Determine current page
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop();
  
  // Add active class to current navigation item
  highlightCurrentNavItem(pageName);
  
  // Page-specific initialization could be added here in the future
}

// Add active class to current navigation item
function highlightCurrentNavItem(pageName) {
  const navItems = document.querySelectorAll('nav a');
  navItems.forEach(item => {
    if (item.getAttribute('href').includes(pageName)) {
      item.classList.add('active');
    }
  });
  
  // If we're on the homepage and no nav item is active
  if (pageName === '' || pageName === 'index.html') {
    const homeLink = document.querySelector('nav a[href="index.html"]');
    if (homeLink) {
      homeLink.classList.add('active');
    }
  }
} 