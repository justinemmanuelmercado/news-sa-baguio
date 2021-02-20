import { NewsSource } from './filters'

export interface Article {
    id: string
    url?: string
    links?: string[]
    title?: string
    description?: string
    image?: string
    author?: string
    source?: string
    published?: string
    ttr?: number
    createdAt?: string
    newsSourceObject: NewsSource
}
