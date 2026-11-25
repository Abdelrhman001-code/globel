import { Stars } from "@react-three/drei";
import { SOLAR_BODIES } from "../../data/solar-system-data";
import { CameraRig } from "./camera-rig";
import { Nebula } from "./nebula";
import { Planet } from "./planet";
import { Sun } from "./sun";

const PLANET_ANGLE_STEP = 1.1;

export function SolarScene() {
  return (
    <>
      <color attach="background" args={["#02030a"]} />
      <ambientLight intensity={0.12} />
      <Stars
        radius={300}
        depth={80}
        count={4000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />
      <Nebula />
      <Sun />
      {SOLAR_BODIES.map((body, index) => (
        <Planet
          key={body.id}
          planet={body}
          initialAngle={index * PLANET_ANGLE_STEP}
        />
      ))}
      <CameraRig />
    </>
  );
}
