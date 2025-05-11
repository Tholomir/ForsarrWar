export const systems = {
  druscar: {
    name: "Druscar System",
    color: "lime-400",
    planets: [
      {
        name: "Druscar Prime",
        img: "../assets/images/planets/Druscar Prime.png",
        description: "A once-teeming hive-world of broad temperate plains, its crust is riddled with towering, now–shattered hab-spires and industrial strata that plunge deep into the mantle. Centuries of over-extraction left the atmosphere thin and acrid even before the Tyranid onslaught; today toxic storms scour valleys of fused slag and skeletal ferrocrete.",
        badge: { variant: "danger", text: "Imperial Ruin" },
        details: `The Battle of Druscar's Ruin accelerated its ecological collapse, reducing vast districts to radioactive glass and forcing all remaining life to cling to the planet's lightless sub-levels.`
      }
    ]
  },
  kelthorn: {
    name: "Kelthorn System",
    color: "blue-500",
    planets: [
      {
        name: "Kelthorn II",
        img: "../assets/images/planets/Kelthorn-II.png",
        description: "An iron-red forge-world cloaked in ceaseless smog, its surface is a lattice of magma-lit manufactoria, cyclopean data-spires, and oceans of toxic coolant. The crust resonates with geomagnetic hum from planetary-scale induction coils that once powered legitimate Mechanicus forges—now warped into daemon-engines after the Kelthorn Heresy.",
        badge: { variant: "primary", text: "Dark Mechanicum" },
        details: `Warp bleed from the buried Sensory Nexus twists reality itself, causing time slips and flesh-metal growths that bloom like rusted flowers along fracture zones.`
      },
      {
        name: "Kelthorn IV",
        img: "../assets/images/planets/Kelthorn-IV.png",
        description: "A frigid, airless sphere stripped to bedrock by Tyranid reclamation swarms, it is carpeted in grey regolith only a few metres deep. Subsurface scans reveal honeycombed tunnels where the hive fleet siphoned every scrap of bio-mass and volatiles before departing.",
        badge: { variant: "danger", text: "Tyranid Reclamation" },
        details: `The planet is geologically stable but utterly sterile, its only landmarks the vitrified footprints of spore towers long since dissolved.`
      }
    ]
  },
  vordrast: {
    name: "Vordrast System",
    color: "red-500",
    planets: [
      {
        name: "Vordrast Prime",
        img: "../assets/images/planets/Vordrast-Prime.png",
        description: "Once a minor forge-moon, Vordrast is now a sprawling Ork scrap-yard whose crust is welded beneath kilometres of ramshackle plates, kill-krater foundries, and teetering smoke-stacks.",
        badge: { variant: "success", text: "Ork-held" },
        details: `Metallic overburden has distorted the moon's gravity field, creating irregular tidal stresses that crack the mantle and occasionally launch geysers of molten slag skyward. The constant clang of Mek-shops and the green glow of improvised plasma reactors give the night side an eerie aurora visible across the system.`
      }
    ]
  },
  zanthis: {
    name: "Zanthis System",
    color: "amber-400",
    planets: [
      {
        name: "Zanthis III",
        img: "../assets/images/planets/Zanthis-III.png",
        description: "A verdant agri-world of wide savannahs and freshwater seas, its mild climate once earned it the nickname 'Imperium's Breadbasket.' Thick loess soils and wind-swept grain plains now lie beneath creeping carpets of corpse-mold and rust-red blight released by the Death Guard.",
        badge: { variant: "warning", text: "Imperial Bastion" },
        details: `Plague storms seeded by the Destroyer Hive have tainted the hydrosphere, turning many lakes into viscous, pus-yellow mires that choke irrigation networks and sicken any who linger unmasked.`
      }
    ]
  }
}; 