function getElementsLargerThan(arr, limit) {
  return arr.filter(element => element > limit);
}


const numbers = [1, 5, 10, 15, 20];
const threshold = 10;

console.log(getElementsLargerThan(numbers, threshold));