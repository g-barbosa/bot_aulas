const Telegraf = require('telegraf')
const printClass = require('./printClass')
require('dotenv/config')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('O QUE DESEJA SABER?'))
bot.command('aulas', async(ctx) => {
    ctx.reply('Vou verificar para você')
    const dia = ""
    const aulas =  await printClass
    aulas.forEach((diaSemana, cont) => {
      if (cont.valueOf = 0) dia = 'Segunda:'
      if (cont.valueOf = 1) dia = 'Terça:'
      if (cont.valueOf = 2) dia = 'Quarta:'
      if (cont.valueOf = 3) dia = 'Quinta:'
      if (cont.valueOf = 4) dia = 'Sexta:'

      ctx.reply(`
      ${dia}\n
      Matéria${diaSemana.materia}\n
      Prof: ${diaSemana.prof}\n
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
