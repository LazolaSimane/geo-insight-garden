/**
 * Rehabilitation priority scoring model.
 *
 * Each indicator is normalised to 0-100 using the 5-point band published
 * within each source dataset (higher = greater rehabilitation priority):
 *   Very low = 0, Low = 25, Moderate = 50, High = 75, Very high = 100
 *
 * R = wL*L + wF*F + wG*G   (base weights 0.40 / 0.40 / 0.20)
 */

export type Band = "very-low" | "low" | "moderate" | "high" | "very-high";

export const BAND_SCORE: Record<Band, number> = {
  "very-low": 0,
  low: 25,
  moderate: 50,
  high: 75,
  "very-high": 100,
};

export const BAND_CLASS: Record<Band, string> = {
  "very-low": "A",
  low: "B",
  moderate: "C",
  high: "D",
  "very-high": "E",
};

export const BAND_LABEL: Record<Band, string> = {
  "very-low": "Very low",
  low: "Low",
  moderate: "Moderate",
  high: "High",
  "very-high": "Very high",
};

export type Weights = { L: number; F: number; G: number };

export const BASE_WEIGHTS: Weights = { L: 0.4, F: 0.4, G: 0.2 };

export type Scenario = {
  id: string;
  name: string;
  weights: Weights;
  purpose: string;
};

export const SCENARIOS: Scenario[] = [
  {
    id: "base",
    name: "Base",
    weights: { L: 0.4, F: 0.4, G: 0.2 },
    purpose: "Initial model",
  },
  {
    id: "flood",
    name: "Flood emphasis",
    weights: { L: 0.3, F: 0.5, G: 0.2 },
    purpose: "Tests stronger flood priority",
  },
  {
    id: "land",
    name: "Land emphasis",
    weights: { L: 0.5, F: 0.3, G: 0.2 },
    purpose: "Tests stronger land priority",
  },
  {
    id: "equal",
    name: "Equal",
    weights: { L: 1 / 3, F: 1 / 3, G: 1 / 3 },
    purpose: "Tests no preferred indicator",
  },
];

export type PriorityCategory = "high" | "medium" | "low";

export function categorise(R: number): PriorityCategory {
  if (R >= 70) return "high";
  if (R >= 45) return "medium";
  return "low";
}

export const CATEGORY_LABEL: Record<PriorityCategory, string> = {
  high: "High priority",
  medium: "Medium priority",
  low: "Monitor",
};

export function computeR(
  scores: { L: number; F: number; G: number },
  w: Weights = BASE_WEIGHTS,
): number {
  return Math.round((w.L * scores.L + w.F * scores.F + w.G * scores.G) * 10) / 10;
}

/** Weighted contribution of each indicator, used to name the main risk driver. */
export function driver(
  scores: { L: number; F: number; G: number },
  w: Weights = BASE_WEIGHTS,
): "L" | "F" | "G" {
  const c: Array<["L" | "F" | "G", number]> = [
    ["L", w.L * scores.L],
    ["F", w.F * scores.F],
    ["G", w.G * scores.G],
  ];
  c.sort((a, b) => b[1] - a[1]);
  return c[0]![0];
}

export const DRIVER_LABEL: Record<"L" | "F" | "G", string> = {
  L: "Land condition",
  F: "Surface-water flood risk",
  G: "Ground condition",
};
