<script lang="ts">
  import myImgSrcSetWebp from '$lib/assets/work/formo/formo_hero.png?w=1344;672;336&format=webp&as=srcset'
  import myImg from '$lib/assets/work/formo/formo_hero.png?w=200'

  console.log(myImgSrcSetWebp)
  console.log(myImg)
</script>
  <h1>hakc</h1>
    <img 
      src={myImg} 
      srcset={myImgSrcSetWebp}
      sizes="(min-width: 768px) 10vw, 100vw"
      alt="my donkey" 
      width="700"
    />
