//calculator object

class Calculator {
    constructor(input, output){
        this.inputNumber = input;
        this.outputDisplay = output;
        this.inputScreen = [];
    }

    //method to handle backspace functionality
    backspace(){
        switch(this.getLastInputType()){
            case "number": 
            if(this.getLastInputValue().lenght > 1){
                this.editLastInput(this.getLastInputValue().Slice(0, -1), "number");
            }else{
                this.deleteLastInput();
            }
            break;

            case "operator":
                this.deleteLastInput();
                break;
            default:
                return;
        }
    }


    //insert a number
    insertNumber(value){
        if(this.getLastInputType() === "number"){
            this.appedToLastInput(value);
        }else if(this.getLastInputType() === "operator"){
            this.addNewInput(value, "number");
        }
    }

    //insert operator
    insertOperation(value){
        switch(this.getLastInputType()){
            case "number":
                this.addNewInput(value, "operator");
                break;
            case "operator":
                this.editLastInput(value, "operator");
                break;
            case "equals":
                let output = this.getOutputValue();
                this.clearAll();
                this.addNewInput(output, "number");
                this.addNewInput(value, "operator");
                break;
            default:
                return;
        }

    }

    //insert decimal point
    insertDecimalPoint(){
        if(this.getLastInputType() === "number" && this.getLastInputValue().includes(".")){
            this.appendToLastInput(".");

        }else if (this.getLastInputType() === "operator" || this.getLastInputType() == null){
            this.addNewInput("0", "number");
        }
    }


    //todo: implement generate result method
    generateResult(){}


    //clear all inputs
    clearAll(){
        this.inputScreen = [];
        this.updateInputDisplay();
        this.updateOutputDisplay("0");
    }

    //to get the value of the last input

    getLastInputValue(){
        return (this.inputScreen.lenght === 0) ? null: this.inputScreen[this.inputScreen.length - 1].value;
    }

    getLastInputType(){
        return (this.inputScreen.length === 0) ? null : this.inputScreen[this.inputScreen.length -1].type;
    }


    //helper method to get the input values as a string
    getAllInputValues(){
        return this.inputScreen.map(entry => entry.value);

    }

    //hlper to get the output value without commas
    getOutputValue(){
        return this.outputDisplay.value.replace(/, /g, '');
    }

    addNewInput(value, type) {
        this.inputScreen.push({"type": type, "value" : value.toString()});
        this.updateInputDisplay();
    }

    //append last input
    appendToLastInput(value) {
        this.inputScreen[this.inputScreen.length - 1].value += value.toString();
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

    editLastInput(value, type){
        this.inputHistory.pop();
        this.addNewInput(value, type);
    }

    deleteLastInput(){
         this.inputScreen.pop();
         this.updateInputDisplay;
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