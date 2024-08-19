const url = "https://dartagnan.cg.helmo.be/~p150107/tutoriels/js-comet/exercices/suite.php?n="
const number = document.getElementById("number")
const changeButton = document.getElementById("changeNumber")

let eventSource

changeColor()
initializeEventSource(1)

changeButton.addEventListener("click", () => {
    number.textContent = "waiting for another value"
    let value = document.getElementById("inputNumber").value
    if (eventSource) {
        eventSource.close()
        eventSource = null
    }
    initializeEventSource(value)
})

function changeColor() {
    number.style.color = getRandomColors()
    setTimeout(changeColor, 10000) // 10000 millisecondes
}

/**
 * @return {string} Le string d'une couleur aléatoire
 */
function getRandomColors() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'black', 'gray']
    return colors[Math.round(Math.random() * (colors.length - 1))]
}

/**
 * Initialise l'EventSource pour recevoir les nombres depuis le serveur.
 * @param {number} value - La valeur entrée par l'utilisateur.
 */
function initializeEventSource(value) {
    eventSource = new EventSource(`${url}${value}`)

    eventSource.onmessage = function (e) {
        const obj = JSON.parse(e.data)
        number.textContent = obj.number
    }
}
