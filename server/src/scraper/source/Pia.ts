import { PuppeteerHandler } from "../puppeteer";
import { Source } from "./Source";
import { extract } from "article-parser";
import { Article } from "../article";
import { Page } from "puppeteer";

export class Pia extends Source implements Source {
  constructor(public puppeteerHandler: PuppeteerHandler) {
    super();
  }

  name = "Philippine Information Agency";
  id = "edde96e9-2078-488e-8926-c4ecbd22f695";
  homepage = "https://pia.gov.ph/news/regions/cordillera";

  getArticlesUrl = async () => {
    const handler = async (page: Page): Promise<string[]> => {
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
    };
    return await this.puppeteerHandler.handlePage(handler);
  };
}
