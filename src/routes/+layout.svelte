<script lang='ts'>
  import '$lib/styles/global.scss';
  import Header from '$lib/components/Header.svelte';
	import { fade } from 'svelte/transition';
  export let data;
</script>

<Header />

  {#key data.pathname}
    <div 
      class="content"
    >
      <slot />
    </div>
  {/key}
