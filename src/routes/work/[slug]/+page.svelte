<script>
  export let data;
</script>
<article>
  <h1>{data.title}</h1>
  <p>{@html data.Content.html}</p>
</article>

<style lang="scss">
  article {
    padding: var(--spacing-outer);
  }
</style>