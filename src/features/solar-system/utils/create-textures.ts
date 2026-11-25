import { CanvasTexture, SRGBColorSpace } from "three";
import type { PlanetPattern } from "../data/solar-system-data";

const PLANET_TEXTURE_WIDTH = 1024;
const PLANET_TEXTURE_HEIGHT = 512;
const GLOW_TEXTURE_SIZE = 256;
const BAND_COUNT = 48;
const SPECKLE_COUNT = 1600;

function createCanvasContext(width: number, height: number): CanvasRenderingContext2D {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("2D canvas context is unavailable");
  }
  return context;
}

function pickRandom(values: readonly string[]): string {
  return values[Math.floor(Math.random() * values.length)];
}

function drawBands(context: CanvasRenderingContext2D, palette: readonly string[]) {
  const bandHeight = PLANET_TEXTURE_HEIGHT / BAND_COUNT;
  for (let index = 0; index < BAND_COUNT; index++) {
    context.globalAlpha = 0.55 + Math.random() * 0.4;
    context.fillStyle = pickRandom(palette);
    context.fillRect(
      0,
      index * bandHeight,
      PLANET_TEXTURE_WIDTH,
      bandHeight * (1 + Math.random()),
    );
  }
  context.globalAlpha = 1;
}

function drawSpeckles(context: CanvasRenderingContext2D, palette: readonly string[]) {
  context.fillStyle = palette[0];
  context.fillRect(0, 0, PLANET_TEXTURE_WIDTH, PLANET_TEXTURE_HEIGHT);
  for (let index = 0; index < SPECKLE_COUNT; index++) {
    context.globalAlpha = 0.35 + Math.random() * 0.5;
    context.fillStyle = pickRandom(palette);
    context.beginPath();
    context.arc(
      Math.random() * PLANET_TEXTURE_WIDTH,
      Math.random() * PLANET_TEXTURE_HEIGHT,
      3 + Math.random() * Math.random() * 30,
      0,
      Math.PI * 2,
    );
    context.fill();
  }
  context.globalAlpha = 1;
}

export function createPlanetTexture(
  palette: readonly string[],
  pattern: PlanetPattern,
): CanvasTexture {
  const context = createCanvasContext(PLANET_TEXTURE_WIDTH, PLANET_TEXTURE_HEIGHT);
  if (pattern === "bands") {
    drawBands(context, palette);
  } else {
    drawSpeckles(context, palette);
  }
  const texture = new CanvasTexture(context.canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export function createGlowTexture(rgb: string): CanvasTexture {
  const context = createCanvasContext(GLOW_TEXTURE_SIZE, GLOW_TEXTURE_SIZE);
  const center = GLOW_TEXTURE_SIZE / 2;
  const gradient = context.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, `rgba(${rgb}, 1)`);
  gradient.addColorStop(0.2, `rgba(${rgb}, 0.6)`);
  gradient.addColorStop(0.5, `rgba(${rgb}, 0.2)`);
  gradient.addColorStop(1, `rgba(${rgb}, 0)`);
  context.fillStyle = gradient;
  context.fillRect(0, 0, GLOW_TEXTURE_SIZE, GLOW_TEXTURE_SIZE);
  const texture = new CanvasTexture(context.canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}
