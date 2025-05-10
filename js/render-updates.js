// Forsarr War Campaign - Event Rendering System
// This file loads event data from JSON and populates templates in the pages

async function loadEventData() {
  // Try different paths based on where the file might be
  const possiblePaths = [
    './js/data/events.json',  // From root
    '../js/data/events.json', // From /pages/
    '/js/data/events.json',   // Absolute from web root
    '/ForsarrWar/js/data/events.json' // If deployed in a subdirectory
  ];
  
  for (const path of possiblePaths) {
    try {
      console.log('Attempting to load event data from:', path);
      const response = await fetch(path);
      if (response.ok) {
        const data = await response.json();
        console.log('Event data loaded successfully from:', path);
        return data;
      }
    } catch (error) {
      console.log(`Failed to load from ${path}:`, error.message);
      // Continue to next path
    }
  }
  
  // If we get here, all paths failed
  console.error('Failed to load event data from all paths');
  return { battleReports: [] };
}

function sortEventsByDate(events) {
  return [...events].sort((a, b) => {
    // Convert dates in format "043.012.M42" for comparison
    // Higher numbers are more recent in 40k dating system
    const dateA = a.date.split('.');
    const dateB = b.date.split('.');
    
    // Compare millennium first
    const millenniumA = dateA[2];
    const millenniumB = dateB[2];
    if (millenniumA !== millenniumB) return millenniumB.localeCompare(millenniumA);
    
    // Then compare year
    const yearA = parseInt(dateA[1]);
    const yearB = parseInt(dateB[1]);
    if (yearA !== yearB) return yearB - yearA;
    
    // Finally compare day
    const dayA = parseInt(dateA[0]);
    const dayB = parseInt(dateB[0]);
    return dayB - dayA;
  });
}

function renderBattleReportCards(container, events, limit = null) {
  if (!container) {
    console.error('No container provided for battle report cards');
    return;
  }
  
  console.log('Rendering battle report cards:', events.length, 'total events');
    // Clear existing content
  container.innerHTML = '';
    
  // Sort events by date (newest first)
  const sortedEvents = sortEventsByDate(events);
  
  // Limit the number of reports if specified
  const reportsToRender = limit ? sortedEvents.slice(0, limit) : sortedEvents;
  
  console.log('Will render', reportsToRender.length, 'battle report cards');
  
  // Render each battle report
  reportsToRender.forEach(report => {
    console.log('Creating card for battle report:', report.title);    const card = document.createElement('sl-card');
    card.className = 'min-w-[20rem] max-w-xs md:min-w-[24rem] md:max-w-sm';
    
    const hasFullReport = report.reportUrl && report.reportUrl !== '#';
    
    const cardContent = `
      ${hasFullReport 
        ? `<a href="${report.reportUrl}" class="card-content-wrapper block no-underline">`
        : `<div class="card-content-wrapper block opacity-60 cursor-not-allowed">`
      }
        <div class="font-bold text-amber-600 text-lg flex items-center mb-3">
          <span class="inline-block w-4 h-4 bg-lime-400 rounded-full mr-3 shadow-glow-lime pulse-dot-lime"></span>
          ${report.title}
        </div>
        <p class="text-stone-200 mb-4">${report.description}</p>
        <div class="flex flex-wrap gap-2 justify-between items-center pt-3 border-t border-zinc-700">
          ${report.factions.map(faction => 
            `<sl-badge variant="${faction.variant}" pill>${faction.name}</sl-badge>`
          ).join('')}
        </div>
        ${!hasFullReport ? `<span class="text-xs text-stone-400 block mt-2">Full report coming soon</span>` : ''}
      ${hasFullReport ? '</a>' : '</div>'}
    `;
      card.innerHTML = cardContent;
    container.appendChild(card);
  });
  
  console.log('Finished rendering battle report cards');
  
  // Use a more robust approach to ensure images and web components are loaded
  // before calculating scroll dimensions
  ensureLayoutCalculated();
}

// Function to ensure layout is properly calculated after rendering
function ensureLayoutCalculated() {
  console.log('Starting layout calculation sequence');
  
  // First immediate check
  updateBattleReportsArrows();
  
  // Then check after a short delay (for quick loads)
  setTimeout(() => {
    updateBattleReportsArrows();
    console.log('First delayed arrow update');
  }, 50);
  
  // Check again after components have had more time to render
  setTimeout(() => {
    updateBattleReportsArrows();
    console.log('Second delayed arrow update');
    
    // Force a resize which can help with layout calculations
    window.dispatchEvent(new Event('resize'));
  }, 200);
  
  // One final check after images likely loaded
  setTimeout(() => {
    updateBattleReportsArrows();
    console.log('Final delayed arrow update');
  }, 500);
  
  // Also update on window resize
  window.addEventListener('resize', updateBattleReportsArrows);
}

