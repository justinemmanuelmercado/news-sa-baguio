import puppeteer, { Browser, Page } from "puppeteer";

export class PuppeteerHandler {
  private browser?: Browser;
  private page?: Page;
  constructor() {}

  init = async () => {
    try {
      console.log("Opening the browser...");
      if (!this.browser) {
        this.browser = await puppeteer.launch({
          headless: true,
          args: ["--disable-setuid-sandbox", "--single-process"],
          ignoreHTTPSErrors: true,
        });
      }
    } catch (e) {
      console.error(e);
      throw new Error("Could not create a browser instance");
    }
  };

  handlePage = async <T>(
    pageHandler: (page: Page) => Promise<T>
  ): Promise<T> => {
    if (!this.browser) {
      await this.init();
    }
    if (this.page) {
      return await pageHandler(this.page);
    } else {
      this.page = await this.browser?.newPage();
      if (this.page) {
        return await pageHandler(this.page!);
      } else {
        throw new Error("Cannot open page");
      }
    }
  };

  closeBrowser = async () => {
    console.log("Closing page...");
    console.log("Closing browser...");
    await this.page?.close();
    await this.browser?.close();
  };
}

export const puppeteerHandler = new PuppeteerHandler();
