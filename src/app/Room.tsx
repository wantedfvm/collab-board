"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";

export function Room({ children }: { children: ReactNode }) {
  // Ignorando .env e usando a chave pública correta diretamente (100% seguro para chaves públicas)
  const publicApiKey = "pk_dev_UoFwPLCQydufRQ1KwEZ6eU1MtQVXr7Bvg4jErkQWskbiAdHAXhVXPDTqh4CYvjkh";
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    // Generate or get Room ID on the client side
    const params = new URLSearchParams(window.location.search);
    let room = params.get("room");
    if (!room) {
      room = Math.random().toString(36).substring(2, 9);
      window.history.replaceState(null, "", `?room=${room}`);
    }
    setRoomId(room);
  }, []);

  if (!publicApiKey || !roomId) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
        <p>A chave do Liveblocks não foi encontrada no .env.local</p>
      </div>
    );
  }

  return (
    <LiveblocksProvider publicApiKey={publicApiKey}>
      <RoomProvider id={`collab-board-${roomId}`} initialPresence={{ cursor: null }}>
        <ClientSideSuspense fallback={
          <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
          </div>
        }>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
