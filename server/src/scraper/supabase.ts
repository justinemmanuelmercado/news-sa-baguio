import { config } from 'dotenv'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Article } from './article'
import { log } from './logger'
config()

export class Supabase {
    private client: SupabaseClient
    private topic = 'SUPABASE'
    skipUrls: string[] = []

    constructor() {
        const sbUrl = process.env.SB_URL
        const sbKey = process.env.SB_SERVICE_API_KEY
        if (sbUrl && sbKey) {
            this.client = createClient(sbUrl, sbKey)
        } else {
            throw new Error('Supabase not configured correctly. Are the keys and url correct?')
        }
    }

    /**
     * Get the first 200 URLs stored in the DB
     * The purpose of this is to limit the amount
     * of article scraping being done
     */
    initSkipUrls = async (): Promise<void> => {
        log('Loading first 200 URLs', this.topic)
        const { data, error } = await this.client
            .from('ArticleData')
            .select('url')
            .order('createdAt', { ascending: false })
            .range(0, 199)
        if (error) {
            log('FAILED TO INSERT THE FOLLOWING BECAUSE OF THE FOLLOWING: ', this.topic, false)
            log(error.details, this.topic, false)
            throw new Error(error.message)
        }

        this.skipUrls = data?.map((val: { url: string }) => val.url) || []
    }

    insertArticles = async (articles: Article[]): Promise<unknown[] | null | void> => {
        const { data, error } = await this.client
            .from('ArticleData')
            .insert(articles, { onConflict: 'url', upsert: true })

        if (error) {
            log('FAILED TO INSERT THE FOLLOWING BECAUSE OF THE FOLLOWING: ', this.topic, false)
            throw new Error(error.message)
        }

        return data
    }
}
