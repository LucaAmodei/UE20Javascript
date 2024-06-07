class Cyclist {
    constructor(matricule, name, score) {
        this.matricule = matricule
        this.name = name
        this.score = score
    }

    set ajout(score) {
        this.score += score
    }

    reset(){
        this.score = 0
    }

    print() {
        console.log(`${this.name} (${this.matricule}): ${this.score}`);
    }
}

class Classement {
    constructor(cyclists, nbReward) {
        this.cyclists = cyclists
        this.nbReward = nbReward //J'ai pas compris dans l'énnocé ce que cela représentais
    }

    addCyclist(...cyclist) {
        this.cyclists = this.cyclists.concat(cyclist) //Permet d'ajouter un ou plusieurs cycliste
    }

    disqualifyCyclist(cyclist) {
        this.cyclists.splice(this.cyclists.findIndex(value => value === cyclist), 1) //permet de retire un cycliste
    }

    getCyclistbyReward() {
        this.cyclists.sort((a,b) =>
            a.score - b.score
        )
    }

    getCyclistbyId(id) {
        return this.cyclists.find(value => value.matricule == id)
    }

    printCyclists() {
        this.cyclists.forEach( value => {
            value.print()
        })
    }
}

let cyclist1 = new Cyclist("126","DUPONT J", 10)
let cyclist2 = new Cyclist("83","MATMAH", 26)
let classement = new Classement([], 0)
classement.addCyclist(cyclist1, cyclist2)
classement.getCyclistbyReward()
classement.printCyclists()
let cyclist3 = new Cyclist("126","DUPONT J", 15)
let cyclist4 = new Cyclist("42","LUCULUS O", 64)
let cyclist5 = new Cyclist("7654","XIANG P", 59)
let cyclist6 = new Cyclist("4682","LEPONT Q", 16)
classement.addCyclist(cyclist3,cyclist4,cyclist5,cyclist6)
classement.getCyclistbyReward()
classement.printCyclists()
classement.getCyclistbyId(42).ajout = 1000
classement.getCyclistbyReward()
classement.printCyclists()
classement.disqualifyCyclist(classement.getCyclistbyId(42))
classement.getCyclistbyReward()
classement.printCyclists()



