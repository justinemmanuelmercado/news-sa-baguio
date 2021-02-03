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

    getArticles = async ({ rangeMin, rangeMax }: RootState['filters']): Promise<Article[]> => {
        console.log(rangeMin, rangeMax)
        const { data, error } = await this.client
            .from('ArticleData')
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
}

export const sb = new SbHandler()
