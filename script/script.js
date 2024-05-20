//calculator object

class Calculator {
    constructor(input, output){
        this.inputNumber = input;
        this.outputDisplay = output;
        this.inputScreen = [];
    }

    backspace(){}

    insertNumber(value){
        if(this.getLastInputType() === "number"){
            this.appedToLastInput(value);
        }else if(this.getLastInputType() === "operator"){
            this.addNewInput(value, "number");
        }
    }

    insertOperation(){}

    insertDecimalPoint(){}

    generateResult(){}

    clearAll(){
        this.inputScreen = [];
        this.updateInputDisplay();
        this.updateOutputDisplay("0");
    }


    getLastInputValue(){
        return (this.inputScreen.lenght === 0) ? null: this.inputScreen[this.inputScreen.lenght - 1].type;
    }

    getLastInputType(){
        return (this.inputScreen.length === 0) ? null : this.inputScreen[this.inputScreen.length -1].type;
    }


    getAllInputValues(){
        return this.inputScreen.map(entry => entry.value);

    }

    addNewInput(value, type) {
        this.inputScreen.push({ value, type });
    }

    appendToLastInput(value) {
        this.inputScreen[this.inputScreen.length - 1].value += value;
    }

    replaceLastInput(value, type) {
        this.inputScreen[this.inputScreen.length - 1] = { value, type };
}

    updateInputDisplay(){
        this.inputNumber.value = this.getAllInputValues().join("");
    }

    updateOutputDisplay(value){
        this.outputDisplay.value = Number(value).toLocaleString();

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