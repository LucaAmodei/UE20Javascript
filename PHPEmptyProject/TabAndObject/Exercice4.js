let resultats = [
    {nom: "Bakaire", prenom: "Joséphina", interro: 15, qcm: 8, projet: 13.9, examen: 38.2},
    {nom: "Dhour", prenom: "Youssunn", interro: 16, qcm: 4.6, projet: 14.7, examen: 31.9},
    {nom: "Dupont", prenom: "Marcel", interro: 8.5, qcm: 7, projet: 12.6, examen: 26.8},
    {nom: "Mei", prenom: "Linn", interro: 6, qcm: 7.5, projet: 13, examen: 22.6},
    {nom: "Potte", prenom: "Henri", interro: "PP", qcm: 2.6, projet: 8.2, examen: 16.6}
];

let moyenneParEtutdian = getMoyenneByStudent(resultats);
let moyenne = getMoyenne(moyenneParEtutdian)
let bestStudent = getBestStudent(moyenneParEtutdian)
let worstStudent = getWorstStudent(moyenneParEtutdian)
console.log(moyenneParEtutdian)
console.log("La moyenne est de " + moyenne + "/20")
console.log("La meilleure cote est de " + bestStudent.cote + "/20 (" + bestStudent.nom + ")")
console.log("La meilleure cote est de " + worstStudent.cote + "/20 (" + worstStudent.nom + ")")

console.log(getMoyenneCoteArrondies(moyenneParEtutdian))
function getMoyenneByStudent(tab) {
    let result = [];
    tab.forEach(value => {
        let tmp = {nom: value.nom, prenom: value.prenom, cote: Math.round(((value.interro + value.qcm + value.projet + value.examen)/5) * 100) / 100}
        result.push(tmp)
    });

    return result;
}

function getMoyenne(tab) {
    let avg = 0

    tab.forEach(value => {
        if (!isNaN(value.cote)) {
            avg += value.cote
        }
    })
    return Math.round(avg / tab.length * 100) / 100;
}


function getBestStudent(moyenneParEtutdian) {
    return moyenneParEtutdian.sort((a, b) => {
        b.cote - a.cote
    })[0];
}


function getWorstStudent(moyenneParEtutdian) {
    return moyenneParEtutdian.sort((a, b) => {
        b.cote - a.cote
    })[moyenneParEtutdian.filter(value => !isNaN(value.cote)).length - 1];
}


/* Exercice 5
* */

function getMoyenneCoteArrondies(tab) {
    let result = 0
    let count = 0
    tab.forEach(value => {
        let roundValue = Math.round(value.cote)
        if(roundValue >= 10) {
            result += roundValue
            console.log(roundValue)
            count++
        }
    })
    console.log(count)
    return Math.round((result / count) * 100) / 100
}
