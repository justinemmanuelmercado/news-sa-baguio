import { Inquirer } from './source/Inquirer'
import { Herald } from './source/Herald'
import { Supabase } from './supabase'
import { puppeteerHandler } from './puppeteer'
import { Sunstar } from './source/Sunstar'
import { Abscbn } from './source/Abscbn'
import { Pia } from './source/Pia'
;(async () => {
    console.log('SCRAPING STARTED')

    await puppeteerHandler.init()
    const supabase = new Supabase()

    const inq = new Inquirer(puppeteerHandler, supabase)
    const he = new Herald(puppeteerHandler, supabase)
    const sunstar = new Sunstar(puppeteerHandler, supabase)
    const abs = new Abscbn(puppeteerHandler, supabase)
    const pia = new Pia(puppeteerHandler, supabase)

    await Promise.all([
        inq.scrapeAndInsert(),
        he.scrapeAndInsert(),
        sunstar.scrapeAndInsert(),
        abs.scrapeAndInsert(),
        pia.scrapeAndInsert(),
    ]).catch((e) => {
        console.log(`Failed scraping`, e)
    })

    await puppeteerHandler.closeBrowser()
    console.log('SCRAPING ENDED')
})()
