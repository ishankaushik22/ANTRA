function isPerfect(number) {
  if (number <= 0) {
    console.log("It is not a perfect number.");
    return;
  }
  let sum = 0;
  for (let i = 1; i <= number / 2; i++) {
    if (number % i === 0) {
      sum += i;
    }
  }

  if (sum === number) {
    console.log("It is a perfect number.");
  } else {
    console.log("It is not a perfect number.");
  }
}

isPerfect(6);
isPerfect(28);
isPerfect(100);
