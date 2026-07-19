const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let justCalculated = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    handleButtonClick(value);
  });
});

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) || key === '.') {
    handleButtonClick(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    handleButtonClick(key);
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    handleButtonClick('=');
  } else if (key === 'Backspace') {
    handleBackspace();
  } else if (key === 'Escape') {
    handleButtonClick('C');
  }
});

// Step 6: Main logic — decides what to do based on the button pressed
function handleButtonClick(value) {
  if (value === 'C') {
    clearDisplay();
  } else if (value === '=') {
    calculateResult();
  } else {
    appendValue(value);
  }
}

// Step 7: Clear everything back to a blank display
function clearDisplay() {
  currentInput = '';
  justCalculated = false;
  updateDisplay();
}

function appendValue(value) {
  if (justCalculated) {
    currentInput = '';
    justCalculated = false;
  }

  const operators = ['+', '-', '*', '/'];

  // Prevent two operators in a row (e.g. stops "12++" from happening)
  const lastChar = currentInput.slice(-1);
  if (operators.includes(value) && operators.includes(lastChar)) {
    // Replace the last operator instead of adding another one
    currentInput = currentInput.slice(0, -1) + value;
  } else {
    currentInput += value;
  }

  updateDisplay();
}

// Step 9: Evaluate the expression when "=" is pressed
function calculateResult() {
  if (currentInput === '') return;

  try {
    // Block anything that isn't a number, operator, or decimal point
    // (basic safety check before using eval)
    if (!/^[0-9+\-*/.]+$/.test(currentInput)) {
      throw new Error('Invalid characters');
    }

    let result = eval(currentInput);

    // Handle divide-by-zero and other non-finite results
    if (!isFinite(result)) {
      throw new Error('Math error');
    }

    // Round long decimals so the display doesn't overflow
    result = Math.round(result * 100000000) / 100000000;

    currentInput = result.toString();
  } catch (error) {
    currentInput = 'Error';
  }

  justCalculated = true;
  updateDisplay();
}

// Step 10: Handle Backspace — remove the last character typed
function handleBackspace() {
  if (justCalculated) {
    clearDisplay();
    return;
  }
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

// Step 11: Push the current input string onto the actual display input box
function updateDisplay() {
  display.value = currentInput;
}