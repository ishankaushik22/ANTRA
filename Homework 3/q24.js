function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; 
      }
    }
  }
  console.log(arr);
}

bubbleSort([12, 345, 4, 546, 122, 84, 98, 64, 9, 1]);
