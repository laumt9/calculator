let firstOperand = '';
let secondOperand = '';
let operator = null;
let shouldResetDisplay = false;

const prevOperand = document.getElementById('prevOperand');
const currentOperand = document.getElementById('currentOperand');
const operatorBtns = document.querySelectorAll('[data-operator]');
const numberBtns = document.querySelectorAll('[data-number]');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const posNegBtn = document.getElementById('posNegBtn');
const equalsBtn = document.getElementById('equalsBtn');

clearBtn.addEventListener('click', () => clear());
deleteBtn.addEventListener('click', () => deleteNum());
posNegBtn.addEventListener('click', () => posNeg());
equalsBtn.addEventListener('click', () => equals());

numberBtns.forEach((button) => {
    button.addEventListener('click', () => appendInput(button.textContent))
})

operatorBtns.forEach((button) => {
    button.addEventListener('click', () => setOperator(button.textContent))
})

function appendInput(userInput) {
    if (userInput === '.' && currentOperand.textContent.includes('.')) return
    if (currentOperand.textContent === '0' || shouldResetDisplay) resetCurrentDisplay()
    currentOperand.textContent += userInput
}

function setOperator(userOperator) { 
    if (currentOperand.textContent === '') return
    if (operator !== null) equals()
    firstOperand = currentOperand.textContent
    operator = userOperator
    prevOperand.textContent = `${firstOperand} ${operator}`
    shouldResetDisplay = true
}

function equals() {
    if (operator === null) return
    if (operator === '÷' && currentOperand.textContent === '0') {
        alert('You cannot divide by 0!')
        return
    }
    secondOperand = currentOperand.textContent
    currentOperand.textContent = operate(operator, firstOperand, secondOperand)
    prevOperand.textContent = `${firstOperand} ${operator} ${secondOperand}`
    operator = null
}

function clear() {
    currentOperand.textContent = '0'
    prevOperand.textContent = ''
    firstOperand = ''
    secondOperand = ''
    operator = null
}

function deleteNum() {
    currentOperand.textContent = currentOperand.textContent.toString().slice(0,-1)
}

function posNeg() {
    currentOperand.textContent = currentOperand.textContent * -1
}

function add(a,b) {
    return a + b
}

function subtract(a,b) {
    return a - b
}

function multiply(a,b) {
    return a * b
}

function divide(a,b) {
    return a / b
}

function operate(operator, a, b) { 
    a = Number(a)
    b = Number(b)
    if (operator === '+') {
        return add(a,b)
    } else if (operator === '-') {
        return subtract(a,b)
    } else if (operator === 'x') {
        return multiply(a,b) 
    } else if (operator === '÷') {
        if (b === '0') return 'Error'
        else return divide(a,b) 
    } else {
        return null
    }
}

function resetCurrentDisplay() {
    currentOperand.textContent = ''
    shouldResetDisplay = false
}