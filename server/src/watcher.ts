import { main } from './scraper'
import cron from 'node-cron'

const task = cron.schedule('* */6 * * *', () => {
    const toRun = async () => {
        await main()
    }
    toRun()
})

task.start()
