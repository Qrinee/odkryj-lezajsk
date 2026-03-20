// City elements that can be unlocked with codes
export const CITY_ELEMENTS = [
  { 
    id: 1, 
    name: "Muzeum", 
    code: "LZK-2YZA-4BCD", 
    description: "Muzeum Ziemi Leżajskiej wpisane w mury dawnego dworu", 
    icon: "🏛️", 
    image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&h=400&fit=crop", 
    model: "muzeum",
    oldImage: "https://images.unsplash.com/photo-1551008475-46065cd81977?w=600&h=400&fit=crop&grayscale=true",
    newImage: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=600&h=400&fit=crop",
    trivia: [
      "Budynek dawniej pełnił funkcję obronną jako część systemu fortyfikacji miasta.",
      "Zgromadzono tu jedną z najbardziej niezwykłych wystaw historii browarnictwa w regionie.",
      "W podziemiach zachowały się oryginalne ceglane sklepienia kolebkowe z dawnych czasów."
    ]
  },
  { 
    id: 2, 
    name: "Klasztor", 
    code: "LZK-3KLA-5SZT", 
    description: "Zespół klasztorny Ojców Bernardynów i Bazylika Zwiastowania NMP", 
    icon: "⛪", 
    image: "https://images.unsplash.com/photo-1510021867896-83b6d722c064?w=600&h=400&fit=crop", 
    model: "klasztor",
    oldImage: "https://images.unsplash.com/photo-1548625361-ec853fbc2df8?w=600&h=400&fit=crop&grayscale=true",
    newImage: "https://images.unsplash.com/photo-1510021867896-83b6d722c064?w=600&h=400&fit=crop",
    trivia: [
      "W bazylice znajdują się jedne z najsłynniejszych w Europie organów z XVII wieku.",
      "Świątynia posiada imponujący system ok. 6000 piszczałek podzielonych na 75 głosów.",
      "Klasztor otoczony jest systemem potężnych obwarowań, do dziś przypominających twierdzę."
    ]
  },
  { 
    id: 3, 
    name: "Kościół", 
    code: "LZK-4KOS-6CIOL", 
    description: "Zabytkowy kościół farny p.w. Trójcy Świętej i Wszystkich Świętych", 
    icon: "⛪", 
    image: "https://images.unsplash.com/photo-1544383411-e6c278bc2b78?w=600&h=400&fit=crop", 
    model: "kosciol",
    oldImage: "https://images.unsplash.com/photo-1447014421976-7fec21d26d86?w=600&h=400&fit=crop&grayscale=true",
    newImage: "https://images.unsplash.com/photo-1544383411-e6c278bc2b78?w=600&h=400&fit=crop",
    trivia: [
      "Pierwotny, drewniany kościół w tym miejscu powstał już w 1399 r.",
      "Poważnie ucierpiał podczas m.in. najazdów tatarskich i był wielokrotnie przebudowywany.",
      "We wnętrzu można podziwiać piękny barokowy ołtarz główny z XVII wieku."
    ]
  },
  { 
    id: 4, 
    name: "Dworzec", 
    code: "LZK-5POIU-1ZXC", 
    description: "Zabytkowy budynek stacji kolejowej oddany do użytku ok. 1900 r.", 
    icon: "🚉", 
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop", 
    model: "dworzec",
    oldImage: "https://images.unsplash.com/photo-1496674205429-924b32acd421?w=600&h=400&fit=crop&grayscale=true",
    newImage: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&h=400&fit=crop",
    trivia: [
      "Powstanie dworca włączanego w rozwój kolei galicyjskiej znacznie przyspieszyło rozwój miasta.",
      "W architekturze można dostrzec typowy styl eleganckich stacji kolejowych Austro-Węgier.",
      "W czasie obu wojen światowych dworzec odgrywał ważną funkcję logistyczno-transportową."
    ]
  },
  { 
    id: 5, 
    name: "Ratusz", 
    code: "LZK-7RAT-9USZ", 
    description: "Historyczny ratusz będący sercem zabytkowego centrum miasta", 
    icon: "🏛️", 
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop", 
    model: "ratusz",
    oldImage: "https://images.unsplash.com/photo-1502010887375-3475871f3014?w=600&h=400&fit=crop&grayscale=true",
    newImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop",
    trivia: [
      "Ratusz Leżajski znajdował się na Rynku już dawno, był jednak kilkukrotnie przebudowywany.",
      "W podziemiach znajdowała się waga miejska i prawdopodobnie areszt dla rzezimieszków.",
      "W ostatnich latach Ratusz przeszedł renowację przywracającą mu swój dawny blask."
    ]
  },
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
