function puissanceMain(main) {
    if (Object.keys(main).length === 0) throw Error("Main vide")
    let resumeMain
    resumeMain.total = 0

    main.forEach(value => {
        resumeMain.total += value.valeur
    })
    const bestCardValue = main.reduce((a, b) => Math.max(getValue(a), getValue(b)));
    resumeMain.meilleure = main.filter(value => getValue(value) === bestCardValue)
    return resumeMain;
}

function getValue(carte) {
    if (carte.valeur === 'As') {
        return 1
    }
    if (typeof carte.valeur === 'string') {
        return 10
    }
    return carte.valeur === undefined ? 0 : parseInt(carte.valeur);
}

let main = [
    {valeur: 2, couleur: 'Trèfle'},
    {valeur: 3, couleur: 'Trèfle'},
    {valeur: 10, couleur: 'Coeur'}
];

console.log(puissanceMain(main))
