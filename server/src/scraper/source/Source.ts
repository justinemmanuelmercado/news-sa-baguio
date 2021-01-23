import { Article } from '../article'

export abstract class Source {
  abstract name: string
  abstract homepage: string
  abstract id: string
  abstract getArticlesUrl: () => Promise<string[]>
  abstract scrape: () => Promise<Article[]>
}