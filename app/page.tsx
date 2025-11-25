"use client";

import React, { useState } from "react";
import ControlPanel, { ControlState } from "@/components/ControlPanel";
import SketchWrapper from "@/components/SketchWrapper";

export default function Home() {
  const [state, setState] = useState<ControlState>({
    mode: "SHAPE 1",
    points: 1000,
    speed: 1,
    wobble: 10,
    size: 1,
    trails: 50,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-8">
      <div className="flex gap-8 items-center justify-center w-full max-w-[1000px]">
        <ControlPanel state={state} onChange={setState} />
        <div className="bg-white/20 backdrop-blur-3xl rounded-[32px] p-2 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/40 ring-1 ring-white/30">
          <SketchWrapper state={state} />
        </div>
      </div>
    </main>
  );
}
