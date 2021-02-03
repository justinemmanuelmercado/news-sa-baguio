import { Source } from './Source'
import { Page } from 'puppeteer'

export class Herald extends Source implements Source {
    name = 'Herald Express'
    id = 'ec293a00-59ce-4d55-92ac-89379d3a41a0'
    homepage = 'https://www.baguioheraldexpressonline.com/category/city/'

    getArticlesUrl = async (): Promise<string[]> => {
        const handler = async (page: Page): Promise<string[]> => {
            await page.waitForSelector('#main')
            const links: string[] = await page.evaluate(() => {
                return Promise.resolve(
                    Array.from(document.querySelectorAll('header.entry-header > h2 > a')).map(
                        (link: Element) => (link as HTMLAnchorElement).href,
                    ),
                )
            })
            return links
        }
        return await this.puppeteerHandler.handlePage(handler, this.homepage)
    }
}
