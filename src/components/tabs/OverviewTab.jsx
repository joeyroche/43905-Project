import { ShieldAlert, Map as MapIcon, CheckCircle, Circle } from "lucide-react";

export default function OverviewTab({ parcel }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase">Parcel ID (PIN)</span>
          <span className="font-mono font-semibold text-slate-200">{parcel.id}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase">Total Acreage</span>
          <span className="font-semibold text-slate-200">{parcel.acres} Gross Acres</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase">Assessed Value (CAMA)</span>
          <span className="font-semibold text-emerald-400">${parcel.assessedValue.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase">Last Sale Date</span>
          <span className="font-semibold text-slate-200">
            {parcel.lastSaleDate} (${(parcel.lastSalePrice / 1000).toFixed(0)}k)
          </span>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Off-Market Potential Signals
          </h3>
          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
            {parcel.signalsCount} of 6 signals
          </span>
        </div>
        <p className="text-[11px] text-slate-400 italic">
          Note: Off-market potential reflects ownership indicators only; it does not claim the owner intends to sell.
        </p>

        <div className="space-y-1.5">
          {parcel.signals.map((s) => (
            <div
              key={s.title}
              className={`flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border ${
                s.active ? "border-amber-500/30 bg-amber-500/5" : "border-slate-800 opacity-60"
              }`}
            >
              {s.active ? (
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-semibold text-slate-200 text-[11px]">{s.title}</div>
                <div className="text-[10px] text-slate-400">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-1.5">
          <MapIcon className="w-3.5 h-3.5 text-indigo-400" /> GIS Constraint Subtractions
        </h3>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-[11px]">
          <div className="flex justify-between">
            <span className="text-slate-400">Gross Site Area:</span>
            <span className="font-semibold text-slate-200">{parcel.acres} Acres</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Floodplain / Wetland Deduction:</span>
            <span className="font-semibold text-amber-400">-{parcel.floodDeductionAcres} Acres (FEMA Zone A)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Required Setbacks & Easements:</span>
            <span className="font-semibold text-amber-400">-{parcel.setbackDeductionAcres} Acres (Zoning Setback)</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between font-bold">
            <span className="text-slate-300">Net Buildable Area:</span>
            <span className="text-emerald-400">{parcel.netBuildableAcres} Net Buildable Acres</span>
          </div>
        </div>
      </div>
    </div>
  );
}
