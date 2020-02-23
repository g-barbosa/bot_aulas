const Telegraf = require('telegraf')
const {printClass} = require('./printClass')
const express = require('express')
require('dotenv/config')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Hello world'))
bot.command('sobre', (ctx) => ctx.reply('bot para pegar informações das aulas'))
bot.command('aulas', async(ctx) => {
    ctx.reply('Vou verificar para você')
    const aulas = printClass()
    ctx.reply(aulas[0].materia)
})

bot.launch({
    webhook: {
      domain: 'https://bot-aulas.herokuapp.com',
      hookPath: '/RANDOM_ID',
      port: process.env.PORT
    }
  });
