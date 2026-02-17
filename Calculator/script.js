const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let current = "";
let previous = "";
let operator = "";

function updateDisplay() {
  display.value = current || previous || "0";
}

function appendNumber(num) {
  if (num === "." && current.includes(".")) return;
  current += num;
}

function chooseOperator(op) {
  if (current === "") return;
  if (previous !== "") calculate();
  operator = op;
  previous = current;
  current = "";
}

function calculate() {
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  if (isNaN(prev) || isNaN(curr)) return;

  let result;
  switch (operator) {
    case "+": result = prev + curr; break;
    case "-": result = prev - curr; break;
    case "x": result = prev * curr; break;
    case "÷": result = curr === 0 ? "Error" : prev / curr; break;
    default: return;
  }

  current = result.toString();
  previous = "";
  operator = "";
}

function clearAll() {
  current = "";
  previous = "";
  operator = "";
}

function deleteLast() {
  current = current.slice(0, -1);
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.innerText;

    if (!isNaN(value) || value === ".") appendNumber(value);
    else if (btn.dataset.operator) chooseOperator(btn.dataset.operator);
    else if (btn.dataset.action === "equals") calculate();
    else if (btn.dataset.action === "clear") clearAll();
    else if (btn.dataset.action === "delete") deleteLast();

    updateDisplay();
  });
});

updateDisplay();

document.addEventListener("keydown", e => {
  if (!isNaN(e.key) || e.key === ".") appendNumber(e.key);
  if (["+", "-", "*", "/"].includes(e.key)) {
    chooseOperator(
      e.key === "*" ? "x" :
      e.key === "/" ? "÷" :
      e.key === "-" ? "-" : "+"
    );
  }
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") deleteLast();
  if (e.key.toLowerCase() === "c") clearAll();
  updateDisplay();
});
