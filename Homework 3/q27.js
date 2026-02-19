function longestPalindrome(str) {
  let longest = "";

  const expand = (left, right) => {
    while (left >= 0 && right < str.length && str[left] === str[right]) {
      left--;
      right++;
    }
    return str.slice(left + 1, right);
  };

  for (let i = 0; i < str.length; i++) {
    const odd = expand(i, i);
    if (odd.length > longest.length) {
      longest = odd;
    }

    const even = expand(i, i + 1);
    if (even.length > longest.length) {
      longest = even;
    }
  }

  return longest;
}

console.log(longestPalindrome("abracadabra"));