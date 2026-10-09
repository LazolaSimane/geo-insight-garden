import { ExternalLink } from "lucide-react";

const SOURCES = [
  { name: "Birmingham Brownfield Register", use: "Proposed land-status source · register year cited by the team: 2025", url: "https://www.birmingham.gov.uk/downloads/download/1845/brownfield_register" },
  { name: "Strategic Flood Risk Assessment", use: "Proposed flood screening source · Level 2 report: April 2012", url: "https://www.birmingham.gov.uk/downloads/download/387/flood_risk_assessments" },
  { name: "BGS GeoSure", use: "Proposed natural ground-stability source · product resolution and licence must be checked", url: "https://www.bgs.ac.uk/datasets/geosure/" },
  { name: "National SuDS standards", use: "Intervention guidance · Defra, 2025", url: "https://www.gov.uk/government/publications/national-standards-for-sustainable-drainage-systems" },
];

export default function AssumptionsPanel() {
  return <section className="border-t border-border pt-6">
    <p className="label-caps">Evidence register</p><h2 className="mt-1 text-xl font-semibold">Sources, assumptions & limitations</h2>
    <div className="mt-5 grid gap-8 lg:grid-cols-2">
      <div><h3 className="text-sm font-semibold text-primary">Model assumptions</h3><ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <li>Five team-defined bands map to 0, 25, 50, 75 and 100. This harmonisation introduces judgement; it is not a common classification published by all sources.</li>
        <li>Base weights: L 0.40 / F 0.40 / G 0.20. Coarse ground-condition evidence receives lower weight. Four scenarios test this assumption.</li>
        <li>Team thresholds: high ≥ 70; medium ≥ 45 and &lt; 70; monitor &lt; 45. Scores are a comparative index, not a flood probability.</li>
        <li>Decimal scores show arithmetic, not measurement precision. Alphabetical ordering resolves equal scores and must not imply meaningful separation.</li>
      </ul><h3 className="mt-6 text-sm font-semibold text-accent-foreground">Limits that affect decisions</h3><ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <li>All site scores, footprint rectangles and flood polygons are illustrative. Ground grid cells are synthetic; none is an authoritative source extract.</li>
        <li>Land status is not a contamination measurement. GeoSure screens natural hazards, not site-specific stability or every possible ground constraint.</li>
        <li>Recommendations are candidates only. Confirm permeability, groundwater, contamination, utilities and stability before design or construction.</li>
        <li>Intervention ratings and cost bands are team judgements, not quotations, predicted benefits or a validated decision matrix.</li>
      </ul></div>
      <div><h3 className="text-sm font-semibold">Proposed source register</h3><div className="mt-3 divide-y divide-border">{SOURCES.map(s => <div key={s.name} className="py-4 first:pt-0"><a href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline">{s.name}<ExternalLink className="size-3.5" /></a><p className="mt-1 text-xs text-muted-foreground">{s.use}</p><p className="mt-2 font-mono text-xs text-muted-foreground">Access date: not recorded · import: not verified</p></div>)}</div><p className="mt-4 border-l-2 border-accent-foreground pl-3 text-sm text-muted-foreground">Sources are cited in the uploaded reports. Links are provided for traceability; their availability, licences and underlying values have not been verified here.</p></div>
    </div>
  </section>;
}