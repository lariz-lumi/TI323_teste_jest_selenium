function calcularArea(a,b){
    if ((a<=0) || (b<=0)) throw new Error('Valor errado')
    
    return a * b;
}

module.exports = {calcularArea}