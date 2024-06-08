let year = 2015
let month = 1
for (let i = 1; i <= 9; i++) {
    managePhoto(i)
}

async function managePhoto(id) {
    month = month < 10 ? "0" + month : month
    const photo = await getPhoto(year, month)

    if (photo === null) {
        return false
    }

    const apiUrlphoto = `https://epic.gsfc.nasa.gov/archive/enhanced/${year}/${month}/01/png/${photo}.png`
    let image = document.getElementById("nasa" + id)
    image.innerHTML = ""
    image.src = apiUrlphoto;
    image.alt = "nasa" + id + year + " " + month

    document.getElementById("nbrP").innerText = id;
}

async function getPhoto() {
    if (month === 12) {
        month = 1
        year++
    } else {
        month++
    }

    if (year === 2018 && month === 12) {
        return null
    }

    const apiUrlphotos = `https://epic.gsfc.nasa.gov/api/enhanced/date/${year}-${month}-01`

    await fetch(apiUrlphotos).then(response => {
        if (!response.ok) {
            throw Error("Error lors de la réponse des photos")
        }
        return response
    })
        .then(response => response.json())
        .then(jsons => {
            if (jsons[0] === undefined) {
                getPhoto()
            }
            return jsons[Math.floor(Math.random() * jsons.length)].image
        }).catch(error => console.log(error)
        )
}


//TODO
/**
 * Faire un tableau qui va identifier les images plutot que d'utilser le compteur
 * crée neuf promesses qui vont rechercher une image à la fin de chacune des promesses l'image pour celle ci est charger dans la page
 * appelle une promesse qui va catch une autre promesse pour le mois d'après (gérer changement d'année dans les mois)
 *
 */