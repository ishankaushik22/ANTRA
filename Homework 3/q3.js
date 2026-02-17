function stringCombo(str){
    let combinations = [];
    for(let i=0; i<str.length; i++){
        for(let j=i+1; j<=str.length; j++){
            combinations.push(str.slice(i,j));
        }
    }
    console.log(combinations);
}
stringCombo("dog");