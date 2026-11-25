import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, type Sprite } from "three";
import { SUN } from "../../data/solar-system-data";
import { useSolarSystemStore } from "../../store/solar-system-store";
import { createGlowTexture } from "../../utils/create-textures";

const GLOW_SIZE = 26;
const PULSE_AMPLITUDE = 0.04;
const PULSE_SPEED = 1.4;

export function Sun() {
  const glowRef = useRef<Sprite>(null);
  const glowTexture = useMemo(() => createGlowTexture(SUN.glowRgb), []);

  useEffect(() => () => glowTexture.dispose(), [glowTexture]);

  useFrame((state) => {
    const glow = glowRef.current;
    if (!glow) return;
    const pulse = useSolarSystemStore.getState().reducedMotion
      ? 1
      : 1 + PULSE_AMPLITUDE * Math.sin(state.clock.elapsedTime * PULSE_SPEED);
    glow.scale.setScalar(GLOW_SIZE * pulse);
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[SUN.radius, 64, 64]} />
        <meshBasicMaterial color={SUN.color} />
      </mesh>
      <sprite ref={glowRef} scale={GLOW_SIZE}>
        <spriteMaterial
          map={glowTexture}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </sprite>
      <pointLight position={[0, 0, 0]} intensity={3} decay={0} />
    </group>
  );
}
