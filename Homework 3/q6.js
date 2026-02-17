function longestWord(str) {
  const words = str.split(' ');
  let longest = '';
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > longest.length) {
      longest = words[i];
    }
  }
  console.log(longest);
}

longestWord("'Web Development Tutorial");