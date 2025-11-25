"use client";

import React from "react";

export type ControlState = {
  mode: "SHAPE 1" | "SHAPE 2";
  points: number;
  speed: number;
  wobble: number;
  size: number;
  trails: number;
};

type ControlPanelProps = {
  state: ControlState;
  onChange: (newState: ControlState) => void;
};

const Slider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) => (
  <div className="box-border flex gap-[10px] items-center overflow-clip p-[12px] relative shrink-0 w-full">
    <p className="text-[10px] tracking-tighter w-[50px] whitespace-pre-wrap font-mono uppercase">
      {label}
    </p>
    <div className="flex-1 relative h-[20px] flex items-center">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-[4px] bg-black/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black/80 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:backdrop-blur-sm [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white/50"
      />
    </div>
    <p className="text-[10px] tracking-tighter font-mono w-[30px] text-right opacity-60">
      {value}
    </p>
  </div>
);

export default function ControlPanel({ state, onChange }: ControlPanelProps) {
  const handleChange = (key: keyof ControlState, value: number | string) => {
    onChange({ ...state, [key]: value });
  };

  return (
    <div className="flex flex-col gap-[16px] items-start relative w-[300px] shrink-0">
      {/* Mode Switcher */}
      <div className="w-full bg-white/20 backdrop-blur-xl border border-white/40 shadow-sm relative rounded-[24px] shrink-0 p-[4px] flex gap-[2px]">
        <div
          className={`absolute top-[4px] bottom-[4px] bg-white/80 shadow-sm rounded-[20px] w-[calc(50%-5px)] transition-all duration-300 ease-in-out ${
            state.mode === "SHAPE 1" ? "left-[4px]" : "left-[calc(50%+1px)]"
          }`}
        />
        <button
          onClick={() => handleChange("mode", "SHAPE 1")}
          className={`flex-1 px-[12px] py-[8px] rounded-[20px] text-[12px] font-medium tracking-tighter relative z-10 transition-colors ${
            state.mode === "SHAPE 1" ? "text-black" : "text-black/50"
          }`}
        >
          SHAPE 1
        </button>
        <button
          onClick={() => handleChange("mode", "SHAPE 2")}
          className={`flex-1 px-[12px] py-[8px] rounded-[20px] text-[12px] font-medium tracking-tighter relative z-10 transition-colors ${
            state.mode === "SHAPE 2" ? "text-black" : "text-black/50"
          }`}
        >
          SHAPE 2
        </button>
      </div>

      {/* Controls Container */}
      <div className="bg-white/20 backdrop-blur-xl border border-white/40 flex flex-col gap-[8px] items-start p-[16px] rounded-[32px] w-full shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
        <Slider
          label="POINTS"
          value={state.points}
          min={10}
          max={2000}
          step={10}
          onChange={(val) => handleChange("points", val)}
        />
        <Slider
          label="SPEED"
          value={state.speed}
          min={0}
          max={10}
          step={0.01}
          onChange={(val) => handleChange("speed", val)}
        />
        <Slider
          label="WOBBLE"
          value={state.wobble}
          min={0}
          max={100}
          step={0.1}
          onChange={(val) => handleChange("wobble", val)}
        />
        <Slider
          label="SIZE"
          value={state.size}
          min={0.1}
          max={3}
          step={0.01}
          onChange={(val) => handleChange("size", val)}
        />
        <Slider
          label="TRAILS"
          value={state.trails}
          min={0}
          max={255}
          step={1}
          onChange={(val) => handleChange("trails", val)}
        />
      </div>
    </div>
  );
}
