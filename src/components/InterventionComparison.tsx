import { INTERVENTIONS } from "@/data/ladywood";
import type { ScoredSite } from "@/lib/model";

function Dots({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="flex gap-1" aria-label={`${label}: ${value} of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`size-1.5 rounded-full ${i <= value ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </span>
    </div>
  );
}

export default function InterventionComparison({ site }: { site: ScoredSite }) {
  return (
    <div className="panel p-5">
      <p className="label-caps">Intervention comparison</p>
      <h2 className="mt-1 text-lg font-semibold">Options for {site.name}</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Compared on flood benefit, site feasibility and maintenance burden. Highlighted option is
        the screening recommendation — it is not a design decision.
      </p>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {INTERVENTIONS.map((opt) => {
          const chosen = opt.id === site.recommended;
          const feasibility =
            opt.id === "suds" && site.scores.G >= 75
              ? Math.max(1, opt.feasibility - 2)
              : opt.feasibility;
          return (
            <div
              key={opt.id}
              className={`rounded-lg border p-4 ${
                chosen ? "border-primary bg-primary/10" : "border-border bg-surface-2"
              }`}
            >
              <p className="text-sm font-semibold">{opt.name}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{opt.summary}</p>
              <div className="mt-3 space-y-1.5">
                <Dots label="Flood benefit" value={opt.floodBenefit} />
                <Dots label="Feasibility on this site" value={feasibility} />
                <Dots label="Low maintenance burden" value={opt.maintenance} />
              </div>
              <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between gap-2">
                  <dt>Indicative cost</dt>
                  <dd className="text-foreground">{opt.indicativeCost}</dd>
                </div>
                <div>
                  <dt className="inline">Best for: </dt>
                  <dd className="inline text-foreground">{opt.bestFor}</dd>
                </div>
              </dl>
              {opt.id === "suds" && site.scores.G >= 75 ? (
                <p className="mt-3 text-xs text-accent">
                  Feasibility reduced: GeoSure class {site.geoHazard} limits infiltration — lined
                  attenuation would be required.
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
