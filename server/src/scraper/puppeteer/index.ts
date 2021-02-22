import puppeteer, { Browser, Page } from 'puppeteer'
import { log } from '../logger'

export class PuppeteerHandler {
    private browser?: Browser
    private pages: Record<string, Page> = {}
    private topic = 'PUPPETEER'
    init = async (): Promise<void> => {
        if (!this.browser) {
            log('Opening the browser...', this.topic, true)

            this.browser = await puppeteer.launch({
                headless: true,
                args: ['--disable-setuid-sandbox', '--single-process'],
                ignoreHTTPSErrors: true,
            })
            process.on('unhandledRejection', (reason: Error) => {
                log('Unhandled Rejection at: Promise: ' + reason.message, this.topic, false)
            })
        }
    }

    handlePage = async <T>(pageHandler: (page: Page) => Promise<T>, url: string): Promise<T> => {
        if (!this.browser) {
            await this.init()
        }

        if (this.pages[url]) {
            this.pages[url].goto(url, { waitUntil: ['load', 'networkidle2'], timeout: 15000 })

            const result = await pageHandler(this.pages[url])
            await this.pages[url].close()
            return result
        } else if (this.browser && !this.pages[url]) {
            this.pages[url] = await this.browser?.newPage()
            this.pages[url].setUserAgent(
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
            )
            this.pages[url].goto(url, { waitUntil: ['load', 'networkidle2'], timeout: 15000 })
            const result = await pageHandler(this.pages[url])
            await this.pages[url].close()
            return result
        } else {
            throw new Error('Page and browser did not open correctly')
        }
    }

    closePage = async (url: string): Promise<void> => {
        log(`Closing page for ${url}`, this.topic, false)
        await this.pages[url].close()
    }

    closeBrowser = async (): Promise<void> => {
        log('Closing browser...', this.topic, false)
        await this.browser?.close()
    }
}

export const puppeteerHandler = new PuppeteerHandler()
