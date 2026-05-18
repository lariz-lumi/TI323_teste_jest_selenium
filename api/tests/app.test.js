//app.jest.js
//
//. Teste da API
/*
describe('', () => {aaa})


aaa:
    test('', async () => { })
    test('', async () => {})
*/

const request = require('supertest')
const app = require('../src/app')

describe('Teste para ver se a API está ok (Saude)', () => {
    test('Deve retornar 200 e status ok', async () => {
        const res = await request(app).get('/health')
        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe('ok')
    })
})