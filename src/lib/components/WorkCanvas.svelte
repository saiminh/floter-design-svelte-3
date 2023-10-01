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
export let bulgeFactor: number = 0.15; // comes from attribute   
let app: PIXI.Application;
let canvas: HTMLCanvasElement;

onMount( () => {
  
  let is_fine = window.matchMedia('(pointer:fine)').matches
  let is_landscape = window.matchMedia('(orientation:landscape)').matches

  gsap.registerPlugin(PixiPlugin, ScrollTrigger, SplitText);

  const root = document.querySelector(':root') as HTMLElement;
  const bgColorFromRoot = () => { return getComputedStyle(root).getPropertyValue('--color-bg') || 'rgb(255, 255, 255)'};
  function textColorFromRoot(){ return getComputedStyle(root).getPropertyValue('--color-text') || 'rgb(0, 0, 0)' };
  const highlightColorFromRoot = () => { return getComputedStyle(root).getPropertyValue('--color-highlight') || 'rgb(0, 0, 0)' };
  const thisElemBgColor  = (elem: HTMLElement) => { return getComputedStyle(elem).getPropertyValue('background-color') || 'rgb(255, 255, 255)' };
  
  app = new PIXI.Application({
    resizeTo: window,
    antialias: true,
    autoDensity: true, 
    resolution: 2,
    backgroundColor: bgColorFromRoot(),
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
  
  let group_background = new PIXI.Graphics();
  function draw_group_background(group_background: PIXI.Graphics) {
    group_background.clear();
    group_background.beginFill(bgColorFromRoot());
    group_background.drawRect(0, 0, xFrac(1), yFrac(1));
    group_background.endFill();
    group_background.alpha = 0;
    group_background.pivot.set(xFrac(.5), yFrac(.5));
    group_background.x = xFrac(0.5);
    group_background.y = yFrac(0.5);
  }
  draw_group_background(group_background);
  group.addChild(group_background);
  
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
      text.position.set(headlinePosition.x - ((tween.x - 0.5) * 50), headlinePosition.y - ((tween.y - 0.5) * 50));
      text.alpha = window.getComputedStyle(elems[index]).opacity as unknown as number;
      text.style.fill = window.getComputedStyle(elems[index]).color;
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
      let canvasImg = createCanvasImg(element as HTMLImageElement, group);    
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

  let workinfoBgs: Array<PIXI.Graphics> = [];
  let workinfos = document.querySelectorAll('.work-info');


  /*----------------------------------
  * Create background for workinfo
  ----------------------------------*/
  function createWorkInfoBgs() {
    workinfos.forEach( workinfo => {
      const workinfoRect = workinfo.getBoundingClientRect();
      let workinfoGraphic = new PIXI.Graphics();
      workinfoGraphic.beginFill(textColorFromRoot());
      workinfoGraphic.drawRect(workinfoRect.x, workinfoRect.y, workinfoRect.width, workinfoRect.height);
      workinfoGraphic.endFill();
      workinfoGraphic.pivot.set(workinfoRect.x, workinfoRect.y);
      workinfoBgs.push(workinfoGraphic);
      app.stage.addChild(workinfoGraphic);
    })
  }

  /*----------------------------------
  * Update background for workinfo
  ----------------------------------*/
  function updateWorkInfoBgs() {
    workinfos.forEach((workinfo, index) => {
      const workinfoRect = workinfo.getBoundingClientRect();
      workinfoBgs[index].clear();
      workinfoBgs[index].beginFill(thisElemBgColor(workinfo as HTMLElement));
      workinfoBgs[index].drawRect(workinfoRect.x, workinfoRect.y, workinfoRect.width, workinfoRect.height);
      workinfoBgs[index].endFill();
      workinfoBgs[index].pivot.set(workinfoRect.x, workinfoRect.y);
      workinfoBgs[index].position.set(workinfoRect.x - ((tween.x - 0.5) * 50), workinfoRect.y - ((tween.y - 0.5) * 50));
      workinfoBgs[index].alpha = window.getComputedStyle(workinfo).opacity as unknown as number;
    })
  }


  createWorkInfoBgs();
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
    updateWorkInfoBgs();
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