function getSubsets(arr, size) {
  const result = [];

  function backtrack(start, current) {
    if (current.length === size) {
      result.push([...current]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
}

console.log(getSubsets([1, 2, 3], 2));
