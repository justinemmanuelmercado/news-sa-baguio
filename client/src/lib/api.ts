import { createClient, SupabaseClient } from '@supabase/supabase-js'
import dayjs from 'dayjs'
import { Article } from '../redux/articles'
import { Content } from '../redux/content'
import { NewsSource } from '../redux/filters'

class SbHandler {
    private client: SupabaseClient
    constructor() {
        this.client = createClient(
            import.meta.env.SNOWPACK_PUBLIC_SB_URL,
            import.meta.env.SNOWPACK_PUBLIC_SB_KEY,
        )
    }

    private ARTICLE_DATA = 'ArticleData'
    private NEWS_SOURCE = 'NewsSource'

    getArticles = async ({
        page,
        items,
        shownSources,
        fromDate,
        toDate,
        search,
    }): Promise<Article[]> => {
        const rangeMin = (page - 1) * items
        const rangeMax = rangeMin + (items - 1)

        let query = this.client
            .from(this.ARTICLE_DATA)
            .select(
                `id, url, links, title, description, image, author, source, published, ttr, createdAt, newsSourceObject:NewsSource ( name, homepage, id ), increment, newsSource`,
            )
            .range(rangeMin, rangeMax)
            .order('increment', { ascending: false })
        if (fromDate) {
            query = query.gt('createdAt', fromDate)
        }
        if (toDate) {
            query = query.lt('createdAt', dayjs(toDate).add(1, 'day').format('YYYY-MM-DD'))
        }
        if (shownSources.length !== 0) {
            query = query.in('newsSource', shownSources)
        }

        if (search) {
            query = query.ilike('content', `%${search}%`)
        }

        const { data, error } = await query

        if (!error) {
            return data
        } else {
            console.log(error.message)
            throw new Error('Failed to load articles')
        }
    }

    getArticleContent = async (id: string): Promise<Content> => {
        const { data, error } = await this.client
            .from(this.ARTICLE_DATA)
            .select(
                `id, url, body:content, title, author, description, published, createdAt, links, image, newsSource:NewsSource ( name, homepage, id )`,
            )
            .match({ id })

        if (!error) {
            return data[0]
        } else {
            console.log(error.message)
            throw new Error()
        }
    }

    getNewsSources = async (): Promise<NewsSource[]> => {
        const { data, error } = await this.client
            .from(this.NEWS_SOURCE)
            .select('id, name, homepage')

        if (!error) {
            return data as NewsSource[]
        } else {
            console.log(error.message)
            throw new Error('Failed to load news sources')
        }
    }
}

export const sb = new SbHandler()
