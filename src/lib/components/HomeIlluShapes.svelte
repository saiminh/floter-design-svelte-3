<script lang="ts">
  import HomeIlluShape from "./HomeIlluShape.svelte";
  import gsap from "gsap";
  import MorphSVGPlugin from "gsap/dist/MorphSVGPlugin";
  import ScrollTrigger from "gsap/dist/ScrollTrigger";
  import { onMount } from "svelte";

  onMount( () => {
    gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger);

    let introTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.home-illu-shapes',
        start: 'top 80%',
        end: 'top 0%',
        scrub: false,
        // markers: true
      }
    });
    document.querySelectorAll('.home-illu-shapes > .shape').forEach( (shape) => {
      introTl.fromTo(shape, 
        { autoAlpha: 0, x: Math.random() * 1000 - 500, y: Math.random() * 1000 - 500},
        { autoAlpha: 1, x: 0, y: 0, duration: 1, ease: "cubic.inOut" }, 0 
      )
    })

    let shapesToPaths = MorphSVGPlugin.convertToPath('.sphere, .quartercirc, .triangle, .rectangle');
    let shapes = [shapesToPaths[0], shapesToPaths[1], shapesToPaths[2], shapesToPaths[3]]

    const generateAngle = () => {
      let rand = Math.floor(Math.random() * 2);
      return rand === 0 ? 90 : -90;
    }

    const randomMorph = (shape: HTMLElement, index: number = 0) => {
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

      let rowindex = (index: number) => {
        return index % 5;
      };
      gsap.to(shape, { 
        duration: 1, 
        rotationZ: "+=" + generateAngle(), 
        morphSVG: randomShape, 
        ease: 'power4.out', 
        delay: rowindex(index) * 0.05,
        onComplete: () => { setTimeout( () => randomMorph(shape),  2000 ) } 
    });
    }

    document.querySelectorAll('.morphshape').forEach( (shape, index) => {
      randomMorph(shape as HTMLElement, index);
    })

  })
</script>

<div class="home-illu-shapes">
  <HomeIlluShape />
  <HomeIlluShape />
  <HomeIlluShape />
  <HomeIlluShape />
  <HomeIlluShape />
  <HomeIlluShape />
  <HomeIlluShape />
  <HomeIlluShape />
  <HomeIlluShape />
  <HomeIlluShape />
  <HomeIlluShape />
  <HomeIlluShape />
  <HomeIlluShape />
  <HomeIlluShape />
  <HomeIlluShape />
</div>

<style>
  .home-illu-shapes {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(1px, 0.3vw, 5px);
  }
  :global(.home-illu-shapes > *) {
    flex-basis: calc(20% - clamp(1px, 0.3vw, 5px));
    opacity: 0;
  }
</style>