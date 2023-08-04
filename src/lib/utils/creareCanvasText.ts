import type * as PIXI from 'pixi.js';
import { Text } from 'pixi.js';

export default function createCanvasText( element: HTMLElement,  stage: PIXI.Container ){
    
  const elem = element;
  const elemStyles = window.getComputedStyle(elem);
  const elemFontSize = elemStyles.getPropertyValue('font-size');
  const elemFontFamily = elemStyles.getPropertyValue('font-family');
  const elemLetterSpacing = parseInt(elemStyles.getPropertyValue('letter-spacing'));
  const elemColor = elemStyles.getPropertyValue('color');
  const elemAlignment = elemStyles.getPropertyValue('text-align');

  const elemPosition = elem.getBoundingClientRect();
  const canvasText = new Text(elem?.textContent as string, {
    fontFamily: elemFontFamily,
    fontSize: elemFontSize,
    letterSpacing: elemLetterSpacing,
    fill: elemColor,
    align: elemAlignment as PIXI.TextStyleAlign,
  });
  canvasText.position.set(elemPosition.x, elemPosition.y);
  stage.addChild(canvasText);

  elem.style.opacity = '0';
  elem.style.visibility = 'hidden';
  return canvasText;
}