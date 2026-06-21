// Géocodage & calcul d'itinéraire SANS clé API.
// - Nominatim (OpenStreetMap) pour transformer une adresse en coordonnées.
// - OSRM (serveur public de démonstration) pour la distance & la durée routières.
// Pour une mise en production intensive, prévoyez votre propre instance ou un
// fournisseur dédié (politique d'usage : ~1 requête/seconde sur les serveurs publics).

export type GeoPoint = {
  label: string;
  lat: number;
  lon: number;
};

const NOMINATIM = "https://nominatim.openstreetmap.org";
const OSRM = "https://router.project-osrm.org";

export async function searchAddress(
  query: string,
  signal?: AbortSignal,
): Promise<GeoPoint[]> {
  const q = query.trim();
  if (q.length < 3) return [];
  const url = new URL(`${NOMINATIM}/search`);
  url.searchParams.set("q", q);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "0");
  url.searchParams.set("limit", "6");
  url.searchParams.set("countrycodes", "fr,be,lu,ch,de,es,it");
  url.searchParams.set("accept-language", "fr");

  const res = await fetch(url.toString(), {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Géocodage indisponible");
  const data = (await res.json()) as Array<{
    display_name: string;
    lat: string;
    lon: string;
  }>;
  return data.map((d) => ({
    label: d.display_name,
    lat: Number.parseFloat(d.lat),
    lon: Number.parseFloat(d.lon),
  }));
}

export type RouteResult = {
  distanceKm: number;
  durationMin: number;
  /** Tracé [lat, lon][] pour l'affichage sur la carte. */
  geometry: [number, number][];
};

export async function getRoute(
  from: GeoPoint,
  to: GeoPoint,
  signal?: AbortSignal,
): Promise<RouteResult> {
  const coords = `${from.lon},${from.lat};${to.lon},${to.lat}`;
  const url = new URL(`${OSRM}/route/v1/driving/${coords}`);
  url.searchParams.set("overview", "full");
  url.searchParams.set("geometries", "geojson");

  const res = await fetch(url.toString(), { signal });
  if (!res.ok) throw new Error("Calcul d'itinéraire indisponible");
  const data = (await res.json()) as {
    code: string;
    routes?: Array<{
      distance: number;
      duration: number;
      geometry: { coordinates: [number, number][] };
    }>;
  };
  if (data.code !== "Ok" || !data.routes?.length) {
    throw new Error("Aucun itinéraire trouvé entre ces deux adresses.");
  }
  const route = data.routes[0];
  return {
    distanceKm: route.distance / 1000,
    durationMin: route.duration / 60,
    geometry: route.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
  };
}
