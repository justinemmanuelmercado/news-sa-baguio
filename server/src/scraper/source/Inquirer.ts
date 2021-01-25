import { PuppeteerHandler } from "../puppeteer";
import { Source } from "./Source";
import { extract } from "article-parser";
import { Article } from "../article";
import { Page } from "puppeteer";

export class Inquirer extends Source implements Source {
  constructor(public puppeteerHandler: PuppeteerHandler) {
    super()
  }

  name = "Inquirer";
  id = "e0e865b6-b2e9-4149-9e0b-ed4fa30624f1";
  homepage = "https://newsinfo.inquirer.net/tag/baguio-city";

  getArticlesUrl = async () => {
    const handler = async (page: Page): Promise<string[]> => {
      try {
        page.goto(this.homepage, { waitUntil: "load", timeout: 0 });
        await page.waitForSelector("#inq-channel-left");
        const links: string[] = await page.evaluate(() => {
          return Promise.resolve(
            Array.from(document.querySelectorAll("#ch-ls-head > h2 > a")).map(
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
