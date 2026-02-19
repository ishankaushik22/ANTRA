function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}   

function calculate(num1, num2, operation) {
  return operation(num1, num2);
}

console.log(calculate(10, 5, add)); 
console.log(calculate(10, 5, subtract));
