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
      // Get all tab buttons in the same container
      const tabContainer = button.closest('div');
      const relatedButtons = tabContainer ? tabContainer.querySelectorAll('.tab-button') : tabButtons;
      
      // Remove active class from related buttons
      relatedButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Show corresponding panel
      const panelId = button.getAttribute('data-panel');
      const panel = document.getElementById(panelId);
      
      if (panel) {
        // Find all panels that are siblings of this panel
        const parentContainer = panel.parentElement;
        const siblingPanels = parentContainer ? parentContainer.querySelectorAll('.tab-panel') : tabPanels;
        
        // Hide all sibling panels
        siblingPanels.forEach(p => p.classList.add('hidden'));
        
        // Show the selected panel
        panel.classList.remove('hidden');
      }
    });
  });
}); 