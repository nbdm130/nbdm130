document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button");

    let currentInput = "";
    let currentExpression = "";
    let previousInput = "";

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const value = button.textContent;

            if (isNumber(value) || value === ".") {
                currentInput += value;
                currentExpression += value;
                display.value = currentExpression;
            } else if (value === "C") {
                clear();
            } else if (value === "CE") {
                backspace();
            } else if (isOperator(value)) {
                if (currentInput !== "") {
                    if (previousInput === "") {
                        previousInput = currentInput;
                        currentInput = "";
                        currentOperator = value;
                        currentExpression += " " + value + " ";
                        display.value = currentExpression;
                    } else {
                        previousInput = operate(previousInput, currentInput, currentOperator);
                        currentInput = "";
                        currentOperator = value;
                        currentExpression = previousInput + " " + value + " ";
                        display.value = currentExpression;
                    }
                }
            } else if (value === "=") {
                if (currentInput !== "" && previousInput !== "") {
                    currentInput = operate(previousInput, currentInput, currentOperator);
                    previousInput = "";
                    currentOperator = "";
                    currentExpression += " = " + currentInput;
                    display.value = currentExpression;
                }
            }
        });
    });

    function isNumber(value) {
        return !isNaN(value) || value === ".";
    }

    function isOperator(value) {
        return ["+", "-", "*", "/"].includes(value);
    }

    function clear() {
        currentInput = "";
        currentOperator = "";
        previousInput = "";
        currentExpression = "";
        display.value = "";
    }

    function backspace() {
        if (currentInput !== "") {
            currentInput = currentInput.slice(0, -1);
            currentExpression = currentExpression.slice(0, -1);
            display.value = currentExpression;
        }
    }

    function operate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case "+":
                return (a + b).toString();
            case "-":
                return (a - b).toString();
            case "*":
                return (a * b).toString();
            case "/":
                return (a / b).toString();
            default:
                return b;
        }
    }
});
