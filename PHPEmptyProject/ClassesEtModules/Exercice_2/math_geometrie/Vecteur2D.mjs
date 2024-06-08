import {Vecteur} from "../math_vectoriel/Vecteur.mjs";

export class Vecteur2D extends Vecteur{
    constructor(c1, c2) {
        super();
        this.c1 = c1
        this.c2 = c2
    }

    /**
     *
     * @param vecteur Vecteur2D
     * @return boolean
     */
    estParalleleA(vecteur) {
        return this.c1.x * vecteur.c1.y === this.c1.y * vecteur.c1.x;
    }

    /**
     *
     * @param vecteur Vecteur2D
     * @return boolean
     */
    estPerpendiculaireA(vecteur) {
        return super.multiplicationVecteur(this, vecteur) === 0
    }
}