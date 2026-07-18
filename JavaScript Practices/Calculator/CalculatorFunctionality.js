const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');
let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    handleButtonClick(value);
  });
});