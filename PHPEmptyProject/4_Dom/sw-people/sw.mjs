/*
    Ce fichier importe le fichier de données sw-people-list.mjs ainsi que le fichier sw-personna.js.
    Dans ce fichier, créez les fonctions nécessaires pour placer les gestionnaires d'événements et adapter le DOM en conséquence....
*/
import {peopleList} from "/PHPEmptyProject/4_Dom/sw-people/sw-people-list.mjs";
import {PersonaInYear} from "/PHPEmptyProject/4_Dom/sw-people/sw-persona.mjs";

function GetPersonasFromPeople() {
    var row = document.getElementById("rows");
    var count = 0;
    while (count < peopleList.count) {
        var persona = createPersona(peopleList.results[count]);
        var tr = document.createElement("tr");
        var tdName = document.createElement("td");
        tdName.textContent = persona.name;
        tr.append(tdName)
        var tdHeight = document.createElement("td");
        tdHeight.textContent = persona.height;
        tr.append(tdHeight)
        var tdMass = document.createElement("td");
        tdMass.textContent = persona.mass;
        tr.append(tdMass)
        var tdAge = document.createElement("td");
        tdAge.textContent = persona.age;
        tr.append(tdAge)
        var tdGender = document.createElement("td");
        tdGender.textContent = persona.gender;
        tr.append(tdGender)
        var tdBMI = document.createElement("td");
        tdBMI.textContent = persona.BMI;
        tr.append(tdBMI)
        var tdFMI = document.createElement("td");
        tdFMI.textContent = persona.FMI;
        tr.append(tdFMI)



        row.append(tr)
        count++;
    }
}

function createPersona(result) {
    var persona = new PersonaInYear(result, result['birth_year']);

    return persona;
}

GetPersonasFromPeople();