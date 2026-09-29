import { useMemo, useState } from "react";
import { parcels } from "./data/parcels";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import DetailPanel from "./components/DetailPanel";
import WatchlistModal from "./components/WatchlistModal";

const DEFAULT_FILTERS = {
  search: "",
  zoning: "ALL",
  minAcreage: "0",
  offMarketOnly: false,
};

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedParcel, setSelectedParcel] = useState(parcels[0]);
  const [watchlistIds, setWatchlistIds] = useState([]);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  const filteredParcels = useMemo(() => {
    const query = filters.search.toLowerCase();
    const minAcreage = parseFloat(filters.minAcreage);
    return parcels.filter((p) => {
      const matchesQuery =
        p.address.toLowerCase().includes(query) || p.id.toLowerCase().includes(query) || p.zip.includes(query);
      const matchesZoning = filters.zoning === "ALL" || p.zoning === filters.zoning;
      const matchesAcreage = p.acres >= minAcreage;
      const matchesOffMarket = !filters.offMarketOnly || p.signalsCount >= 4;
      return matchesQuery && matchesZoning && matchesAcreage && matchesOffMarket;
    });
  }, [filters]);

  const watchlist = useMemo(
    () => parcels.filter((p) => watchlistIds.includes(p.id)),
    [watchlistIds]
  );

  function handleFilterChange(patch) {
    setFilters((prev) => ({ ...prev, ...patch }));
  }

  function toggleWatchlist(parcelId) {
    setWatchlistIds((prev) =>
      prev.includes(parcelId) ? prev.filter((id) => id !== parcelId) : [...prev, parcelId]
    );
  }

  function openParcelFromWatchlist(parcel) {
    setIsWatchlistOpen(false);
    setSelectedParcel(parcel);
  }

  return (
    <div className="bg-slate-950 text-slate-100 font-sans antialiased h-screen flex flex-col overflow-hidden">
      <Header watchlistCount={watchlistIds.length} onOpenWatchlist={() => setIsWatchlistOpen(true)} />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          parcels={filteredParcels}
          selectedParcel={selectedParcel}
          onSelectParcel={setSelectedParcel}
        />

        <MapView parcels={filteredParcels} selectedParcel={selectedParcel} onSelectParcel={setSelectedParcel} />

        <DetailPanel
          parcel={selectedParcel}
          isSaved={selectedParcel ? watchlistIds.includes(selectedParcel.id) : false}
          onToggleWatchlist={() => selectedParcel && toggleWatchlist(selectedParcel.id)}
          onClose={() => setSelectedParcel(null)}
        />
      </div>

      <WatchlistModal
        isOpen={isWatchlistOpen}
        watchlist={watchlist}
        onClose={() => setIsWatchlistOpen(false)}
        onOpenParcel={openParcelFromWatchlist}
      />
    </div>
  );
}
