import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

const rootDirectory = path.join(process.cwd(), 'content', 'posts')

export type Post = {
  metadata: PostMetadata
  content: string
}

export type PostMetadata = {
  title?: string
  summary?: string
  image?: string
  author?: string
  publishedAt?: string
  tags?: string
  slug?: string
}

export default async function getPostBySlug(
  slug: string
): Promise<Post | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      return null
    }
    const fileContents = fs.readFileSync(filePath, { encoding: 'utf-8' })

    const { data, content } = matter(fileContents)

    return { metadata: { ...data, slug }, content }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}
