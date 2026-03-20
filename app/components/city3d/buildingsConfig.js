// Building configurations - single source of truth for all building positions and scales
// Edit this file to change building positions and scales

export const BUILDINGS_CONFIG = [
  {
    id: 1,
    name: "Muzeum",
    model: "muzeum",
    fbxPath: "/fbx/muzeum.fbx",
    position: [0, 0, 25],
    scale: 0.02,
    lockPosition: [0, 4, 0],
    labelPosition: [0, 3, 0],
  },
  {
    id: 2,
    name: "Klasztor",
    model: "klasztor",
    fbxPath: "/fbx/klasztor.fbx",
    position: [20, 0, -10],
    scale: 0.013,
    lockPosition: [0, 5, 0],
    labelPosition: [0, 4, 0],
  },
  {
    id: 3,
    name: "Kościół",
    model: "kosciol",
    fbxPath: "/fbx/kosciol.fbx",
    position: [-20, 0, 0],
    scale: 0.012,
    lockPosition: [0, 5, 0],
    labelPosition: [0, 4, 0],
  },
  {
    id: 4,
    name: "Dworzec",
    model: "dworzec",
    fbxPath: "/fbx/dworzec.fbx",
    position: [0, -3, -25],
    scale: 0.015,
    lockPosition: [0, 3.5, 0],
    labelPosition: [0, 2.5, 0],
  },
  {
    id: 5,
    name: "Ratusz",
    model: "ratusz",
    fbxPath: "/fbx/ratusz.fbx",
    position: [0, 2, -6],
    scale: 0.01,
    lockPosition: [0, 4, 0],
    labelPosition: [0, 3, 0],
  },
];

// Helper to get building config by model name
export const getBuildingConfig = (modelName) => {
  return BUILDINGS_CONFIG.find((b) => b.model === modelName);
};

// Helper to get building config by ID
export const getBuildingConfigById = (id) => {
  return BUILDINGS_CONFIG.find((b) => b.id === id);
};

// Helper to get all positions for camera targeting
export const BUILDING_POSITIONS = BUILDINGS_CONFIG.map((b) => ({
  position: b.position,
}));
