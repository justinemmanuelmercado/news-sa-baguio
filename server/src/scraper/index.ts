import { Inquirer } from "./source/Inquirer";
import { Supabase } from "./supabase";

(async () => {
  const inq = new Inquirer();
  const scraped = await inq.scrape();
  const supabase = new Supabase();
  await supabase.insertArticles(scraped);
})();
