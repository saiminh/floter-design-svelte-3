<script lang="ts">
import * as PIXI from 'pixi.js';
import { BulgePinchFilter } from 'pixi-filters';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import SplitText from 'gsap/dist/SplitText';
import { PixiPlugin } from "gsap/dist/PixiPlugin";
import { onMount, onDestroy } from 'svelte';
import { browser } from '$app/environment';
import createCanvasText from '$lib/utils/createCanvasText';
import createCanvasImg from '$lib/utils/createCanvasImg';
import { tick } from 'svelte';

export let textsToCanvas: Array<HTMLElement> = [];
export let imgsToCanvas: Array<HTMLElement> = [];
export let bulgeFactor: number = 0.15;  
let app: PIXI.Application;
let canvas: HTMLCanvasElement;

onMount(()=>{
  
  let is_fine = window.matchMedia('(pointer:fine)').matches
  let is_landscape = window.matchMedia('(orientation:landscape)').matches

  gsap.registerPlugin(PixiPlugin, ScrollTrigger, SplitText);
  
  app = new PIXI.Application({
    resizeTo: window,
    antialias: true,
    autoDensity: true, 
    resolution: 2,
    backgroundAlpha: 0,
    view: canvas,
  });
  
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
  bulgefilter.radius = is_landscape ? xFrac(0.5) : xFrac(0.6);
  bulgefilter.strength = is_landscape ? bulgeFactor : bulgeFactor * 1.25;
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
      elems.push(element);
      let canvasText = createCanvasText(element, app.stage);
      canvasTexts.push(canvasText);
    })
  }  


  /*----------------------------------
   * Function to update text on canvas
   * runs in the Ticker
   ----------------------------------*/
  function updateText(){
    canvasTexts.forEach((text, index) => {
      let headlinePosition = elems[index].getBoundingClientRect();
      text.position.set(headlinePosition.x, headlinePosition.y);
      // text.position.x = headlinePosition.x; 
      // ^ This bcs pos:fixed doesn't update fast enough when mobile browser chrome changes on scroll
      text.alpha = elems[index].style.opacity as unknown as number || 0.3;
    })
  }

  /*----------------------------------
   * Convert images to canvas
   * createCanvasImgs function
   ----------------------------------*/
  let canvasImgs: Array<PIXI.Sprite> = [];
  let imgElems: Array<HTMLElement> = [];
  
  function convertImgs(){
    imgsToCanvas.forEach((element) => {
      imgElems.push(element);
      let canvasImg = createCanvasImg(element as HTMLImageElement, app.stage);
      // canvasImg.tint = 0xff9494;
      canvasImgs.push(canvasImg);
    })
  }

  
  /*----------------------------------
  * Function to update text on canvas
  * runs in the Ticker
  ----------------------------------*/
  function updateImgs(){
    canvasImgs.forEach((image, index) => {
      let imagePosition = imgElems[index].getBoundingClientRect();
      image.position.set(imagePosition.x, imagePosition.y);
      image.width = imagePosition.width;
      image.height = imagePosition.height;
      image.zIndex = imgElems[index].style.zIndex as unknown as number;
      image.alpha = window.getComputedStyle(imgElems[index]).opacity as unknown as number;
    })
  }


  setTimeout(() => {
    convertImgs();
    convertText();
  }, 100);

  /*----------------------------------
  * Mousemove events
  *----------------------------------*/
  let tween = {
    x: 0.5,
    y: is_landscape ? 0.5 : 0.4,
  };
  if (is_fine){
    window.addEventListener('mousemove', (e) => {
      const pointerX = e.clientX / window.innerWidth;
      const pointerY = e.clientY / window.innerHeight;
      const pointerXfrac = pointerX - 0.5;
      const pointerYfrac = pointerY - 0.5;
      
      gsap.to(tween, {
        duration: .5,
        ease: 'power3.out',
        overwrite: true,
        x: pointerX,
        y: pointerY,
      })
    })
  }


  /*----------------------------------
  * The Ticker
  * ----------------------------------*/  
  let elapsed = 0.0;

  app.ticker.add((delta) => {
    elapsed += delta;
    // bulgefilter.center = center;
    // bulgefilter.center = [(center[0] + Math.sin(elapsed/200)/20 ),(center[1] + Math.cos(elapsed/200)/20 )];
    bulgefilter.center = [tween.x, tween.y];
    bulgefilter.strength = is_landscape ? bulgeFactor : bulgeFactor * 1.25;
    updateImgs();
    updateText();
  })
}) // <- end onMount

onDestroy(() => {
    if (browser){
      app.destroy(true, true);
    }
  }) // <- end onDestroy

</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
</style>