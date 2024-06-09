//Question 1
function obtenirPrix(produit) {
    if (produits[produit] == 0) return "Gratuit";
    return produits[produit] || "Non trouvé";
}

//Question 2
class ProductNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "ProductNotFoundError";
    }
}

function valeurPrix(produit) {
    if (produit in produits) {
        if (produits[produit] === "Gratuit") {
            return 0;
        }
        return parseFloat(produits[produit]);
    } else {
        throw new ProductNotFoundError("Le produit est pas dans la liste");
    }
}

//Question 3
function* entierEuler(){
    for (let n = 0; n <= 40; n++) {
        yield n * n + n + 41;
    }
}

function* matricule(){
    let eulerGen = entierEuler();
    let count = 0;
    let matricule = "";
    while (true) {
        let eulerGenValue = eulerGen.next();
        if (eulerGenValue.done) {
            eulerGen = entierEuler();
        } else {
            if (count === 3) {
                yield matricule;
                matricule = "";
                count = 0;
            }
            matricule += eulerGenValue.value
            count++;
        }
    }
}