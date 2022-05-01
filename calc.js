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
    if (!lastOperator) {
        lastOperator = operator;
        lastNumber = displayValue;
    } else {
        const evaluation = operate(lastOperator, lastNumber, displayValue);
        display.textContent = evaluation.toString();
        lastOperator = operator;
        lastNumber = evaluation;
    }
    clearNumber = true;
}

function numberClickHandling(number) {
    if (clearNumber){
        display.textContent = "";
        clearNumber = false;
    }
    display.textContent = display.textContent.concat(number);
}

let clearNumber = false;
const display = document.querySelector('.display');
let lastOperator = null; // stores current operator
let lastNumber = null;
let repeatOperation = null;

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
    const displayValue = Number.parseFloat(display.textContent);
    if (lastOperator){
        const repeatOperator = lastOperator // used for creating repeatOperation
        repeatOperation = (a) => operate(repeatOperator, a, displayValue);
        const evaluation = operate(lastOperator, lastNumber, displayValue);
        display.textContent = evaluation.toString();
        lastOperator = null;
        clearNumber = true;
    } else if (repeatOperation) {
        const evaluation = repeatOperation(displayValue);
        display.textContent = evaluation.toString();
    }
});

document.querySelector('#clear').addEventListener('click', (e) => {
    lastOperator = null;
    display.textContent = "0";
})

document.querySelector('#N0').addEventListener('click', (e) => numberClickHandling(0));
document.querySelector('#N1').addEventListener('click', (e) => numberClickHandling(1));
document.querySelector('#N2').addEventListener('click', (e) => numberClickHandling(2));
document.querySelector('#N3').addEventListener('click', (e) => numberClickHandling(3));
document.querySelector('#N4').addEventListener('click', (e) => numberClickHandling(4));
document.querySelector('#N5').addEventListener('click', (e) => numberClickHandling(5));
document.querySelector('#N6').addEventListener('click', (e) => numberClickHandling(6));
document.querySelector('#N7').addEventListener('click', (e) => numberClickHandling(7));
document.querySelector('#N8').addEventListener('click', (e) => numberClickHandling(8));
document.querySelector('#N9').addEventListener('click', (e) => numberClickHandling(9));

document.querySelector('#decimal').addEventListener('click', (e) => {
    if (display.textContent.includes('.')) return;

    if (clearNumber) {
        numberClickHandling(0);
    }

    display.textContent = display.textContent.concat('.');
})