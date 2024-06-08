//import {differencesTablesObject} from "./DifferencesTables.js";

let course = [
    {totem: "Raton", nom: "PAHAYT", prenom: "Luc"},
    {totem: "Epagneul", nom: "MARTIJN", prenom: "Sven"},
    {totem: "Colibri", nom: "LING", prenom: "Riu"},
    {totem: "Ours", nom: "NGOMBE", prenom: "Dieumerci"},
    {totem: "Faucon", nom: "MALTESE", prenom: "Kurt"},
    {totem: "Tarentule", nom: "ARNEM", prenom: "Marthe"}
];

let pistes = [
    {totem: "Impala", nom: "KALHDOUN", prenom: "Mohammed"},
    {totem: "Raton", nom: "PAHAYT", prenom: "Luc"},
    {totem: "Bison", nom: "VANDENHOUT", prenom: "Lauren"},
    {totem: "Epagneul", nom: "MARTIJN", prenom: "Sven"},
    {totem: "Kiwi", nom: "BENASSOUR", prenom: "Sarah"},
    {totem: "Faucon", nom: "MALTESE", prenom: "Kurt"},
];

let answers = differencesTablesObject(course, pistes);

answers.push(...differencesTablesObject(pistes, course))

answers.sort((scout1, scout2) => scout1.totem.localeCompare(scout2.totem));

console.log(answers);

function differencesTablesObject(tab1, tab2){
    return tab1.filter(value => !tab2.find(piste => piste.totem === value.totem && piste.nom === value.nom && piste.prenom === value.prenom));
}
