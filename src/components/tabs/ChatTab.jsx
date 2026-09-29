import { useRef, useState } from "react";
import { Bot, Send } from "lucide-react";

function buildReply(parcel, message) {
  const lower = message.toLowerCase();
  const intro = `Based on the Marion County GIS and ${parcel.comps.length} weighted comps for ${parcel.address}, `;

  if (lower.includes("setback") || lower.includes("zoning")) {
    return (
      intro +
      `this parcel is zoned ${parcel.zoning}, requiring a standard front setback of 25 ft and side setbacks of 10 ft. ` +
      `After deducting ${parcel.floodDeductionAcres} acres for FEMA floodplain and ${parcel.setbackDeductionAcres} acres for easements, ` +
      `you have ${parcel.netBuildableAcres} net buildable acres.`
    );
  }
  if (lower.includes("comp") || lower.includes("comparable")) {
    const avgUnits = Math.round(parcel.comps.reduce((acc, c) => acc + c.units, 0) / parcel.comps.length);
    return (
      intro +
      `we trust completed projects like ${parcel.comps[0].name} (weighted 7x) over proposed paper plans. ` +
      `Density averaged ${avgUnits} units per buildable acre across the immediate submarket.`
    );
  }
  if (lower.includes("owner") || lower.includes("off-market")) {
    return (
      intro +
      `this parcel registers ${parcel.signalsCount} of 6 off-market signals, notably including absentee ownership ` +
      `(${parcel.ownerAddress}) and long-term static holding.`
    );
  }
  return (
    intro +
    `the model projects a yield of ${parcel.capacityRange} with a residual land value based on your current cost assumptions in the AI Development Engine tab.`
  );
}

export default function ChatTab({ parcel }) {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: `Hello! I've analyzed the zoning code and ${parcel.comps.length} surrounding comps for ${parcel.address}. What specific underwriting angle would you like to review?`,
    },
  ]);
  const [input, setInput] = useState("");
  const containerRef = useRef(null);

  function scrollToBottom() {
    requestAnimationFrame(() => {
      if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
    });
  }

  function send() {
    const msg = input.trim();
    if (!msg) return;
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    scrollToBottom();

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", text: buildReply(parcel, msg) }]);
      scrollToBottom();
    }, 600);
  }

  return (
    <div className="space-y-4 flex flex-col h-[420px]">
      <div className="bg-indigo-950/40 border border-indigo-500/30 p-3 rounded-xl text-[11px] text-indigo-200 flex items-start gap-2">
        <Bot className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <strong>LandLens AI Underwriter:</strong> I am locked onto this selected parcel. Ask me anything about zoning
          setbacks, density calculations, comparable projects, or ownership structure.
        </div>
      </div>

      <div ref={containerRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2 text-xs">
        {messages.map((m, i) =>
          m.role === "ai" ? (
            <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 mr-6">
              <div className="text-[10px] text-indigo-400 font-semibold">LandLens AI Underwriter</div>
              <p className="text-slate-200">{m.text}</p>
            </div>
          ) : (
            <div key={i} className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/20 space-y-1 ml-6">
              <div className="text-[10px] text-emerald-400 font-semibold text-right">You (Acquisitions Analyst)</div>
              <p className="text-slate-200 text-right">{m.text}</p>
            </div>
          )
        )}
      </div>

      <div className="pt-2 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about zoning, density, or comps..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
        <button
          onClick={send}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
