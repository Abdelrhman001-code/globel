import { PlanetInfoPanel } from "./planet-info-panel";
import { PlanetSelector } from "./planet-selector";
import { PlaybackControls } from "./playback-controls";

export function SolarSystemOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between gap-3 p-4 sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-sm font-semibold tracking-[0.3em] text-white sm:text-base">
          SOLAR SYSTEM
        </h1>
        <PlaybackControls />
      </header>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <PlanetInfoPanel />
        </div>
        <div className="min-w-0 sm:max-w-xl">
          <PlanetSelector />
        </div>
      </div>
    </div>
  );
}
