import {DepotScores} from "./DepotScores.mjs";

class Personne {
    constructor(nom) {
        this.nom = nom;
    }
}

export class Arbitre extends Personne {
    constructor(nom) {
        super(nom)
    }

    /**
     * @return {Promise<Number>}
     */
    async interogerArbitre() {
        const delai = getRandomInt(7001)
        if (delai <= 5000) {
            return await new Promise((resolve) => setTimeout(() => resolve(getRandomInt(11)), delai))
        } else {
            return await new Promise((resolve) => setTimeout(() => {
                console.log(`Arbitre ${this.nom} distrait`)
                resolve(getRandomInt(6) + 5)
            }, 5000))
        }
    }

    /**
     *
     * @param {DepotScores}depotScores
     * @param {Enfant}enfant
     * @return {Promise}
     */
    coter(depotScores, enfant) {
        console.log(`Vote de ${this.nom} sur ${enfant.nom} ?`)
        return new Promise((resolve) => {
            this.interogerArbitre().then(score => {
                depotScores.sauverScore(this, enfant, score)
                console.log(`${enfant.nom} obtient ${score} de la part de ${this.nom} !`)
                if (depotScores.isDone(enfant)) {
                    const value = depotScores.totaliserScores(enfant)
                    console.log(`***** ${enfant.nom} obtient un total de ${value} points. *****`)
                    if (value > depotScores.bestKid.Score) {
                        depotScores.bestKid = {Enfant: enfant, Score: value}
                    }

                }
                resolve()
            })
        });
    }
}

export class Enfant extends Personne {
    constructor(nom) {
        super(nom)
    }

    /**
     *
     * @param {Arbitre[]} jury
     * @param {DepotScores}scores
     */
    async obtenirScores(jury, scores) {
        const promessesVotes = jury.map(arbitre => arbitre.coter(scores, this))
        await Promise.all(promessesVotes)
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

/*
Version asynchrone
export class Arbitre extends Personne {
    constructor(nom) {
        super(nom)
    }


interogerArbitre() {
    const delai = getRandomInt(7001)
    if (delai <= 5000) {
        return new Promise((resolve) => setTimeout(() => resolve(getRandomInt(11)), delai))
    } else {
        return new Promise((resolve) => setTimeout(() => {
            console.log(`Arbitre ${this.nom} distrait`)
            resolve(getRandomInt(6) + 5)
        }, 5000))
    }
}

coter(depotScores, enfant) {
    console.log(`Vote de ${this.nom} sur ${enfant.nom} ?`)
    return new Promise((resolve) => {
        this.interogerArbitre().then(score => {
            depotScores.sauverScore(this, enfant, score)
            console.log(`${enfant.nom} obtient ${score} de la part de ${this.nom} !`)
            if (depotScores.isDone(enfant)) {
                console.log(`***** ${enfant.nom} obtient un total de ${depotScores.totaliserScores(enfant)} points. *****`)
            }
            resolve()
        })
    });
}
}

export class Enfant extends Personne {
    constructor(nom) {
        super(nom)
    }
    obtenirScores(jury, scores) {
        const promessesVotes = jury.map(arbitre => arbitre.coter(scores, this))
        Promise.all(promessesVotes).then(r => r)
    }
}
 */