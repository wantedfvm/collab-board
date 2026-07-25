import { MousePointer2, Square, Circle, Type, Triangle } from "lucide-react";
import { useBoardStore, Tool } from "../store/useBoardStore";

export default function Toolbar() {
  const { activeTool, setActiveTool, activeColor, setActiveColor } = useBoardStore();
  const tools: { icon: any; label: string; id: Tool }[] = [
    { icon: MousePointer2, label: "Select (V)", id: "select" },
    { icon: Square, label: "Rectangle (R)", id: "rectangle" },
    { icon: Circle, label: "Circle (O)", id: "circle" },
    { icon: Triangle, label: "Triangle (T)", id: "triangle" },
    { icon: Type, label: "Text (T)", id: "text" },
  ];

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 rounded-2xl bg-white border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl">
      {tools.map((tool) => (
        <button
          key={tool.id}
          title={tool.label}
          onClick={() => setActiveTool(tool.id)}
          className={`p-3 rounded-xl transition-all duration-200 hover:bg-zinc-100 active:scale-95 flex items-center justify-center
            ${activeTool === tool.id ? "bg-blue-50 text-blue-600 border border-blue-200 shadow-sm" : "text-zinc-500 hover:text-zinc-900 border border-transparent"}
          `}
        >
          <tool.icon className="w-5 h-5" />
        </button>
      ))}
      <div className="w-px h-8 bg-zinc-200 mx-2" />
      <div className="flex gap-2 pr-2">
        {["#ef4444", "#eab308", "#22c55e", "#5d5cff", "#09090b"].map((color) => (
          <button
            key={color}
            onClick={() => setActiveColor(color)}
            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 active:scale-95 ${activeColor === color ? "border-blue-500 shadow-md scale-110" : "border-zinc-200"}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
