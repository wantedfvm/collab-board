"use client";

import { useOthers, useMyPresence } from "@liveblocks/react/suspense";
import { useEffect } from "react";
import { MousePointer2 } from "lucide-react";

const COLORS = ["#ef4444", "#eab308", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"];

export default function LiveCursors() {
  const others = useOthers();
  const [, updateMyPresence] = useMyPresence();

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Update our cursor position on Liveblocks network
      updateMyPresence({
        cursor: { x: Math.round(e.clientX), y: Math.round(e.clientY) },
      });
    };

    const handlePointerLeave = () => {
      updateMyPresence({ cursor: null });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [updateMyPresence]);

  return (
    <>
      {others.map(({ connectionId, presence }) => {
        if (presence == null || presence.cursor == null) {
          return null;
        }

        const { x, y } = presence.cursor;
        // Deterministic color based on connection ID
        const color = COLORS[connectionId % COLORS.length];

        return (
          <div
            key={connectionId}
            className="absolute z-50 pointer-events-none transition-transform duration-100 ease-linear"
            style={{
              transform: `translateX(${x}px) translateY(${y}px)`,
            }}
          >
            {/* The Cursor Arrow */}
            <MousePointer2
              className="w-5 h-5 drop-shadow-md"
              style={{ color, fill: color }}
            />
            
            {/* User Name Tag */}
            <div
              className="absolute left-4 top-4 px-2 py-0.5 rounded-md text-[10px] font-bold text-white whitespace-nowrap shadow-md"
              style={{ backgroundColor: color }}
            >
              Guest {connectionId}
            </div>
          </div>
        );
      })}
    </>
  );
}
