function reverseNumber(x) {
    let reversed = 0;
    while(x!==0){
        let lastDigit = x % 10;
        reversed = reversed * 10 + lastDigit;
        x = Math.floor(x / 10);
    }
    console.log(reversed);  
}

reverseNumber(12345);