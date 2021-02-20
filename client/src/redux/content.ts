import { NewsSource } from './filters'

export interface Content {
    id: string
    url?: string
    body?: string
    title?: string
    author?: string
    description?: string
    published?: string
    createdAt?: string
    links?: string
    image?: string
    newsSource?: NewsSource
}
