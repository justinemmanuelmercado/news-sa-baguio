import { log } from 'console'
import { ToadScheduler, AsyncTask, SimpleIntervalJob } from 'toad-scheduler'
import { main } from './scraper'

const scheduler = new ToadScheduler()

const task = new AsyncTask(
    'Scraping',
    async () => {
        return await main()
    },
    (err) => {
        log('Failed to scrape', 'MAIN', false)
    },
)

const job = new SimpleIntervalJob({ hours: 6 }, task)
scheduler.addSimpleIntervalJob(job)
