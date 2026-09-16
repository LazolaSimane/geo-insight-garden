const ASSUMPTIONS = [
  "Each indicator is normalised to 0–100 using the 5-point band published inside its own source dataset (Very low 0, Low 25, Moderate 50, High 75, Very high 100), so no new judgement is introduced at the normalisation step.",
  "Base weighting is L 0.40 / F 0.40 / G 0.20. The weighting is a team assumption, tested through the four sensitivity scenarios.",
  "Priority bands: R ≥ 70 high priority, 45–69 medium priority, below 45 monitor.",
  "Site footprints and risk extents shown on the map are indicative screening geometry drawn from published site locations — they are not surveyed boundaries or an official flood map.",
];

const LIMITATIONS = [
  "GeoSure is published at a generalised 1:50,000 / hex-grid scale and is not site-specific. Ground-condition scores are screening-level only.",
  "Surface-water flood-risk categories are read from the Strategic Flood Risk Assessment; no hydraulic modelling has been carried out.",
  "Brownfield Register condition categories describe land status, not contamination extent. Intrusive investigation is required before any intervention.",
  "Source datasets differ in vintage; conclusions may shift when registers are updated.",
  "This is a screening and prioritisation tool. It does not replace detailed engineering, geotechnical or contamination investigation.",
];

const SOURCES = [
  { name: "Birmingham Brownfield Land Register (2025)", use: "Land condition (L), site locations" },
  { name: "Birmingham Strategic Flood Risk Assessment", use: "Surface-water flood risk (F)" },
  {
    name: "BGS GeoSure — shrink-swell, landslide, running sand (Open Government Licence)",
    use: "Ground condition (G)",
  },
  { name: "Defra national SuDS design standards (2025)", use: "Intervention context" },
];

export default function AssumptionsPanel() {
  return (
    <div className="panel p-5">
      <p className="label-caps">Assumptions, limitations &amp; sources</p>
      <h2 className="mt-1 text-lg font-semibold">What this tool does and does not claim</h2>

      <div className="mt-4 grid gap-5 lg:grid-cols-3">
        <section>
          <h3 className="text-sm font-semibold text-primary">Assumptions</h3>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            {ASSUMPTIONS.map((a) => (
              <li key={a} className="border-l-2 border-border pl-3">
                {a}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-sm font-semibold text-accent">Limitations</h3>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            {LIMITATIONS.map((l) => (
              <li key={l} className="border-l-2 border-border pl-3">
                {l}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-sm font-semibold text-foreground">Sources</h3>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            {SOURCES.map((s) => (
              <li key={s.name} className="border-l-2 border-border pl-3">
                <span className="text-foreground">{s.name}</span>
                <br />
                {s.use}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
