import { create } from 'zustand';

export type Tool = "select" | "rectangle" | "circle" | "triangle" | "text";

interface BoardState {
  activeTool: Tool;
  activeColor: string;
  setActiveTool: (tool: Tool) => void;
  setActiveColor: (color: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  activeTool: "select",
  activeColor: "#5d5cff",
  setActiveTool: (tool) => set({ activeTool: tool }),
  setActiveColor: (color) => set({ activeColor: color }),
}));
