/**
 * Conversion d'une année BY en année standard
 * @param {string} yearBY
 * @return {number}
 */
function convertYearBYToYear(yearBY){
    if (yearBY.endsWith("ABY")) {
        return -parseInt(yearBY.substring(0, yearBY.charAt('A') + 1))
    } else if (yearBY.endsWith("BBY")) {
        return parseInt(yearBY.substring(0, yearBY.charAt('B') + 1))
    }

    return -1
}

/**
 * Conversion d'une année standard en année BY
 * @param {number} year
 * @return {string}
 */
function convertYearToYearBY(year){
    return Math.abs(year) + (Math.sign(year) === -1) ? "ABY" : "BBY"
}

/**
 * Classe représentant une personnalité
 */
export class Persona {
    /**
     * Construit un Persona avec l'objet extrait de la liste des personnalités
     * @param {object} peopleItem
     */
    constructor(peopleItem){
        this.name = peopleItem['name'];
        this.height = peopleItem['height'] / 100;
        this.mass = peopleItem['mass'];
        this.birthDate = peopleItem['birth_year'];
        this.gender = peopleItem['gender'];
        this.BMI = Math.round(this.mass / (this.height * this.height) * 100) /  100.00;
    }

    /**
     * Getter retourne la date de naissance en année BY
     * @return {string}
     */
    get birthDateBY(){
        return this.birthDate;
    }

    /**
     * Retourne l'âge en années standards pour une année BY
     * @param {string} year
     * @return {number}
     */
    getAge(year){
        return convertYearBYToYear(year);
    }

    /**
     * Calcule l'IMG (FMI) pour une année BY
     * @param {string} year
     * @return {number}
     */
    getFMI(year){
        if (this.gender === "male") {
            return Math.round((1.2 * this.BMI* 100) + (0.23 * this.getAge(year) - 16.2)*100) / 100.00;
        } else if (this.gender === "female") {
            return Math.round((1.2 * this.BMI * 100) + (0.23 * this.getAge(year) - 5.4)*100) / 100.00;
        }
        return Math.round(this.BMI*100) / 100.00;
    }

}

/**
 * Classe représentant une personnalité à une année BY
 */
export class PersonaInYear extends Persona {
    /**
     * Construit une personnalité pour une année BY avec l'objet extrait de la liste des personnalités
     * @param {object} peopleItem
     * @param {string} yearBY
     */
    constructor(peopleItem, yearBY){
        super(peopleItem)
        this.age = super.getAge(yearBY);
        this.FMI = super.getFMI(yearBY);
    }

    /**
     * Fonction statique qui retourne une fonction de comparaison selon le critère et l'ordre croissant/décroissant
     */
     compare(/*TODO  ?? */){
       //TODO
     }
    
}