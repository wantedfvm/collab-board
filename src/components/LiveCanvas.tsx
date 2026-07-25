"use client";

import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useBoardStore } from "../store/useBoardStore";

export default function LiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { activeTool, activeColor } = useBoardStore();
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawingRef = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Fabric Canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      selection: true, // Allow selecting multiple objects
    });

    // Make it full screen and handle resize
    const handleResize = () => {
      canvas.setWidth(window.innerWidth);
      canvas.setHeight(window.innerHeight);
      canvas.renderAll();
    };
    window.addEventListener("resize", handleResize);

    fabricRef.current = canvas;

    // Remove the hardcoded test rect, users will draw their own!

    // Handle Pan and Zoom
    canvas.on("mouse:down", (opt) => {
      const evt = opt.e;
      const c = canvas as any;
      if (evt.altKey === true) {
        c.isDragging = true;
        c.selection = false;
        c.lastPosX = evt.clientX;
        c.lastPosY = evt.clientY;
      }
    });

    canvas.on("mouse:move", (opt) => {
      const c = canvas as any;
      if (c.isDragging) {
        const e = opt.e;
        const vpt = canvas.viewportTransform;
        if (vpt) {
          vpt[4] += e.clientX - c.lastPosX;
          vpt[5] += e.clientY - c.lastPosY;
          canvas.requestRenderAll();
          c.lastPosX = e.clientX;
          c.lastPosY = e.clientY;
        }
      }
    });

    canvas.on("mouse:up", () => {
      const c = canvas as any;
      canvas.setViewportTransform(canvas.viewportTransform!);
      c.isDragging = false;
      canvas.selection = true;
    });

    // Allow zooming with mouse wheel
    canvas.on("mouse:wheel", function (opt) {
      const delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.dispose();
      fabricRef.current = null;
    };
  }, []);

  // Effect to handle tool changes and drawing logic
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    // If select tool, enable selection and exit drawing mode
    if (activeTool === "select") {
      canvas.isDrawingMode = false;
      canvas.selection = true;
      canvas.defaultCursor = "default";
      canvas.forEachObject((obj) => {
        obj.selectable = true;
        obj.evented = true;
      });
    } else {
      // If drawing shape, disable selection
      canvas.selection = false;
      canvas.defaultCursor = "crosshair";
      canvas.forEachObject((obj) => {
        obj.selectable = false;
        obj.evented = false;
      });
    }

    let originX = 0;
    let originY = 0;

    function handleMouseDown(o: fabric.IEvent) {
      if (activeTool === "select" || o.e.altKey) return;
      isDrawingRef.current = true;
      
      const pointer = canvas!.getPointer(o.e);
      originX = pointer.x;
      originY = pointer.y;

      if (activeTool === "rectangle") {
        shapeRef.current = new fabric.Rect({
          left: originX,
          top: originY,
          originX: "left",
          originY: "top",
          width: 0,
          height: 0,
          fill: activeColor,
          rx: 8,
          ry: 8,
          shadow: new fabric.Shadow({
            color: activeColor + "66", // 40% opacity hex
            blur: 15,
          }),
        });
        canvas!.add(shapeRef.current);
      } else if (activeTool === "circle") {
        shapeRef.current = new fabric.Circle({
          left: originX,
          top: originY,
          originX: "left",
          originY: "top",
          radius: 0,
          fill: activeColor,
          shadow: new fabric.Shadow({ color: activeColor + "66", blur: 15 }),
        });
        canvas!.add(shapeRef.current);
      } else if (activeTool === "triangle") {
        shapeRef.current = new fabric.Triangle({
          left: originX,
          top: originY,
          originX: "left",
          originY: "top",
          width: 0,
          height: 0,
          fill: activeColor,
          shadow: new fabric.Shadow({ color: activeColor + "66", blur: 15 }),
        });
        canvas!.add(shapeRef.current);
      } else if (activeTool === "text") {
        const textColor = activeColor === "#5d5cff" ? "#09090b" : activeColor;
        const text = new fabric.IText("Type here...", {
          left: originX,
          top: originY,
          fill: textColor,
          fontFamily: "system-ui, sans-serif",
          fontSize: 28,
          fontWeight: "bold",
        });
        canvas!.add(text);
        canvas!.setActiveObject(text);
        text.enterEditing();
        text.selectAll();
        // Return immediately so we don't start dragging mode for text
        useBoardStore.getState().setActiveTool("select");
        return;
      }
    }

    function handleMouseMove(o: fabric.IEvent) {
      if (!isDrawingRef.current || activeTool === "select") return;
      const pointer = canvas!.getPointer(o.e);

      if (activeTool === "rectangle" && shapeRef.current) {
        const rect = shapeRef.current as fabric.Rect;
        if (originX > pointer.x) {
          rect.set({ left: Math.abs(pointer.x) });
        }
        if (originY > pointer.y) {
          rect.set({ top: Math.abs(pointer.y) });
        }
        rect.set({ width: Math.abs(originX - pointer.x) });
        rect.set({ height: Math.abs(originY - pointer.y) });
        canvas!.renderAll();
      } else if (activeTool === "circle" && shapeRef.current) {
        const circle = shapeRef.current as fabric.Circle;
        const radius = Math.max(Math.abs(originX - pointer.x), Math.abs(originY - pointer.y)) / 2;
        if (originX > pointer.x) circle.set({ left: Math.abs(pointer.x) });
        if (originY > pointer.y) circle.set({ top: Math.abs(pointer.y) });
        circle.set({ radius: radius });
        canvas!.renderAll();
      } else if (activeTool === "triangle" && shapeRef.current) {
        const triangle = shapeRef.current as fabric.Triangle;
        if (originX > pointer.x) triangle.set({ left: Math.abs(pointer.x) });
        if (originY > pointer.y) triangle.set({ top: Math.abs(pointer.y) });
        triangle.set({ width: Math.abs(originX - pointer.x) });
        triangle.set({ height: Math.abs(originY - pointer.y) });
        canvas!.renderAll();
      }
    }

    function handleMouseUp() {
      isDrawingRef.current = false;
      if (shapeRef.current) {
        shapeRef.current.setCoords();
        shapeRef.current = null;
      }
      // Auto-switch back to select after drawing
      if (activeTool !== "select") {
        useBoardStore.getState().setActiveTool("select");
      }
    }

    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:move", handleMouseMove);
    canvas.on("mouse:up", handleMouseUp);

    return () => {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:move", handleMouseMove);
      canvas.off("mouse:up", handleMouseUp);
    };

  }, [activeTool, activeColor]);

  // Effect to update selected object color when clicking a color button
  useEffect(() => {
    if (!fabricRef.current) return;
    const activeObj = fabricRef.current.getActiveObject();
    if (activeObj) {
      // If we are actively editing text and have some letters selected, only change those letters
      if (activeObj.type === 'i-text' && (activeObj as fabric.IText).isEditing) {
        (activeObj as fabric.IText).setSelectionStyles({ fill: activeColor });
      } else {
        // Otherwise change the whole object
        activeObj.set("fill", activeColor);
        
        // If it's not text, update the shadow color too
        if (activeObj.type !== 'i-text' && activeObj.shadow) {
          (activeObj.shadow as fabric.Shadow).color = activeColor + "66";
        }
      }
      
      fabricRef.current.renderAll();
    }
  }, [activeColor]);

  return (
    <div className="absolute inset-0 z-0">
      <canvas ref={canvasRef} id="canvas" />
    </div>
  );
}
