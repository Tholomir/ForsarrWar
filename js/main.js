// Forsarr War Campaign - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  // Set copyright year
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.add('hidden'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Show corresponding panel
      const panelId = button.getAttribute('data-panel') + '-panel';
      document.getElementById(panelId).classList.remove('hidden');
    });
  });
}); 