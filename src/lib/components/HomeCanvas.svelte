<script lang="ts">
import * as PIXI from 'pixi.js';
import { BulgePinchFilter } from 'pixi-filters';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import SplitText from 'gsap/dist/SplitText';
import { PixiPlugin } from "gsap/dist/PixiPlugin";
import { onMount, onDestroy } from 'svelte';
import { browser } from '$app/environment';
import createCanvasText from '$lib/utils/creareCanvasText';
import { tick } from 'svelte';

export let textsToCanvas: NodeListOf<Element>;
let app: PIXI.Application;

onMount(()=>{
  
  gsap.registerPlugin(PixiPlugin, ScrollTrigger, SplitText);
  
  if (document.querySelector('.homeCanvas')) {
    app = new PIXI.Application({
      resizeTo: window,
      antialias: true,
      autoDensity: true, 
      resolution: 2,
      backgroundAlpha: 0,
      view: document.querySelector('.homeCanvas') as HTMLCanvasElement,
    });
  } 
  else {
    app = new PIXI.Application({
      resizeTo: window,
      antialias: true,
      autoDensity: true, 
      resolution: 2,
      backgroundAlpha: 0,
    });
    let canvaselem = document.body.appendChild(app.view as HTMLCanvasElement);
    canvaselem.classList.add('homeCanvas');
  }
  //for debugging but Typescript has an issue with this:
  // globalThis.__PIXI_APP__ = app as any;
  
  PixiPlugin.registerPIXI(PIXI);
  
  function xFrac(x: number){
    return window.innerWidth * x;
  }
  function yFrac(y: number){
    return window.innerHeight * y;
  }

  let group = new PIXI.Container();
  group.pivot.set(window.innerWidth / 2, window.innerHeight / 2);
  group.x = window.innerWidth / 2;
  group.y = window.innerHeight / 2;
  app.stage.addChild(group);
  
  let recty = new PIXI.Graphics();
  recty.beginFill('rgb(0, 0, 0)');
  recty.drawRect(0, 0, xFrac(1), yFrac(1));
  recty.endFill();
  recty.alpha = 0;
  recty.pivot.set(xFrac(.5), yFrac(.5));
  recty.x = xFrac(0.5);
  recty.y = yFrac(0.5);
  group.addChild(recty);
  
  let center = [0.5, 0.5];
  let bulgefilter = new BulgePinchFilter();
  bulgefilter.radius = xFrac(0.45);
  bulgefilter.strength = 0.5;
  bulgefilter.center = center;
  bulgefilter.resolution = 2;
  app.stage.filters = [bulgefilter];

  
  
  /*----------------------------------
  * Convert text to canvas using 
  * createCanvasText function
  ----------------------------------*/    
  let canvasTexts: Array<PIXI.Text> = [];
  let elems: Array<HTMLElement> = [];
  
  async function convertText(){
    await tick();
    textsToCanvas.forEach((element) => {
      elems.push(element as HTMLElement);
      let canvasText = createCanvasText(element as HTMLElement, app.stage);
      canvasTexts.push(canvasText as PIXI.Text);
    })
  }  
  convertText();


  /*----------------------------------
   * Function to update text on canvas
   * runs in the Ticker
   ----------------------------------*/
  function updateText(){
    canvasTexts.forEach((text, index) => {
      let headlinePosition = elems[index].getBoundingClientRect();
      text.position.set(headlinePosition.x, headlinePosition.y);
      text.alpha = elems[index].style.opacity as unknown as number;
    })
  }


  /*----------------------------------
  * Mousemove events
  *----------------------------------*/
  window.addEventListener('pointermove', (e) => {
    const pointerX = e.clientX / window.innerWidth;
    const pointerY = e.clientY / window.innerHeight;
    const pointerXfrac = pointerX - 0.5;
    const pointerYfrac = pointerY - 0.5;
    
    center = [(0.5 + pointerXfrac/10),(0.5 + pointerYfrac/10)];   
  })


  /*----------------------------------
  * The Ticker
  * ----------------------------------*/  
  let elapsed = 0.0;

  app.ticker.add((delta) => {
    elapsed += delta;
    bulgefilter.center = [(center[0] + Math.sin(elapsed/200)/20 ),(center[1] + Math.cos(elapsed/200)/20 )];
    updateText();
  })
  console.log('HomeCanvas mounted', textsToCanvas);
}) // <- end onMount

onDestroy(() => {
  if (browser){
    app.destroy(true, true);
  }
}) // <- end onDestroy

</script>
