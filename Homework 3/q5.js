function caps(n){
    const words = n.split(' ');
    const capital = words.map(word => {
        let letter=word.charAt(0).toUpperCase();
        return letter + word.slice(1);
    });
    const result = capital.join(' ');
    console.log(result);
}

caps("the quick brown fox");

    

