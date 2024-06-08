let year = 2015
let month = 0
for (let i = 1; i <= 9; i++) {
    managePhoto(i)
}

async function managePhoto(id) {
    const photo = await getPhoto()

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
    if (month >= 12) {
        month = 1
        year++
    } else {
        month++
    }

    if (year >= 2019) {
        return null
    }

    month = month < 10 ? "0" + month : month

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
            return jsons[Math.round(Math.random() * jsons.length)].image
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
/*
Deuxieme essai (ca ne marche pas non plus jsp pq)
const apiUrlphotos = `https://epic.gsfc.nasa.gov/api/enhanced/date/`

let year = 2015
let month = 0

for (let i = 1; i <= 9; i++) {
    getPhoto(i)
}

async function getPhoto(id) {
    if (month === 12) {
        month = 1
        year++
    } else {
        month++
    }

    //Fin de la récursion
    if (year === 2018 && month === 12) {
        return null
    }

    month = month < 10 ? "0" + month : month
    console.log(apiUrlphotos + `${year}-${month}-01`)
    await fetch(apiUrlphotos + `${year}-${month}-01`).then(response => {
        if (!response.ok) {
            throw Error("Error lors de la réponse des photos")
        }
        return response
    })
        .then(response => response.json())
        .then(result => {
            if (result.length === 0) {
                throw Error("Photo suivante")
            }

            const photo = result[Math.round(Math.random() * result.length)].image

            let image = document.getElementById("nasa" + id)
            image.innerHTML = ""
            image.src = `https://epic.gsfc.nasa.gov/archive/enhanced/${year}/${month}/01/png/${photo}.png`;
            image.alt = "nasa" + id + year + " " + month

            document.getElementById("nbrP").innerText = id;
        }).catch(error => {
                getPhoto(id)
            }
        )
}
*/