import { extract } from 'article-parser';
import { Article } from "../article";
import { PuppeteerHandler } from "../puppeteer";

export abstract class Source {
  abstract puppeteerHandler: PuppeteerHandler;
  abstract name: string;
  abstract homepage: string;
  abstract id: string;
  abstract getArticlesUrl: () => Promise<string[]>;

  /**
   * Remove duplicate URLs
   */
  protected getUrlsCleaned = async (): Promise<string[]> => {
    const urls = await this.getArticlesUrl();
    return Array.from(new Set(urls));
  };

  getArticleData = async (): Promise<Article[]> => {
    console.log(`Scraping ${this.name}`);
    const scraped = await this.scrape();
    console.log(`Finished scraping ${this.name}`);

    return scraped;
  };

  getData = async (articleUrl: string) => {
    try {
      const articleData = await extract(articleUrl);
      return articleData
    } catch (e) {
      console.error(`Failed to scrape: ${articleUrl}: `);
      console.error(e);
    }
  }
  
  protected scrape = async () => {
    const articles = await this.getUrlsCleaned();
    const articlesData: Article[] = [];
    for (const articleUrl of articles) {
      const articleData = await this.getData(articleUrl);
      if(articleData){
        articlesData.push({
          ...articleData,
          newsSource: this.id,
        });
      } else {
        console.log(`getData failed for ${articleUrl}`)
      }
    }
    return articlesData;
  };
}
