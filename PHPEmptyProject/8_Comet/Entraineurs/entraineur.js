const url = "https://panoramix.cg.helmo.be/~p150107/tutoriels/js-comet/exercices/suite.php?n="
const number = document.getElementById("number")
const changeButton = document.getElementById("changeNumber")

changeColor()

changeButton.addEventListener("click", () => {
    number.textContent = getNumber()
})
function changeColor() {
    number.style.color = getRandomColors()
    setTimeout(changeColor, 1500)
}

/**
 * @return {string} Le string d'une couleur aléatoire
 */
function getRandomColors() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'black', 'gray']
    return colors[Math.round(Math.random() * colors.length)]
}

function getNumber() {
    const value = document.getElementById("inputNumber").value
    //TODO Here utiliser l'url pour récupérer les nombres qu'il faut
    fetch(url + value).then()
    return value !== "" ? value : number.textContent
}

//Cette exercice n'est pas fini mais je le fais pas vu que c'est pas la matière