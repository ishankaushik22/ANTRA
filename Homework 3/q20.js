function generateId(length) {
  const charList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charList.length);
    result += charList.charAt(randomIndex);
  }

  return result;
}

console.log(generateId(8));
