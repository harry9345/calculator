let $ = document;

let calculator = $.getElementById("calculator");
let keys = $.getElementById("calculatorKeys");
let display = $.getElementById("monitor");

keys.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    let key = event.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    let previousKeyType = calculator.dataset.previousKeyType;
    // --- if its a number
    if (!action) {
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }
    // if its decimal sign
    if (action === "decimal") {
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (
        previousKeyType === "oprator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
    }

    // --- if its an operator
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      let firstValue = calculator.dataset.firstValue;
      let operator = calculator.dataset.operator;
      let secondValue = displayedNum;
      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        let calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }
      key.classList.add("isDepressed");
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
      calculator.dataset.previousKeyType = "operator";
    }
    // ---- if its equual sign
    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      let operator = calculator.dataset.operator;
      let secondValue = displayedNum;
      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
    }

    //---- if its clear sing
    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "Ac";
      }

      calculator.dataset.previousKeyType = "clear";
    }
    if (action !== "clear") {
      let clearBtn = calculator.querySelector("[data-action=clear]");
      clearBtn.textContent = "CE";
    }

    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("isDepressed")
    );
  }
});

const calculate = (num1, operator, num2) => {
  let result = "";
  if (operator === "add") {
    result = parseFloat(num1) + parseFloat(num2);
  } else if (operator === "subtract") {
    result = parseFloat(num1) - parseFloat(num2);
  } else if (operator === "multiply") {
    result = parseFloat(num1) * parseFloat(num2);
  } else if (operator === "divide") {
    result = parseFloat(num1) / parseFloat(num2);
  }
  return result;
};
