import { ArticleData, extract } from 'article-parser'
import { Article } from '../article'
import { PuppeteerHandler } from '../puppeteer'
import { Supabase } from '../supabase'
export abstract class Source {
    constructor(protected puppeteerHandler: PuppeteerHandler, protected sb: Supabase) {}

    abstract name: string
    abstract homepage: string
    abstract id: string
    /**
     * This is how a list of article URLs to scrape are collected
     */
    abstract getArticlesUrl: () => Promise<string[]>

    protected articles: Article[] = []

    /**
     * Remove duplicate URLs and if there additional url cleaning done
     */
    protected getUrlsCleaned = async (): Promise<string[]> => {
        const urls = await this.getArticlesUrl()
        return Array.from(new Set(urls))
    }

    getData = async (articleUrl: string): Promise<ArticleData | void> => {
        const articleData = await extract(articleUrl)
        if (!articleData) {
            throw new Error(`getData failed for ${articleUrl}`)
        }
        return articleData
    }

    private scrape = async (): Promise<void> => {
        console.log(`Scraping ${this.name}`)
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
        console.log(`Finished scraping ${this.name}`)
        this.articles = articlesData
    }

    private insertScraped = async (): Promise<void> => {
        console.log(`Starting article inserts for ${this.name}`)
        if (this.articles.length > 0) {
            try {
                const inserted = await this.sb.insertArticles(this.articles)
                if (inserted) {
                    console.log(`Inserted ${inserted.length} articles for ${this.name}`)
                }
            } catch (e) {
                console.log(`Insert failed`)
                console.log(e)
            } finally {
                console.log(`Ending insert articles for ${this.name}`)
            }
        } else {
            console.log(`No articles found to insert for ${this.name}`)
            console.log(`Ending insert articles for ${this.name}`)
        }
    }

    public scrapeAndInsert = async (): Promise<void> => {
        await this.scrape()
        await this.insertScraped()
    }
}
