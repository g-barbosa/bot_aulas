const Telegraf = require('telegraf')
const fs = require('fs')
const {printClass} = require('./printClass')
require('dotenv/config')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Hello world'))
bot.command('aulas', async(ctx) => {
    ctx.reply('Vou verificar para você')
    await printClass
    ctx.replyWithPhoto({ source: fs.createReadStream('./aulas.png') });
})

bot.launch()