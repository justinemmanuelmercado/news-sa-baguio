import { Inquirer } from './source/Inquirer'
import { Herald } from './source/Herald'
import { Supabase } from './supabase'
import { puppeteerHandler } from './puppeteer'
import { Sunstar } from './source/Sunstar'
import { Abscbn } from './source/Abscbn'
import { Pia } from './source/Pia'
import { log } from './logger'
;(async () => {
    log('SCRAPING STARTED')

    await puppeteerHandler.init()
    const supabase = new Supabase()
    await supabase.initSkipUrls()

    await Promise.all([
        new Inquirer(puppeteerHandler, supabase).scrapeAndInsert(),
        new Herald(puppeteerHandler, supabase).scrapeAndInsert(),
        new Sunstar(puppeteerHandler, supabase).scrapeAndInsert(),
        new Abscbn(puppeteerHandler, supabase).scrapeAndInsert(),
        new Pia(puppeteerHandler, supabase).scrapeAndInsert(),
    ]).finally(async () => {
        await puppeteerHandler.closeBrowser()
        log('SCRAPING ENDED')
    })
})()
