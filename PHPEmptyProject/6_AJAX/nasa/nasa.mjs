let year = 2015
let month = 1

const apiUrlphotos = `https://epic.gsfc.nasa.gov/api/enhanced/date`

for (let i = 1; i <= 9; i++) {
    requete(i)
}

async function requete(id) {
    if (month >= 12) {
        month = 1
        year++
    } else {
        month++
    }

    if (year >= 2019) {
        return null
    }

    const yearString = year
    const monthString = month < 10 ? "0" + month : month

    fetch(`${apiUrlphotos}/${yearString}-${monthString}-01`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`[${response.status}]: ${response.statusText}`)
            }
            return response
        })
        .then(response => response.json())
        .then(result => {
            if (result.length !== 0) {
                handleImage(result[getRandomNumber(result.length)].image, id, monthString, yearString)
            } else {
                requete(id)
            }
        })
        .catch(error => console.log(error))
}

function handleImage(image, id, monthString, yearString) {
    const imageDom = document.getElementById("nasa" + id)
    imageDom.innerHTML = ""
    imageDom.src = `https://epic.gsfc.nasa.gov/archive/enhanced/${yearString}/${monthString}/01/png/${image}.png`;
    imageDom.alt = "nasa" + "_" + id + "_" + yearString + "_" + monthString

    document.getElementById("nbrP").innerText = Number(document.getElementById("nbrP").innerText) + 1;
}

function getRandomNumber(length) {
    return Math.floor(Math.random() * length);
}