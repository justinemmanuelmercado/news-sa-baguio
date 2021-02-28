import chalk from 'chalk'

export const log = (message: string, topic = 'GENERAL', success = true): void => {
    const prefix = success ? chalk.green : chalk.red
    const msgMod = chalk.underline.bold
    const status = success ? 'SUCCESS' : 'FAILED'
    const currDate = new Date()
    const dateString = `${currDate.getDate()}/${currDate.getMonth()} - ${currDate.getHours()}:${currDate.getSeconds()}`

    console.log(`${prefix(`[${status}][${topic}][${dateString}]`)}: ${msgMod(message)} `)
}
