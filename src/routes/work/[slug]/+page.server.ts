export async function load({ params }){
  try {
    const post = await import(`../${params.slug}.md`)
    const { title, date, header_bg_image } = post.metadata
    const Content = post.default.render()
  
    return {
      title,
      date,
      header_bg_image,
      Content
    }
  } catch (error) {
    console.error(error)
  }
}