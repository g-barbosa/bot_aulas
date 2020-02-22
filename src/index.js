const Telegraf = require('telegraf')
const fs = require('fs')
const {printClass} = require('./printClass')
const express = require('express')
const expressApp = express()
require('dotenv/config')

const API_TOKEN = process.env.BOT_TOKEN || '';
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://bot-aulas.herokuapp.com/';

const bot = new Telegraf(process.env.BOT_TOKEN)

//bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
//expressApp.use(bot.webhookCallback(`/bot${API_TOKEN}`));

bot.start((ctx) => ctx.reply('Hello world'))
bot.command('aulas', async(ctx) => {
    ctx.reply('Vou verificar para você')
    try{
        await printClass
        ctx.replyWithPhoto({ source: fs.createReadStream('./aulas.png') });
    }
    catch(e){
        ctx.reply(e)
    }  
})


expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});
expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

bot.launch({
    webhook: {
      domain: 'https://bot-aulas.herokuapp.com',
      hookPath: '/RANDOM_ID',
      port: process.env.PORT
    }
  });