<script>
  import Logo from "./Logo.svelte";
  import MainNav from "./MainNav.svelte";
</script>

<header class="header-nav">
  <a href="/" class="logo">
    <Logo />
  </a>
  <MainNav />
</header>

<style lang="scss">
  @media screen and (max-width: 767px) {
    .header-nav:before {
      content: '';
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      height: 100px;
      pointer-events: none;
      background: linear-gradient(0deg, var(--color-bg) 10%, rgba(255, 255, 255, 0) 100%);
      z-index: 3;
    }
  }
  .logo {
    height: 36px;
    width: auto;
    position: fixed;
    bottom: 0;
    z-index: 4;
    display: block;
    margin: var(--spacing-nav);
    cursor: url('/pointer.svg'), auto;
    text-decoration: none;
  }
</style>