function countVowels(str) {
    let count = 0;
    const vowels = 'aeiou';
    for (let char of str.toLowerCase()) {
        if (vowels.includes(char)) {
            count++;
        }
    }

    console.log(count);
}
    
countVowels('The quick brown fox');