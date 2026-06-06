let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    updateDisplay();
}

function appendOperator(operator) {
    // Prevent multiple operators in a row
    if (expression === '' && operator !== '-') return;
    
    // Allow negative numbers
    if (expression === '' && operator === '-') {
        expression = '-';
    } else if (expression && !isOperator(expression[expression.length - 1])) {
        expression += operator;
    } else if (expression && expression[expression.length - 1] === '-' && operator !== '-') {
        expression = expression.slice(0, -1) + operator;
    } else if (expression && isOperator(expression[expression.length - 1]) && operator === '-') {
        expression += operator;
    }
    
    updateDisplay();
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

function backspace() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function updateDisplay() {
    display.value = expression || '0';
}

function calculate() {
    if (expression === '' || isOperator(expression[expression.length - 1])) {
        return;
    }
    
    try {
        // Use Function instead of eval for better practice
        let result = Function('"use strict"; return (' + expression + ')')();
        
        // Round to avoid floating point errors
        result = Math.round(result * 100000000) / 100000000;
        
        expression = result.toString();
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Allow keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        appendOperator(key);
    } else if (key === '.') {
        appendNumber(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        backspace();
    } else if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    }
});

// Initialize display
updateDisplay();
