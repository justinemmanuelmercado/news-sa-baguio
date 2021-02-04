import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Article } from './redux/articles'
import { Content } from './redux/content'
import { RootState } from './redux/store'

class SbHandler {
    private client: SupabaseClient
    constructor() {
        this.client = createClient(
            import.meta.env.SNOWPACK_PUBLIC_SB_URL,
            import.meta.env.SNOWPACK_PUBLIC_SB_KEY,
        )
    }

    private ARTICLE_DATA = 'ArticleData'

    getArticles = async ({ rangeMin, rangeMax }: RootState['filters']): Promise<Article[]> => {
        const { data, error } = await this.client
            .from(this.ARTICLE_DATA)
            .select(
                `id, url, links, title, description, image, author, source, published, ttr, createdAt`,
            )
            .order('createdAt', { ascending: false })
            .range(rangeMin, rangeMax)

        if (!error) {
            return data
        } else {
            console.log(error.message)
            throw new Error()
        }
    }

    getArticleContent = async (id: string): Promise<Content> => {
        const { data, error } = await this.client
            .from(this.ARTICLE_DATA)
            .select(
                `id, url, body:content, title, author, description, published, createdAt, links, image`,
            )
            .match({ id })

        if (!error) {
            return data[0]
        } else {
            console.log(error.message)
            throw new Error()
        }
    }
}

export const sb = new SbHandler()
