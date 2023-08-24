import type * as PIXI from 'pixi.js';
import { Text } from 'pixi.js';

export default function createCanvasText( element: HTMLElement,  stage: PIXI.Container ){
    
  const elem = element;
  const elemStyles = window.getComputedStyle(elem);
  const elemFontSize = elemStyles.getPropertyValue('font-size') || '16px';
  const elemFontWeight = elemStyles.getPropertyValue('font-weight') || 'normal';
  const elemFontFamily = elemStyles.getPropertyValue('font-family') || 'Arial';
  const elemFontStyle = elemStyles.getPropertyValue('font-style') || 'normal';
  const elemLetterSpacing = parseInt(elemStyles.getPropertyValue('letter-spacing')) || 0;
  const elemColor = elemStyles.getPropertyValue('color') || 'black';
  const elemAlignment = elemStyles.getPropertyValue('text-align') || 'left';

  const elemPosition = elem.getBoundingClientRect();
  const canvasText = new Text(elem?.textContent as string, {
    fontFamily: elemFontFamily,
    fontSize: elemFontSize,
    fontWeight: elemFontWeight as PIXI.TextStyleFontWeight,
    fontStyle: elemFontStyle as PIXI.TextStyleFontStyle,
    letterSpacing: elemLetterSpacing,
    fill: elemColor,
    align: elemAlignment as PIXI.TextStyleAlign,
  });
  canvasText.on('added', () => {
    console.log('canvas text added');
    elem.classList.add('canvas-text-added');
    elem.style.opacity = '0';
    elem.style.visibility = 'hidden';
  });
  canvasText.position.set(elemPosition.x, elemPosition.y);
  // canvasText.zIndex = 100;
  stage.addChild(canvasText);

  return canvasText;
}