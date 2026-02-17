
function getType(value) {
  if (value === null) {
    return 'null';
  }
  return typeof value;
}


console.log(`${getType(42)}`);
console.log(`${getType("hello")}`);
console.log(`${getType(undefined)}`);
console.log(`${getType(null)}`);
//note for self: ${} converts result directly to string