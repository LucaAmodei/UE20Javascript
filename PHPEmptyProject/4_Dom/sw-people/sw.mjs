/*
    Ce fichier importe le fichier de données sw-people-list.mjs ainsi que le fichier sw-personna.js.
    Dans ce fichier, créez les fonctions nécessaires pour placer les gestionnaires d'événements et adapter le DOM en conséquence....
*/
import {peopleList} from "./sw-people-list.mjs";
import {PersonaInYear} from "./sw-persona.mjs";


function GetPersonasFromPeople() {
    const row = document.getElementById("rows");
    let count = 0;
    while (count < peopleList.count) {
        const persona = createPersona(peopleList.results[count]);
        if ((persona.gender === 'male' || persona.gender === 'female') && persona.mass !== 'unknown' && persona.height !== 'unknown' && persona.birthDateBY !== 'unknown') {
            const tr = document.createElement("tr");
            const tdName = document.createElement("td");
            tdName.textContent = persona.name;
            tr.append(tdName)
            const tdHeight = document.createElement("td");
            tdHeight.textContent = persona.height + 'm';
            tr.append(tdHeight)
            const tdMass = document.createElement("td");
            tdMass.textContent = persona.mass + 'kg';
            tr.append(tdMass)
            const tdAge = document.createElement("td");
            tdAge.textContent = persona.age + 'ans';
            tr.append(tdAge)
            const tdGender = document.createElement("td");
            tdGender.textContent = persona.gender;
            tr.append(tdGender)
            const tdBMI = document.createElement("td");
            tdBMI.textContent = persona.BMI;
            tr.append(tdBMI)
            const tdFMI = document.createElement("td");
            const classList = getColorFMIForPersona(persona);
            tdFMI.classList.add(classList)
            tdFMI.textContent = persona.FMI;
            tr.append(tdFMI)

            row.append(tr)
        }
        count++;
    }
}

function getColorFMIForPersona(persona) {
    if (persona.gender === "female") {
        if (persona.FMI < 15) {
            return 'skinny'
        } else if (persona.FMI > 30) {
            return 'fat'
        } else {
            return 'slim'
        }
    } else if (persona.gender === "male") {
        if (persona.FMI < 10) {
            return 'skinny'
        } else if (persona.FMI > 25) {
            return 'fat'
        } else {
            return 'slim'
        }
    }
}

function createPersona(result) {
    return new PersonaInYear(result, result['birth_year']);
}

GetPersonasFromPeople();