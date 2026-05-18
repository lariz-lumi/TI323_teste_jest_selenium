const {calcularArea} = require('../src/funcao')

describe('Teste com valores corretos', () => {
    test('Valores incorretos', () => {
        expect(() => calcularArea(-1,10).toThrow('valor Errado'))
    })

    test('Valores corretos', () => {
        expect(() => calcularArea(2,2).toBe(4))
    })
})