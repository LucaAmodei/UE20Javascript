
export function differencesTables(tab1, tab2) {
    let answers = []
    tab1.forEach(value => {
        if (tab2.indexOf(value) === -1) {
            answers.push(value)
        }
    })
    tab2.forEach(value => {
        if (tab1.indexOf(value) === -1) {
            answers.push(value)
        }
    })

    return answers
}
//Correction de thilleux
//TODO return arr1.filter(item => !arr2.includes(item)).concat(arr2.filter(item => !arr1.includes(item)));

let a = ["a","b","c","d","e","f"];
let b = ["a","b","j","j"];
let c = ["b","a"];
let d = [];

console.log(differencesTables(a,b)); //[ 'c', 'd', 'e', 'f', 'j', 'j' ]
console.log(differencesTables(a,c)); //[ 'c', 'd', 'e', 'f' ]
console.log(differencesTables(a,d)); //[ 'a', 'b', 'c', 'd', 'e', 'f' ]
console.log(differencesTables(a,a)); //[]