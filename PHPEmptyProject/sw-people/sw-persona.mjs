/**
 * Conversion d'une année BY en année standard
 * @param {string} yearBY
 * @return {number}
 */
function convertYearBYToYear(yearBY){
    if (yearBY.endsWith("ABY")) {
        return -parseInt(yearBY.substring(0, yearBY.charAt("A")))
    } else if (yearBY.endsWith("BBY")) {
        return parseInt(yearBY.substring(0, yearBY.charAt("B")))
    }

    return -1
}

/**
 * Conversion d'une année standard en année BY
 * @param {number} year
 * @return {string}
 */
function convertYearToYearBY(year){
    return Math.abs(number) + (Math.sign(number) === -1) ? "ABY" : "BBY"
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
        this.height = peopleItem['height'];
        this.mass = peopleItem['mass'];
        this.birthDate = peopleItem['birth_year'];
        this.gender = peopleItem['gender'];
        this.BMI = this.mass / (this.height * this.height);
    }

    /**
     * Getter retourne la date de naissance en année BY
     * @return {string}
     */
    get birthDateBY(){
        return convertYearToYearBY(this.birthDate);
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
            return (1.2 * this.BMI) + (0.23 * this.getAge(year) - 16.2);
        } else if (this.gender === "female") {
            return (1.2 * this.BMI) + (0.23 * this.getAge(year) - 16.2);
        }

        return this.BMI;
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