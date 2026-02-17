function amountToCoins(amount, coins) {
  const result = [];
  
  for (let i = 0; i < coins.length; i++) {
    while (amount >= coins[i]) {
      amount -= coins[i];
      result.push(coins[i]);
    }
  }

  console.log(result.join(', '));
}

amountToCoins(46, [25, 10, 5, 2, 1]);
