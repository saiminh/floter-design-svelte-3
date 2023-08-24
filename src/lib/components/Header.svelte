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
  .logo {
    height: 36px;
    width: auto;
    position: fixed;
    bottom: 0;
    z-index: 4;
    display: block;
    margin: var(--spacing-nav);
    cursor: url('/pointer.svg'), auto;
  }
  .header-nav {
    @media screen and (max-width: 767px) {
      background-color: var(--color-bg);
      width: 100%;
      height: calc(36px + 2 * var(--spacing-nav));
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 3;
      // border-top: 1px solid var(--color-text);
    }
  }
</style>