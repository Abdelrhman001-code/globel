import { create } from "zustand";
import type { PlanetId } from "../data/solar-system-data";

type SolarSystemState = {
  selectedPlanetId: PlanetId | null;
  isPaused: boolean;
  speed: number;
  resetNonce: number;
  isSceneReady: boolean;
  reducedMotion: boolean;
  selectPlanet: (id: PlanetId) => void;
  resetView: () => void;
  togglePaused: () => void;
  setSpeed: (speed: number) => void;
  markSceneReady: () => void;
  setReducedMotion: (reducedMotion: boolean) => void;
};

export const useSolarSystemStore = create<SolarSystemState>((set) => ({
  selectedPlanetId: null,
  isPaused: false,
  speed: 1,
  resetNonce: 0,
  isSceneReady: false,
  reducedMotion: false,
  selectPlanet: (id) => set({ selectedPlanetId: id }),
  resetView: () =>
    set((state) => ({
      selectedPlanetId: null,
      resetNonce: state.resetNonce + 1,
    })),
  togglePaused: () => set((state) => ({ isPaused: !state.isPaused })),
  setSpeed: (speed) => set({ speed }),
  markSceneReady: () => set({ isSceneReady: true }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
}));
