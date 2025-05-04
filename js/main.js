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
      // Remove active class from all tab buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      // Hide all tab panels and remove 'active'
      tabPanels.forEach(panel => {
        panel.classList.add('hidden');
        panel.classList.remove('active');
      });
      // Show the selected panel and add 'active'
      const panelId = button.getAttribute('data-panel');
      const panel = document.getElementById(panelId);
      if (panel) {
        panel.classList.remove('hidden');
        panel.classList.add('active');
      }
    });
  });
}); 