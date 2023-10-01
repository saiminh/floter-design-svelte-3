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
    text-decoration: none;
  }
</style>