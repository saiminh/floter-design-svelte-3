export async function load({ params }){
  try {
    const post = await import(`../md/${params.slug}.md`)
    const { title, date, header_bg_image, svg, video } = post.metadata
    const Content = post.default.render()
  
    return {
      title,
      date,
      header_bg_image,
      svg,
      video,
      Content,
    }
  } catch (error) {
    console.error(error)
  }
}