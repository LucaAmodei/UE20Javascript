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
    return number.textContent + 1
    //Utiliser le flux SSE a l'adresse : https://panoramix.cg.helmo.be/~p150107/tutoriels/js-comet/exercices/suite.php?n=x où x est un entier dont on veut des multiples
}
