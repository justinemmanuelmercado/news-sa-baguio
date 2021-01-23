import { Inquirer } from './source/Inquirer'
import { Supabase } from './supabase'

(async () => {
  try {
    const inq = new Inquirer()
    const scraped = await inq.scrape(); 
    const supabase = new Supabase()
    await supabase.insertArticles(scraped)

  } catch (e) {
    console.error(e)
  }
})()