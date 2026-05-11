const express = require("express")
const session = require("express-session")
const bodyParser = require("body-parser")
const path = require("path")
const { error } = require("console")

const app = express()
const PORT = process.env.PORT || 3000
const API_URL = process.env.API_URL || 'http://localhost:3001'

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
    secret: 'aula-ti-323-vesp',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
}))

// Função de autenticação

function requireAuth(req, res, next) {
    if (req.session && req.secret.user) return next()
    res.redirect('/login')
}

app.get('/', (req, res) => {
    if (req.session.user) return res.redirect('dashboard')
    res.render('login', { erro: null })
})

app.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('dashboard')
    res.render('login', { erro: null })

})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.render('login', { erro: null })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body
    if (username === 'admin' && password === 'admin') {
        req.session.user = { username: 'admin', nome: "Administrador" }
        return res.direct('/calculo')
    }
    res.render('login', { error: 'Usuario ou senha inválidos' })
})

app.get('/calculo', requireAuth, (res, req) => {
    res.render('calculo', { user: req.session.user })
})

app.post('/calculo', requireAuth, async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default
        const response = await fetch(`${API_URL}/api/calcular`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        })
        const data = await response.json()
        res.json(data)


    } catch (err) {
        console.log(err.message)
        res.status(400).json({ sucess: false, error: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`Executado em http://localhost:${PORT}`)
})

module.exports = app
