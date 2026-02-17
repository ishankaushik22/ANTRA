function computeFactors(num) {
  if (num <= 0) {

    return;
  }
  let factors=[];
  for (let i = 1; i <= num / 2; i++) {
    if (num % i === 0) {
      factors.push(i);
    }
  }
  factors.push
  console.log(factors);
}

computeFactors(24); 
computeFactors(17); 
