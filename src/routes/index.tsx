import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useMemo, useState } from "react";

import RankingPanel from "@/components/RankingPanel";
import SiteDetail from "@/components/SiteDetail";
import InterventionComparison from "@/components/InterventionComparison";
import SensitivityPanel from "@/components/SensitivityPanel";
import AssumptionsPanel from "@/components/AssumptionsPanel";
import type { LayerState } from "@/components/SiteMap";
import { scoreSites } from "@/lib/model";
import { SCENARIOS } from "@/lib/scoring";

const SiteMap = lazy(() => import("@/components/SiteMap"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Ladywood Rehabilitation Priority Dashboard | Brownfield, Flood & Ground Risk",
      },
      {
        name: "description",
        content:
          "Interactive Ladywood map combining brownfield land condition, surface-water flood risk and GeoSure ground conditions into a transparent rehabilitation priority score.",
      },
      {
        property: "og:title",
        content: "Ladywood Rehabilitation Priority Dashboard",
      },
      {
        property: "og:description",
        content:
          "Screening tool ranking Ladywood brownfield sites using R = 0.40L + 0.40F + 0.20G, with site drill-down, intervention comparison and sensitivity analysis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const LEGEND = [
  { label: "High priority (R ≥ 70)", color: "var(--risk-high)" },
  { label: "Medium priority (45–69)", color: "var(--risk-medium)" },
  { label: "Monitor (< 45)", color: "var(--risk-low)" },
  { label: "Surface-water extent", color: "var(--flood)" },
  { label: "GeoSure grid cell", color: "var(--ground)" },
];

function Dashboard() {
  const [scenarioId, setScenarioId] = useState("base");
  const [selectedId, setSelectedId] = useState("port-loop");
  const [layers, setLayers] = useState<LayerState>({
    brownfield: true,
    flood: true,
    geo: false,
  });

  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const sites = useMemo(() => scoreSites(scenario.weights), [scenario]);
  const selected = sites.find((s) => s.id === selectedId) ?? sites[0];

  const toggle = (key: keyof LayerState) =>
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));

  const highCount = sites.filter((s) => s.category === "high").length;

  return (
    <div className="min-h-screen bg-background">
      <header className="grid-backdrop border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
          <p className="label-caps">Ladywood, Birmingham · screening prototype</p>
          <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
            Environmental Monitoring &amp; Rehabilitation Priority Dashboard
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Which degraded sites should be rehabilitated first, what drives that priority, and which
            intervention is technically appropriate — from brownfield land condition, surface-water
            flood risk and BGS GeoSure ground conditions.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono text-sm text-primary">
              R = {scenario.weights.L.toFixed(2)}L + {scenario.weights.F.toFixed(2)}F +{" "}
              {scenario.weights.G.toFixed(2)}G
            </span>
            <span className="text-xs text-muted-foreground">
              {scenario.name} weighting · {sites.length} sites screened · {highCount} high priority
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6">
        <section className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="panel overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
              <p className="label-caps mr-auto">Interactive map · layers</p>
              {(
                [
                  ["brownfield", "Brownfield sites"],
                  ["flood", "Flood risk"],
                  ["geo", "GeoSure ground"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={layers[key]}
                  onClick={() => toggle(key)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                    layers[key]
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface-2 text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="h-[24rem] w-full sm:h-[30rem]">
              <ClientOnly
                fallback={
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Loading map…
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      Loading map…
                    </div>
                  }
                >
                  <SiteMap
                    sites={sites}
                    selectedId={selected.id}
                    onSelect={setSelectedId}
                    layers={layers}
                  />
                </Suspense>
              </ClientOnly>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-border px-4 py-3">
              {LEGEND.map((l) => (
                <span key={l.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: l.color }}
                    aria-hidden
                  />
                  {l.label}
                </span>
              ))}
            </div>
          </div>

          <RankingPanel sites={sites} selectedId={selected.id} onSelect={setSelectedId} />
        </section>

        <SiteDetail site={selected} weights={scenario.weights} />
        <InterventionComparison site={selected} />
        <SensitivityPanel
          activeScenario={scenarioId}
          onScenario={setScenarioId}
          selectedId={selected.id}
          onSelect={setSelectedId}
        />
        <AssumptionsPanel />

        <footer className="pb-6 pt-2 text-xs text-muted-foreground">
          Screening and prioritisation prototype — FEBE1004A Engineering Analysis and Design 1B. It
          does not replace detailed engineering or geotechnical investigation.
        </footer>
      </main>
    </div>
  );
}
