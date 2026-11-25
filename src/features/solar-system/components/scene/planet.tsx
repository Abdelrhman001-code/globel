import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { DoubleSide, type Group, type Mesh } from "three";
import { getPlanetObjectName, type SolarBody } from "../../data/solar-system-data";
import { useSolarSystemStore } from "../../store/solar-system-store";
import { createPlanetTexture } from "../../utils/create-textures";

const ORBIT_SEGMENTS = 160;
const REDUCED_MOTION_SPEED_SCALE = 0.3;

type PlanetProps = {
  planet: SolarBody;
  initialAngle: number;
};

function createOrbitPoints(radius: number): [number, number, number][] {
  return Array.from({ length: ORBIT_SEGMENTS + 1 }, (_, index) => {
    const angle = (index / ORBIT_SEGMENTS) * Math.PI * 2;
    return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
  });
}

export function Planet({ planet, initialAngle }: PlanetProps) {
  const orbitRef = useRef<Group>(null);
  const spinRef = useRef<Mesh>(null);
  const isSelected = useSolarSystemStore(
    (state) => state.selectedPlanetId === planet.id,
  );
  const selectPlanet = useSolarSystemStore((state) => state.selectPlanet);

  const texture = useMemo(
    () => createPlanetTexture(planet.palette, planet.pattern),
    [planet.palette, planet.pattern],
  );
  const orbitPoints = useMemo(
    () => createOrbitPoints(planet.sceneOrbitRadius),
    [planet.sceneOrbitRadius],
  );

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((_, delta) => {
    const { isPaused, speed, reducedMotion } = useSolarSystemStore.getState();
    const orbit = orbitRef.current;
    const spin = spinRef.current;
    if (isPaused || !orbit || !spin) return;

    const step = delta * speed * (reducedMotion ? REDUCED_MOTION_SPEED_SCALE : 1);
    orbit.rotation.y += planet.orbitSpeed * step;
    spin.rotation.y += planet.spinSpeed * step;
  });

  return (
    <>
      <Line
        points={orbitPoints}
        color="#94A3B8"
        lineWidth={1}
        transparent
        opacity={0.2}
      />
      <group ref={orbitRef} rotation={[0, initialAngle, 0]}>
        <group
          name={getPlanetObjectName(planet.id)}
          position={[planet.sceneOrbitRadius, 0, 0]}
        >
          <group rotation={[0, 0, planet.axialTilt]}>
            <mesh
              ref={spinRef}
              onClick={(event) => {
                event.stopPropagation();
                selectPlanet(planet.id);
              }}
              onPointerOver={() => {
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                document.body.style.cursor = "";
              }}
            >
              <sphereGeometry args={[planet.sceneRadius, 64, 64]} />
              <meshStandardMaterial
                map={texture}
                roughness={0.85}
                metalness={0}
                emissive={planet.palette[0]}
                emissiveIntensity={isSelected ? 0.3 : 0}
              />
              {planet.ring && (
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry
                    args={[planet.ring.innerRadius, planet.ring.outerRadius, 128]}
                  />
                  <meshBasicMaterial
                    color={planet.ring.color}
                    transparent
                    opacity={0.6}
                    side={DoubleSide}
                  />
                </mesh>
              )}
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}
