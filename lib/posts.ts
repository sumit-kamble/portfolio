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

export async function getPosts(limit?: number): Promise<PostMetadata[]> {
  const files = fs.readdirSync(rootDirectory)

  const posts = files
    .map(file => getPostMetadata(file))
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? '').getTime() -
        new Date(a.publishedAt ?? '').getTime()
    )

  return limit ? posts.slice(0, limit) : posts
}

export function getPostMetadata(filepath: string): PostMetadata {
  const slug = filepath.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, filepath)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContent)

  return { ...data, slug } as PostMetadata
}
