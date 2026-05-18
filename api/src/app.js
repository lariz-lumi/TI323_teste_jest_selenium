// ponto de declaração das API's

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

// fazemos uma entrada para ver se o servidor está no ar
app.get('/health', (req, res) => { 
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    })
})

app.post('/api/calcular', (req, res) => {
    try{
        const { calcularArea } = require('./funcao')
        const dados = req.body

        if (!dados || typeof dados !== 'object'){
            return res.status(400).json({error: 'Corpo da requisição errado'})
        }

        const {altura = 0, largura = 0} = dados

        if(altura <= 0) throw new Error('Altura com valor errado')
        if(largura <= 0) throw new Error('Largura com valor errado')

        let resultado = 0
        resultado = altura * largura
        
        return res.status(200).json({success: true, data: resultado})
    }
    catch(err){
        console.log(err)
        res.status(400).json({sucess: false, data: "Erro"})
    }
})

module.exports = app