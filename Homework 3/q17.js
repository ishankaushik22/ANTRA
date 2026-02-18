function countOccurrences(str) {
  const occurrences = {};
  for (let char of str) {
    occurrences[char] = (occurrences[char] || 0) + 1;
  }

  console.log(occurrences);
}

countOccurrences("thequickbrownfoxjumpsoverthelazydog");
