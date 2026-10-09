import ScoreBar from "@/components/ScoreBar";
import { INTERVENTIONS } from "@/data/ladywood";
import type { ScoredSite } from "@/lib/model";
import {
  BAND_CLASS,
  BAND_LABEL,
  CATEGORY_LABEL,
  DRIVER_LABEL,
  type Weights,
} from "@/lib/scoring";

export default function SiteDetail({ site, weights }: { site: ScoredSite; weights: Weights }) {
  const rec = INTERVENTIONS.find((i) => i.id === site.recommended);
  const terms = [
    { w: weights.L, v: site.scores.L },
    { w: weights.F, v: site.scores.F },
    { w: weights.G, v: site.scores.G },
  ];

  return (
    <section className="border-t border-border pt-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="label-caps">Site analysis · rank #{site.rank}</p>
          <h2 className="mt-1 text-xl font-semibold">{site.name}</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {site.ref} · {site.areaHa.toFixed(1)} ha · {site.centre[0].toFixed(4)},{" "}
            {site.centre[1].toFixed(4)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface-2 px-4 py-2 text-right">
          <p className="label-caps">Priority R</p>
          <p className="font-mono text-2xl font-semibold text-primary">{site.R.toFixed(1)}</p>
          <p className="text-xs text-muted-foreground">{CATEGORY_LABEL[site.category]}</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-accent-foreground">Illustrative scores · source values and site boundaries awaiting verification</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <ScoreBar
          label="L — Land condition"
          value={site.scores.L}
          colorVar="land"
          caption={`${BAND_LABEL[site.L]} · ${site.landCategory}`}
        />
        <ScoreBar
          label="F — Flood risk"
          value={site.scores.F}
          colorVar="flood"
          caption={`${BAND_LABEL[site.F]} · ${site.floodCategory}`}
        />
        <ScoreBar
          label="G — Ground condition"
          value={site.scores.G}
          colorVar="ground"
          caption={`GeoSure class ${BAND_CLASS[site.G]} · ${site.geoHazard}`}
        />
      </div>

      <div className="mt-5 rounded-lg border border-border bg-surface-2 p-4">
        <p className="label-caps">Calculation</p>
        <p className="mt-2 font-mono text-sm break-words text-foreground">
          R = {weights.L.toFixed(3)}×{site.scores.L} + {weights.F.toFixed(3)}×{site.scores.F} +{" "}
          {weights.G.toFixed(3)}×{site.scores.G} ={" "}
          {terms.map((t) => (t.w * t.v).toFixed(1)).join(" + ")} = {site.R.toFixed(1)}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Main risk driver:{" "}
          <span className="font-medium text-foreground">{DRIVER_LABEL[site.mainDriver]}</span>{" "}
          (largest weighted contribution).
        </p>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{site.notes}</p>

      <div className="mt-4 rounded-lg border border-primary/40 bg-primary/10 p-4">
        <p className="label-caps">Screening recommendation</p>
        <p className="mt-1 text-sm font-semibold text-foreground">{rec?.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{rec?.summary}</p>
      </div>

      {site.benchmark ? (
        <p className="mt-3 text-xs text-muted-foreground">
          Benchmark site from the Ladywood brief — used to check that the model flags known cases.
        </p>
      ) : null}
    </section>
  );
}
