function multiplesOccurences(myTab) {
    return myTab.filter((x, i) => {
        return myTab.findIndex(y => y === x) !== i
    }).filter((value, index) => myTab.findIndex(y => y === value) !== index).sort();
}

//Test avec 3 fois 5
let tab = [5,2,36,9,45,5,7,6,12,9,26, 5]
let answer = multiplesOccurences(tab)
console.log(answer)

//Test avec rien
let tab2 = [9,5]
let answer2 = multiplesOccurences(tab2)
console.log(answer2)

//Test vide
console.log(multiplesOccurences([]))
