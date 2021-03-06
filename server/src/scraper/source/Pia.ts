import { Source } from './Source'
import { Page } from 'puppeteer'

export class Pia extends Source implements Source {
    name = 'PIA'
    id = 'edde96e9-2078-488e-8926-c4ecbd22f695'
    homepage = 'https://pia.gov.ph/news/regions/cordillera'

    getArticlesUrl = async (): Promise<string[]> => {
        const handler = async (page: Page): Promise<string[]> => {
            await page.waitForSelector('.list-articles')
            const links: string[] = await page.evaluate(() => {
                return Promise.resolve(
                    Array.from(document.querySelectorAll('.media-body > h3 > a')).map(
                        (link: Element) => (link as HTMLAnchorElement).href,
                    ),
                )
            })
            return links
        }
        return await this.puppeteerHandler.handlePage(handler, this.homepage)
    }
}
