import { fetchMarkdownPosts } from '../../lib/importMarkdown'

export async function load() {
  const posts = await fetchMarkdownPosts()
  if (!posts) console.error('No posts found')

  return {
    posts,
    title: 'Work References',
    description: 'A few of the projects I have worked on'
  }
}
