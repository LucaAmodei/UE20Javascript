//Question 1
let cartesPiochees = [];
let nbrCartes = 1;
document.getElementById('affiche_btn').addEventListener("click", function (event) {
    nbrCartes = document.getElementById("nbrCartes").value

    if(cartes_VM.length === 0) {
        nbrCartes = null
    }
    if(nbrCartes > cartes_VM.length) {
        nbrCartes = cartes_VM.length
    }
    if (nbrCartes <= 0) {
        nbrCartes = 1
    }

    if (nbrCartes != null) {
        for (let i = 0; i < nbrCartes; i++) {
            let currentCard = cartes_VM[0]

            createHtmlTags(currentCard);
            cartesPiochees.push(cartes_VM.splice(0, 1)[0])
        }
    }
});



function createHtmlTags(currentCard) {
    let newLi = document.createElement("li");
    newLi.id = currentCard.id
    newLi.className = currentCard.couleur

    let newEm = document.createElement("em");
    newEm.textContent = currentCard.valeur
    newLi.appendChild(newEm)

    let newB = document.createElement("b")
    let couleurSymbole = currentCard.couleur
    newB.textContent = SYMBOLES[couleurSymbole]
    newLi.appendChild(newB)

    let newStrong = document.createElement("strong")
    newStrong.textContent = SYMBOLES[couleurSymbole]
    newLi.appendChild(newStrong)

    let newSpan = document.createElement("span")
    newSpan.textContent = SYMBOLES[couleurSymbole]
    newLi.appendChild(newSpan)

    let anotherEm = document.createElement("em");
    anotherEm.textContent = currentCard.valeur
    newLi.appendChild(anotherEm)

    newLi.addEventListener("mouseover", function() {
        let infoCarte = document.getElementById("infoCarte")
        infoCarte.textContent = `${currentCard.valeur} de ${currentCard.couleur.toUpperCase()}`
    });

    newLi.addEventListener("mouseout", function () {
        let infoCarte = document.getElementById("infoCarte")
        infoCarte.textContent = ""
    })

    newLi.addEventListener("click", function() {
        if(newLi.classList.contains("selected")) {
            cartesPiochees = cartesPiochees.filter(function (card) {
                return card.id !== currentCard.id
            })
            newLi.remove()
        } else {
            let selected = document.getElementsByClassName("selected")
            for (let i = 0; selected.length; i++) {
                selected[i].classList.remove("selected")
            }

            newLi.classList.add("selected")
        }
    })

    const ulCards = document.getElementsByClassName("cartes");
    for (let i = 0; i < ulCards.length; i++) {
        ulCards[i].appendChild(newLi)
    }
}