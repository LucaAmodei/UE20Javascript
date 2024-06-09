//Question 1
class Personne {
    constructor({idUser = 0, nom = '---', prenom = '---'}) {
        this.idUser = idUser;
        this.nom = nom;
        this.prenom = prenom;
    }

    get nomPrenom() {
        return this.nom.toUpperCase() + ' ' + this.prenom;
    }
}
class Utilisateur extends Personne {
    constructor({idUser = 0, nom = '---', prenom = '---', login, motPasse}) {
        super({idUser, nom, prenom});
        this.login = login;
        this.motPasse = motPasse;
    }

    verifieMotPasse() {
        return this.motPasse !== this.nom && this.motPasse !== this.prenom && this.motPasse !== this.login;
    }
}

//Question 2 /!\ l'appelé 'Q_CM5-couleur.mjs' pour qu'il passe
class Couleur {

    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    get rgb() {
        const r = this.r.toString(16).padStart(2, '0').toUpperCase();
        const g = this.g.toString(16).padStart(2, '0').toUpperCase();
        const b = this.b.toString(16).padStart(2, '0').toUpperCase();
        return `#${r}${g}${b}`;
    }
}

function convertirEnCouleur(rgb) {
    const regex = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const match = regex.exec(rgb);
    if (match) {
        const r = parseInt(match[1], 16);
        const g = parseInt(match[2], 16);
        const b = parseInt(match[3], 16);
        return new Couleur(r, g, b);
    } else {
        throw new Error('Format de code couleur invalide');
    }
}

export { Couleur, convertirEnCouleur };