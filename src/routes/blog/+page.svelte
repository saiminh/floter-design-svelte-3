<script lang='ts'>
  export let data: any;
  let posts = data.posts;
</script>

<h1>Blog roll!</h1>

{#each posts as post}
  <h2>{post.title.rendered}</h2>
{/each}