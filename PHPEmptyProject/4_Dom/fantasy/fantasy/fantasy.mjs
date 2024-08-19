const urlImages = ['fantasy-1.jpg', 'fantasy-2.jpg', 'fantasy-3.jpg', 'fantasy-4.jpg', 'fantasy-5.jpg']
let count = 0;

const vignettes = document.getElementById("vignettes")

const add = document.getElementById("add")
add.addEventListener('click', () => {
    addPhoto()
})

addPhoto()

function addPhoto() {
    if (count === 10) {
        add.style.display = "none"
    } else {
        addImage(urlImages[count % urlImages.length])
        count++
    }
}

function addImage(image) {
    const img = document.createElement("images")
    img.src = 'images/' + image
    img.alt = "Image de " + image
    img.classList.add('vignette')
    img.addEventListener('click', () => {
        const screen = document.getElementById("ecran")
        screen.src = img.src
        screen.alt = img.alt
    })
    img.click()
    vignettes.appendChild(img)
}