const { Builder, By, Key, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const fs = require('fs')
const path = require('path')

const BASE_URL = process.env.APP_URL || 'http://localhost:3000'
const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots')

// garante que o diretorio existe e se nao cria-o
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, {recursive: true})

async function tiraFoto(name){
    try{
        const img = await driver.takeScreenshot()
        const file = path.join(SCREENSHOTS_DIR, `${name}.png`)
        fs.writeFileSync(filePath, img, 'base64')
        console.log(`Foto tirada ${name}.pmg`)
    }
    catch(e){
        console.warn('Erro ao tirar foto')
    }
}

async function main(){
    try{
        const opts = new chrome.Options()
        opts.addArguments(
            '--headless=new',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--window-size=800, 640',
            '--disable-gpu'
        )

        drive = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(opts)
        .build()

        await driver.manage().setTimeouts({ implicit: 5000, pageLoad: 15000})

        await driver.get(BASE_URL+ '/login')

        tiraFoto('Pagina_login')

        await driver.findElement(By.id('username')).sendKeys('Adm')
        await driver.findElement(By.id('password')).sendKeys('admin')

        tiraFoto('Dados_preenchidos')

        await driver.findElement(By.id('loginForm')).submit()

        await new Promise(r = setTimeout(r, 800))

        tiraFoto("Pagina_erro")

        const errMsg = await drive.findElement(By.css('.erro')).getText()
        if(!errMsg.includes('invalidos')) throw new Error(`Falha`)

    }finally{
        if(driver) await driver.quit()

    }
}

main().catch( err =>{
    console.log('Erro fatal', err)
    process.exit(1)
})