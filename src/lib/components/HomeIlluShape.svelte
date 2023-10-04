<svg class="shape" x="0px" y="0px" viewBox="0 0 1000 1000" width="1000" height="1000">
  <path class="morphshape" d="M1000,0 C1000,333.33333 1000,666.66667 1000,1000 666.66667,1000 333.33333,1000 0,1000 0,666.66667 0,333.33333 0,0 333.33333,0 666.66667,0 1000,0 z"/>
  <circle class="sphere" cx="500" cy="500" r="500"/>
  <path class="quartercirc" d="M0,0c0,552.3,447.7,1000,1000,1000V0L0,0z"/>
  <polygon class="triangle" points="0,1000 0,0 1000,0 "/>
  <rect class="rectangle" x="0" y="0" width="1000" height="1000"/>
</svg>

<style>
  .shape {
    width: 100%;
    height: auto;
    transform-origin: 50% 50%;
  }
  .shape > * {
    transform-origin: 50% 50%;
    fill: var(--color-highlight, #000);
  }
  .sphere, .quartercirc, .triangle, .rectangle {
    fill: none;
  }
</style>