import { ArticleData, extract } from 'article-parser'
import { Article } from '../article'
import { PuppeteerHandler } from '../puppeteer'

export abstract class Source {
    abstract puppeteerHandler: PuppeteerHandler
    abstract name: string
    abstract homepage: string
    abstract id: string
    abstract getArticlesUrl: () => Promise<string[]>

    /**
     * Remove duplicate URLs
     */
    protected getUrlsCleaned = async (): Promise<string[]> => {
        const urls = await this.getArticlesUrl()
        return Array.from(new Set(urls))
    }

    getArticleData = async (): Promise<Article[]> => {
        console.log(`Scraping ${this.name}`)
        const scraped = await this.scrape()
        console.log(`Finished scraping ${this.name}`)

        return scraped
    }

    getData = async (articleUrl: string): Promise<ArticleData | void> => {
        const articleData = await extract(articleUrl)
        if (!articleData) {
            throw new Error(`getData failed for ${articleUrl}`)
        }
        return articleData
    }

    protected scrape = async (): Promise<Article[]> => {
        const articles = await this.getUrlsCleaned()
        const articlesData: Article[] = []
        for (const articleUrl of articles) {
            try {
                const articleData = await this.getData(articleUrl)

                articlesData.push({
                    ...articleData,
                    newsSource: this.id,
                })
            } catch (e) {
                console.log(e)
            }
        }
        return articlesData
    }
}
