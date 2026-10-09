import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Polygon, CircleMarker, Tooltip } from "react-leaflet";
import {
  FLOOD_ZONES,
  GEO_CELLS,
  LADYWOOD_CENTRE,
  footprint,
  type LatLng,
} from "@/data/ladywood";
import type { ScoredSite } from "@/lib/model";
import { BAND_CLASS, BAND_LABEL } from "@/lib/scoring";

export type LayerState = {
  brownfield: boolean;
  flood: boolean;
  geo: boolean;
};

type Props = {
  sites: ScoredSite[];
  selectedId: string;
  onSelect: (id: string) => void;
  layers: LayerState;
};

const CATEGORY_COLOR: Record<string, string> = {
  high: "var(--risk-high)",
  medium: "var(--risk-medium)",
  low: "var(--risk-low)",
};

const FLOOD_OPACITY: Record<string, number> = {
  "very-high": 0.36,
  high: 0.26,
  moderate: 0.16,
  low: 0.1,
  "very-low": 0.06,
};

export default function SiteMap({ sites, selectedId, onSelect, layers }: Props) {
  return (
    <MapContainer
      center={LADYWOOD_CENTRE as LatLng}
      zoom={14}
      scrollWheelZoom
      className="h-full w-full"
      attributionControl
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
        maxZoom={19}
      />

      {layers.geo &&
        GEO_CELLS.map((cell) => (
          <Polygon
            key={cell.id}
            positions={cell.ring}
            pathOptions={{
              color: "var(--ground)",
              weight: 0.8,
              opacity: 0.5,
              fillColor: "var(--ground)",
              fillOpacity: (FLOOD_OPACITY[cell.band] ?? 0.16) * 0.8,
            }}
          >
            <Tooltip>
              Illustrative ground class {BAND_CLASS[cell.band]} — {BAND_LABEL[cell.band]}
              <br />
              {cell.hazard} (synthetic grid, not BGS data)
            </Tooltip>
          </Polygon>
        ))}

      {layers.flood &&
        FLOOD_ZONES.map((z) => (
          <Polygon
            key={z.id}
            positions={z.ring}
            pathOptions={{
              color: "var(--flood)",
              weight: 1.4,
              dashArray: "4 4",
              fillColor: "var(--flood)",
              fillOpacity: (FLOOD_OPACITY[z.band] ?? 0.16),
            }}
          >
            <Tooltip>
              {z.label}
              <br />
              Indicative surface-water risk: {BAND_LABEL[z.band]}
            </Tooltip>
          </Polygon>
        ))}

      {layers.brownfield &&
        sites.map((s) => {
          const selected = s.id === selectedId;
          const colour = CATEGORY_COLOR[s.category];
          return (
            <Polygon
              key={s.id}
              positions={footprint(s.centre, s.areaHa)}
              eventHandlers={{ click: () => onSelect(s.id) }}
              pathOptions={{
                color: selected ? "var(--primary)" : colour,
                weight: selected ? 3 : 1.6,
                fillColor: colour,
                fillOpacity: selected ? 0.6 : 0.34,
              }}
            >
              <Tooltip>
                #{s.rank} {s.name}
                <br />
                R = {s.R.toFixed(1)} / 100
              </Tooltip>
            </Polygon>
          );
        })}

      {layers.brownfield &&
        sites.map((s) => (
          <CircleMarker
            key={`m-${s.id}`}
            center={s.centre}
            radius={s.id === selectedId ? 9 : 5}
            eventHandlers={{ click: () => onSelect(s.id) }}
            pathOptions={{
              color: s.id === selectedId ? "var(--primary)" : "var(--foreground)",
              weight: 2,
              fillColor: CATEGORY_COLOR[s.category],
              fillOpacity: 1,
            }}
          />
        ))}
    </MapContainer>
  );
}
