import { Inquirer } from './source/Inquirer'
import { Herald } from './source/Herald'
import { Supabase } from './supabase'
import { puppeteerHandler } from './puppeteer'
import { Sunstar } from './source/Sunstar'
import { Abscbn } from './source/Abscbn'
import { Pia } from './source/Pia'
import { log } from './logger'
import { ToadScheduler, SimpleIntervalJob, AsyncTask } from 'toad-scheduler'

const main = async () => {
    log('SCRAPING STARTED, ' + new Date().toString())

    await puppeteerHandler.init()
    const supabase = new Supabase()
    await supabase.initSkipUrls()

    await Promise.all([
        new Inquirer(puppeteerHandler, supabase).scrapeAndInsert(),
        new Herald(puppeteerHandler, supabase).scrapeAndInsert(),
        new Sunstar(puppeteerHandler, supabase).scrapeAndInsert(),
        new Abscbn(puppeteerHandler, supabase).scrapeAndInsert(),
        new Pia(puppeteerHandler, supabase).scrapeAndInsert(),
    ])
        .finally(async () => {
            await puppeteerHandler.closeBrowser()
            log('SCRAPING ENDED, ' + new Date().toString())
            log('\n\n')
        })
        .catch((e) => {
            log('SCRAPING THREW SOMEWHERE HERE', 'MAIN', false)
            log(e.message, 'MAIN', false)
        })
}

const scheduler = new ToadScheduler()

const task = new AsyncTask(
    'Scraping',
    () => {
        return main()
    },
    (err) => {
        log('Failed to scrape', 'MAIN', false)
    },
)

const job = new SimpleIntervalJob({ hours: 3 }, task)
scheduler.addSimpleIntervalJob(job)
