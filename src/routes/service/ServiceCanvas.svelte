<script lang="ts">
  import * as PIXI from 'pixi.js';
  import { BulgePinchFilter } from 'pixi-filters';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/dist/ScrollTrigger';
  import { onMount } from 'svelte';
  
  let canvas: HTMLCanvasElement;
  let introDone = false;

  onMount( () => {

    let highLightColor = window.getComputedStyle(document.body).getPropertyValue('--color-highlight');

    let is_fine = window.matchMedia('(pointer:fine)').matches
    let is_landscape = window.matchMedia('(orientation:landscape)').matches
  
    gsap.registerPlugin(ScrollTrigger);

    let app = new PIXI.Application({
      resizeTo: window,
      antialias: true,
      autoDensity: true, 
      resolution: 2,
      backgroundColor: 'rgb(255, 255, 255)',
      backgroundAlpha: 0,
      view: canvas,
    });

    let textgroup = new PIXI.Container();
    textgroup.pivot.set(0, 0);
    textgroup.x = 0;
    textgroup.y = - window.innerHeight;
    textgroup.height = window.innerHeight;
    textgroup.width = window.innerWidth;
    app.stage.addChild(textgroup);

    let tweens: Array<GSAPTween> = [];

    let fontSize = window.innerHeight / 3;

    function createText(string: string){
      let text = new PIXI.Text(string, 
        { fontFamily: 'Stratos', 
          fontSize: fontSize, 
          fontWeight: '800',
          fontStyle: 'italic',
          lineHeight: 0,
          letterSpacing: -10,
          fill: highLightColor, 
          padding: 0          
        }
      );
      text.anchor.set(0);
      textgroup.addChild(text);
      return text
    }

    let allTexts = [
      createText('SERVICES SERVICES '), createText('SERVICES SERVICES '), 
      createText('CONSULTATION DESIGN WEB DEVELOPMENT '), createText('CONSULTATION DESIGN WEB DEVELOPMENT '), 
      createText('SERVICES SERVICES '), createText('SERVICES SERVICES '),
      createText('CONSULTATION DESIGN WEB DEVELOPMENT '), createText('CONSULTATION DESIGN WEB DEVELOPMENT ')
    ]
    
    let textRows = [
      [allTexts[0], allTexts[1]],
      [allTexts[2], allTexts[3]],
      [allTexts[4], allTexts[5]],
      [allTexts[6], allTexts[7]]
    ]
    textRows.forEach( (row, index) => {
      if (index % 2 === 0) {
        row[0].x = 0;
        row[1].x = row[0].width;
      } else {
        row[0].x = -row[0].width;
        row[1].x = 0;
      }
      row[0].y = (fontSize * 0.8 * index);
      row[1].y = (fontSize * 0.8 * index);
    })

    let textRowsright =  gsap.to([textRows[0], textRows[2]], {
      x: '+=' + -textRows[0][0].width,
      duration: 10,
      ease: 'none',
      repeat: -1,
      overwrite: true
    })
    tweens.push(textRowsright);
    
    let textRowsLeft = gsap.to([textRows[1], textRows[3]], {
      x: '+=' + textRows[1][0].width,
      duration: 10,
      ease: 'none',
      repeat: -1,
      overwrite: true
    })
    tweens.push(textRowsLeft);

    //move textgroup so left side is offscreen
    textgroup.x = -textRows[0][0].width/4;
    textgroup.rotation = -0.2;
    textgroup.alpha = 0;

    let bulgefilter = new BulgePinchFilter();
    bulgefilter.radius = is_landscape ? window.innerWidth / 2 : window.innerWidth;
    bulgefilter.strength = .66;
    bulgefilter.center = new PIXI.Point(0.5, 0.5);
    bulgefilter.resolution = 2;
    app.stage.filters = [bulgefilter];

    let textgroupIn = gsap.to(textgroup, {
      y: is_landscape ? textRows[0][0].height * 0.4 : textRows[0][0].height * 0.15,
      alpha: 1,
      duration: 1,
      ease: 'power2.inOut',
      overwrite: true,
      onComplete: () => {
        introDone = true;
        createScrollTrigger();
      }
    })
    tweens.push(textgroupIn);

    let mouse = { x: 0.5, y: 0.5 };
    window.addEventListener('mousemove', (e) => {
      gsap.to(mouse, {
        x: e.clientX / window.innerWidth,
        duration: 1,
        ease: 'power3.out',
        overwrite: true
      })
      mouse.y = e.clientY / window.innerHeight;
    }, { passive: true })

    let elapsed = 0;
    app.ticker.add((delta) => {
      elapsed += delta;
      bulgefilter.center = new PIXI.Point(mouse.x, 0.5);
    })

    function createScrollTrigger() {
      gsap.to([textRows[0], textRows[1]], {
        y: '+=' + -textRows[0][0].height * 0.9,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'article',
          start: 'top top',
          end: is_landscape ? 'top -40%' : 'top -50%',
          scrub: true,
          // markers: true,
        }
      })
      gsap.to([textRows[2], textRows[3]], {
        y: '+=' + textRows[0][0].height * 0.9,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'article',
          start: 'top top',
          end: 'top -50%',
          scrub: true,
          // markers: true,
        }
      })
    }

    return () => {
      app.destroy(true, { children: true, texture: true, baseTexture: true });
      tweens.forEach( tween => tween.kill() );
    }
  })



</script>

<canvas bind:this={canvas} id="service-canvas"></canvas>

<style>
  #service-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    pointer-events: none;
  }
</style>