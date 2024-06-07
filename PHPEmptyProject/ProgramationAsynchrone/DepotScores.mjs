import {Arbitre, Enfant} from "./Personne.mjs";

export class DepotScores {

    /**
     *
     * @param {Arbitre[]} jury
     */
    constructor(jury) {
        this.scores = new Map()
        jury.forEach(arbitre => {
            this.scores.set(arbitre.nom, new Map)
        })
    }


    /**
     *
     * @param {Arbitre} arbitre
     * @param {Enfant} enfant
     * @param {Number} score
     */
    sauverScore(arbitre, enfant, score) {
        this.scores.get(arbitre.nom).set(enfant.nom, score)
    }

    /**
     *
     * @param {Enfant} enfant
     */
    totaliserScores(enfant) {
        let total = 0;
        for (const [key, value] of this.scores) {
            total += value.get(enfant.nom) || 0
        }
        return total
    }

    /**
     *
     * @param {Enfant} enfant
     */
    isDone(enfant) {
        for (const sousMap of this.scores.values()) {
            if (!sousMap.has(enfant.nom)) {
                return false
            }
        }
        return true
    }
}