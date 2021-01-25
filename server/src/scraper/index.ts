import { Inquirer } from "./source/Inquirer";
import { Herald } from "./source/Herald";
import { Supabase } from "./supabase";
import { puppeteerHandler } from "./puppeteer";
import { Sunstar } from "./source/Sunstar";
import { Abscbn } from "./source/Abscbn";
import { Pia } from "./source/Pia";

(async () => {
  const inq = new Inquirer(puppeteerHandler);
  const he = new Herald(puppeteerHandler);
  const sunstar = new Sunstar(puppeteerHandler);
  const abs = new Abscbn(puppeteerHandler);
  const pia = new Pia(puppeteerHandler);

  const scraped = [
    ...(await inq.scrape()),
    ...(await he.scrape()),
    ...(await sunstar.scrape()),
    ...(await abs.scrape()),
    ...(await pia.scrape()),
  ];
  const supabase = new Supabase();
  await supabase.insertArticles(scraped);
  await puppeteerHandler.closeBrowser();
})();
