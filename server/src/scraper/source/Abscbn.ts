import { PuppeteerHandler } from '../puppeteer'
import { Source } from './Source'
import { Page } from 'puppeteer'

export class Abscbn extends Source implements Source {
    constructor(public puppeteerHandler: PuppeteerHandler) {
        super()
    }

    name = 'ABS CBN'
    id = '5da76358-defe-42bc-8ada-252532b83180'
    homepage = 'https://news.abs-cbn.com/list/tag/baguio'

    getArticlesUrl = async (): Promise<string[]> => {
        const handler = async (page: Page): Promise<string[]> => {
            page.goto(this.homepage, { waitUntil: 'load', timeout: 0 })
            await page.waitForSelector('.articles')
            const links: string[] = await page.evaluate(() => {
                return Promise.resolve(
                    Array.from(document.querySelectorAll('.articles > article > a')).map(
                        (link: Element) => (link as HTMLAnchorElement).href,
                    ),
                )
            })
            return links
        }
        return await this.puppeteerHandler.handlePage(handler)
    }
}
