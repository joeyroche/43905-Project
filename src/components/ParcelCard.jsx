export default function ParcelCard({ parcel, isSelected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(parcel)}
      className={`p-3.5 rounded-xl border transition cursor-pointer space-y-2.5 ${
        isSelected
          ? "bg-slate-950 border-emerald-500 ring-1 ring-emerald-500/30"
          : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10px] font-mono text-emerald-400 font-semibold">{parcel.id}</span>
          <h4 className="font-bold text-xs text-white mt-0.5">{parcel.address}</h4>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
          {parcel.zoning}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-800/60">
        <div>
          <span className="text-slate-500 block text-[9px]">Acres</span>
          <span className="font-semibold text-slate-200">{parcel.acres} ac</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[9px]">Assessed</span>
          <span className="font-semibold text-emerald-400">${(parcel.assessedValue / 1000).toFixed(0)}k</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[9px]">Signals</span>
          <span className="font-semibold text-amber-400">{parcel.signalsCount}/6 flags</span>
        </div>
      </div>
    </div>
  );
}
