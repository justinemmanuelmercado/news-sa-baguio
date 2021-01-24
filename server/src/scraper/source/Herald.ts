import { PuppeteerHandler } from "../puppeteer";
import { Source } from "./Source";
import { extract } from "article-parser";
import { Article } from "../article";
import { Page } from "puppeteer";

export class Herald implements Source {
  constructor(public puppeteerHandler: PuppeteerHandler) {}

  name = "Herald Express";
  id = "ec293a00-59ce-4d55-92ac-89379d3a41a0";
  homepage = "https://www.baguioheraldexpressonline.com/category/city/";

  getArticlesUrl = async () => {
    const handler = async (page: Page): Promise<string[]> => {
      try {
        page.goto(this.homepage, { waitUntil: "load", timeout: 0 });
        await page.waitForSelector("#main");
        const links: string[] = await page.evaluate(() => {
          return Promise.resolve(
            Array.from(
              document.querySelectorAll("header.entry-header > h2 > a")
            ).map((link: Element) => (link as HTMLAnchorElement).href)
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
      const articles = await this.getArticlesUrl();
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
