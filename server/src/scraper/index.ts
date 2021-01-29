import { Inquirer } from './source/Inquirer'
import { Herald } from './source/Herald'
import { Supabase } from './supabase'
import { puppeteerHandler } from './puppeteer'
import { Sunstar } from './source/Sunstar'
import { Abscbn } from './source/Abscbn'
import { Pia } from './source/Pia'
import { Source } from './source/Source'
;(async () => {
    await puppeteerHandler.init()
    const inq = new Inquirer(puppeteerHandler)
    const he = new Herald(puppeteerHandler)
    const sunstar = new Sunstar(puppeteerHandler)
    const abs = new Abscbn(puppeteerHandler)
    const pia = new Pia(puppeteerHandler)

    const toScrape: Source[] = [inq, he, sunstar, abs, pia]

    const supabase = new Supabase()

    for (const scrapee of toScrape) {
        console.log(`Processing ${scrapee.name}`)
        try {
            const scraped = await scrapee.getArticleData()
            await supabase.insertArticles(scraped)
        } catch (e) {
            console.error(`Failed to scrape ${scrapee.name}`)
            console.error(e)
        }
        console.log(`Ending ${scrapee.name}`)
    }

    await puppeteerHandler.closeBrowser()
})()
