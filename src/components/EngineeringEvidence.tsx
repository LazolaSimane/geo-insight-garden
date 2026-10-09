import { CheckCircle2, Clock3, ExternalLink, FlaskConical, Wind, Mountain, Droplets, Sprout } from "lucide-react";
import { computeR, BASE_WEIGHTS, SCENARIOS } from "@/lib/scoring";
import { scoreSites } from "@/lib/model";

const COVERAGE = [
  { name: "Land use & condition", status: "Illustrative inputs", detail: "Brownfield register is the proposed source; site values are not verified extracts." },
  { name: "Water & flood risk", status: "Indicative overlay", detail: "SFRA-informed screening concept; no imported flood raster or hydraulic model." },
  { name: "Ground stability", status: "Synthetic grid", detail: "GeoSure is a proposed source. The displayed grid is not BGS data." },
  { name: "Air quality / dust", status: "Not integrated", detail: "Needs dated PM₂.₅ / PM₁₀ observations from a public monitoring station; no readings invented." },
  { name: "Climate / rainfall", status: "Not integrated", detail: "Needs dated rainfall and climate records for runoff context; no climate uplift assumed." },
];

export default function EngineeringEvidence() {
  const worked = computeR({ L: 80, F: 60, G: 40 }, BASE_WEIGHTS);
  const base = scoreSites(BASE_WEIGHTS);
  const benchmarks = base.filter(s => ["port-loop", "tower-ballroom", "ringway"].includes(s.id));
  return <div className="space-y-8">
    <section>
      <p className="label-caps">Mining engineering → urban resilience</p>
      <h2 className="mt-1 text-xl font-semibold">Transfer the principles. Respect the context.</h2>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">Ladywood is not a former mine. The project adapts disturbed-land rehabilitation, geomechanics and water management to urban brownfield sites.</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Mountain, title: "Geomechanics", text: "Investigate made ground and stability before regrading; slope stabilisation only where investigation identifies a need." },
          { icon: Droplets, title: "Water management", text: "Manage runoff at source. Check permeability, contamination and groundwater before considering infiltration." },
          { icon: Sprout, title: "Land rehabilitation", text: "Selective capping, soil improvement and vegetation cover; establish maintenance and monitoring responsibilities." },
          { icon: Wind, title: "Dust monitoring", text: "Baseline particulate monitoring before works; cover disturbed surfaces and assess dust controls. Monitoring data still required." },
        ].map(item => <div key={item.title} className="border-t-2 border-primary pt-4"><item.icon className="size-5 text-primary" /><h3 className="mt-3 font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></div>)}
      </div>
    </section>
    <section className="border-t border-border pt-6">
      <p className="label-caps">Brief alignment</p><h2 className="mt-1 text-xl font-semibold">Environmental data coverage</h2>
      <p className="mt-2 text-sm text-muted-foreground">Progress Report 2 narrows scoring to L / F / G. The original mining brief also asks for air and climate datasets; those requirements remain open.</p>
      <div className="mt-4 divide-y divide-border">{COVERAGE.map(row => <div key={row.name} className="grid gap-2 py-4 sm:grid-cols-[180px_150px_1fr]"><h3 className="text-sm font-semibold">{row.name}</h3><span className="text-xs font-medium text-accent-foreground">{row.status}</span><p className="text-sm text-muted-foreground">{row.detail}</p></div>)}</div>
    </section>
    <section className="border-t border-border pt-6">
      <p className="label-caps">Model verification</p><h2 className="mt-1 text-xl font-semibold">Checks, not unsupported claims</h2>
      <div className="mt-4 flex gap-3 border-l-2 border-primary bg-primary/5 p-4"><FlaskConical className="size-5 shrink-0 text-primary" /><div><h3 className="text-sm font-semibold">Worked example · {worked === 64 ? "Pass" : "Fail"}</h3><p className="mt-1 font-mono text-xs">0.40 × 80 + 0.40 × 60 + 0.20 × 40 = {worked}/100</p><p className="mt-1 text-xs text-muted-foreground">Arithmetic verified; this is not a check of source-data accuracy.</p></div></div>
      <div className="mt-4 flex items-start gap-3 text-sm"><CheckCircle2 className="size-5 shrink-0 text-primary" /><p>All {SCENARIOS.length} scenario weight sets sum to 1.00. Full rank movement is available in Sensitivity.</p></div>
      <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-border"><th className="py-3">Brief benchmark</th><th>Base R</th><th>Elevated (R ≥ 45)</th></tr></thead><tbody>{benchmarks.map(s => <tr key={s.id} className="border-b border-border"><td className="py-3 pr-3">{s.name}</td><td className="font-mono">{s.R.toFixed(1)}</td><td className={s.R >= 45 ? "text-primary" : "text-destructive"}>{s.R >= 45 ? "Flagged" : "Not flagged"}</td></tr>)}</tbody></table></div>
      <p className="mt-3 text-xs text-muted-foreground">Ringway’s result is reported even if it does not meet the brief’s benchmark expectation. Do not tune scores merely to force a pass.</p>
      <div className="mt-4 flex items-start gap-3 text-sm text-muted-foreground"><Clock3 className="size-5 shrink-0" /><p>Independent usability trial and source-data accuracy testing: not yet conducted. Record participant, time, correct priority, driver and intervention before claiming success.</p></div>
    </section>
    <section className="border-t border-border pt-6"><p className="label-caps">Submission readiness</p><h2 className="mt-1 text-xl font-semibold">A defensible demonstration</h2><ol className="mt-4 grid gap-4 text-sm sm:grid-cols-3"><li><span className="font-mono text-primary">01 / </span>Present a priority site, its weighted contributions and the intervention trade-offs.</li><li><span className="font-mono text-primary">02 / </span>Change the weighting scenario and discuss rank stability and uncertainty.</li><li><span className="font-mono text-primary">03 / </span>Support the maximum three-page report with verified sources, findings and honest reflection.</li></ol><p className="mt-4 text-xs text-muted-foreground">The uploaded topic brief refers to further requirements on Ulwazi. No detailed marking rubric was provided; full compliance and a distinction cannot be guaranteed.</p></section>
  </div>;
}