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
  
  // Filter active battle reports
  const battleReports = events.filter(event => 
    event.type === 'battle' && 
    (limit ? event.status === 'active' : true)
  );
  
  console.log('Filtered to', battleReports.length, 'battle reports', limit ? '(active only)' : '');
  
  // Limit the number of reports if specified
  const reportsToRender = limit ? battleReports.slice(0, limit) : battleReports;
  
  console.log('Will render', reportsToRender.length, 'battle report cards');
  
  // Render each battle report
  reportsToRender.forEach(report => {
    console.log('Creating card for battle report:', report.title);
    const card = document.createElement('sl-card');
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
  
  // If we're on the index page, update the scroll arrows
  updateBattleReportsArrows();
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

// Function referenced from main.js, need to redefine it here
function updateBattleReportsArrows() {
  const battleReportsScroll = document.getElementById('battleReportsScroll');
  const battleReportsLeft = document.getElementById('battleReportsLeft');
  const battleReportsRight = document.getElementById('battleReportsRight');
  
  if (!battleReportsScroll || !battleReportsLeft || !battleReportsRight) return;
  
  const maxScroll = battleReportsScroll.scrollWidth - battleReportsScroll.clientWidth;
  battleReportsLeft.style.display = battleReportsScroll.scrollLeft > 8 ? 'block' : 'none';
  battleReportsRight.style.display = battleReportsScroll.scrollLeft < maxScroll - 8 ? 'block' : 'none';
}
