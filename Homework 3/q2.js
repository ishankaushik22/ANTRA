function palindrome(x){
    let i=0;
    let j=x.length-1;
    while(i<j){
        if(x[i]!==x[j]){
            console.log("Not a palindrome");
            return;
        }
        i++;
        j--;
    }   
    console.log("Palindrome");
}

palindrome(12321);
palindrome("madam");
palindrome("nurse");