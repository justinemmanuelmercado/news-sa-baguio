import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Article } from './redux/articles'
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
                `url, links, title, description, image, author, source, published, ttr, createdAt`,
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

    getArticleContent = async (id: string): Promise<string> => {
        const { data, error } = await this.client
            .from(this.ARTICLE_DATA)
            .select(`content`)
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
