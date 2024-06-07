let accounts = [
    {titulaire: 'Lucie LIU', compte: '972-487-086'},
    {titulaire: 'Marc KROSS', compte: '12-34567812-3456 70'},
    {titulaire: 'Désiré NGOMBE', compte: '4084-9027-8919-7157'},
    {titulaire: 'Lucie LIU', compte: '972-487-068'},
    {titulaire: 'Marc KROSS', compte: '12-34567812-3456 70'},
    {titulaire: 'Djamila HASSAN', compte: '4084-9027-8919-7175'},
    {titulaire: 'John FLY', compte: '499 273-987 16'},
    {titulaire: 'Leif HARALDSON', compte: '499 273-987 17'},
    {titulaire: 'Désiré NGOMBE', compte: '4084-9027-8919-7157'},
    {titulaire: 'Natalia PETROCHKAIA', compte: '12-34567812-3456 78'},
    {titulaire: 'Marc KROSS', compte: '12-34567812-3456 70'}
]

console.log(getTabWithoutLuhn(accounts))

function getTabWithoutLuhn(tab) {
    return tab.filter(value => isValidByLuhn(value.compte)).filter((value, index) => {
        return tab.indexOf(value) !== index;
    });
}

function isValidByLuhn(compte) {
    let tabOfCompte = Array.from(compte).filter(value => !isNaN(parseFloat(value)))
    tabOfCompte = tabOfCompte.reverse()

    let result = 0;
    let isDouble = false

    const doubles = [0,2,4,6,8,1,3,5,7,9]

    tabOfCompte.forEach(value => {
        value = parseInt(value)
        if (isDouble) {
            result = result + doubles[value];
            isDouble = false
        } else {
            result = result + value
            isDouble = true
        }
    })
    return (result % 10)  === 0;
}