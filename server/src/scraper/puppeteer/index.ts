import puppeteer, { Browser, Page } from 'puppeteer'

export class PuppeteerHandler {
    private browser?: Browser
    private pages: Record<string, Page> = {}
    init = async (): Promise<void> => {
        if (!this.browser) {
            console.log('Opening the browser...')

            this.browser = await puppeteer.launch({
                headless: true,
                args: ['--disable-setuid-sandbox', '--single-process'],
                ignoreHTTPSErrors: true,
            })
            process.on('unhandledRejection', () => {
                console.error('Unhandled Rejection at: Promise')
            })
        }
    }

    handlePage = async <T>(pageHandler: (page: Page) => Promise<T>, url: string): Promise<T> => {
        if (!this.browser) {
            await this.init()
        }

        if (this.pages[url]) {
            this.pages[url].goto(url, { waitUntil: 'load', timeout: 0 })

            return await pageHandler(this.pages[url])
        } else if (this.browser && !this.pages[url]) {
            this.pages[url] = await this.browser?.newPage()
            this.pages[url].setUserAgent(
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
            )
            this.pages[url].goto(url, { waitUntil: 'load', timeout: 0 })
            return await pageHandler(this.pages[url])
        } else {
            throw new Error('Page and browser did not open correctly')
        }
    }

    closeBrowser = async (): Promise<void> => {
        for (const [index, page] of Object.entries(this.pages)) {
            console.log(`Closing page for ${index}`)
            await page.close()
            delete this.pages[index]
        }

        if (Object.keys(this.pages).length !== 0) {
            console.log('Pages did not close for some reason :/ ')
            console.log(Object.keys(this.pages).map((key) => `${key} is not closed`))
        }

        console.log('Closing browser...')
        await this.browser?.close()
    }
}

export const puppeteerHandler = new PuppeteerHandler()
