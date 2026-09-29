import { Search } from "lucide-react";
import ParcelCard from "./ParcelCard";

export default function Sidebar({ filters, onFilterChange, parcels, selectedParcel, onSelectParcel }) {
  return (
    <aside className="w-96 bg-slate-900 border-r border-slate-800 flex flex-col z-20 shrink-0">
      <div className="p-4 border-b border-slate-800 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search address, parcel ID, or zip..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Zoning District</label>
            <select
              value={filters.zoning}
              onChange={(e) => onFilterChange({ zoning: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Zoning Codes</option>
              <option value="MU-2">MU-2 (Mixed-Use)</option>
              <option value="D-5">D-5 (Multi-Family Residential)</option>
              <option value="C-4">C-4 (Community Commercial)</option>
              <option value="I-1">I-1 (Light Industrial)</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Min. Acreage</label>
            <select
              value={filters.minAcreage}
              onChange={(e) => onFilterChange({ minAcreage: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="0">Any Size</option>
              <option value="1">1+ Acres</option>
              <option value="2">2+ Acres</option>
              <option value="5">5+ Acres</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.offMarketOnly}
              onChange={(e) => onFilterChange({ offMarketOnly: e.target.checked })}
              className="rounded bg-slate-950 border-slate-800 text-emerald-600 focus:ring-0"
            />
            <span>Off-Market Signals Only (4+ flags)</span>
          </label>
          <span className="text-xs text-emerald-400 font-semibold">{parcels.length} parcels found</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2.5">
        {parcels.map((p) => (
          <ParcelCard key={p.id} parcel={p} isSelected={selectedParcel?.id === p.id} onSelect={onSelectParcel} />
        ))}
      </div>
    </aside>
  );
}
