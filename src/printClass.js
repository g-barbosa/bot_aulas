const puppeteer = require('puppeteer')
const cloudinary = require('cloudinary')
require('dotenv/config')

const classPage = 'https://account.impacta.edu.br/aluno/quadro-horario.php?turmaid=MDE2TVRVNE1qTTVNekE1TWc9PU5qUXdNdz09&produto=MDE2TVRVNE1qTTVNekE1TWc9PU5UYz0='

const printClass = async() => {
    
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process'
      ],
    });
    const page = await browser.newPage()
    await page.goto('https://account.impacta.edu.br/', { waitUntil: 'networkidle0' })
    await page.type('#deslogin', process.env.RA);
    await page.type('#dessenhalogin', process.env.CPF);
    await Promise.all([
        await page.keyboard.press('Enter'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
]);
    await page.keyboard.press('Escape')
    await page.goto(classPage, { waitUntil: 'networkidle0' })
    const aulas = await page.evaluate(() => {
      let infos = []
      let aulas = document.getElementsByClassName('dia-semana-content')
      let listaAulas = Object.values(aulas)
      listaAulas.forEach(a => {
          let dias = {
              materia: a.children[1].nextSibling.data,
              prof: a.children[4].firstChild.data,
              sala1: a.children[6].nextSibling.data,
              sala2: a.children[22].nextSibling.data
          }
          infos.push(dias)
      })
      return infos
  })
    await browser.close()
    return aulas
}

module.exports = printClass()
