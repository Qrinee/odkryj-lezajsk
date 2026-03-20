// City elements that can be unlocked with codes
export const CITY_ELEMENTS = [
  { id: 1, name: "Muzeum", code: "LZK-2YZA-4BCD", description: "Muzeum Historyczne", icon: "🏛️", image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&h=400&fit=crop", model: "muzeum" },
  { id: 2, name: "Klasztor", code: "LZK-3KLA-5SZT", description: "Zespół klasztorny", icon: "⛪", image: "https://images.unsplash.com/photo-1510021867896-83b6d722c064?w=600&h=400&fit=crop", model: "klasztor" },
  { id: 3, name: "Kościół", code: "LZK-4KOS-6CIOL", description: "Kościół parafialny", icon: "⛪", image: "https://images.unsplash.com/photo-1510021867896-83b6d722c064?w=600&h=400&fit=crop", model: "kosciol" },
  { id: 4, name: "Dworzec", code: "LZK-5POIU-1ZXC", description: "Dworzec kolejowy", icon: "🚉", image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop", model: "dworzec" },
  { id: 5, name: "Ratusz", code: "LZK-7RAT-9USZ", description: "Historyczny ratusz miejski", icon: "🏛️", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop", model: "ratusz" },
];

// Example items for roulette (can be customized with actual city elements)
export const ROULETTE_ITEMS = [
  { id: 1, name: "Muzeum",  color: "bg-amber-500", text: "text-amber-100", originalElement: CITY_ELEMENTS[0] },
  { id: 2, name: "Klasztor", color: "bg-emerald-500", text: "text-emerald-100", originalElement: CITY_ELEMENTS[1] },
  { id: 3, name: "Kościół",  color: "bg-blue-500", text: "text-blue-100", originalElement: CITY_ELEMENTS[2] },
  { id: 4, name: "Dworzec",  color: "bg-purple-500", text: "text-purple-100", originalElement: CITY_ELEMENTS[3] },
  { id: 5, name: "Ratusz",  color: "bg-pink-500", text: "text-pink-100", originalElement: CITY_ELEMENTS[4] },
];

export const SPIN_DURATION_MS = 10000; // 10 seconds spin
