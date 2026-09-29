import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function markerIcon(parcel, isSelected) {
  const baseClasses = isSelected
    ? "bg-emerald-400 text-slate-950 scale-110 ring-4 ring-emerald-500/30"
    : "bg-slate-900/90 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-600 hover:text-white";

  return L.divIcon({
    className: "custom-div-icon",
    html: `<div class="flex items-center justify-center w-8 h-8 rounded-xl font-bold text-xs shadow-lg transition-all ${baseClasses}">${parcel.zoning}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

function FlyToSelected({ parcel }) {
  const map = useMap();
  useEffect(() => {
    if (parcel) {
      map.flyTo([parcel.lat, parcel.lng], Math.max(map.getZoom(), 14));
    }
  }, [parcel, map]);
  return null;
}

export default function MapView({ parcels, selectedParcel, onSelectParcel }) {
  return (
    <main className="flex-1 relative bg-slate-950">
      <MapContainer
        center={[39.7912, -86.1284]}
        zoom={12}
        zoomControl={false}
        className="w-full h-full z-10"
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`}
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          tileSize={512}
          zoomOffset={-1}
          maxZoom={19}
        />
        <ZoomControl position="topright" />
        <FlyToSelected parcel={selectedParcel} />
        {parcels.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={markerIcon(p, selectedParcel?.id === p.id)}
            eventHandlers={{ click: () => onSelectParcel(p) }}
          />
        ))}
      </MapContainer>

      <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur border border-slate-800 p-3 rounded-xl shadow-2xl z-20 text-xs space-y-2 pointer-events-none">
        <div className="font-semibold text-slate-200">Marion County GIS Layers</div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-400"></div>
            <span className="text-slate-300">Vacant Land / Off-Market Candidate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-indigo-500/40 border border-indigo-400"></div>
            <span className="text-slate-300">Completed Comparable Project (Comp)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-amber-500/40 border border-amber-400"></div>
            <span className="text-slate-300">FEMA Floodplain Constraint Zone</span>
          </div>
        </div>
      </div>
    </main>
  );
}
