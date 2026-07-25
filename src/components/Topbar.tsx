import { Share2 } from "lucide-react";
import { useOthers } from "@liveblocks/react/suspense";
import { useState } from "react";

const COLORS = ["#ef4444", "#eab308", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"];

export default function Topbar() {
  const others = useOthers();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="absolute top-0 left-0 w-full z-50 flex items-center justify-between p-4 px-6 pointer-events-none">
      
      {/* Left side: Logo & Title */}
      <div className="flex items-center gap-4 pointer-events-auto bg-white border border-zinc-200 backdrop-blur-xl px-4 py-2.5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-inner">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h1 className="text-sm font-bold text-zinc-900 leading-none">Collab-Board</h1>
          <p className="text-[10px] text-zinc-500 mt-0.5 font-medium">Live Workspace</p>
        </div>
      </div>

      {/* Right side: Avatars & Share */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="flex items-center -space-x-2 mr-2">
          {others.slice(0, 4).map(({ connectionId }, index) => {
            const color = COLORS[connectionId % COLORS.length];
            return (
              <div
                key={connectionId}
                className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm"
                style={{ backgroundColor: color, zIndex: 50 - index }}
                title={`Guest ${connectionId}`}
              >
                G{connectionId % 100}
              </div>
            );
          })}
          {others.length > 4 && (
            <div className="w-8 h-8 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-xs text-zinc-600 font-bold shadow-sm z-10">
              +{others.length - 4}
            </div>
          )}
          {/* Your own avatar */}
          <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm z-0 relative group">
            You
          </div>
        </div>

        <button 
          onClick={handleShare}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        >
          <Share2 className="w-4 h-4" />
          {copied ? "Copied!" : "Share"}
        </button>
      </div>
    </div>
  );
}
