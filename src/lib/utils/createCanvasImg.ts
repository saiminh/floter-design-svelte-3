import * as PIXI from 'pixi.js';

export default function createCanvasText( element: HTMLElement,  stage: PIXI.Container ){
    
  const elem = element;
  // console.log(elem);
  const elemSrc = elem.getAttribute('src') || '';
  const elemPosition = elem.getBoundingClientRect();

  const canvasImg = PIXI.Sprite.from(elemSrc);
  canvasImg.position.set(elemPosition.x, elemPosition.y);
  canvasImg.width = elemPosition.width;
  canvasImg.height = elemPosition.height;
  stage.addChild(canvasImg);

  // elem.style.opacity = '0';
  elem.style.visibility = 'hidden';
  return canvasImg;
}