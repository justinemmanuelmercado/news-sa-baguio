import { ArticleData, extract } from 'article-parser'
import { Article } from '../article'
import { PuppeteerHandler } from '../puppeteer'
import { Supabase } from '../supabase'
import sanitize from 'sanitize-html'
import difference from 'lodash/difference'
import uniq from 'lodash/uniq'
import { log } from '../logger'

// Tags that get their content removed
const DISALLOWED_TAGS = ['a', 'h1', 'h3', 'h2', 'span']
const REMOVE_CONTENT_FROM_TAGS = ['style', 'script', 'textarea', 'option', 'noscript'].concat(
    DISALLOWED_TAGS,
)
// Tags to remove from sanitize-html defaults
// Tags to add to sanitize-html defaults
const TAGS_TO_ADD = ['img']
const ALLOWED_TAGS = sanitize.defaults.allowedTags
    .filter((tag) => !DISALLOWED_TAGS.includes(tag))
    .concat(TAGS_TO_ADD)

const exclusiveFilter = (frame: sanitize.IFrame) => {
    // <br> tags are special
    if (frame.tag === 'br') {
        return false
    }

    // if tag is empty return true
    if (!frame.text.trim()) {
        return true
    }

    // if tag contains less than 5 words return true
    if (frame.text.trim().split(' ').length < 5) {
        return true
    }

    return false
}
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
        const filteredUrls = uniq(urls)
        return difference(filteredUrls, this.sb.skipUrls)
    }

    getData = async (articleUrl: string): Promise<ArticleData | void> => {
        const articleData = await extract(articleUrl)
        if (!articleData) {
            throw new Error(`getData failed for ${articleUrl}`)
        }
        return articleData
    }

    private scrape = async (articleUrls: string[]): Promise<Article[]> => {
        log(`Scraping ${this.name}`, this.name, true)
        const articlesData: Article[] = []
        for (const articleUrl of articleUrls) {
            try {
                const articleData = await this.getData(articleUrl)

                articlesData.push({
                    ...articleData,
                    url: articleUrl,
                    newsSource: this.id,
                })
            } catch (e) {
                log(e.message, this.name, false)
            }
        }
        log(`Finished scraping ${this.name}`, this.name, true)
        return articlesData
    }

    private insertScraped = async (articles: Article[]): Promise<void> => {
        log(`Starting article inserts for ${this.name}`, this.name, true)
        if (articles.length > 0) {
            try {
                const inserted = await this.sb.insertArticles(articles)
                if (inserted) {
                    log(`Inserted ${inserted.length} articles for ${this.name}`)
                }
            } catch (e) {
                log(`Insert failed`, this.name, false)
                log(e.message, this.name, false)
            } finally {
                log(`Ending insert articles for ${this.name}`, this.name, true)
            }
        } else {
            log(`No articles found to insert for ${this.name}`, this.name, true)
            log(`Ending insert articles for ${this.name}`, this.name, true)
        }
    }

    private cleanScraped = async (dirtyArticles: Article[]): Promise<Article[]> => {
        log(`CLEANING CONTENT FOR ${this.name}`, this.name, true)
        return dirtyArticles.map((article) => {
            const newContent = article.content
                ? sanitize(article.content, {
                      allowedTags: ALLOWED_TAGS,
                      nonTextTags: REMOVE_CONTENT_FROM_TAGS,
                      exclusiveFilter,
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
