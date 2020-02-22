const Telegraf = require('telegraf')
const fs = require('fs')
const {printClass} = require('./printClass')
const express = require('express')
const expressApp = express()
require('dotenv/config')

const bot = new Telegraf(process.env.BOT_TOKEN)
const API_TOKEN = process.env.BOT_TOKEN || '';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://bot-aulas.herokuapp.com/';

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

bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
bot.startWebhook(`/bot${API_TOKEN}`, null, PORT)