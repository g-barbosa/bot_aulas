const Telegraf = require('telegraf')
const printClass = require('./printClass')
require('dotenv/config')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('O que deseja saber?'))
bot.command('aulas', async(ctx) => {
    ctx.reply('Vou verificar para você')
    const aulas =  await printClass
    aulas.forEach((diaSemana, cont) => {
      let dia = ""
      if (cont == 0) dia = 'Segunda:'
      if (cont == 1) dia = 'Terça:'
      if (cont == 2) dia = 'Quarta:'
      if (cont == 3) dia = 'Quinta:'
      if (cont == 4) dia = 'Sexta:'

      ctx.reply(`
      ${dia}\n
      Matéria${diaSemana.materia}\n
      Prof : ${diaSemana.prof}\n
      Sala1${diaSemana.sala1}\n
      Sala2${diaSemana.sala2}`)
    })
})

bot.launch({
    webhook: {
      domain: 'https://bot-aulas.herokuapp.com',
      hookPath: '/RANDOM_ID',
      port: process.env.PORT
    }
  });
