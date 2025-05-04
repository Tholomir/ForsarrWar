// Forsarr War Campaign - Tailwind Configuration
tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Warhammer 40k Theme Colors
        'imperial-red': '#990000', // Primary accent color
        'aquila-gold': '#d4af37',  // Secondary accent color
        'mechanicus-gray': '#333333',
        'chaos-black': '#0a0a0a',
        'parchment': '#f5ecd5',
        'text-color': '#f0f0f0',
        'header-bg': 'rgba(10, 10, 10, 0.9)',
        'section-bg': 'rgba(20, 20, 20, 0.8)',
        
        // New Standard Color Palette
        // Base colors
        'base-bg': '#18181b',      // zinc-900: Dark background base
        'base-text': '#e7e5e4',    // stone-200: Light text on dark backgrounds
        
        // Accents and highlights
        'accent-bg': '#166534',    // green-800: Muted accent background
        'accent-text': '#a3e635',  // lime-400: Bright glow/accent text
        'accent-border': '#a3e635', // lime-400: Border for accent sections
        
        // Secondary and neutral colors
        'secondary-text': '#a8a29e', // stone-400: Muted secondary text
        'card-bg': '#e7e5e4',      // stone-200: Light panel/card background
        'card-text': '#18181b',    // zinc-900: Dark text on light background
        'highlight': '#d97706',    // amber-600: Decorative highlights
        'neutral-text': '#57534e', // stone-600: Body or paragraph text (neutral)
        'secondary-bg': '#27272a', // zinc-800: Secondary dark background
        'footer-text': '#d6d3d1'   // stone-300: Muted footer text
      }
    }
  }
} 