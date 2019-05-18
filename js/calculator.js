//CALCULTOR

//data storage
const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  //
};

//Input digit
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator; //object destructuring syntax
  //if calculator is waiting for the second operand, update display value
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false; 
  } else if (displayValue === '0') {
      calculator.displayValue = digit;
    } else {
      calculator.displayValue = displayValue + digit;
    }
}

//
function inputDecimal(dot) {
  //do not allow a second decimal point to be entered if waiting for second operand is true
	if (calculator.waitingForSecondOperand === true) return;
  
  // If the `displayValue` does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator //get values from calculator 
  const inputValue = parseFloat(displayValue); //convert display string to float
  
  //Overwrite operator if an existing operator exists but a number hasn't been input
  if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    return;
  }
  //If firstOperand is null update from input
  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
    //else if operator in not null, set current value = to first operand and perform calculation.
  } else if (operator) {
    const currentValue = firstOperand || 0; //cuurent value equals firstOperand unless it is null or zero
    const result = performCalculation[operator](currentValue, inputValue); //look up operator in performCalculation and carry out method with currentValue and inputValue

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;//calculator is now waiting for second input
  calculator.operator = nextOperator;//update operator to key that was clicked
}

//perform calculations
const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '**': (firstOperand, secondOperand) => firstOperand ** secondOperand,

  'x**(1/y)': (firstOperand, secondOperand) => Math.pow(firstOperand,1/secondOperand),

  '**2': (firstOperand, secondOperand) => firstOperand ** 2,

  '**(1/2)': (firstOperand, secondOperand) => firstOperand ** 0.5,
};

//All Clear
function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

// Update the display
function updateDisplay() {
  const display = document.querySelector('.calculator-screen'); //get screen element
  display.value = calculator.displayValue; 
  console.log(calculator.displayValue);
  console.log(calculator);
}
updateDisplay();

//Add event listeners
const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {
    const { target } = event; //object destructuring syntax... target = event.target
    
    //check that click was a button
    if (!target.matches('button')) {
      return;
    }
    //check if click was an operator
    if (target.classList.contains('operator')) {
      handleOperator(target.value);
      updateDisplay();
      return;
    }

    //check if click was a decimal point
    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }
    
    //check if AC was pushed
    if (target.classList.contains('all-clear')) {
      resetCalculator();
      updateDisplay();
      return;
    }

    inputDigit(target.value); //
    updateDisplay();
});

