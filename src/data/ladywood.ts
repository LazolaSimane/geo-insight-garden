import type { Band } from "@/lib/scoring";

export type LatLng = [number, number];

export type Site = {
  id: string;
  name: string;
  ref: string;
  centre: LatLng;
  areaHa: number;
  /** Brownfield Land Register condition / vacancy category */
  landCategory: string;
  L: Band;
  /** SFRA surface-water flood-risk category */
  floodCategory: string;
  F: Band;
  /** Dominant applicable GeoSure layer */
  geoHazard: string;
  G: Band;
  notes: string;
  benchmark?: boolean;
};

export const LADYWOOD_CENTRE: LatLng = [52.4805, -1.925];

/**
 * Screening inputs for Ladywood (Birmingham) brownfield sites.
 * L: Birmingham Brownfield Land Register (2025)
 * F: Birmingham Strategic Flood Risk Assessment (surface water)
 * G: BGS GeoSure, dominant hazard layer (generalised 1:50,000 scale)
 */
export const SITES: Site[] = [
  {
    id: "port-loop",
    name: "Port Loop",
    ref: "BLR/LW-01",
    centre: [52.4842, -1.9284],
    areaHa: 17.2,
    landCategory: "Former industrial, part-cleared, phased development",
    L: "high",
    floodCategory: "Surface water — high (canal loop, low-lying)",
    F: "very-high",
    geoHazard: "Shrink-swell clay",
    G: "moderate",
    notes:
      "Large canal-enclosed former industrial peninsula. Extensive impermeable made ground with limited existing drainage attenuation.",
    benchmark: true,
  },
  {
    id: "tube-works",
    name: "Tube Works, Rotton Park Street",
    ref: "BLR/LW-02",
    centre: [52.4818, -1.931],
    areaHa: 4.6,
    landCategory: "Vacant former works, structures retained",
    L: "very-high",
    floodCategory: "Surface water — medium",
    F: "high",
    geoHazard: "Shrink-swell clay",
    G: "moderate",
    notes:
      "Long-vacant metal-working site. Likely localised contamination and variable fill depth; condition screening flags it as the weakest land condition in the sample.",
    benchmark: true,
  },
  {
    id: "tower-ballroom",
    name: "Tower Ballroom site, Reservoir Road",
    ref: "BLR/LW-03",
    centre: [52.4795, -1.935],
    areaHa: 1.9,
    landCategory: "Cleared site (demolished 2020), vacant",
    L: "very-high",
    floodCategory: "Surface water — high (reservoir edge)",
    F: "high",
    geoHazard: "Shrink-swell clay / running sand",
    G: "high",
    notes:
      "Cleared plot beside Edgbaston Reservoir. Ground-condition class elevated by proximity to reservoir embankment deposits.",
    benchmark: true,
  },
  {
    id: "ringway",
    name: "Ringway Centre, Smallbrook Queensway",
    ref: "BLR/LW-04",
    centre: [52.4765, -1.8988],
    areaHa: 2.4,
    landCategory: "Occupied, under-used, demolition proposed",
    L: "moderate",
    floodCategory: "Surface water — medium (culverted watercourse)",
    F: "moderate",
    geoHazard: "Shrink-swell clay",
    G: "low",
    notes:
      "Retained structure with embodied-carbon value. Screening supports retrofit over demolition-led redevelopment.",
    benchmark: true,
  },
  {
    id: "st-vincent",
    name: "St Vincent Street West / Ladywood Middleway",
    ref: "BLR/LW-05",
    centre: [52.4772, -1.9195],
    areaHa: 3.1,
    landCategory: "Previously developed, part vacant, hardstanding",
    L: "high",
    floodCategory: "Surface water — high (Middleway ponding)",
    F: "very-high",
    geoHazard: "Shrink-swell clay",
    G: "moderate",
    notes:
      "Highway-adjacent hardstanding with recorded surface-water ponding. Strong candidate for source-control SuDS.",
  },
  {
    id: "sherborne",
    name: "Sherborne Wharf, Sheepcote Street",
    ref: "BLR/LW-06",
    centre: [52.477, -1.9145],
    areaHa: 2.0,
    landCategory: "Part-developed canalside, remnant yards",
    L: "moderate",
    floodCategory: "Surface water — high (canal frontage)",
    F: "high",
    geoHazard: "Running sand (alluvial deposits)",
    G: "high",
    notes:
      "Canal frontage with alluvial deposits; infiltration-based SuDS likely constrained by ground conditions.",
  },
  {
    id: "spring-hill",
    name: "Spring Hill / Icknield Street",
    ref: "BLR/LW-07",
    centre: [52.488, -1.9245],
    areaHa: 1.4,
    landCategory: "Vacant infill plots, cleared",
    L: "high",
    floodCategory: "Surface water — medium",
    F: "moderate",
    geoHazard: "Shrink-swell clay",
    G: "low",
    notes: "Small cleared infill plots between terraces; modest attenuation opportunity.",
  },
  {
    id: "brookfields",
    name: "Brookfields, Camden Street",
    ref: "BLR/LW-08",
    centre: [52.487, -1.9165],
    areaHa: 2.6,
    landCategory: "Under-used industrial units, partial vacancy",
    L: "moderate",
    floodCategory: "Surface water — medium (culverted brook line)",
    F: "high",
    geoHazard: "Shrink-swell clay",
    G: "moderate",
    notes:
      "Historic brook line now culverted; exceedance flows follow the former channel across the site.",
  },
  {
    id: "rotton-park",
    name: "Rotton Park Road depot",
    ref: "BLR/LW-09",
    centre: [52.4855, -1.9385],
    areaHa: 1.1,
    landCategory: "Operational depot, hardstanding, low vacancy",
    L: "low",
    floodCategory: "Surface water — low",
    F: "low",
    geoHazard: "Shrink-swell clay",
    G: "moderate",
    notes: "Elevated ground, active use. Retained as baseline comparison site.",
  },
  {
    id: "summerfield",
    name: "Dudley Road / Summerfield edge",
    ref: "BLR/LW-10",
    centre: [52.4835, -1.942],
    areaHa: 1.7,
    landCategory: "Previously developed, partly vacant frontage",
    L: "moderate",
    floodCategory: "Surface water — medium",
    F: "moderate",
    geoHazard: "Shrink-swell clay",
    G: "low",
    notes: "Frontage plots adjoining Summerfield Park; green-infrastructure linkage potential.",
  },
  {
    id: "edward-st",
    name: "Edward Street / Ladywood Road",
    ref: "BLR/LW-11",
    centre: [52.479, -1.926],
    areaHa: 0.9,
    landCategory: "Vacant cleared plot",
    L: "high",
    floodCategory: "Surface water — high (local low point)",
    F: "high",
    geoHazard: "Shrink-swell clay",
    G: "moderate",
    notes: "Local topographic low point with repeat surface-water reports in the SFRA mapping.",
  },
  {
    id: "five-ways",
    name: "Five Ways canal frontage",
    ref: "BLR/LW-12",
    centre: [52.475, -1.913],
    areaHa: 1.3,
    landCategory: "Under-used commercial, hardstanding",
    L: "low",
    floodCategory: "Surface water — medium",
    F: "moderate",
    geoHazard: "Running sand (alluvial deposits)",
    G: "high",
    notes: "Constrained plot; ground conditions dominate the residual priority score.",
  },
];

