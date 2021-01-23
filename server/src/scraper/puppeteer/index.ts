import puppeteer, { Browser, Page } from "puppeteer";

export class PuppeteerHandler {
  private browser?: Browser;
  constructor() {}

  init = async () => {
    try {
      console.log("Opening the browser...");
      if (!this.browser) {
        this.browser = await puppeteer.launch({
          headless: true,
          args: ["--disable-setuid-sandbox"],
          ignoreHTTPSErrors: true,
        });
      }
    } catch (e) {
      console.error(e);
      throw new Error("Could not create a browser instance");
    }
  };

  openPage = async (url?: string): Promise<Page> => {
    if (!this.browser) {
      await this.init();
    }
    const page = await this.browser?.newPage();
    if (page) {
      if (url) {
        console.log(`Opening new page ${url}`);
        page?.goto(url);
      } else {
        console.log(`Opening new page`);
      }
      return page;
    } else {
      throw new Error("Could not open page");
    }
  };

  close = async () => {
    console.log("Closing browser");
    await this.browser?.close();
  };
}
