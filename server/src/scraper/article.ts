import { ArticleData } from 'article-parser';

export interface Article extends ArticleData {
  createdAt?: string
  // UUID for type NewsSource
  newsSource: string
}