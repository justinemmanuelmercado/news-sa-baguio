import { PuppeteerHandler } from "../puppeteer";
import { Source } from "./Source";
import { extract } from "article-parser";
import { Article } from "../article";

export class Inquirer implements Source {
  constructor() {}
  puppeteerHandler = new PuppeteerHandler();
  name = "Inquirer";
  id = "e0e865b6-b2e9-4149-9e0b-ed4fa30624f1";
  homepage = "https://newsinfo.inquirer.net/tag/baguio-city";

  getArticlesUrl = async () => {
    try {
      const puppeteerHandler = this.puppeteerHandler;
      await puppeteerHandler.init();
      const page = await puppeteerHandler.openPage(this.homepage);
      await page.waitForSelector("#inq-channel-left");
      const links: string[] = await page.evaluate(() => {
        return Array.from(
          document.querySelectorAll("#ch-ls-head > h2 > a")
        ).map((link: Element) => (link as HTMLAnchorElement).href);
      });
      return links;
    } catch (e) {
      console.error("Failed getting article URLs", e);
      return [];
    }
  };

  scrape = async () => {
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
  };
}
