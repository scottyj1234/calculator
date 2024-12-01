let leftOperand = null;
let rightOperand = null;
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
    return (b !== 0) ? a / b : "DIV/0 ERROR!";
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

function disableAll() {
    document.querySelectorAll("button").forEach((button) => {
        if (button.id !== "btnClear") {
            button.disabled = true;
        }
    })
}

function clearAll() {
    leftOperand = null;
    rightOperand = null;
    operator = null;
    allToClear = false;
    displayToClear = false;
    displayValue = "0";
    displayElement.textContent = displayValue;

    document.querySelectorAll("button").forEach(button => button.disabled = false)
}

function addDigit(numberCharacter) {
    // "=" was last pressed and result on screen. any digit pressed after this results in clean slate.
    if (allToClear) clearAll();

    // if displayToClear is true, then an operator was pressed and we are showing the previous value up until they start entering the next value
    if (displayValue === "0" || displayToClear) {
        rightOperand = null;
        displayValue = numberCharacter;
        displayToClear = false;
    } else {
        displayValue += numberCharacter;
    }
    displayElement.textContent = displayValue;
}

function operatorEntry(operatorPressed) {
    if (operatorPressed === '=') {
        // '=' pressed but no operator has been pressed; do nothing
        if (operator === null) return;

        if (rightOperand === null) {
            rightOperand = Number(displayValue);
        }
        leftOperand = operate(leftOperand, rightOperand, operator);
        if (leftOperand === "DIV/0 ERROR!") {
            disableAll();
            displayElement.textContent = leftOperand
            return;
        }

        displayValue = String(leftOperand)
        displayElement.textContent = displayValue;
        allToClear = true;
        return;
    }

    if (leftOperand !== null && rightOperand === null) {
        rightOperand = Number(displayValue);
        leftOperand = operate(leftOperand, rightOperand, operator);
        if (leftOperand === "DIV/0 ERROR!") {
            disableAll();
            displayElement.textContent = leftOperand;
            return;
        }

        operator = operatorPressed;
        displayValue = String(leftOperand);
        displayElement.textContent = displayValue;
    } else {
        leftOperand = Number(displayValue);
        operator = operatorPressed;
    }

    allToClear = false;
    displayToClear = true;
}

function addDecimalAttempt() {

    if (allToClear) clearAll();

    // if displayToClear is true, then an operator was pressed and we are showing the previous value up until they start entering the next value
    if (displayValue === "0" || displayToClear) {
        rightOperand = null;
        displayValue = "0.";
        displayToClear = false;
    } else {
        if (displayValue.includes(".")) return;
        displayValue += ".";
    }
    displayElement.textContent = displayValue;
}