import { puppeteerHandler } from "../puppeteer";
import { Source } from "./Source";
import { extract } from "article-parser";
import { Article } from "../article";

export class Inquirer implements Source {
  constructor() {}
  name = "Inquirer";
  id = "e0e865b6-b2e9-4149-9e0b-ed4fa30624f1";
  homepage = "https://newsinfo.inquirer.net/tag/baguio-city";

  getArticlesUrl = async () => {
    await puppeteerHandler.init();
    const page = await puppeteerHandler.openPage(this.homepage);
    try {
      await page.waitForSelector("#inq-channel-left");
      const links: string[] = await page.evaluate(() => {
        return Array.from(
          document.querySelectorAll("#ch-ls-head > h2 > a")
        ).map((link: Element) => (link as HTMLAnchorElement).href);
      });
      await page.close();
      return links;
    } catch (e) {
      await page.close();
      console.error(e);
      throw new Error("Failed getting article URLs");
    }
  };

  scrape = async () => {
    try {
      const articles = await this.getArticlesUrl();
      await puppeteerHandler.close();
      const articlesData: Article[] = [];
      for (const articleUrl of articles) {
        const articleData = await extract(articleUrl);
        articlesData.push({
          ...articleData,
          newsSource: this.id,
        });
      }

      return articlesData;
    } catch(e) {
      console.error("error scraping", e)
      return []
    }
  };
}
