import { ArticleData, extract } from 'article-parser'
import { Article } from '../article'
import { PuppeteerHandler } from '../puppeteer'
import { Supabase } from '../supabase'
import sanitize from 'sanitize-html'

// Tags that get their content removed
const REMOVE_CONTENT_FROM_TAGS = ['style', 'script', 'textarea', 'option', 'noscript', 'a']
// Tags to remove from sanitize-html defaults
const DISALLOWED_TAGS = ['a']
// Tags to add to sanitize-html defaults
const TAGS_TO_ADD = ['img']
const ALLOWED_TAGS = sanitize.defaults.allowedTags
    .filter((tag) => !DISALLOWED_TAGS.includes(tag))
    .concat(TAGS_TO_ADD)
export abstract class Source {
    constructor(protected puppeteerHandler: PuppeteerHandler, protected sb: Supabase) {}

    abstract name: string
    abstract homepage: string
    abstract id: string
    /**
     * This is how a list of article URLs to scrape are collected
     */
    abstract getArticlesUrl: () => Promise<string[]>

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

    private scrape = async (articleUrls: string[]): Promise<Article[]> => {
        console.log(`Scraping ${this.name}`)
        const articlesData: Article[] = []
        for (const articleUrl of articleUrls) {
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
        return articlesData
    }

    private insertScraped = async (articles: Article[]): Promise<void> => {
        console.log(`Starting article inserts for ${this.name}`)
        if (articles.length > 0) {
            try {
                const inserted = await this.sb.insertArticles(articles)
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

    private cleanScraped = async (dirtyArticles: Article[]): Promise<Article[]> => {
        console.log(`CLEANING CONTENT FOR ${this.name}`)
        return dirtyArticles.map((article) => {
            const newContent = article.content
                ? sanitize(article.content, {
                      allowedTags: ALLOWED_TAGS,
                      nonTextTags: REMOVE_CONTENT_FROM_TAGS,
                  })
                : ''
            return {
                ...article,
                content: newContent,
            }
        })
    }

    public scrapeAndInsert = async (): Promise<void> => {
        const articleUrls = await this.getUrlsCleaned()
        const scrapedArticles = await this.scrape(articleUrls)
        const cleanArticles = await this.cleanScraped(scrapedArticles)
        await this.insertScraped(cleanArticles)
    }
}
