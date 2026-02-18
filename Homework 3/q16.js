function uniqueChar(str) {
  const unique = new Set(str);
  const result = [...unique].join('');
  
  console.log(result);
}

uniqueChar("thequickbrownfoxjumpsoverthelazydog");