// Forsarr War Campaign - Main JavaScript File

// Set copyright year in footer and initialize mobile navigation
document.addEventListener('DOMContentLoaded', function() {
  // Set copyright year
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  
  if (navToggle && mainNav) {
    // Initially hide the navigation on mobile
    if (window.innerWidth < 768) {
      mainNav.style.display = 'none';
    }
    
    navToggle.addEventListener('click', function() {
      if (mainNav.style.display === 'none' || mainNav.style.display === '') {
        mainNav.style.display = 'block';
      } else {
        mainNav.style.display = 'none';
      }
    });
    
    // Ensure nav displays properly when resizing
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        mainNav.style.display = 'block';
      } else {
        mainNav.style.display = 'none';
      }
    });
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