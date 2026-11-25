import { useSolarSystemStore } from "../../store/solar-system-store";
import { CONTROL_BUTTON_CLASS, GLASS_PANEL_CLASS } from "./overlay-styles";

const MIN_SPEED = 0.25;
const MAX_SPEED = 3;
const SPEED_STEP = 0.25;

export function PlaybackControls() {
  const isPaused = useSolarSystemStore((state) => state.isPaused);
  const speed = useSolarSystemStore((state) => state.speed);
  const togglePaused = useSolarSystemStore((state) => state.togglePaused);
  const setSpeed = useSolarSystemStore((state) => state.setSpeed);
  const resetView = useSolarSystemStore((state) => state.resetView);

  return (
    <div
      className={`${GLASS_PANEL_CLASS} flex flex-wrap items-center gap-3 p-2 text-xs text-white/80`}
    >
      <button type="button" onClick={togglePaused} className={CONTROL_BUTTON_CLASS}>
        {isPaused ? "Resume" : "Pause"}
      </button>
      <label className="flex items-center gap-2">
        <span>Speed</span>
        <input
          type="range"
          min={MIN_SPEED}
          max={MAX_SPEED}
          step={SPEED_STEP}
          value={speed}
          onChange={(event) => setSpeed(Number(event.target.value))}
          className="w-24 accent-sky-400"
        />
        <span className="w-10 tabular-nums">{speed.toFixed(2)}x</span>
      </label>
      <button type="button" onClick={resetView} className={CONTROL_BUTTON_CLASS}>
        Reset view
      </button>
    </div>
  );
}
