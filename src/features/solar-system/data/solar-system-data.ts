export type PlanetId =
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune";

export type PlanetPattern = "bands" | "speckle";

export type PlanetRing = {
  innerRadius: number;
  outerRadius: number;
  color: string;
};

export type SolarBody = {
  id: PlanetId;
  name: string;
  description: string;
  diameterKm: number;
  distanceFromSunMillionKm: number;
  orbitalPeriodDays: number;
  sceneRadius: number;
  sceneOrbitRadius: number;
  orbitSpeed: number;
  spinSpeed: number;
  axialTilt: number;
  palette: readonly string[];
  pattern: PlanetPattern;
  ring?: PlanetRing;
};

export const SUN = {
  name: "Sun",
  radius: 4,
  color: "#FFB648",
  glowRgb: "255,190,90",
} as const;

export const SOLAR_BODIES: readonly SolarBody[] = [
  {
    id: "mercury",
    name: "Mercury",
    description:
      "The smallest planet and the closest to the Sun, with a heavily cratered, airless surface.",
    diameterKm: 4879,
    distanceFromSunMillionKm: 57.9,
    orbitalPeriodDays: 88,
    sceneRadius: 0.35,
    sceneOrbitRadius: 9,
    orbitSpeed: 0.9,
    spinSpeed: 0.3,
    axialTilt: 0.03,
    palette: ["#8C8C8C", "#6E6E6E", "#A8A39B"],
    pattern: "speckle",
  },
  {
    id: "venus",
    name: "Venus",
    description:
      "A thick, cloud-covered world wrapped in a bright atmosphere, and the hottest planet in the solar system.",
    diameterKm: 12104,
    distanceFromSunMillionKm: 108.2,
    orbitalPeriodDays: 224.7,
    sceneRadius: 0.85,
    sceneOrbitRadius: 13,
    orbitSpeed: 0.65,
    spinSpeed: 0.2,
    axialTilt: 3.1,
    palette: ["#E8C27A", "#F3D9A4", "#D9A95F"],
    pattern: "bands",
  },
  {
    id: "earth",
    name: "Earth",
    description:
      "The only known world with liquid surface water and life.",
    diameterKm: 12742,
    distanceFromSunMillionKm: 149.6,
    orbitalPeriodDays: 365.25,
    sceneRadius: 0.9,
    sceneOrbitRadius: 17,
    orbitSpeed: 0.5,
    spinSpeed: 0.6,
    axialTilt: 0.41,
    palette: ["#1E4FA3", "#2F7BC4", "#3E9A4A", "#D9C58A", "#F5F7FA"],
    pattern: "speckle",
  },
  {
    id: "mars",
    name: "Mars",
    description:
      "A cold desert world covered in iron-oxide dust, with polar ice caps and the tallest volcano in the solar system.",
    diameterKm: 6779,
    distanceFromSunMillionKm: 227.9,
    orbitalPeriodDays: 687,
    sceneRadius: 0.5,
    sceneOrbitRadius: 22,
    orbitSpeed: 0.33,
    spinSpeed: 0.55,
    axialTilt: 0.44,
    palette: ["#B5532F", "#9C4324", "#D9825B", "#7A3320"],
    pattern: "speckle",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    description:
      "The largest planet, a gas giant with colorful cloud bands and the Great Red Spot.",
    diameterKm: 139820,
    distanceFromSunMillionKm: 778.5,
    orbitalPeriodDays: 4332.6,
    sceneRadius: 2.2,
    sceneOrbitRadius: 32,
    orbitSpeed: 0.18,
    spinSpeed: 1.2,
    axialTilt: 0.05,
    palette: ["#C88B3A", "#E8C48A", "#A0643A", "#F2E0C0", "#B77A45"],
    pattern: "bands",
  },
  {
    id: "saturn",
    name: "Saturn",
    description:
      "A gas giant famous for its bright, icy ring system.",
    diameterKm: 116460,
    distanceFromSunMillionKm: 1433.5,
    orbitalPeriodDays: 10759,
    sceneRadius: 1.9,
    sceneOrbitRadius: 44,
    orbitSpeed: 0.12,
    spinSpeed: 1,
    axialTilt: 0.47,
    palette: ["#D8C48A", "#E9D7A6", "#B9A270"],
    pattern: "bands",
    ring: {
      innerRadius: 2.6,
      outerRadius: 4.2,
      color: "#CDBB8A",
    },
  },
  {
    id: "uranus",
    name: "Uranus",
    description:
      "An ice giant tilted on its side, with a pale cyan atmosphere.",
    diameterKm: 50724,
    distanceFromSunMillionKm: 2872.5,
    orbitalPeriodDays: 30687,
    sceneRadius: 1.2,
    sceneOrbitRadius: 56,
    orbitSpeed: 0.085,
    spinSpeed: 0.7,
    axialTilt: 1.71,
    palette: ["#7FD3DE", "#A6E4EB", "#5FBFCD"],
    pattern: "bands",
  },
  {
    id: "neptune",
    name: "Neptune",
    description:
      "The most distant planet, a deep blue ice giant with some of the fastest winds in the solar system.",
    diameterKm: 49244,
    distanceFromSunMillionKm: 4495.1,
    orbitalPeriodDays: 60190,
    sceneRadius: 1.15,
    sceneOrbitRadius: 68,
    orbitSpeed: 0.07,
    spinSpeed: 0.7,
    axialTilt: 0.5,
    palette: ["#2C5FD6", "#3D74E8", "#1E45A8"],
    pattern: "bands",
  },
];

export function getSolarBody(id: PlanetId): SolarBody | undefined {
  return SOLAR_BODIES.find((body) => body.id === id);
}

export function getPlanetObjectName(id: PlanetId): string {
  return `planet-${id}`;
}
