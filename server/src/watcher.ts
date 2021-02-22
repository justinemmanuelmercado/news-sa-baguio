import { log } from 'console'
import { ToadScheduler, AsyncTask, SimpleIntervalJob } from 'toad-scheduler'
import { main } from './scraper'

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
