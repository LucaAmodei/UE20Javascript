/**
 *
 * @returns {Generator<*, void, *>}
 */
function* naturalNumbers() {
    let count = 1;
    while (true) {
        yield count;
        count++;
    }
}

/**
 *
 * @param nbr Number nombre a générer
 * @returns {Generator<*, void, *>}
 */
function* firstN(nbr) {
    let naturalNumber = naturalNumbers();
    let count = 0;
    while (count < nbr) {
        yield naturalNumber.next().value;
        count++;
    }
}

/**
 *
 * @param nRepeat Number nombre de fois qu'il faut répeter
 * @param nbr Le nombre de chiffre a générer
 * @returns {Generator<*, void, *>}
 */
function* repeat(nRepeat, nbr) {
    let count = 0;
    while (count < nRepeat) {
        let firstNs = firstN(nbr);
        let value = firstNs.next();
        while (!value.done) {
            yield value.value
            value = firstNs.next()
        }
        count++;
    }
}

/**
 * Je l'ai appelé main par principe et qu'il demande une fonction pour utiliser le tout mais j'aurais pu l'écrire direct
 */
function main() {
    let nbr = 3;
    let repeatN = 4;
    let repeats = repeat(repeatN,nbr);
    while (true) {
        let value = repeats.next().value;
        if (value === undefined) {
            break;
        } else {
            console.log(value)
        }
    }
}

main();