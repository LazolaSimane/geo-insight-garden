import { Button } from "@/components/ui/button";
import type { ScoredSite } from "@/lib/model";
import { CATEGORY_LABEL, DRIVER_LABEL } from "@/lib/scoring";

const DOT: Record<string, string> = {
  high: "var(--risk-high)",
  medium: "var(--risk-medium)",
  low: "var(--risk-low)",
};

export default function RankingPanel({
  sites,
  selectedId,
  onSelect,
}: {
  sites: ScoredSite[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="panel flex h-full flex-col overflow-hidden">
      <div className="border-b border-border px-4 py-3">
        <p className="label-caps">Priority ranking</p>
        <h2 className="mt-1 text-base font-semibold">Rehabilitation queue</h2>
      </div>
      <ol className="max-h-[390px] flex-1 overflow-y-auto">
        {sites.map((s) => {
          const active = s.id === selectedId;
          return (
            <li key={s.id}>
              <Button variant="ghost"
                type="button"
                onClick={() => onSelect(s.id)}
                aria-current={active}
                className={`h-auto rounded-none flex w-full items-center justify-start gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-secondary ${
                  active ? "bg-secondary" : ""
                }`}
              >
                <span className="w-6 shrink-0 font-mono text-sm text-muted-foreground">
                  {s.rank}
                </span>
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: DOT[s.category] }}
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  <span className="block whitespace-normal text-sm font-medium">{s.name}</span>
                  <span className="block whitespace-normal text-xs text-muted-foreground">
                    {CATEGORY_LABEL[s.category]} · driver: {DRIVER_LABEL[s.mainDriver]}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-sm font-semibold text-primary">
                  {s.R.toFixed(1)}
                </span>
              </Button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
