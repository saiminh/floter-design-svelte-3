<script lang='ts'>
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { page } from "$app/stores";
  
  onMount(() => {

    const navBlockElems: Array<HTMLElement> = Array.from(document.querySelectorAll('#nav'));
    navBlockElems.forEach((el) => {
      el.style.display = 'block';
    });
    gsap.set('#nav', { autoAlpha: 0, y: '100%'});
    gsap.set('nav a', { autoAlpha: 0, y: 200 });

    //Nav links close menu when clicked
    let navlinks = document.querySelectorAll('nav a');
    navlinks.forEach((link, index) => {
      link.addEventListener('click', (e)=> {
        if (e.target?.toString() === $page.url.toString()) {
          return;
        } 
        const checkbox = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
        checkbox ? checkbox.checked = false : null;
        gsap.to('.content > *', {duration: 0.5, autoAlpha: 1, y: '100%', ease: 'power4.out'});
        gsap.to('#nav', {duration: 0.75, autoAlpha: 0, y: '100%', ease: 'power4.inOut', delay: 0.1});
        gsap.to('nav a', {duration: 0.75, autoAlpha: 1, y: 200, stagger: 0.025, ease: 'power4.inOut' , delay: 0.1});
      }, { passive: true })
    });
    
    //Toggle menu
    let checkbox = document.getElementById('menustate') as HTMLInputElement;
    checkbox.addEventListener('change', (e)=> {
      if (checkbox.checked) {
        gsap.to('.content > *', {duration: 0.75, y: -200, autoAlpha: 0.5, ease: 'power2.inOut'});
        gsap.to('#nav', {duration: 0.5, autoAlpha: 1, y: 0, ease: 'power4.out', delay: 0.1});
        gsap.to('nav a', {duration: 0.5, autoAlpha: 1, y: 0, stagger: 0.1, ease: 'power4.out' , delay: 0.1});
      } else {
        gsap.to('.content > *', {duration: 0.5, y: 0, autoAlpha: 1, ease: 'power4.out'});
        gsap.to('#nav', {duration: 0.5, autoAlpha: 1, y: '100%', ease: 'power4.out', delay: 0.1});
        gsap.to('nav a', {duration: 0.75, autoAlpha: 1, y: 200, stagger: 0.025, ease: 'power4.out' , delay: 0.1});
      }
    })


  });
</script>

<header>
  <input aria-hidden="true" type="checkbox" id="menustate" />
  <label for="menustate" aria-hidden="true">
    <span class="open">≡</span>
    <span class="close">×</span>
  </label>
  <nav id="nav">
    <a href="/" class="navlink {$page.route.id === '/' ? 'current' : ''}">Home</a>
    <a href="/work" class="navlink {$page.route.id?.includes('/work') ? 'current' : ''}">Work</a>
    <a href="/service" class="navlink {$page.route.id === '/service' ? 'current' : ''}">Services</a>
    <!-- <a href="/about" class="navlink {$page.route.id === '/about' ? 'current' : ''}">About</a> -->
    <a href="/contact" class="navlink {$page.route.id === '/contact' ? 'current' : ''}">Contact</a>
    
  </nav>
</header>

<style lang="scss">
  header {
    position: fixed;
    bottom: 0;  
    right: 0;
    z-index: 3;
    padding: var(--spacing-nav);
    display: flex;
    gap: .75em;
    justify-content: flex-end;
    align-items: flex-end;
    box-sizing: border-box;
  }
  label {
    height: 36px;
  }
  .open, .close {
    font-size: 4em;
    line-height: 0.3;
    position: relative;
    z-index: 2;
    cursor: url('/pointer.svg'), auto;
  }
  .close {
    top: 0.033em;
  }
  #menustate, #nav, .close {
    /* Hide the checkbox, menu and close button by default */
    display: none;
  }
  #menustate:checked ~ #nav ,
  #menustate:checked ~ label .close {
    /*
      Show the menu and close button when the menu is open
      (when the #menustate input field is checked)
    */
    display: block;
  }
  #menustate:checked ~ label .open {
    /* Hide the open button when the menu is open */
    display: none;
  }
  #nav {
    background-color: var(--color-bg);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: var(--spacing-outer);
  }
  #nav a {
    display: block;
    line-height: 1.1;
    font-size: 2.5em;
    font-weight: 800;
    font-style: italic;
    // text-transform: lowercase;
    text-decoration: none;
    color: var(--color-text);
    outline: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-backface-visibility:  hidden;
    backface-visibility:  hidden;
    transition: color .1s ease-out;
    
    @media screen and (min-width: 768px) {
      font-size: 4.5em;
    }

    &:first-child {
      margin-top: 1em;
    }
    &:hover {
      color: var(--color-highlight);
    }
    &:active {
      color: var(--color-highlight);
    }
    &.current {
      color: var(--color-highlight);
      transition: none;
    }
  }
</style>