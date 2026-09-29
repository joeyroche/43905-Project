import { useMemo, useState } from "react";
import { CheckCircle2, Award, Layers, DollarSign } from "lucide-react";

export default function AIEngineTab({ parcel }) {
  const [rev, setRev] = useState(220000);
  const [cost, setCost] = useState(165000);
  const [profitPct, setProfitPct] = useState(18);
  const [siteCost, setSiteCost] = useState(450000);

  const residualLandValue = useMemo(() => {
    const [lo, hi] = parcel.capacityRange.split("–").map((s) => parseInt(s, 10));
    const midUnits = (lo + hi) / 2;
    const totalRevenue = midUnits * rev;
    const totalConstruction = midUnits * cost;
    const totalProfit = totalRevenue * (profitPct / 100);
    return totalRevenue - totalConstruction - totalProfit - siteCost;
  }, [parcel, rev, cost, profitPct, siteCost]);

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-br from-emerald-950/60 to-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold text-emerald-400">AI Development Capacity</span>
            <div className="text-xl font-bold text-white tracking-tight">{parcel.capacityRange}</div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Confidence Rating</span>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1 justify-end">
              <CheckCircle2 className="w-4 h-4" /> {parcel.confidence}
            </div>
          </div>
        </div>
        <div className="pt-2 border-t border-emerald-500/20 flex justify-between text-[11px] text-slate-300">
          <span>
            Recommended Asset Class: <strong className="text-white">{parcel.assetClass}</strong>
          </span>
          <span>
            Est. Parking: <strong className="text-white">{parcel.parking}</strong>
          </span>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Transparent Opportunity Score
          </h3>
          <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-bold text-xs">
            {parcel.scoreTotal} / 100
          </span>
        </div>
        <p className="text-[11px] text-slate-400">Breakdown of weighted sub-components contributing to parcel feasibility:</p>

        <div className="space-y-2">
          {parcel.scoreBreakdown.map((sb) => (
            <div key={sb.name} className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">
                  {sb.name} <span className="text-slate-500 font-mono text-[9px]">({sb.weight})</span>
                </span>
                <span className="font-bold text-emerald-400">{sb.score}/100</span>
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${sb.score}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-400" /> Surrounding Comparable Projects (Weighted)
        </h3>
        <p className="text-[11px] text-slate-400">Completed projects are weighted 7x higher than proposed/approved on paper.</p>

        <div className="space-y-2">
          {parcel.comps.map((c) => (
            <div key={c.name} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-[11px]">
              <div>
                <div className="font-semibold text-slate-200">{c.name}</div>
                <div className="text-[10px] text-slate-400">
                  {c.units} units • {c.acres} ac • {c.distance} away
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    c.status.includes("Completed")
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                  }`}
                >
                  {c.status}
                </span>
                <div className="text-[9px] text-amber-400 font-mono mt-0.5">Weight: {c.weightFactor}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-3 border-t border-slate-800">
        <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Residual Land Value Model (Editable Assumptions)
        </h3>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <label className="text-slate-400 block mb-1">Expected Sale / Unit ($)</label>
              <input
                type="number"
                value={rev}
                onChange={(e) => setRev(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Construction Cost / Unit ($)</label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-white font-mono"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <label className="text-slate-400 block mb-1">Target Profit Margin (%)</label>
              <input
                type="number"
                value={profitPct}
                onChange={(e) => setProfitPct(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Site Prep & Soft Costs ($)</label>
              <input
                type="number"
                value={siteCost}
                onChange={(e) => setSiteCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-white font-mono"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-slate-300 font-semibold text-xs">Max Allowable Land Value:</span>
            <span className="font-mono text-emerald-400 font-bold text-sm">
              ${Math.round(residualLandValue).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
