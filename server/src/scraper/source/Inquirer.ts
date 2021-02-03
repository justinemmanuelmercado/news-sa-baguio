import { Source } from './Source'
import { Page } from 'puppeteer'

export class Inquirer extends Source implements Source {
    name = 'Inquirer'
    id = 'e0e865b6-b2e9-4149-9e0b-ed4fa30624f1'
    homepage = 'https://newsinfo.inquirer.net/tag/baguio-city'

    getArticlesUrl = async (): Promise<string[]> => {
        const handler = async (page: Page): Promise<string[]> => {
            await page.waitForSelector('#inq-channel-left')
            const links: string[] = await page.evaluate(() => {
                return Promise.resolve(
                    Array.from(document.querySelectorAll('#ch-ls-head > h2 > a')).map(
                        (link: Element) => (link as HTMLAnchorElement).href,
                    ),
                )
            })
            return links
        }
        return await this.puppeteerHandler.handlePage(handler, this.homepage)
    }
}
