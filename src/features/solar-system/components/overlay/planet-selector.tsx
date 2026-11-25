import { SOLAR_BODIES } from "../../data/solar-system-data";
import { useSolarSystemStore } from "../../store/solar-system-store";
import { GLASS_PANEL_CLASS } from "./overlay-styles";

export function PlanetSelector() {
  const selectedPlanetId = useSolarSystemStore((state) => state.selectedPlanetId);
  const selectPlanet = useSolarSystemStore((state) => state.selectPlanet);

  return (
    <nav
      aria-label="Planets"
      className={`${GLASS_PANEL_CLASS} flex gap-1 overflow-x-auto p-1.5`}
    >
      {SOLAR_BODIES.map((body) => {
        const isActive = body.id === selectedPlanetId;
        return (
          <button
            key={body.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => selectPlanet(body.id)}
            className={`shrink-0 rounded-md px-3 py-1.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
              isActive
                ? "bg-sky-500/30 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {body.name}
          </button>
        );
      })}
    </nav>
  );
}
