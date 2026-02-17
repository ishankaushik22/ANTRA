function findSecondLowestAndGreatest(arr) {
  const Sorted = [...new Set(arr)].sort((a, b) => a - b);

  if (Sorted.length < 2) {
    console.log("Array needs at least two unique numbers.");
    return;
  }
  else if (Sorted.length === 2) {
    console.log(`${Sorted[1]},${Sorted[0]}`);
    return;
  }

  const secondLowest = Sorted[1];
  const secondGreatest = Sorted[Sorted.length - 2];

  console.log(`${secondLowest},${secondGreatest}`);
}

findSecondLowestAndGreatest([1, 2, 3, 4, 5]);
findSecondLowestAndGreatest([1,1,2,2]);
