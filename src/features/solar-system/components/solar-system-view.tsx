"use client";

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ErrorBoundary } from "react-error-boundary";
import { usePageVisible } from "../hooks/use-page-visible";
import { useSolarSystemStore } from "../store/solar-system-store";
import { SolarSystemOverlay } from "./overlay/solar-system-overlay";
import { CAMERA_FOV, CAMERA_START_POSITION } from "./scene/camera-rig";
import { SolarScene } from "./scene/solar-scene";

function LoadingIndicator() {
  return (
    <div
      role="status"
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black text-white/70"
    >
      <span className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-sky-400" />
      <p className="text-xs tracking-widest">LOADING SOLAR SYSTEM</p>
    </div>
  );
}

function WebGlFallback() {
  return (
    <div
      role="alert"
      className="flex h-dvh w-screen items-center justify-center bg-black p-6 text-center text-sm text-white/70"
    >
      The 3D solar system could not start. Make sure WebGL is enabled in your browser.
    </div>
  );
}

export function SolarSystemView() {
  const isPageVisible = usePageVisible();
  const isSceneReady = useSolarSystemStore((state) => state.isSceneReady);
  const markSceneReady = useSolarSystemStore((state) => state.markSceneReady);
  const setReducedMotion = useSolarSystemStore((state) => state.setReducedMotion);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, [setReducedMotion]);

  return (
    <ErrorBoundary fallback={<WebGlFallback />}>
      <div className="relative h-dvh w-screen overflow-hidden bg-black">
        <Canvas
          camera={{ position: CAMERA_START_POSITION, fov: CAMERA_FOV, near: 0.1, far: 1000 }}
          dpr={[1, 2]}
          frameloop={isPageVisible ? "always" : "never"}
          onCreated={markSceneReady}
        >
          <SolarScene />
        </Canvas>
        {!isSceneReady && <LoadingIndicator />}
        <SolarSystemOverlay />
      </div>
    </ErrorBoundary>
  );
}
