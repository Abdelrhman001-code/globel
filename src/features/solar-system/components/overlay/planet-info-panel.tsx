import { getSolarBody } from "../../data/solar-system-data";
import { useSolarSystemStore } from "../../store/solar-system-store";
import { GLASS_PANEL_CLASS } from "./overlay-styles";

type InfoStatProps = {
  label: string;
  value: string;
};

function InfoStat({ label, value }: InfoStatProps) {
  return (
    <div className="rounded-lg bg-white/5 p-2">
      <dt className="text-[10px] uppercase tracking-wider text-white/50">{label}</dt>
      <dd className="mt-0.5 text-xs font-medium tabular-nums text-white">{value}</dd>
    </div>
  );
}

export function PlanetInfoPanel() {
  const selectedPlanetId = useSolarSystemStore((state) => state.selectedPlanetId);
  const body = selectedPlanetId ? getSolarBody(selectedPlanetId) : undefined;

  return (
    <section aria-live="polite" className={`${GLASS_PANEL_CLASS} p-4`}>
      {body ? (
        <>
          <h2 className="text-lg font-semibold text-white">{body.name}</h2>
          <p className="mt-1 text-sm leading-relaxed text-white/70">{body.description}</p>
          <dl className="mt-3 grid grid-cols-3 gap-2">
            <InfoStat
              label="From Sun"
              value={`${body.distanceFromSunMillionKm.toLocaleString("en-US")} M km`}
            />
            <InfoStat
              label="Diameter"
              value={`${body.diameterKm.toLocaleString("en-US")} km`}
            />
            <InfoStat
              label="Orbit"
              value={`${body.orbitalPeriodDays.toLocaleString("en-US")} days`}
            />
          </dl>
        </>
      ) : (
        <p className="text-sm text-white/60">Select a planet to see its details.</p>
      )}
    </section>
  );
}
