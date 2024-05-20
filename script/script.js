//calculator object

class Calculator {
    constructor(input, output){
        this.inputNumber = input;
        this.outputDisplay = output;
        this.inputScreen = [];
    }

    backspace(){}

    insertNumber(value){}

    insertOperation(){}

    insertDecimalPoint(){}

    generateResult(){}

    clearAll(){
        this.inputScreen = [];
        this.updateInputDisplay();
        this.updateOutputDisplay("0");
    }
}


const inputNumber = document.getElementById("input");
const outputDisplay = document.getElementById("result");
const allClearBtn = document.querySelector(".clear");
const backSpaceBtn = document.querySelector(".back-space");
const operationButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".number");
const decimalButton = document.querySelector(".decimal");
const equalsButton = document.querySelector(".equals");


const calculator = new Calculator(inputNumber, outputDisplay);


allClearBtn.addEventListener("click", () => {
    calculator.clearAll();
} );

backSpaceBtn.addEventListener("click", () =>{
    calculator.backspace();
});


operationButtons.forEach(button => {
    button.addEventListener('click', (event) =>{
        calculator.insertOperation(event.target.innerText);
    });
});

numberButtons.forEach(button => {
    button.addEventListener('click', (event) =>{
        calculator.insertNumber(event.target.innerText);
    });
});

equalsButton.addEventListener('click', () => {
    calculator.generateResult();
});


decimalButton.addEventListener('click', () =>{
    calculator.insertDecimalPoint();
});