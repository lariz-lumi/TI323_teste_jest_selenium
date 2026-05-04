//ponto de declaração das APIS 

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())

// fazemos uma entrada para verse o servidor esta no ar
app.get('/health', (req, res) => {
    res.json(
        {
            status: 'ok',
            timestamp: new Date().toISOString()
        }
    )
})

module.exports = app;