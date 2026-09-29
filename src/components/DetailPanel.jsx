import { useState } from "react";
import { Info, Sparkles, MessageSquare, Bookmark, X } from "lucide-react";
import OverviewTab from "./tabs/OverviewTab";
import AIEngineTab from "./tabs/AIEngineTab";
import ChatTab from "./tabs/ChatTab";

const TABS = [
  { id: "overview", label: "Parcel & Signals", icon: Info, iconClass: "" },
  { id: "ai", label: "AI Development Engine", icon: Sparkles, iconClass: "text-amber-400" },
  { id: "chat", label: "AI Analyst Chat", icon: MessageSquare, iconClass: "text-indigo-400" },
];

export default function DetailPanel({ parcel, isSaved, onToggleWatchlist, onClose }) {
  const [tab, setTab] = useState("overview");

  return (
    <aside
      className={`w-[480px] bg-slate-900 border-l border-slate-800 flex flex-col z-20 shadow-2xl transform transition-transform duration-300 absolute right-0 top-0 bottom-0 ${
        parcel ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {parcel && (
        <>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {parcel.zoning}
              </span>
              <h2 className="font-bold text-sm text-white truncate max-w-[280px]">{parcel.address}</h2>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={onToggleWatchlist}
                title="Save to Watchlist"
                className={
                  isSaved
                    ? "p-1.5 bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-400 transition"
                    : "p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-amber-400 transition"
                }
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6 text-xs">
            <div className="flex border-b border-slate-800 text-xs font-semibold">
              {TABS.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex-1 pb-2 border-b-2 flex items-center justify-center gap-1.5 ${
                      active ? "border-emerald-500 text-emerald-400" : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${t.iconClass}`} /> {t.label}
                  </button>
                );
              })}
            </div>

            {tab === "overview" && <OverviewTab parcel={parcel} />}
            {tab === "ai" && <AIEngineTab key={parcel.id} parcel={parcel} />}
            {tab === "chat" && <ChatTab key={parcel.id} parcel={parcel} />}
          </div>
        </>
      )}
    </aside>
  );
}
