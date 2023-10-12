<script lang="ts">
  import { onMount } from "svelte";
  import * as PIXI from "pixi.js";

  let app: PIXI.Application;
  let canvas: HTMLCanvasElement;

  onMount(() => {
    app = new PIXI.Application({
      view: canvas,
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x000000,
      backgroundAlpha: 0,
      resizeTo: window
    });
    PIXI.Filter.defaultResolution = window.devicePixelRatio;

    const container = new PIXI.Container();
    app.stage.addChild(container);

    const envelope = PIXI.Sprite.from("/success/envelope.png");
    envelope.anchor.set(0.5);
    envelope.scale.set(0.15);
    envelope.x = app.screen.width / 2;
    envelope.y = envelope.height / 2 + 130;
    
    container.addChild(envelope);

    const text = new PIXI.Text("Thank you!", {
      fontFamily: "stratos",
      fontSize: 66,
      letterSpacing: -3,
      fill: 0xffead9,
      align: "center",
    });
    text.anchor.set(0.5);
    text.x = app.screen.width / 2;
    text.y = envelope.y + envelope.height / 2 + 90;
    container.addChild(text);
    text.resolution = window.devicePixelRatio;
    
    const displacementSprite = PIXI.Sprite.from('/success/displacementMap.jpg');
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    const displacementFilter = new PIXI.DisplacementFilter(displacementSprite);
    displacementFilter.scale.x = 0;
    displacementFilter.scale.y = 100;
    displacementFilter.padding = 50;

    displacementSprite.position.x = envelope.position._x;

    container.addChild(displacementSprite);

    container.filters = [displacementFilter];

    app.ticker.add(() =>
    {
        // Offset the sprite position to make vFilterCoord update to larger value.
        // Repeat wrapping makes sure there's still pixels on the coordinates.
        displacementSprite.x = displacementSprite.x + 6;
        // Reset x to 0 when it's over width to keep values from going to very huge numbers.
        if (displacementSprite.x > displacementSprite.width) { displacementSprite.x = 0; }
    });

    return () => {
      app.destroy(true, true);
    };
  });


</script>

<div class="wrapper">
  <h1>Your message is underway.</h1>
  <p>I will get back to you as soon as I can and look forward to discussing further whatever you have sent me.</p>
</div>
<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100vh;
    width: 100%;
    max-width: 1200px;
    padding: var(--spacing-outer) var(--spacing-outer) 60px var(--spacing-outer);
    margin: 0 auto;
    @media screen and (min-width: 768px) {
      justify-content: center;
    }
  }
  h1 {
    font-size: 2em;
    line-height: .9;
    margin: 2em 0 0 0;
    color: var(--color-highlight);
    @media screen and (min-width: 768px) {
      font-size: 3.9em;
      margin: 1em 0 0 0;
    }
  }
  p {
    font-size: 1em;
    @media screen and (min-width: 768px) {
      font-size: 1.5em;
    }
  }
</style>