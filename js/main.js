// Carregar função para iniciar as chamadas
document.addEventListener('DOMContentLoaded', init, false)

//Inicia os métodos do arquivo nos elementos especificados
function init() {
    const screen = document.querySelector('.input-calculator')
    const corpoCalculadora = document.querySelector('.body-calculator')

    //methods
    corpoCalculadora.addEventListener('click', e => insertToTextInScreen(e))
}

function insertToTextInScreen(element) {
    const elementToInsert = document.querySelector('.result')
    const value = element.target.textContent
    defineValueOrFunction(elementToInsert, value)
}

function defineValueOrFunction(elementToInsert, valueClick){
    switch(valueClick){
        case('='):
            elementToInsert.innerHTML = makeResult(elementToInsert.textContent)
            break;
        case('AC'):
            elementToInsert.innerHTML = '' 
            break;
        default:
            elementToInsert.innerHTML += valueClick
    }
}

function makeResult(text) {

    let arrayText = text.split(' ')
    let valuePrev = ''
    let valueNext = ''
    let operator = ''


    arrayText.forEach(e => {
        if (Number.parseFloat(e)) {
            valueNext = valuePrev != ''  ? e : ''
            valuePrev = valuePrev == '' ? e : valuePrev
        }
        else {
            operator = e
        }

        if (operator != '' && valueNext != '' && valuePrev != '') {
            valuePrev = operations(operator, parseFloat(valuePrev), parseFloat(valueNext))
            operator = ''
            valueNext = ''
        }
    });

    return valuePrev
}

function operations(operator, value1, value2) {
    switch (operator) {
        case '+':
            return (value1 + value2).toFixed(2)
        case '-':
            return (value1 - value2).toFixed(2)
        case 'x':
            return (value1 * value2).toFixed(2)
        case '/':
            if (value2 == 0) return 0
            return (value1 / value2).toFixed(2)
        case '%':
            return ((value2 / 100) * value1).toFixed(2) 
    }
}