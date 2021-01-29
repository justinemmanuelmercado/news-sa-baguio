import puppeteer, { Browser, Page } from 'puppeteer'

export class PuppeteerHandler {
    private browser?: Browser
    private page?: Page
    init = async (): Promise<void> => {
        if (!this.browser) {
            console.log('Opening the browser...')

            this.browser = await puppeteer.launch({
                headless: true,
                args: ['--disable-setuid-sandbox', '--single-process'],
                ignoreHTTPSErrors: true,
            })
            process.on('unhandledRejection', (reason, p) => {
                console.error('Unhandled Rejection at: Promise', p, 'reason:', reason)
                this.browser?.close()
            })
            this.page = await this.browser.newPage()
        }
    }

    handlePage = async <T>(pageHandler: (page: Page) => Promise<T>): Promise<T> => {
        if (!this.browser) {
            await this.init()
        }
        if (this.page) {
            return await pageHandler(this.page)
        } else {
            throw new Error('Page did not open correctly')
        }
    }

    closeBrowser = async (): Promise<void> => {
        console.log('Closing page...')
        console.log('Closing browser...')
        await this.page?.close()
        await this.browser?.close()
    }
}

export const puppeteerHandler = new PuppeteerHandler()
