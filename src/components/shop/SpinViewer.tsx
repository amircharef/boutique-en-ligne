"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion } from "framer-motion";
import { ImageOff, RotateCw } from "lucide-react";

const PX_PER_FRAME = 60;

export function SpinViewer({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const dragStartX = useRef(0);
  const dragStartIndex = useRef(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-3/4 w-full items-center justify-center rounded-2xl bg-surface-hover text-subtle">
        <ImageOff size={48} strokeWidth={1} />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="aspect-3/4 overflow-hidden rounded-2xl bg-surface-hover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[0]} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  function frameAt(i: number) {
    return ((i % images.length) + images.length) % images.length;
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    setDragging(true);
    setInteracted(true);
    dragStartX.current = e.clientX;
    dragStartIndex.current = index;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    const delta = e.clientX - dragStartX.current;
    const steps = Math.round(delta / PX_PER_FRAME);
    setIndex(frameAt(dragStartIndex.current - steps));
  }

  function handlePointerUp() {
    setDragging(false);
  }

  return (
    <div
      className="group relative aspect-3/4 touch-pan-y overflow-hidden rounded-2xl bg-surface-hover select-none"
      style={{ cursor: dragging ? "grabbing" : "grab" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[index]}
        alt={alt}
        draggable={false}
        className="h-full w-full object-cover"
      />

      {!interacted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center"
        >
          <span className="flex items-center gap-2 rounded-full bg-foreground/80 px-4 py-2 text-xs font-medium text-background backdrop-blur">
            <RotateCw size={13} className="animate-spin-slow" />
            Glisse pour tourner
          </span>
        </motion.div>
      )}

      <div className="pointer-events-none absolute top-3 right-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-medium text-muted backdrop-blur">
        {index + 1}/{images.length}
      </div>
    </div>
  );
}