/** Build a simple rectangular footprint around a site centre (screening geometry only). */
export function footprint(centre: LatLng, areaHa: number): LatLng[] {
  const half = Math.sqrt(Math.max(areaHa, 0.4)) * 0.00045;
  const [lat, lng] = centre;
  const dLng = half * 1.64;
  return [
    [lat + half, lng - dLng],
    [lat + half, lng + dLng],
    [lat - half, lng + dLng],
    [lat - half, lng - dLng],
  ];
}

export type FloodZone = {
  id: string;
  label: string;
  band: Band;
  ring: LatLng[];
};

/** Indicative SFRA surface-water extents (screening representation, not a flood map). */
export const FLOOD_ZONES: FloodZone[] = [
  {
    id: "canal-loop",
    label: "Icknield Port Loop corridor",
    band: "very-high",
    ring: [
      [52.4866, -1.9335],
      [52.4858, -1.9228],
      [52.4816, -1.9214],
      [52.4802, -1.9296],
      [52.4826, -1.9352],
    ],
  },
  {
    id: "middleway",
    label: "Ladywood Middleway low point",
    band: "high",
    ring: [
      [52.4796, -1.9236],
      [52.4788, -1.9142],
      [52.4752, -1.9126],
      [52.4746, -1.9214],
      [52.4772, -1.9252],
    ],
  },
  {
    id: "reservoir",
    label: "Edgbaston Reservoir edge",
    band: "high",
    ring: [
      [52.4808, -1.9398],
      [52.4802, -1.9316],
      [52.4772, -1.9312],
      [52.4768, -1.9392],
    ],
  },
  {
    id: "brook-line",
    label: "Culverted brook line (Brookfields)",
    band: "moderate",
    ring: [
      [52.4892, -1.9214],
      [52.4884, -1.9128],
      [52.4854, -1.9132],
      [52.4856, -1.9218],
    ],
  },
  {
    id: "queensway",
    label: "Smallbrook Queensway culvert",
    band: "moderate",
    ring: [
      [52.4784, -1.9026],
      [52.4778, -1.8952],
      [52.4748, -1.8958],
      [52.4752, -1.9032],
    ],
  },
];

