import { createClient, SupabaseClient } from '@supabase/supabase-js'

class SbHandler {
    private client: SupabaseClient
    constructor() {
        console.log(import.meta.env.SNOWPACK_PUBLIC_SB_URL, import.meta.env.SNOWPACK_PUBLIC_SB_KEY)
        this.client = createClient(
            import.meta.env.SNOWPACK_PUBLIC_SB_URL,
            import.meta.env.SNOWPACK_PUBLIC_SB_KEY,
        )
    }

    getArticles = async (): Promise<unknown> => {
        const { data, error } = await this.client.from('ArticleData').select('*')

        if (!error) {
            return data
        }
        return []
    }
}

export const sb = new SbHandler()
