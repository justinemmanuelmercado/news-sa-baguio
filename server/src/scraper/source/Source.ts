import { Article } from '../article'
import { PuppeteerHandler } from '../puppeteer'

export abstract class Source {
  abstract puppeteerHandler: PuppeteerHandler
  abstract name: string
  abstract homepage: string
  abstract id: string
  abstract getArticlesUrl: () => Promise<string[]>
  abstract scrape: () => Promise<Article[]>
}