import chalk from 'chalk'

export const log = (message: string, topic = 'GENERAL', success = true): void => {
    const prefix = success ? chalk.green.bold : chalk.red.bold
    const msgMod = chalk.underline
    const status = success ? 'SUCCESS' : 'FAILED'

    console.log(`${prefix(`[${status}]`, `[${topic}]`, ':')} ${msgMod(message)}`)
}
