function findFirstNonRepeatedChar(str) {
  const charCounts = {};

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    charCounts[char] = (charCounts[char] || 0) + 1;
  }
  console.log(charCounts); 

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (charCounts[char] === 1) {
      return char;
    }
  }
  return null;
}

console.log(findFirstNonRepeatedChar('abacddbec'));
console.log(findFirstNonRepeatedChar('hello')); 
