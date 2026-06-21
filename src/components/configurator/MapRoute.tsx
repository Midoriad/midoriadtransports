"use client";

import { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import type { GeoPoint } from "@/lib/geo";

function makeIcon(color: string, label: string) {
  return L.divIcon({
    className: "",
    html: `<span style="display:grid;place-items:center;width:30px;height:30px;border-radius:9999px;background:${color};color:#fff;font-weight:700;font-size:13px;box-shadow:0 4px 12px rgba(7,22,17,.35);border:2px solid #fff">${label}</span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function FitBounds({
  from,
  to,
  geometry,
}: {
  from: GeoPoint | null;
  to: GeoPoint | null;
  geometry: [number, number][] | null;
}) {
  const map = useMap();
  useEffect(() => {
    const pts: [number, number][] = [];
    if (geometry?.length) pts.push(...geometry);
    if (from) pts.push([from.lat, from.lon]);
    if (to) pts.push([to.lat, to.lon]);
    if (pts.length === 1) {
      map.setView(pts[0], 12, { animate: true });
    } else if (pts.length > 1) {
      map.fitBounds(L.latLngBounds(pts).pad(0.18), { animate: true });
    }
  }, [map, from, to, geometry]);
  return null;
}

export default function MapRoute({
  from,
  to,
  geometry,
}: {
  from: GeoPoint | null;
  to: GeoPoint | null;
  geometry: [number, number][] | null;
}) {
  const fromIcon = useMemo(() => makeIcon("#057243", "A"), []);
  const toIcon = useMemo(() => makeIcon("#c8a24a", "B"), []);

  return (
    <MapContainer
      center={[46.6, 2.4]}
      zoom={5}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ minHeight: 320 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {from ? <Marker position={[from.lat, from.lon]} icon={fromIcon} /> : null}
      {to ? <Marker position={[to.lat, to.lon]} icon={toIcon} /> : null}
      {geometry?.length ? (
        <Polyline
          positions={geometry}
          pathOptions={{ color: "#057243", weight: 5, opacity: 0.85 }}
        />
      ) : null}
      <FitBounds from={from} to={to} geometry={geometry} />
    </MapContainer>
  );
}
