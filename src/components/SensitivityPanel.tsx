import { Button } from "@/components/ui/button";
import { SCENARIOS } from "@/lib/scoring";
import { scoreSites } from "@/lib/model";

export default function SensitivityPanel({
  activeScenario,
  onScenario,
  selectedId,
  onSelect,
}: {
  activeScenario: string;
  onScenario: (id: string) => void;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const runs = SCENARIOS.map((s) => ({ scenario: s, sites: scoreSites(s.weights) }));
  const base = runs[0]?.sites ?? [];

  const rows = base.map((s) => {
    const ranks = runs.map((r) => r.sites.find((x) => x.id === s.id)?.rank ?? s.rank);
    const spread = Math.max(...ranks) - Math.min(...ranks);
    return { site: s, ranks, spread };
  });

  const topThree = new Set(base.slice(0, 3).map((s) => s.id));
  const topStable = runs.every((r) => r.sites.slice(0, 3).every((s) => topThree.has(s.id)));

  return (
    <section className="border-t border-border pt-6">
      <p className="label-caps">Sensitivity analysis</p>
      <h2 className="mt-1 text-lg font-semibold">Ranking under four weighting scenarios</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Select a scenario to re-weight the whole dashboard. Rank movement is reported as documented
        uncertainty, not resolved by choosing one “correct” weighting.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {SCENARIOS.map((s) => (
          <Button variant="outline" size="sm"
            key={s.id}
            type="button"
            onClick={() => onScenario(s.id)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
              activeScenario === s.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface-2 text-foreground hover:bg-secondary"
            }`}
          >
            {s.name} · {Math.round(s.weights.L * 100)}/{Math.round(s.weights.F * 100)}/
            {Math.round(s.weights.G * 100)}
          </Button>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-3 font-medium text-muted-foreground">Site</th>
              {SCENARIOS.map((s) => (
                <th key={s.id} className="px-2 py-2 text-center font-medium text-muted-foreground">
                  {s.name}
                </th>
              ))}
              <th className="pl-2 py-2 text-center font-medium text-muted-foreground">Movement</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ site, ranks, spread }) => (
              <tr
                key={site.id}
                onClick={() => onSelect(site.id)}
                className={`cursor-pointer border-b border-border/60 hover:bg-secondary ${
                  site.id === selectedId ? "bg-secondary" : ""
                }`}
              >
                <td className="py-2 pr-3"><Button variant="link" className="h-auto whitespace-normal p-0 text-left" onClick={() => onSelect(site.id)}>{site.name}</Button></td>
                {ranks.map((r, i) => (
                  <td key={i} className="px-2 py-2 text-center font-mono">
                    {r}
                  </td>
                ))}
                <td
                  className="pl-2 py-2 text-center font-mono"
                  style={{ color: spread >= 3 ? "var(--risk-high)" : "var(--risk-low)" }}
                >
                  {spread} places
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 rounded-lg border border-border bg-surface-2 p-3 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Result: </span>
        {topStable
          ? "the same three sites hold the top of the ranking in all four scenarios, so the priority set is stable under these four scenarios only; this does not validate the inputs."
          : "the top three sites change between scenarios, so the ranking is weighting-sensitive and is reported as a documented uncertainty."}{" "}
        Sites showing a range of 3 or more places of movement should not be separated on score alone.
      </p>
    </section>
  );
}
