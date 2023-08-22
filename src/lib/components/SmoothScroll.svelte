<script lang='ts'>
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

  let smoother: ScrollSmoother;
  onMount( () => {

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    
    ScrollTrigger.normalizeScroll(true)
    
    setTimeout(() => {
      smoother = ScrollSmoother.create({
        smooth: 1.5,
        effects: true,
        normalizeScroll: true
      });
    }, 300);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
      smoother?.kill();
    };
  });

</script>

<div id="smooth-wrapper">
  <div id="smooth-content">
    <slot />
  </div>
</div>