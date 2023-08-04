export async function load({ params }){
  try {
    const post = await import(`../${params.slug}.md`)
    const { title, date } = post.metadata
    const Content = post.default.render()
  
    return {
      title,
      date,
      Content
    }
  } catch (error) {
    console.error(error)
  }
}