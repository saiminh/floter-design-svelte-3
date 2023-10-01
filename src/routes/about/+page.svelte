<script lang='ts'>
  import * as PIXI from 'pixi.js';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  
  onMount( async () => {
    // const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    // const app = new PIXI.Application({
    //   backgroundColor: 0x000000,
    //   backgroundAlpha: 0,
    //   resizeTo: window,
    //   antialias: true,
    //   resolution: 2,
    //   view: canvas
    // })

    // const imageurl = 'work/peak/peak_hero.png'
    // // create a PIXI texture and create one sprite per quarter of the original image of the texture
    // const texture = await PIXI.Texture.from(imageurl)
    // texture.baseTexture.width = window.innerWidth
    // texture.baseTexture.height = window.innerWidth / 1.5

    // const rows = 50
    // const cols = 50

    // for (let i = 0; i < rows; i++) {
    //   for (let j = 0; j < cols; j++) {
    //     const thisTexture = new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(
    //       j * window.innerWidth / cols,
    //       i * window.innerHeight / rows,
    //       window.innerWidth / cols,
    //       window.innerHeight / rows
    //     ))

    //     const sprite = new PIXI.Sprite(thisTexture)
    //     sprite.width = window.innerWidth / cols
    //     sprite.height = window.innerHeight / rows 
    //     sprite.x = sprite.width * j 
    //     sprite.y = sprite.height * i
    //     app.stage.addChild(sprite)
    //   }
    // }
  })
</script>

<article>
  <h1>Hello world</h1>
  <p>Is this the text you're looking for?</p>
</article>
<canvas></canvas>


<style src="./about.scss" lang="scss"></style>