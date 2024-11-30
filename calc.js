let leftOperand = null;
let rightOperand = null;
let operator = null;

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

const displayElement = document.querySelector("div.display");
let displayValue = "0";

const numberButtons = document.querySelectorAll("button.numberButton");
numberButtons.forEach((button) => button.addEventListener("click", (e) => {
    addDigit(button.textContent);
}))

function addDigit(numberCharacter) {
    if (displayValue === "0") {
        displayValue = numberCharacter;
    } else {
        displayValue += numberCharacter;
    }
    displayElement.textContent = displayValue;
}