export type GeoCell = {
  id: string;
  band: Band;
  hazard: string;
  ring: LatLng[];
};

/**
 * Generalised GeoSure grid (deliberately coarse — the published dataset is
 * 1:50,000 / hex-grid scale and is NOT site-specific).
 */
export function buildGeoGrid(): GeoCell[] {
  const cells: GeoCell[] = [];
  const rows = 6;
  const cols = 7;
  const lat0 = 52.4718;
  const lng0 = -1.9468;
  const dLat = 0.0034;
  const dLng = 0.0092;
  const bands: Band[] = ["very-low", "low", "moderate", "high", "very-high"];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const lat = lat0 + r * dLat;
      const lng = lng0 + c * dLng + (r % 2 === 1 ? dLng / 2 : 0);
      // Deterministic, reproducible class assignment for the screening grid.
      const seed = (r * 31 + c * 17) % 11;
      const idx = seed < 2 ? 0 : seed < 5 ? 1 : seed < 8 ? 2 : seed < 10 ? 3 : 4;
      const band = bands[idx];
      const hz = seed % 3 === 0 ? "Shrink-swell clay" : seed % 3 === 1 ? "Running sand" : "Slope instability";
      const hLat = dLat * 0.62;
      const hLng = dLng * 0.52;
      cells.push({
        id: `g-${r}-${c}`,
        band,
        hazard: hz,
        ring: [
          [lat + hLat, lng],
          [lat + hLat * 0.5, lng + hLng],
          [lat - hLat * 0.5, lng + hLng],
          [lat - hLat, lng],
          [lat - hLat * 0.5, lng - hLng],
          [lat + hLat * 0.5, lng - hLng],
        ],
      });
    }
  }
  return cells;
}

export const GEO_CELLS = buildGeoGrid();

export type Intervention = {
  id: "suds" | "rehab" | "retrofit";
  name: string;
  summary: string;
  floodBenefit: number; // 0-5
  feasibility: number; // 0-5
  maintenance: number; // 0-5, higher = lower burden
  indicativeCost: string;
  bestFor: string;
};

export const INTERVENTIONS: Intervention[] = [
  {
    id: "suds",
    name: "Option A — Sustainable drainage (SuDS)",
    summary:
      "Source-control drainage: permeable surfacing, swales, rain gardens and attenuation basins managing runoff close to where it falls (Defra national SuDS standards).",
    floodBenefit: 5,
    feasibility: 3,
    maintenance: 3,
    indicativeCost: "Low–medium",
    bestFor: "Flood-driven sites with permeable or improvable ground",
  },
  {
    id: "rehab",
    name: "Option B — Land rehabilitation",
    summary:
      "Ground treatment and re-profiling: capping or selective removal of made ground, regrading, soil improvement and vegetation establishment to stabilise the surface.",
    floodBenefit: 3,
    feasibility: 3,
    maintenance: 4,
    indicativeCost: "Medium–high",
    bestFor: "Land-condition-driven sites and poor or unstable ground",
  },
  {
    id: "retrofit",
    name: "Option C — Retrofit / baseline",
    summary:
      "Retain and improve existing structures and surfaces; monitor condition. Baseline against which the other options are judged, and the low-carbon default for occupied buildings.",
    floodBenefit: 1,
    feasibility: 5,
    maintenance: 4,
    indicativeCost: "Low",
    bestFor: "Occupied or structurally sound sites with lower measured risk",
  },
];
