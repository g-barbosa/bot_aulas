const puppeteer = require('puppeteer')
require('dotenv/config')

const classPage = 'https://account.impacta.edu.br/aluno/quadro-horario.php?turmaid=MDE2TVRVNE1qTTVNekE1TWc9PU5qUXdNdz09&produto=MDE2TVRVNE1qTTVNekE1TWc9PU5UYz0='

const printClass = async() => {
    const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
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
const classPage = 'https://account.impacta.edu.br/aluno/quadro-horario.php?turmaid=MDE2TVRVNE1qTTVNekE1TWc9PU5qUXdNdz09&produto=MDE2TVRVNE1qTTVNekE1TWc9PU5UYz0='
    await page.goto(classPage, { waitUntil: 'networkidle0' })
    await page.screenshot({
        path: 'aulas.png',
        fullPage: true
    })
    await browser.close()
}

module.exports = printClass()