function renderTimelineEntries(container, events) {
  if (!container) {
    console.error('No container provided for timeline entries');
    return;
  }
  
  console.log('Rendering timeline entries:', events.length, 'total events');
  
  // Clear existing content
  container.innerHTML = '';
  
  // Sort events by date, newest first
  const sortedEvents = sortEventsByDate(events);
  
  console.log('Sorted events by date, rendering', sortedEvents.length, 'timeline entries');
  
  // Render each timeline entry
  sortedEvents.forEach(event => {
    console.log('Creating timeline entry for:', event.title);
    const card = document.createElement('sl-card');
    
    const cardContent = `
      <div class="card-content-wrapper timeline-event" data-year="${event.date}">
        <div class="flex items-center mb-1">
          <span class="text-stone-300 text-sm mr-2">${event.date}</span>
        </div>
        <div class="font-bold text-amber-600 text-lg flex items-center mb-3">
          <span class="inline-block w-4 h-4 bg-lime-400 rounded-full mr-3 shadow-glow-lime pulse-dot-lime"></span>
          ${event.title}
        </div>
        <p class="text-stone-200 mb-2">${event.summary}</p>
        <sl-details class="mt-2" summary="Event Details">
          ${event.factions.map(faction => 
            `<sl-badge variant="${faction.variant}" class="mb-2${event.factions.indexOf(faction) > 0 ? ' ml-2' : ''}">${faction.name}</sl-badge>`
          ).join('')}
          <p class="text-stone-200 text-sm">${event.fullDescription}</p>
        </sl-details>
      </div>
    `;
    
    card.innerHTML = cardContent;
    container.appendChild(card);
  });
  
  console.log('Finished rendering timeline entries');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
  console.log('DOM loaded, initializing event rendering system');
  
  // Load event data with the base path from our global variable
  const eventData = await loadEventData();
  
  if (!eventData || !eventData.battleReports || eventData.battleReports.length === 0) {
    console.error('No event data available');
    return;
  }
  // Check which page we're on and render appropriate templates
  const path = window.location.pathname;
  
  console.log('Current path:', path);
  
  // Check for index.html or root path (could end with / or just the domain)
  const isIndex = path.endsWith('index.html') || 
                 path.endsWith('/') || 
                 path === '' || 
                 path.endsWith('ForsarrWar/') ||
                 path === '/ForsarrWar' ||
                 path === '/';
                 
  if (isIndex) {
    console.log('On index page, looking for battle reports container');
    const battleReportsContainer = document.getElementById('battleReportsScroll');
    if (battleReportsContainer) {
      console.log('Found battle reports container, rendering cards');
      renderBattleReportCards(battleReportsContainer, eventData.battleReports, 5);
      
      // Add scroll event listener to update arrows during scrolling
      const battleReportsScroll = document.getElementById('battleReportsScroll');
      const battleReportsLeft = document.getElementById('battleReportsLeft');
      const battleReportsRight = document.getElementById('battleReportsRight');
      
      if (battleReportsScroll) {
        battleReportsScroll.addEventListener('scroll', updateBattleReportsArrows);
        
        // Set up click handlers for scroll buttons if they exist
        if (battleReportsLeft) {
          battleReportsLeft.addEventListener('click', () => {
            battleReportsScroll.scrollBy({ left: -320, behavior: 'smooth' });
          });
        }
        
        if (battleReportsRight) {
          battleReportsRight.addEventListener('click', () => {
            battleReportsScroll.scrollBy({ left: 320, behavior: 'smooth' });
          });
        }
      }
    } else {
      console.error('Could not find battle reports container with ID: battleReportsScroll');
    }
  }
  
  // Check for timeline page (could be in /pages/ directory)
  const isTimeline = path.includes('timeline.html') || path.includes('/timeline');
  
  if (isTimeline) {
    console.log('On timeline page, looking for timeline container');
    const timelineContainer = document.querySelector('.timeline');
    if (timelineContainer) {
      console.log('Found timeline container, rendering entries');
      renderTimelineEntries(timelineContainer, eventData.battleReports);
    } else {
      console.error('Could not find timeline container with class: timeline');
    }
  }
});

// Function to update the scroll arrows for battle reports
function updateBattleReportsArrows() {
  const battleReportsScroll = document.getElementById('battleReportsScroll');
  const battleReportsLeft = document.getElementById('battleReportsLeft');
  const battleReportsRight = document.getElementById('battleReportsRight');
  
  if (!battleReportsScroll || !battleReportsLeft || !battleReportsRight) {
    console.warn('Missing scroll container or arrow elements');
    return;
  }
  
  // Calculate if we have more content than the container can show
  const maxScroll = battleReportsScroll.scrollWidth - battleReportsScroll.clientWidth;
  console.log('Scroll container dimensions:', {
    scrollWidth: battleReportsScroll.scrollWidth,
    clientWidth: battleReportsScroll.clientWidth,
    maxScroll: maxScroll,
    currentScroll: battleReportsScroll.scrollLeft,
    childCount: battleReportsScroll.children.length
  });
  
  // For left arrow, show only if we've scrolled to the right
  battleReportsLeft.style.display = battleReportsScroll.scrollLeft > 8 ? 'block' : 'none';
  
  // For right arrow - show if there's more content to scroll to
  // Note the threshold of 8px to account for small rounding differences
  const showRightArrow = maxScroll > 8 && battleReportsScroll.scrollLeft < maxScroll - 8;
  
  console.log('Right arrow visibility calculation:', {
    maxScroll: maxScroll,
    threshold: 8,
    scrollPosition: battleReportsScroll.scrollLeft,
    shouldShow: showRightArrow
  });
  
  // Make sure the right arrow is visible when we have multiple cards that extend beyond the container
  battleReportsRight.style.display = showRightArrow ? 'block' : 'none';
  
  // Special case: if we have multiple cards but maxScroll is not yet calculated correctly,
  // force the right arrow to be visible initially
  if (battleReportsScroll.children.length > 1 && maxScroll <= 8 && battleReportsScroll.scrollLeft === 0) {
    console.log('Multiple cards detected but maxScroll not yet calculated correctly. Forcing right arrow display.');
    battleReportsRight.style.display = 'block';
    
    // Try to check again soon in case layout calculation completes
    setTimeout(() => updateBattleReportsArrows(), 100);
  }
}
