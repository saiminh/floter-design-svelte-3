<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import SplitText from 'gsap/dist/SplitText';
  export let data;

  const orderedPosts = data.posts.sort((a, b) => {
    return a.meta.order - b.meta.order;
  });

  onMount(() => {

    gsap.registerPlugin(SplitText);

    let isZoomed = false;

    let works: Array<HTMLElement> = Array.from(document.querySelectorAll('.work'));
    for ( let i = 0; i < 40; i++ ){
      let clone = works[i].cloneNode(true) as HTMLElement;
      works[i].parentNode?.appendChild(clone);
      works.push(clone);
    }

    works.forEach((work, index) => {
      let workrect = work.getBoundingClientRect();
      let worksrect = document.querySelector('.works')?.getBoundingClientRect() || {x: 0, y: 0, width: 1, height: 1};
      let distanceXinPercent = (workrect.x - worksrect?.x || 0) / (worksrect?.width || 1) * 100 ;
      let distanceYinPercent = (workrect.y - worksrect?.y || 0) / (worksrect?.height || 1) * 100 ;

      work.addEventListener('click', (e) => {
        isZoomed = !isZoomed;
        e.preventDefault();
        let href = work.getAttribute('href');
        if (isZoomed) {
          gsap.to('.works', {
            rotate: 0,
            xPercent: -distanceXinPercent,
            yPercent: -distanceYinPercent,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: .75,
            ease: 'power2.inOut',
            onComplete: () => {
              let workclone = work.cloneNode(true) as HTMLElement;
              workclone.classList.add('workclone');
              workclone.style.position = 'fixed';
              workclone.style.top = `0`;
              workclone.style.left = `0`;
              document.body.appendChild(workclone);
              window.location.href = href || ''
            }
          })
          gsap.fromTo(split.chars, {
            scaleY: 1,
            opacity: 1,
          }, {
            scaleY: 0,
            opacity: 1,
            duration: .3,
            ease: 'power3.out',
          })
        } else {
          gsap.to('.works', {
            rotate: -5,
            transformOrigin: '0 0',
            xPercent: -3,
            yPercent: 0,
            rotateX: 0,
            rotateY: 0,
            scale: .25,
            duration: 1,
            ease: 'power4.inOut'
          })
        }
      })
    });

    // set initial positions AFTER the individual rects have been read

    let split = new SplitText('.headline', { type: 'chars', charsClass: 'charChildren' });

    gsap.set('.works, .headline', {
      rotate: -5,
      xPercent: -5,
      yPercent: -2,
      rotateX: 0,
      rotateY: 0,
      scale: .25,
    })
    gsap.set('.work, .works, .headline', {
      transformOrigin: '0 0',
    })
    gsap.fromTo('.work',{
      opacity: 1,
      yPercent: 50,
      scaleY: 0,
    },{
      opacity:1,
      yPercent: 0,
      scaleY: 1,
      duration: .75,
      stagger: 0.01,
      ease: 'power4.inOut',
    })
    gsap.fromTo(split.chars, {
      yPercent: -300
    }, {
      yPercent: 0,
      duration: 1,
      stagger: 0.0075,
      ease: 'elastic.out(1, .8)',
    })
    // Move the works around on mousemove
    let mouseMoveHandler = (e: MouseEvent) => {
      let x = e.clientX;
      let y = e.clientY;
      if (isZoomed) return;
      gsap.to('.works, .headline', {
        xPercent: -x/window.innerWidth * 4 - 3,
        yPercent: -y/window.innerHeight * 4,
        rotateX: x/window.innerWidth * 10 - 5,
        rotateY: x/window.innerWidth * 10 - 5,
        duration: 1,
        ease: 'power4.out',
        overwrite: true,
      })
    }
    // Hover states or .work
    works.forEach((work, index) => {
      work.addEventListener('mouseenter', (e) => {
        if (isZoomed) return;
        gsap.to(work, {
          backgroundColor: 'var(--color-bg)',
          duration: .5,
          ease: 'power1.inOut',
        })
        gsap.to(work.querySelector('.work-logo'), {
          color: 'var(--color-highlight)',
          duration: .5,
          ease: 'power1.inOut',
        })
      })
      work.addEventListener('mouseleave', (e) => {
        if (isZoomed) return;
        gsap.to(work, {
          backgroundColor: 'var(--color-highlight)',
          duration: .5,
          ease: 'power1.inOut',
        })
        gsap.to(work.querySelector('.work-logo'), {
          color: 'var(--color-bg)',
          duration: .5,
          ease: 'power1.inOut',
        })
      })
    })
    window.addEventListener('mousemove', mouseMoveHandler);
    
    // Move the works the same way on touch drag
    let touchMoveHandler = (e: TouchEvent) => {
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      if (isZoomed) return;
      gsap.to('.works, .headline', {
        xPercent: -x/window.innerWidth * 4 - 3.33,
        yPercent: -y/window.innerHeight * 4,
        rotateX: x/window.innerWidth * 10 - 5,
        rotateY: x/window.innerWidth * 10 - 5,
        duration: 1,
        ease: 'power4.out',
        overwrite: true,
      })
    }
    window.addEventListener('touchmove', touchMoveHandler, { passive: true });

    document.querySelector('html')?.style.setProperty('overflow', 'hidden');
    document.querySelector('html')?.style.setProperty('overscroll-behavior', 'none');
    
    return () => {
      document.querySelector('html')?.style.setProperty('overflow', 'visible');
      document.querySelector('html')?.style.setProperty('overscroll-behavior', 'auto');
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('touchmove', touchMoveHandler);
      gsap.killTweensOf('.works, .work');
      works.forEach((work, index) => {
        work.removeEventListener('mouseenter', (e) => {});
        work.removeEventListener('mouseleave', (e) => {});
        work.removeEventListener('click', (e) => {});
      })
    }
  });
</script>

<div class="works-wrapper">
  <h1 class="headline"><span>Work References</span></h1>
    <div class="works">
      {#each orderedPosts as work, i}
        <a 
          data-sveltekit-preload-data
          href="{work.path}" 
          class="work" 
        >
          <div class="work-logo">
            {@html work.meta.svg}
          </div>
          <div class="work-info">
            <h2 class="title"><span class="title-words">{work.meta.title}</span></h2>
            {#if work.meta.tags}
            <ul class="tags">
              {#each work.meta.tags as tag, index}
                <li class="tag">{tag}{index < work.meta.tags.length-1 ? ' | ' : ''}</li>
              {/each}
            </ul>
            {/if}
          </div>  
        </a>
      {/each}
    </div>
</div>

<style src="./work.scss" lang="scss"></style>