let leftOperand = null;
let operator = null;
let displayToClear = false;
let allToClear = false;

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
    return a / b;
}

function operate(leftOperand, rightOperand, operator) {
    switch (operator) {
        case "+":
            return add(leftOperand, rightOperand);
        
        case "-":
            return subtract(leftOperand, rightOperand);
        
        case "*":
            return multiply(leftOperand, rightOperand);
        
        case "/":
            return divide(leftOperand, rightOperand);
    
        default:
            console.error(`Critical error: Invalid operator: ${operator}`);
            return null;
    }
}

// starting value for display
const displayElement = document.querySelector("div.display");
let displayValue = "0";

// setup numerical buttons
const numberButtons = document.querySelectorAll("button.numberButton");
numberButtons.forEach((button) => button.addEventListener("click", (e) => {
    addDigit(button.textContent);
}))

// setup operator buttons
const operatorButtons = document.querySelectorAll("button.operatorButton");
operatorButtons.forEach((button) => button.addEventListener("click", (e) => {
    operatorEntry(button.textContent);
}))

// decimal button
document.querySelector("button#btnDecimal").addEventListener("click", (e) => {
    addDecimalAttempt();
})

// clear button
document.querySelector("button#btnClear").addEventListener("click", (e) => {
    clearAll();
})

function clearAll() {
    leftOperand = null;
    rightOperand = null;
    operator = null;
    allToClear = false;
    displayToClear = false;
    displayValue = "0";
    displayElement.textContent = displayValue;
}

function addDigit(numberCharacter) {
    // "=" was last pressed and result on screen. any digit pressed after this results in clean slate.
    if (allToClear) clearAll();

    // if displayToClear is true, then an operator was pressed and we are showing the previous value up until they start entering the next value
    if (displayValue === "0" || displayToClear) {
        displayValue = numberCharacter;
    } else {
        displayValue += numberCharacter;
    }
    displayElement.textContent = displayValue;
}

function operatorEntry(operatorPressed) {
    if (operatorPressed === '=') {
        leftOperand = operate(leftOperand, rightOperand, operator);
        displayValue = String(leftOperand)
        displayElement.textContent = displayValue;
        allToClear = true;
        return;
    }

    if (leftOperand !== null) {
        rightOperand = Number(displayValue);
        leftOperand = operate(leftOperand, rightOperand, operator);
        operator = operatorPressed;
        displayValue = String(leftOperand);
    } else {
        leftOperand = Number(displayValue);
        operator = operatorPressed;
    }

    displayToClear = true;
}

function addDecimalAttempt() {
    if (displayValue.includes(".")) return;
    displayValue += ".";
    displayElement.textContent = displayValue;
}