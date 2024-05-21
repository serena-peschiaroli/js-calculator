// setting up event listeners
document.addEventListener('DOMContentLoaded', () => {
    //selecting html elements for inpput and outout display
    const inputNumber = document.getElementById('input');
    const outputDisplay = document.getElementById('result');
    //keeping track of the number being typed

    let currentInput = '';
    //keeping track of the entire math expression 
    let expression = '';

    //function to update the display with current value
    const updateDisplay = (value) => {
        inputNumber.value = value;
    };

    //function to update the result display with current value
    const updateResult = (value) => {
        outputDisplay.textContent = value;
    };


    //handling number button clicks, adding the number to current input and update the display
    const handleNumber = (number) => {
        currentInput += number;
        updateDisplay(expression + currentInput);
    };

    //handlilng operator bnutton click, adding the current number and the operato to expression, then clears currentInput for next number
    const handleOperator = (operator) => {
        if (currentInput === '' && operator !== '-') return;
        expression += (currentInput || '0') + ' ' + operator + ' ';
        currentInput = '';
        updateDisplay(expression);
    };


    //ensure that only 1 decimal point can be added to current number for simplicity
    const handleDecimal = () => {
        if (!currentInput.includes('.')) {
            currentInput += currentInput ? '.' : '0.';
            updateDisplay(expression + currentInput);
        }
    };

    //evaluates the expression and updates the result display
    const handleEquals = () => {
        //check if current input is not empty
        if (currentInput) {
            //add the numbers to the expression
            expression += currentInput;
            //try to evaluate the expression and catch error
            try {
                //call evaluate the expression to calculate result and store in it result variable
                const result = evaluateExpression(expression);
                //update result display with result
                updateResult(result);
                //set  expression to result converted to string
                expression = result.toString();
                //clear current input
                currentInput = '';
            } catch {
                //catch arithmentical error like division by zero
                updateResult('Error');
            }
        }
    };

    //resets the calculator
    const handleClear = () => {
        currentInput = '';
        expression = '';
        updateDisplay('');
        updateResult('0');
    };
    //Deletes the last character of the current input
    const handleBackspace = () => {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(expression + currentInput);
    };

    //evaluates the expression by splitting into tokens and apply the correct operator in order of precedence (if 12 + 2 * 3 is inserted and * / have precedence over +, -)
    const evaluateExpression = (expr) => {
        const tokens = expr.split(' ');
        const values = [];
        const operators = [];

        const precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
        };

        //perform an operation using the last two number and the last operator from their stack
    
        const applyOperator = () => {
            //remove and get the last number from the values stack
            const right = values.pop();
            //remove and get the number before the last from the stak
            const left = values.pop();
            //remove and get last operator from the operators stack
            const operator = operators.pop();
            //perform operation to compute the result with left, operator and right
            values.push(performOperation(left, operator, right));
        };

        //iterate through tokens in the expression with for...of
        for (const token of tokens) {
            //if its a number convert the token to number 
            if (!isNaN(token)) {
                //if the token is a number push it to values 
                values.push(parseFloat(token));
                //else if it's a operator handle the precedence
            } else if (['+', '-', '*', '/'].includes(token)) {
                //apply last operator if it has hignher or equal precedence 
                while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                    applyOperator();
                }
                //push current operator to operators
                operators.push(token);
            }
        }

        //after processing all the tokens, apply any remainnig operators
        //as long as there are operatort in operators stack
        while (operators.length) {
            applyOperator();
        }

        return values[0];
    };

    const performOperation = (leftOperand, operator, rightOperand) => {
        switch (operator) {
            case '*':
                return leftOperand * rightOperand;
            case '/':
                if (rightOperand === 0) throw new Error('Division by zero');
                return leftOperand / rightOperand;
            case '+':
                return leftOperand + rightOperand;
            case '-':
                return leftOperand - rightOperand;
            default:
                return 0;
        }
    };

    // Event listeners for 
    //select all the element that have the data-number attribute
    document.querySelectorAll('[data-number]').forEach(button => {
        //add a click event to each number btn
        //event.target= element that was clicked
        //event.target.dataset value of data attribute (number of btn)
        button.addEventListener('click', (event) => handleNumber(event.target.dataset.number));
    });
    //select all the element that have the data-operator attribute
    document.querySelectorAll('[data-operator]').forEach(button => {
        button.addEventListener('click', (event) => handleOperator(event.target.dataset.operator));
    });

    document.querySelector('[data-decimal]').addEventListener('click', handleDecimal);
    document.querySelector('[data-equals]').addEventListener('click', handleEquals);
    document.querySelector('[data-clear]').addEventListener('click', handleClear);
    document.querySelector('[data-backspace]').addEventListener('click', handleBackspace);
});
