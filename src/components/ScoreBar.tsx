type Props = {
  label: string;
  value: number;
  colorVar: "land" | "flood" | "ground" | "primary";
  caption?: string;
};

const COLOR: Record<Props["colorVar"], string> = {
  land: "var(--land)",
  flood: "var(--flood)",
  ground: "var(--ground)",
  primary: "var(--primary)",
};

export default function ScoreBar({ label, value, colorVar, caption }: Props) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="font-mono text-sm text-foreground">{value.toFixed(0)}</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: COLOR[colorVar] }}
        />
      </div>
      {caption ? <p className="mt-1 text-xs text-muted-foreground">{caption}</p> : null}
    </div>
  );
}
