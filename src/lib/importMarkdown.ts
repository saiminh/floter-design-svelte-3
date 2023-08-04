type Post = {
  metadata: {
    title: string
    date: string
    description: string
    tags: string[]
  }
  default: {
    render: () => string
  }
  path: string
  Content: string
}

export const fetchMarkdownPosts = async () => {
  // eslint-disable-next-line no-useless-escape
  const allPostFiles = import.meta.glob('/src/routes/work/\*.md')

  const iterablePostFiles = Object.entries(allPostFiles)
  
  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const postPath = path.slice(11, -3)
      const data: unknown = await resolver()
      const postData = data as Post
      const content = postData.default.render() as unknown as { html: string }

      return {
        meta: postData.metadata,
        path: postPath,
        Content: content.html
      }
    })
  )

  return allPosts
}