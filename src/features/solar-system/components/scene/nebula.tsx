import { useEffect, useMemo } from "react";
import { AdditiveBlending } from "three";
import { createGlowTexture } from "../../utils/create-textures";

type NebulaCloudProps = {
  position: [number, number, number];
  rgb: string;
  size: number;
};

const NEBULA_CLOUDS: NebulaCloudProps[] = [
  { position: [-140, 40, -180], rgb: "110,70,255", size: 240 },
  { position: [170, -50, -150], rgb: "30,150,255", size: 260 },
  { position: [40, 90, -260], rgb: "255,80,150", size: 220 },
];

function NebulaCloud({ position, rgb, size }: NebulaCloudProps) {
  const texture = useMemo(() => createGlowTexture(rgb), [rgb]);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <sprite position={position} scale={size}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={0.22}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </sprite>
  );
}

export function Nebula() {
  return (
    <>
      {NEBULA_CLOUDS.map((cloud) => (
        <NebulaCloud key={cloud.rgb} {...cloud} />
      ))}
    </>
  );
}
