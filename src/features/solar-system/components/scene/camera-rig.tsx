import { useRef, type ComponentRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";
import {
  getPlanetObjectName,
  getSolarBody,
  type PlanetId,
  type SolarBody,
} from "../../data/solar-system-data";
import { useSolarSystemStore } from "../../store/solar-system-store";

export const CAMERA_FOV = 45;
export const CAMERA_START_POSITION: [number, number, number] = [0, 55, 105];

const OVERVIEW_FIT_RADIUS = 72;
const OVERVIEW_MIN_DISTANCE = 120;
const OVERVIEW_DIRECTION = new Vector3(0, 0.5, 1).normalize();
const PLANET_VIEW_DIRECTION = new Vector3(0.35, 0.45, 1).normalize();
const PLANET_VIEW_RADIUS_SCALE = 5;
const PLANET_VIEW_MIN_DISTANCE = 4;
const TRANSITION_DURATION_SECONDS = 1.6;
const AUTO_FIT_RESPONSE = 6;

type MotionState = {
  seenPlanetId: PlanetId | null;
  seenResetNonce: number;
  transitionElapsed: number | null;
  userControlled: boolean;
  startTarget: Vector3;
  startOffset: Vector3;
  planetPosition: Vector3;
  previousPlanetPosition: Vector3;
  goalOffset: Vector3;
  offset: Vector3;
  shift: Vector3;
};

function createMotionState(): MotionState {
  return {
    seenPlanetId: null,
    seenResetNonce: -1,
    transitionElapsed: null,
    userControlled: false,
    startTarget: new Vector3(),
    startOffset: new Vector3(),
    planetPosition: new Vector3(),
    previousPlanetPosition: new Vector3(),
    goalOffset: new Vector3(),
    offset: new Vector3(),
    shift: new Vector3(),
  };
}

function getOverviewOffset(aspect: number, out: Vector3): Vector3 {
  const halfVerticalFov = MathUtils.degToRad(CAMERA_FOV / 2);
  const halfHorizontalFov = Math.atan(Math.tan(halfVerticalFov) * aspect);
  const distance = Math.max(
    OVERVIEW_MIN_DISTANCE,
    OVERVIEW_FIT_RADIUS / Math.tan(halfHorizontalFov),
  );
  return out.copy(OVERVIEW_DIRECTION).multiplyScalar(distance);
}

function getPlanetOffset(body: SolarBody, out: Vector3): Vector3 {
  const distance =
    body.sceneRadius * PLANET_VIEW_RADIUS_SCALE + PLANET_VIEW_MIN_DISTANCE;
  return out.copy(PLANET_VIEW_DIRECTION).multiplyScalar(distance);
}

function easeInOutCubic(progress: number): number {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

export function CameraRig() {
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
  const motionRef = useRef(createMotionState());

  const handleUserStart = () => {
    motionRef.current.userControlled = true;
    motionRef.current.transitionElapsed = null;
  };

  useFrame((state, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;
    const motion = motionRef.current;

    const { selectedPlanetId, resetNonce } = useSolarSystemStore.getState();
    if (
      selectedPlanetId !== motion.seenPlanetId ||
      resetNonce !== motion.seenResetNonce
    ) {
      motion.seenPlanetId = selectedPlanetId;
      motion.seenResetNonce = resetNonce;
      motion.userControlled = false;
      motion.transitionElapsed = 0;
      motion.startTarget.copy(controls.target);
      motion.startOffset.copy(state.camera.position).sub(controls.target);
    }

    const body = selectedPlanetId ? getSolarBody(selectedPlanetId) : undefined;
    const planet = selectedPlanetId
      ? state.scene.getObjectByName(getPlanetObjectName(selectedPlanetId))
      : undefined;

    if (planet) {
      planet.getWorldPosition(motion.planetPosition);
    } else {
      motion.planetPosition.set(0, 0, 0);
    }

    const aspect = state.size.width / state.size.height;
    const goalOffset = body
      ? getPlanetOffset(body, motion.goalOffset)
      : getOverviewOffset(aspect, motion.goalOffset);

    if (motion.transitionElapsed !== null) {
      motion.transitionElapsed = Math.min(
        TRANSITION_DURATION_SECONDS,
        motion.transitionElapsed + delta,
      );
      const progress = easeInOutCubic(
        motion.transitionElapsed / TRANSITION_DURATION_SECONDS,
      );
      controls.target.lerpVectors(
        motion.startTarget,
        motion.planetPosition,
        progress,
      );
      motion.offset.lerpVectors(motion.startOffset, goalOffset, progress);
      state.camera.position.copy(controls.target).add(motion.offset);
      if (motion.transitionElapsed >= TRANSITION_DURATION_SECONDS) {
        motion.transitionElapsed = null;
      }
    } else if (planet) {
      motion.shift.subVectors(
        motion.planetPosition,
        motion.previousPlanetPosition,
      );
      controls.target.add(motion.shift);
      state.camera.position.add(motion.shift);
    } else if (!motion.userControlled) {
      motion.offset
        .subVectors(state.camera.position, controls.target)
        .lerp(goalOffset, 1 - Math.exp(-delta * AUTO_FIT_RESPONSE));
      state.camera.position.copy(controls.target).add(motion.offset);
    }

    motion.previousPlanetPosition.copy(motion.planetPosition);
    controls.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
      panSpeed={0.6}
      minDistance={4}
      maxDistance={260}
      onStart={handleUserStart}
    />
  );
}
