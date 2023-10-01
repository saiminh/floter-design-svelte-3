import type * as PIXI from 'pixi.js';
import { Text } from 'pixi.js';

export default function createCanvasText( element: HTMLElement,  stage: PIXI.Container ){
    
  const elem = element;
  const elemStyles = window.getComputedStyle(elem);
  const elemFontSize = elemStyles.getPropertyValue('font-size') || '16px';
  const elemFontWeight = elemStyles.getPropertyValue('font-weight') || 'normal';
  const elemFontFamily = elemStyles.getPropertyValue('font-family') || 'Arial';
  const elemFontStyle = elemStyles.getPropertyValue('font-style') || 'normal';
  const elemLetterSpacing = Number(elemStyles.getPropertyValue('letter-spacing').replace('px','')) || 0;
  const elemColor = elemStyles.getPropertyValue('color') || 'black';
  const elemAlignment = elemStyles.getPropertyValue('text-align') || 'left';
  const elemPosition = elem.getBoundingClientRect();
  const elemTextTransform = elemStyles.getPropertyValue('text-transform') || 'none';
  if (elemTextTransform === 'uppercase') {
    elem.textContent = elem.textContent?.toUpperCase() as string;
  }

  const canvasText = new Text(elem.textContent as string, {
    fontFamily: elemFontFamily,
    fontSize: elemFontSize,
    fontWeight: elemFontWeight as PIXI.TextStyleFontWeight,
    fontStyle: elemFontStyle as PIXI.TextStyleFontStyle,
    letterSpacing: elemLetterSpacing,
    fill: elemColor,
    align: elemAlignment as PIXI.TextStyleAlign,
    padding: 20,    
  });

  canvasText.on('added', () => {
    elem.classList.add('canvas-text-added');
    elem.style.visibility = 'hidden';
  });
  canvasText.position.set(elemPosition.x, elemPosition.y);
  stage.addChild(canvasText);

  return canvasText
}