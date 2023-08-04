import * as PIXI from 'pixi.js';

export default function createGradTexture(r:number, g:number, b:number) {
  const quality = 256;
  const canvas = document.createElement('canvas');
  canvas.width = quality;
  canvas.height = quality;

  const ctx = canvas.getContext('2d') || new CanvasRenderingContext2D();

  // use canvas2d API to create gradient
  const grd = ctx.createRadialGradient(quality/2, quality/2, 0, quality/2, quality/2, quality/2);
  grd.addColorStop(0, 'rgba('+r+', '+g+', '+b+', 0.9)');
  grd.addColorStop(1, 'rgba('+r+', '+g+', '+b+', 0.0)');

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, quality, quality);

  return PIXI.Texture.from(canvas);
}