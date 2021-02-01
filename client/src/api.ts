import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Article } from './store'

class SbHandler {
    private client: SupabaseClient
    constructor() {
        this.client = createClient(
            import.meta.env.SNOWPACK_PUBLIC_SB_URL,
            import.meta.env.SNOWPACK_PUBLIC_SB_KEY,
        )
    }

    getArticles = async (): Promise<Article[]> => {
        const { data, error } = await this.client.from('ArticleData').select('*')

        if (!error) {
            return data
        } else {
            console.log(error.message)
            throw new Error()
        }
    }
}

export const sb = new SbHandler()
