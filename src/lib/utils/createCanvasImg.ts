import * as PIXI from 'pixi.js';

export default function createCanvasText( element: HTMLImageElement,  stage: PIXI.Container ){
    
  const elem = element;
  const elemSrc = elem.currentSrc || elem.src;
  const elemPosition = elem.getBoundingClientRect();
  let canvasImg: PIXI.Sprite;
  let scalefactor = 1;

  if (elemSrc.includes('.svg')) {
    scalefactor = Number(elem.attributes.getNamedItem('data-svgscale')?.value);
    const canvasImgTexture = PIXI.Texture.from(elemSrc, { resourceOptions: { scale: scalefactor } });
    canvasImg = new PIXI.Sprite(canvasImgTexture);
  } else {
    canvasImg = PIXI.Sprite.from(elemSrc);
  }

  canvasImg.position.set(elemPosition.x, elemPosition.y);
  canvasImg.width = elemPosition.width/scalefactor;
  canvasImg.height = elemPosition.height;
  canvasImg.on('added', () => {
    elem.classList.add('canvas-img-added');
    elem.style.visibility = 'hidden';
  });
  stage.addChild(canvasImg);

  return canvasImg;
}