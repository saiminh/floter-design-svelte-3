<script lang='ts'>
  import '$lib/styles/global.scss';
  import Logo from '$lib/components/Logo.svelte';
  import gsap from 'gsap';
  import { onMount } from 'svelte';

  onMount(() => {
    let navlinks = document.querySelectorAll('nav a');
    navlinks.forEach((link, index) => {
      link.addEventListener('click', (e)=> {
        const checkbox = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
        checkbox ? checkbox.checked = false : null;
        gsap.to('.content', {duration: 0.5, y: '0%', autoAlpha: 1, ease: 'power4.out'});
      })
    });
    let checkbox = document.getElementById('menustate') as HTMLInputElement;
    checkbox.addEventListener('change', (e)=> {
      if (checkbox.checked) {
        gsap.to('.content', {duration: 0.75, y: -200, autoAlpha: 0.5, ease: 'power2.inOut'});
        gsap.from('#nav', {duration: 0.5, autoAlpha: 0, y: '100%', ease: 'power4.out', delay: 0.1});
        gsap.from('nav a', {duration: 0.5, autoAlpha: 0, y: 20, stagger: 0.1, ease: 'power4.out' , delay: 0.2});
      } else {
        gsap.to('.content', {duration: 0.5, y: '0%', autoAlpha: 1, ease: 'power4.out'});
      }
    })
  });

</script>
<a href='/' class="logo">
  <Logo />
</a>
<header>
  <input aria-hidden="true" type="checkbox" id="menustate" />
  <label for="menustate" aria-hidden="true">
    <span class="open">≡</span>
    <span class="close">×</span>
  </label>
  <!-- <a href="#nav" class="logo"><Logo /></a> -->
  <nav id="nav">
    <a href="/">Home</a>
    <a href="/work">About</a>
    <a href="/work">Hire</a>
  </nav>
</header>

<div class="content">
  <slot />
</div>

<style lang="scss">
  header {
    position: fixed;
    bottom: 0;  
    right: 0;
    z-index: 1;
    padding: var(--spacing-outer);
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
    cursor: pointer;
  }
  .close {
    top: 0.033em;
    color: #FFF;
  }
  #menustate, #nav, .close {
    /* Hide the checkbox, menu and close button by default */
    display: none;
  }
  #menustate:checked ~ nav ,
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
  .logo {
    height: 36px;
    width: auto;
    position: fixed;
    bottom: 0;
    z-index: 2;
    display: flex;
    margin: var(--spacing-outer);
  }
  nav {
    background-color: var(--color-bg);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: var(--spacing-outer);
  }
  nav a {
    display: block;
    line-height: 1.3;
    font-size: 5.5em;
    font-weight: 800;
    font-style: italic;
    text-transform: lowercase;
    text-decoration: none;
    color: var(--color-text);

    &:first-child {
      margin-top: 1em;
    }
  }
</style>