import { PuppeteerHandler } from "../puppeteer";
import { Source } from "./Source";
import { extract } from "article-parser";
import { Article } from "../article";
import { Page } from "puppeteer";

export class Pia extends Source implements Source {
  constructor(public puppeteerHandler: PuppeteerHandler) {
    super()
  }

  name = "Philippine Information Agency";
  id = "edde96e9-2078-488e-8926-c4ecbd22f695";
  homepage = "https://pia.gov.ph/news/regions/cordillera";

  getArticlesUrl = async () => {
    const handler = async (page: Page): Promise<string[]> => {
      try {
        page.goto(this.homepage, { waitUntil: "load", timeout: 0 });
        await page.waitForSelector(".list-articles");
        const links: string[] = await page.evaluate(() => {
          return Promise.resolve(
            Array.from(document.querySelectorAll(".media-body > h3 > a")).map(
              (link: Element) => (link as HTMLAnchorElement).href
            )
          );
        });
        return links;
      } catch (e) {
        console.error(e);
        throw new Error("Failed getting article URLs");
      }
    };
    return await this.puppeteerHandler.handlePage(handler);
  };

  scrape = async () => {
    try {
      const articles = await this.getUrlsCleaned();
      const articlesData: Article[] = [];
      for (const articleUrl of articles) {
        const articleData = await extract(articleUrl);
        articlesData.push({
          ...articleData,
          newsSource: this.id,
        });
      }
      return articlesData;
    } catch (e) {
      console.error("error scraping", e);
      return [];
    }
  };
}
