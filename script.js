//your code here
const calculator = {
    display: document.querySelector('#input'),
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };
  
  function inputDigit(digit) {
    const { display, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.display.value = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.display.value = display.value === '0' ? digit : display.value + digit;
    }
  }
  
  function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) return;
  
    if (!calculator.display.value.includes(dot)) {
      calculator.display.value += dot;
    }
  }
  
  function handleOperator(nextOperator) {
    const { firstOperand, display, operator } = calculator;
    const inputValue = parseFloat(display.value);
  
    if (operator
        && calculator.waitingForSecondOperand) {
            calculator.operator = nextOperator;
            return;
          }
        
          if (firstOperand === null) {
            calculator.firstOperand = inputValue;
          } else if (operator) {
            const result = performCalculation[operator](firstOperand, inputValue);
        
            calculator.display.value = String(result);
            calculator.firstOperand = result;
          }
        
          calculator.waitingForSecondOperand = true;
          calculator.operator = nextOperator;
        }
        
        const performCalculation = {
          '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
          '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
          '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
          '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
          '=': (firstOperand, secondOperand) => secondOperand,
        };
        
        function resetCalculator() {
          calculator.display.value = '0';
          calculator.firstOperand = null;
          calculator.waitingForSecondOperand = false;
          calculator.operator = null;
        }
        
        function updateDisplay() {
          const { display, operator, firstOperand, waitingForSecondOperand } = calculator;
        
          if (waitingForSecondOperand === true) {
            display.value = firstOperand + ' ' + operator;
          }
        }
        
        const keys = document.querySelectorAll('button');
        keys.forEach(key => key.addEventListener('click', (event) => {
          const { target } = event;
          const value = target.textContent;
          if (target.id === 'ans') {
            handleOperator('=');
            updateDisplay();
            return;
          }
        
          if (target.id === 'clr') {
            resetCalculator();
            updateDisplay();
            return;
          }
        
          if (value === '.') {
            inputDecimal(value);
            updateDisplay();
            return;
          }
        
          if (value === '+' || value === '-' || value === '*' || value === '/') {
            handleOperator(value);
            updateDisplay();
            return;
          }
        
          inputDigit(value);
          updateDisplay();
        }));