function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b === 0 ? "DIVIDE BY 0 ERROR" : a / b;
}

function equals(currentOperator, b) {
    return () => currentOperator(b);
}

function operate(operator, a, b) {
    return operator(a, b);
}

function operatorClickHandling(operator) {
    const displayValue = Number.parseFloat(display.textContent);
    if (!currentOperator) {
        currentOperator = (b) => operate(operator, displayValue, b);
    } else {
        const evaluation = currentOperator(displayValue);
        display.textContent = evaluation.toString();
        currentOperator = (b) => operate(operator, evaluation, b);
    }
}

const display = document.querySelector('.display');
let currentOperator = null; // stores current operator

document.querySelector('#add').addEventListener('click', (e) => {
    operatorClickHandling(add);
});

document.querySelector('#subtract').addEventListener('click', (e) => {
    operatorClickHandling(subtract);
});

document.querySelector('#multiply').addEventListener('click', (e) => {
    operatorClickHandling(multiply);
});

document.querySelector('#divide').addEventListener('click', (e) => {
    operatorClickHandling(divide);
});

document.querySelector('#equals').addEventListener('click', (e) => {
    if (currentOperator){
        const displayValue = Number.parseFloat(display.textContent);
        const evaluation = currentOperator(displayValue);
        display.textContent = evaluation;
        currentOperator = null;
    }
});