// Projeto aula ti 323. Cotuca 2026

const app = require('./src/app')

const PORT = process.env.PORT || 3000;

app.listen( PORT, () => {
    console.log(`-------------------------------`)
    console.log(`API Rodando na porta ${PORT}`)
    console.log(`Para testar: `)
    console.log(`http://localhost:${PORT}/health`)
    console.log(`-------------------------------`)
})