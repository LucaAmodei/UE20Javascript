function multiplesOccurences(myTab) {
    let tab = [];
    let answer = [];
    myTab.forEach((value) => {
        if (tab.indexOf(value) !== -1 && answer.indexOf(value) === -1) {
            answer.push(value)
        } else {
            tab.push(value)
        }
    })
    return answer;
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
