// Define TypeScript types for Liveblocks
declare global {
  interface Liveblocks {
    // Presence represents the properties that exist on every user in the Room
    // and that will automatically be kept in sync. Accessible through `useMyPresence`.
    Presence: {
      cursor: { x: number; y: number } | null;
    };

    // The Storage tree for the room, for example, a list of shapes or drawings
    Storage: {
      // We will define this later when we build the shapes!
    };
  }
}

export {};
