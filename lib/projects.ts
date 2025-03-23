import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

const rootDirectory = path.join(process.cwd(), 'content', 'projects')

export type Project = {
  metadata: ProjectMetadata
  content: string
}

export type ProjectMetadata = {
  title: string
  summary?: string
  image?: string
  author?: string
  publishedAt?: string
  slug?: string
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) {
      return null
    }
    const fileContents = fs.readFileSync(filePath, { encoding: 'utf-8' })

    const { data, content } = matter(fileContents)

    return { metadata: { ...data, slug, title: data.title }, content }
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error)
    return null
  }
}

export async function getProjects(limit?: number): Promise<ProjectMetadata[]> {
  const files = fs.readdirSync(rootDirectory)

  const projects = files
    .map(file => getProjectMetadata(file))
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? '').getTime() -
        new Date(a.publishedAt ?? '').getTime()
    )

  return limit ? projects.slice(0, limit) : projects
}

export function getProjectMetadata(filepath: string): ProjectMetadata {
  const slug = filepath.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, filepath)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContent)

  return { ...data, slug } as ProjectMetadata
}
