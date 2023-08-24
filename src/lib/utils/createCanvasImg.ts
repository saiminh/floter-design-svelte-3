import * as PIXI from 'pixi.js';

export default function createCanvasText( element: HTMLImageElement,  stage: PIXI.Container ){
    
  const elem = element;
  const elemSrc = elem.currentSrc || elem.src;
  const elemPosition = elem.getBoundingClientRect();

  const canvasImg = PIXI.Sprite.from(elemSrc);
  canvasImg.position.set(elemPosition.x, elemPosition.y);
  canvasImg.width = elemPosition.width;
  canvasImg.height = elemPosition.height;
  canvasImg.on('added', () => {
    console.log('canvas imgs added');
    elem.classList.add('canvas-img-added');
    elem.style.visibility = 'hidden';
  });
  stage.addChild(canvasImg);

  // elem.style.opacity = '0';
  return canvasImg;
}