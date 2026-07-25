"use client";

import { Room } from "./Room";
import dynamic from "next/dynamic";
import Topbar from "../components/Topbar";
import Toolbar from "../components/Toolbar";
import LiveCursors from "../components/LiveCursors";
import TutorialOverlay from "../components/TutorialOverlay";

// Fabric.js requires the window object, so we must load the Canvas component dynamically
// disabling server-side rendering (SSR) for it.
const LiveCanvas = dynamic(() => import("../components/LiveCanvas"), { ssr: false });

export default function Home() {
  return (
    <Room>
      <main className="flex h-screen w-full overflow-hidden relative bg-dots">
        {/* The interactive WebGL/Canvas Board */}
        <LiveCanvas />
        
        {/* Floating UI */}
        <Topbar />
        <Toolbar />
        <LiveCursors />
        <TutorialOverlay />
      </main>
    </Room>
  );
}
