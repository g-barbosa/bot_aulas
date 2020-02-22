const puppeteer = require('puppeteer')
const cloudinary = require('cloudinary')
require('dotenv/config')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const classPage = 'https://account.impacta.edu.br/aluno/quadro-horario.php?turmaid=MDE2TVRVNE1qTTVNekE1TWc9PU5qUXdNdz09&produto=MDE2TVRVNE1qTTVNekE1TWc9PU5UYz0='

const printClass = async() => {
    
    const cloudinary_options = { 
      public_id: `aulas`
    };

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
    await page.goto(classPage, { waitUntil: 'networkidle0' })
    
    let shotResult = await page.screenshot({
        fullPage: true
    }).then((result) => {
        console.log(`got some results.`);
        return result;
    }).catch(e => {
        console.error(`Error in snapshotting news`, e);
        return false;
    });

    await browser.close()

    if (shotResult){
        return cloudinaryPromise(shotResult, cloudinary_options);
      }else{
        return null;
      }

    function cloudinaryPromise(shotResult, cloudinary_options){
        return new Promise(function(res, rej){
          cloudinary.v2.uploader.upload_stream(cloudinary_options,
            function (error, cloudinary_result) {
              if (error){
                console.error('Upload to cloudinary failed: ', error);
                rej(error);
              }
              res(cloudinary_result);
            }
          ).end(shotResult);
        });
      }
}

module.exports = printClass()
