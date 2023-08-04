<script lang='ts'>
  export let data: any;
  let dataConverted = JSON.stringify(data);
  let dataone = data.posts[1].content.rendered;
</script>

<h1>Blog post</h1>
<p>{@html dataone}</p>