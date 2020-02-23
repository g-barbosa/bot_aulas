const Telegraf = require('telegraf')
const printClass = require('./printClass')
require('dotenv/config')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('O QUE DESEJA SABER?'))
bot.command('aulas', async(ctx) => {
    ctx.reply('Vou verificar para você')
    const aulas =  await printClass
    ctx.reply(`
    SEGUNDA:\n
    MATERIA: ${aulas[0].materia}\n
    PROF: ${aulas[0].prof}\n
    SALA1: ${aulas[0].sala1}\n
    SALA2: ${aulas[0].sala2}`)
    ctx.reply(`
    TERÇA:\n
    MATERIA: ${aulas[1].materia}\n
    PROF: ${aulas[1].prof}\n
    SALA1: ${aulas[1].sala1}\n
    SALA2: ${aulas[1].sala2}`)
    ctx.reply(`
    QUARTA:\n
    MATERIA: ${aulas[2].materia}\n
    PROF: ${aulas[2].prof}\n
    SALA1: ${aulas[2].sala1}\n
    SALA2: ${aulas[2].sala2}`)
    ctx.reply(`
    QUINTA:\n
    MATERIA: ${aulas[3].materia}\n
    PROF: ${aulas[3].prof}\n
    SALA1: ${aulas[3].sala1}\n
    SALA2: ${aulas[3].sala2}`)
    ctx.reply(`
    SEXTA:\n
    MATERIA: ${aulas[4].materia}\n
    PROF: ${aulas[4].prof}\n
    SALA1: ${aulas[4].sala1}\n
    SALA2: ${aulas[4].sala2}`)
})

bot.launch({
    webhook: {
      domain: 'https://bot-aulas.herokuapp.com',
      hookPath: '/RANDOM_ID',
      port: process.env.PORT
    }
  });
