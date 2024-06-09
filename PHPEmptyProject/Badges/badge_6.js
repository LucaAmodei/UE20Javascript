class Carte {
    constructor({couleur, valeur} = {}) {
        this.couleur = couleur;
        this.valeur = valeur;
    }

    affiche() {
        return `${this.valeur} de ${this.couleur}`;
    }
}

class Main {
    constructor(cartes) {
        this.cartes = cartes;
    }

    nbrCartes(couleur) {
        return this.cartes.filter(a => a.couleur === couleur).length;
    }
}

function sauvegarde(main) {
    sessionStorage.setItem("MAIN", JSON.stringify(main));
}

function restaure() {
    let main = JSON.parse(sessionStorage.getItem("MAIN"));
    if(main !== null) {
        return new Main(main.cartes.map(a => Object.assign(new Carte(), a)));
    } else {
        return new Main([]);
    }
}