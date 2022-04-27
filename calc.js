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

function operate(operator, a, b) {
    return operator(a, b);
}

const display = document.querySelector('.display');
let previousValue = 0;   // stores previous value prior to pressing an operator button
let currentOperator = null; // stores current operator

document.querySelector('#add').addEventListener('click', (e) => {
    if (!currentOperator) {
        currentOperator = add;
        previousValue = Number.parseFloat(display.textContent);
    } else {
        const currentValue = Number.parseFloat(display.textContent);
        const evaluation = currentOperator(previousValue, currentValue);
        display.textContent = evaluation.toString();
        currentOperator = add;
        previousValue = evaluation;
    }
});