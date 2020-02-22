const Telegraf = require('telegraf')
const fs = require('fs')
const {printClass} = require('./printClass')
require('dotenv/config')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Hello world'))
bot.command('aulas', async(ctx) => {
    ctx.reply('Vou verificar para você')
    try{
        await printClass
    }
    catch(e){
        ctx.reply(e)
    }
        
    ctx.replyWithPhoto({ source: fs.createReadStream('./aulas.png') });
})

bot.telegram.setWebhook('https://bot-aulas.herokuapp.com')