//Question 1
function puissanceMain(main) {
    if (main.length === 0) {
        throw new Error("Main vide");
    }
    const valeurs = {
        "As": 11,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        "Valet": 10,
        "Dame": 10,
        "Roi": 10
    };
    const total = main.reduce((acc, carte) => acc + valeurs[carte.valeur], 0);
    const cartesLesPlusFortes = main.reduce((acc, carte) => {
        if (acc.length === 0 || valeurs[carte.valeur] > valeurs[acc[0].valeur]) {
            return [carte];
        } else if (valeurs[carte.valeur] === valeurs[acc[0].valeur]) {
            acc.push(carte);
            return acc;
        } else {
            return acc;
        }
    }, []);
    return {
        total: total,
        meilleure: cartesLesPlusFortes[0]
    };
}

//Question 2
function chaineMain(main) {
    // Filtrer les cartes en double
    if(main === undefined){
        return ""
    }
    const main_filtree = main.filter((carte, index, self) =>
        index === self.findIndex(c => c.couleur === carte.couleur && c.valeur === carte.valeur)
    );

    // Trier les cartes par ordre de couleur et de valeur
    const main_triee = main_filtree.sort((a, b) => {
        if (a.couleur === b.couleur) {
            if (a.valeur === b.valeur) {
                return 0;
            } else if (a.valeur === 'As') {
                return 1;
            } else if (b.valeur === 'As') {
                return -1;
            } else if (a.valeur === 'Roi') {
                return 1;
            } else if (b.valeur === 'Roi') {
                return -1;
            } else if (a.valeur === 'Dame') {
                return 1;
            } else if (b.valeur === 'Dame') {
                return -1;
            } else if (a.valeur === 'Valet') {
                return 1;
            } else if (b.valeur === 'Valet') {
                return -1;
            } else {
                return a.valeur - b.valeur;
            }
        } else if (a.couleur === 'Carreau') {
            return -1;
        } else if (b.couleur === 'Carreau') {
            return 1;
        } else if (a.couleur === 'Coeur') {
            return -1;
        } else if (b.couleur === 'Coeur') {
            return 1;
        } else if (a.couleur === 'Pique') {
            return -1;
        } else if (b.couleur === 'Pique') {
            return 1;
        } else {
            return -1;
        }
    });

    // Créer la chaîne de caractères
    let chaine = "";
    for (let i = 0; i < main_triee.length; i++) {
        const carte = main_triee[i];
        chaine += `${carte.valeur} de ${carte.couleur}`;
        if (i < main_triee.length - 1) {
            chaine += ", ";
        }
    }

    return chaine;
}

//Question 3
let repartition = new Map();

// Fonction d'attribution d'étudiants à un groupe
function attribue(nomGroupe, ...etudiants) {
    // Si le groupe n'existe pas, on le crée
    if (!repartition.has(nomGroupe)) {
        repartition.set(nomGroupe, new Set());
    }

    // Pour chaque étudiant à ajouter
    for (let etudiant of etudiants) {
        // On le retire de son ancien groupe s'il y en avait un
        for (let [nomGroupe, etudiants] of repartition) {
            if (etudiants.has(etudiant)) {
                etudiants.delete(etudiant);
                break;
            }
        }

        // On ajoute l'étudiant au groupe actuel
        repartition.get(nomGroupe).add(etudiant);
    }

    // Si le groupe est vide, on le supprime
    if (repartition.get(nomGroupe).size === 0) {
        repartition.delete(nomGroupe);
    }
}

// Fonction de retrait d'étudiants d'un groupe
function retire(nomGroupe, ...etudiants) {
    // Si le groupe n'existe pas, on ne fait rien
    if (!repartition.has(nomGroupe)) {
        return;
    }

    // Pour chaque étudiant à retirer
    for (let etudiant of etudiants) {
        // On le retire du groupe actuel s'il y est présent
        repartition.get(nomGroupe).delete(etudiant);
    }

    // Si le groupe est vide, on le supprime
    if (repartition.get(nomGroupe).size === 0) {
        repartition.delete(nomGroupe);
    }
}

// Fonction de récupération des étudiants d'un groupe
function etudiants(nomGroupe) {
    // Si le groupe n'existe pas ou est vide, on retourne '---'
    if (!repartition.has(nomGroupe) || repartition.get(nomGroupe).size === 0) {
        return '---';
    }

    // On récupère les étudiants et on les trie
    let etudiants = Array.from(repartition.get(nomGroupe));
    etudiants.sort();

    // On retourne les étudiants sous forme de chaîne de caractères séparés par des virgules
    return etudiants.join(',');
}