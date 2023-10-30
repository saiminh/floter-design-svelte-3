<script lang="ts">
import * as PIXI from 'pixi.js';
import { BulgePinchFilter } from 'pixi-filters';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import SplitText from 'gsap/dist/SplitText';
import { PixiPlugin } from "gsap/dist/PixiPlugin";
import { browser } from '$app/environment';
import createCanvasText from '$lib/utils/createCanvasText';
import createCanvasImg from '$lib/utils/createCanvasImg';
import { onMount, onDestroy } from 'svelte';
import { tick } from 'svelte';

export let textsToCanvas: Array<HTMLElement> = [];
export let imgsToCanvas: Array<HTMLElement> = [];
let app: PIXI.Application;
let canvas: HTMLCanvasElement;

onMount(()=>{

  function xFrac(x: number){
    return window.innerWidth * x;
  }
  function yFrac(y: number){
    return window.innerHeight * y;
  }

    let is_fine = window.matchMedia('(pointer:fine)').matches
    let is_coarse = window.matchMedia('(pointer:coarse)').matches
    let is_landscape = window.matchMedia('(orientation:landscape)').matches
    let is_portrait = window.matchMedia('(orientation:portrait)').matches

    gsap.registerPlugin(PixiPlugin, ScrollTrigger, SplitText);
    
    app = new PIXI.Application({
      resizeTo: document.querySelector('.canvasResizeToThis') as HTMLElement,
      antialias: true,
      autoDensity: true, 
      resolution: 2,
      backgroundAlpha: 0,
      view: canvas
    });
    
    PIXI.Filter.defaultResolution = 2;
    
      //for debugging but Typescript has an issue with this:
    (globalThis as any).__PIXI_APP__ = app;
    
    PixiPlugin.registerPIXI(PIXI);
  
    let bulgegroup = new PIXI.Container();
    bulgegroup.pivot.set(xFrac(0.5), yFrac(0.5));
    bulgegroup.x = xFrac(0.5);
    bulgegroup.y = yFrac(0.5);
    app.stage.addChild(bulgegroup);
    
    let bulgebg = new PIXI.Graphics();
    bulgebg.beginFill('rgb(0, 0, 0)');
    bulgebg.drawRect(0, 0, xFrac(1.2), yFrac(1.2));
    bulgebg.endFill();
    bulgebg.alpha = 0;
    bulgebg.pivot.set(xFrac(.5), yFrac(.5));
    bulgebg.x = xFrac(0.5);
    bulgebg.y = yFrac(0.5);
    bulgegroup.addChild(bulgebg);
    
    let center = [0.5, 0.5];
    let bulgefilter = new BulgePinchFilter();
    bulgefilter.radius = is_landscape ? xFrac(0.5) : xFrac(0.5);
    bulgefilter.strength = 0;
    bulgefilter.center = center;
    bulgefilter.resolution = 2;

    bulgegroup.filters = [(bulgefilter as unknown as PIXI.Filter)];

    let opening_animation_running = false;
  
    let introTl = gsap.timeline();
    introTl.to(bulgefilter, {
      strength: -0.25,
      duration: .5,
      ease: 'power4.inOut',
    }, 1.5)
    introTl.to(bulgefilter, {
      strength: 0.5,
      duration: 1.25,
      ease: 'elastic.out(1.25, .2)',
    })

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
        let canvasText = createCanvasText(element, bulgegroup);
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
        headlinePosition.x = headlinePosition.x + xFrac(0.1);
        headlinePosition.y = headlinePosition.y + yFrac(0.1); 
        text.position.set(headlinePosition.x, headlinePosition.y);
        text.alpha = elems[index].style.opacity as unknown as number;
        text.style.fill = window.getComputedStyle(elems[index]).color;
      })
    }
  
    /*----------------------------------
     * Convert images to canvas
     * createCanvacImgs function
     ----------------------------------*/
    let canvasImgs: Array<PIXI.Sprite> = [];
    let imgElems: Array<HTMLElement> = [];
    
    function convertImgs(){
      imgsToCanvas.forEach((element) => {
        imgElems.push(element);
        let canvasImg = createCanvasImg(element as HTMLImageElement, app.stage);
        canvasImgs.push(canvasImg);
      })
    }
  
    setTimeout(() => {
      convertImgs();
      convertText();
    }, 100);
  
    /*----------------------------------
     * Function to update text on canvas
     * runs in the Ticker
     ----------------------------------*/
     function updateImgs(){
      canvasImgs.forEach((image, index) => {
        let imagePosition = imgElems[index].getBoundingClientRect();
        imagePosition.x = imagePosition.x + xFrac(0.1);
        imagePosition.y = imagePosition.y + yFrac(0.1);
        image.position.set(imagePosition.x, imagePosition.y);
        image.width = imagePosition.width;
        image.height = imagePosition.height;
      })
    }
  
    /*----------------------------------
    * Mousemove events
    *----------------------------------*/
    let tween = {
      x: 0.5,
      y: is_fine ? 0.5 : 250/window.innerHeight,
    };
    const mouse = {
      x: xFrac(0.5),
      y: yFrac(0.5),
    }
    
    if (is_fine) {
      window.addEventListener('mousemove', (e) => {
        if (opening_animation_running) return;
        const pointerX = e.clientX / window.innerWidth;
        const pointerY = e.clientY / window.innerHeight;
        const pointerXfrac = pointerX - 0.5;
        const pointerYfrac = pointerY - 0.5;
        
        gsap.to(mouse, {
          duration: 0.5,
          ease: 'power3.out',
          overwrite: true,
          x: e.clientX,
          y: e.clientY,
        })

        gsap.to(tween, {
          duration: .5,
          ease: 'power3.out',
          overwrite: true,
          x: 0.5 + pointerXfrac/2,
          y: 0.5 + pointerYfrac/2,
        })
    
      }, { passive: true })
    }
  
  
    /*----------------------------------
    * The Ticker
    * ----------------------------------*/  
    let elapsed = 0.0;
  
    app.ticker.add((delta) => {
      elapsed += delta;
      if (is_portrait) {
        bulgefilter.center = [(0.5 + Math.sin(elapsed/200)/40 ),(0.45 + Math.cos(elapsed/200)/20 )];
        // bulgefilter.center = [0.5, 0.5];
      } else {
        bulgefilter.center = [(tween.x + Math.sin(elapsed/200)/40 ),(tween.y + Math.cos(elapsed/200)/20 )];
        // bulgefilter.center = [tween.x, tween.y];
      }
      updateImgs();
      updateText();
    })

    window.addEventListener('resize', (e) => {
      tween.y = is_fine ? 0.5 : 250/window.innerHeight;
    })
    return () => {
      gsap.killTweensOf(imgElems);
      gsap.killTweensOf(elems);
      ScrollTrigger.getAll().forEach( instance => instance.kill() );
    }
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
    top: -10vh;
    left: -10vw;
    width: 120vw;
    height: 120vh;
    z-index: -1;
  }
</style>