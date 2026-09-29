import { Bookmark, X } from "lucide-react";

export default function WatchlistModal({ isOpen, watchlist, onClose, onOpenParcel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-400" /> Saved Parcel Watchlist ({watchlist.length})
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto custom-scrollbar space-y-3 flex-1">
          {watchlist.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-8">
              No parcels saved to watchlist yet. Click the bookmark icon on any parcel detail panel.
            </p>
          ) : (
            watchlist.map((p) => (
              <div key={p.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-emerald-400 font-mono text-[10px]">{p.id}</span>
                  <h4 className="font-bold text-white">{p.address}</h4>
                  <span className="text-[10px] text-slate-400">
                    Capacity: {p.capacityRange} • Assessed: ${p.assessedValue.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => onOpenParcel(p)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                >
                  Open Underwriting
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
