export async function load( { params }: { params: { slug: string }} ){
  try {
    const post = await import(`../md/${params.slug}.md`)
    const { title, date, header_bg_image, svg, video, tags } = post.metadata
    const Content = post.default.render()
  
    return {
      title,
      date,
      header_bg_image,
      svg,
      video,
      tags,
      Content,
    }
  } catch (error) {
    console.error(error)
  }
}