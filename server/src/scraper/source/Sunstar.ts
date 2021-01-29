import { PuppeteerHandler } from "../puppeteer";
import { Source } from "./Source";
import { extract } from "article-parser";
import { Article } from "../article";
import { Page } from "puppeteer";

export class Sunstar extends Source implements Source {
  constructor(public puppeteerHandler: PuppeteerHandler) {
    super();
  }

  name = "Sunstar";
  id = "b19eac3c-9fe1-4abd-b146-75fbaa431c12";
  homepage = "https://www.sunstar.com.ph/BAGUIO";

  getArticlesUrl = async () => {
    const handler = async (page: Page): Promise<string[]> => {
      page.goto(this.homepage, { waitUntil: "load", timeout: 0 });
      await page.waitForSelector(".container");

      const links: string[] = await page.evaluate(() => {
        const carousellLinks = Array.from(
          document.querySelectorAll(
            ".owl-thumbs > .owl-thumb-item > .img-thumb > a"
          )
        ).map((link: Element) => (link as HTMLAnchorElement).href);

        const topLinks = Array.from(
          document.querySelectorAll(
            ".topStoriesArticles > .content-row > .col-left > a.ratio"
          )
        ).map((link: Element) => (link as HTMLAnchorElement).href);

        Array.prototype.push.apply(carousellLinks, topLinks);

        return carousellLinks;
      });

      return links;
    };
    return await this.puppeteerHandler.handlePage(handler);
  };
}
