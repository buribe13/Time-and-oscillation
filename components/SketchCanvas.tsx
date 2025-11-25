"use client";

import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { ControlState } from "./ControlPanel";

type SketchCanvasProps = {
  state: ControlState;
};

export default function SketchCanvas({ state }: SketchCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  // Keep state in a ref so the p5 draw loop can access the latest without re-binding
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Cleanup potentially stale instances or HTML from strict mode re-renders
    if (p5Instance.current) {
      p5Instance.current.remove();
      p5Instance.current = null;
    }
    containerRef.current.innerHTML = "";

    const sketch = (p: p5) => {
      let rotation = 0;
      let accumulatedTime = 0;
      let lastInterval = 0;
      let intervalOffset = 0;

      p.setup = () => {
        p.createCanvas(600, 600, p.WEBGL);
        p.smooth();
      };

      p.draw = () => {
        const { mode, points, speed, wobble, size, trails } = stateRef.current;
        const dt = p.deltaTime || 16.6;

        // Accumulate time based on speed for smooth transitions
        // We use a multiplier to match roughly the previous speed scale
        accumulatedTime += dt * speed; 

        // Trails effect
        if (trails < 5) {
          p.clear();
        } else {
          // Draw semi-transparent rect to create trail effect
          p.push();
          p.resetMatrix();
          p.translate(0, 0, -1); // Slightly back
          p.noStroke();
          // Map trails (0-255) to opacity (255-5). 
          // Higher trails = lower opacity (longer persistence)
          const opacity = p.map(trails, 0, 255, 255, 5);
          p.fill(255, 255, 255, opacity);
          p.plane(p.width * 2, p.height * 2);
          p.pop();

          // Clear depth buffer so new geometry draws on top of the fade plane
          const gl = (p.drawingContext as unknown) as WebGLRenderingContext;
          gl.clear(gl.DEPTH_BUFFER_BIT);
        }

        // Set up scene
        p.scale(size);
        p.rotateY(rotation);
        p.rotateX(rotation * 0.5);
        
        rotation += speed * 0.005;

        // Visual Styles
        p.noFill();
        p.stroke(30, 30, 30);
        p.strokeWeight(2);

        if (mode === "SHAPE 1") {
          // Fibonacci Sphere
          const phi = (Math.sqrt(5) + 1) / 2 - 1; // Golden Ratio
          const ga = phi * 2 * Math.PI; // Golden Angle

          p.beginShape(p.POINTS);
          for (let i = 0; i < points; i++) {
            const lon = ga * i;
            const lat = Math.asin(-1 + (2 * i) / points);

            // Base radius
            let r = 200;

            // Apply wobble (noise)
            // Use accumulatedTime for smooth animation even when speed changes
            const nVal = p.noise(
              Math.cos(lat) + accumulatedTime * 0.0002, 
              Math.sin(lon), 
              wobble * 0.01
            );
            r += (nVal - 0.5) * wobble * 2;

            const x = r * Math.cos(lat) * Math.cos(lon);
            const y = r * Math.cos(lat) * Math.sin(lon);
            const z = r * Math.sin(lat);

            p.vertex(x, y, z);
          }
          p.endShape();
          
        } else {
          // SHAPE 2: Interval Motion + Organic Shape
          const realTime = p.millis();
          const interval = 2000; // 2 seconds
          
          if (realTime - lastInterval > interval) {
            lastInterval = realTime;
            intervalOffset = p.random(100);
          }

          p.push();
          // Rotate based on accumulated time
          p.rotateZ(accumulatedTime * 0.001);
          
          // Organic Torus-like structure
          for (let j = 0; j < 5; j++) {
            p.push();
            p.rotateX(j * (Math.PI / 2.5));
            
            p.beginShape();
            for (let k = 0; k < 100; k++) {
              const angle = p.map(k, 0, 100, 0, p.TWO_PI);
              // Radius fluctuates
              const r = 100 + 50 * Math.sin(angle * 3 + accumulatedTime * 0.002 + intervalOffset);
              const x = r * Math.cos(angle);
              const y = r * Math.sin(angle);
              
              // Add some noise
              // Use accumulatedTime so speed changes don't jump the noise phase
              const n = p.noise(x * 0.01, y * 0.01, accumulatedTime * 0.0005 * (wobble > 0 ? 1 : 0)); 
              // Scaled wobble effect
              const z = (n - 0.5) * wobble;
              
              p.vertex(x, y, z);
            }
            p.endShape(p.CLOSE);
            p.pop();
          }
          
          p.pop();
        }
      };
    };

    p5Instance.current = new p5(sketch, containerRef.current!);

    return () => {
      p5Instance.current?.remove();
      p5Instance.current = null;
    };
  }, []); // Init once

  return <div ref={containerRef} className="rounded-[28px] overflow-hidden w-[600px] h-[600px]" />;
}
