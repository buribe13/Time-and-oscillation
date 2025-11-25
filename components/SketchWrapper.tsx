"use client";

import dynamic from "next/dynamic";
import { ControlState } from "./ControlPanel";

const SketchCanvas = dynamic(() => import("./SketchCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-[600px] h-[600px] flex items-center justify-center bg-gray-100 rounded-[24px] text-gray-400 font-mono">
      Loading Sketch...
    </div>
  ),
});

export default function SketchWrapper({ state }: { state: ControlState }) {
  return <SketchCanvas state={state} />;
}

