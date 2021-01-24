import { Inquirer } from "./source/Inquirer";
import { Herald } from './source/Herald';
import { Supabase } from "./supabase";
import { puppeteerHandler } from "./puppeteer";

(async () => {
  const inq = new Inquirer(puppeteerHandler);
  const he = new Herald(puppeteerHandler);
   
  const scraped = [...(await inq.scrape()), ...(await he.scrape())];

  const supabase = new Supabase();
  await supabase.insertArticles(scraped);
  await puppeteerHandler.closeBrowser();
})();
