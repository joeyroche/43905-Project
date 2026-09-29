import { Layers, Database, Bookmark } from "lucide-react";

export default function Header({ watchlistCount, onOpenWatchlist }) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 h-16 flex items-center justify-between px-6 z-30 shrink-0">
      <div className="flex items-center space-x-3">
        <div className="bg-emerald-600 p-2 rounded-lg text-white">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
            LandLens
            <span className="text-xs uppercase bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 font-semibold">
              Marion County, IN
            </span>
          </h1>
          <p className="text-xs text-slate-400">Off-Market Land Discovery & AI Development Underwriting</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300">
          <Database className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
          <span>
            IndianaMap + MapIndy GIS Feed: <strong className="text-white">Active (Verified)</strong>
          </span>
        </div>
        <button
          onClick={onOpenWatchlist}
          className="relative bg-slate-800 hover:bg-slate-700 p-2 rounded-lg border border-slate-700 transition flex items-center gap-1.5 text-xs font-medium"
        >
          <Bookmark className="w-4 h-4 text-amber-400" />
          <span>Watchlist</span>
          <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
            {watchlistCount}
          </span>
        </button>
        <div className="h-6 w-px bg-slate-800"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
            JR
          </div>
          <div className="text-left">
            <div className="text-xs font-semibold text-white">Acquisitions Team</div>
            <div className="text-[10px] text-slate-400">Purdue RE Finance</div>
          </div>
        </div>
      </div>
    </header>
  );
}
