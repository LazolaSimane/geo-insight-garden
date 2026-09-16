import { SITES, type Site } from "@/data/ladywood";
import {
  BAND_SCORE,
  categorise,
  computeR,
  driver,
  type PriorityCategory,
  type Weights,
} from "@/lib/scoring";

export type ScoredSite = Site & {
  scores: { L: number; F: number; G: number };
  R: number;
  category: PriorityCategory;
  mainDriver: "L" | "F" | "G";
  rank: number;
  recommended: "suds" | "rehab" | "retrofit";
};

export function scoreSites(w: Weights): ScoredSite[] {
  const scored = SITES.map((s) => {
    const scores = { L: BAND_SCORE[s.L], F: BAND_SCORE[s.F], G: BAND_SCORE[s.G] };
    const R = computeR(scores, w);
    const mainDriver = driver(scores, w);
    return {
      ...s,
      scores,
      R,
      category: categorise(R),
      mainDriver,
      rank: 0,
      recommended: recommend(scores, mainDriver, s),
    };
  });

  scored.sort((a, b) => b.R - a.R || a.name.localeCompare(b.name));
  scored.forEach((s, i) => (s.rank = i + 1));
  return scored;
}

/**
 * Screening-level intervention logic (Section 8 of the report).
 * Ground conditions gate infiltration-based SuDS; occupied/sound structures
 * default to retrofit rather than demolition-led redevelopment.
 */
function recommend(
  scores: { L: number; F: number; G: number },
  mainDriver: "L" | "F" | "G",
  site: Site,
): "suds" | "rehab" | "retrofit" {
  const occupied = /occupied|operational/i.test(site.landCategory);
  const R = computeR(scores);
  if (occupied && R < 55) return "retrofit";
  if (mainDriver === "F" && scores.G <= 50) return "suds";
  if (scores.G >= 75 || mainDriver === "L") return "rehab";
  if (scores.F >= 75) return "suds";
  return "retrofit";
}

export function rankAcrossScenarios(weightSets: Weights[]): Map<string, number[]> {
  const map = new Map<string, number[]>();
  weightSets.forEach((w) => {
    scoreSites(w).forEach((s) => {
      const arr = map.get(s.id) ?? [];
      arr.push(s.rank);
      map.set(s.id, arr);
    });
  });
  return map;
}
