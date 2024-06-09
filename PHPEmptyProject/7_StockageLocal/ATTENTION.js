//Pour l'utilisation de fonction d'une classe utiliser object
(() => {
    class Carte {
        constructor(couleur, valeur){
            this.couleur = couleur;
            this.valeur = valeur;
        }
        toFullString(){
            return `${this.valeur} de ${this.couleur}`;
        }
    }
    let asPique = new Carte('Pique', 'As');
    sessionStorage.setItem('atout', JSON.stringify(asPique));
    let carteObj = JSON.parse(sessionStorage.getItem('atout'));
    console.log(carteObj.toFullString()); //undefined !
    let carte = Object.assign(new Carte(), carteObj);
    console.log(carte.toFullString()); //As de Pique
})();

//SessionStorage : Les données sont supprimées à la fermeture de l'onglet, enfin... presque. En effet, la plupart des navigateurs permettent de réouvrir un onglet fermé (raccourci Ctrl+Maj+T), dans ce cas, l'objet sessionStorage associé est restauré
//localStorage : Les données sont sauvées de manière permanente. Elles ne sont supprimées que par le script lui-même ou par l'utilisateur grâce aux fonctionnalités de son navigateur.

//Voir ici pour plus d'information : https://dartagnan.cg.helmo.be/~p150107/tutoriels/js-stockages/