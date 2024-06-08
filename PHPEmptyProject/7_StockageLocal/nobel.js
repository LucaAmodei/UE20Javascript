const urlBase = 'https://dartagnan.cg.helmo.be/~p150107/tutoriels';

const nobelFilter = document.getElementById("nobelFilter")
const loginSection = document.getElementById("login")
const login = document.getElementById("buttLogin")
const register = document.getElementById("buttNewAccount")
const logout = document.getElementById("buttLogout")
const usernameTag = document.getElementById("userName")

nobelFilter.style.display = "none"

register.addEventListener("click", async () => {
    const registerName = document.getElementById("accountName").value
    const registerPassword = document.getElementById("accountPassword").value

    if (localStorage.getItem(registerName) !== null) {
        document.getElementById("accountError").textContent = "Utilisateur déjà inscrit"
        return
    }

    localStorage.setItem(registerName, hash(registerPassword))

    await goFilter(registerName)
})

login.addEventListener("click", async () => {
    const loginName = document.getElementById("loginName").value
    const loginPassword = document.getElementById("loginPassword").value

    if (!connectionUser(loginName, loginPassword)) {
        document.getElementById("loginError").textContent = "Mot de passe ou utilisateur incorrecte"
        return
    }

    await goFilter(loginName)
})

logout.addEventListener("click", () => {
    usernameTag.textContent = '';
    loginSection.style.display = '';
    nobelFilter.style.display = 'none';
})

async function goFilter(name) {
    usernameTag.textContent = name

    loginSection.style.display = "none"
    nobelFilter.style.display = ""

    const response = await fetch(`${urlBase}/js-stockages/exercices/nobels.php`);
    nobels = await response.json();

    setCategorieInDoc(getAllCategories())

    let filter = getLastFilter(name)
    let filteredNobels = filterNobelPrizes(filter)
    displayNobels(filteredNobels)
}


function getLastFilter(name) {
    const filters = localStorage.getItem("filter_" + name)
    return filters ? JSON.parse(filters) : null;

}

function setLastFilter(filter) {
    if (getLastFilter("filter_" + usernameTag.textContent)) {
        return false
    }

    localStorage.setItem("filter_" + usernameTag.textContent, JSON.stringify(filter))
    return true
}

function displayNobels(nobelsFilter) {
    const section = document.getElementById("prizes");

    section.innerHTML = '';

    nobelsFilter.prizes.forEach(prize => {
        const yearHeading = document.createElement("h3");
        yearHeading.textContent = `Year ${prize.year}`;
        yearHeading.dataset.year = prize.year;
        section.appendChild(yearHeading);

        const categoryHeading = document.createElement("h4");
        categoryHeading.textContent = `Category: ${prize.category}`;
        categoryHeading.dataset.category = prize.category;
        section.appendChild(categoryHeading);

        prize.laureates.forEach(laureate => {
            const paragraph = document.createElement("p");
            paragraph.textContent = `${laureate.firstname} ${laureate.surname} - ${laureate.motivation}`;
            section.appendChild(paragraph);
        })
    });
}

function getAllCategories() {
    var categories = [];

    nobels.prizes.forEach(prize => {
        if (!categories.includes(prize.category)) {
            categories.push(prize.category);
        }
    });

    return categories;
}

function setCategorieInDoc(allCategories) {
    const categorie = document.getElementById("categories")
    categorie.innerHTML = ""

    const ul = document.createElement("ul")
    ul.style.display = "flex"
    ul.style.listStyleType = "none"

    allCategories.forEach(cat => {
        var checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.name = "category"
        checkbox.value = cat

        var label = document.createElement("label")
        label.appendChild(document.createTextNode(cat))

        var listItem = document.createElement("li")
        listItem.appendChild(checkbox)
        listItem.appendChild(label)

        ul.appendChild(listItem)
    });

    categorie.appendChild(ul)

    var categoryCheckboxes = ul.querySelectorAll('input[name="category"]');
    categoryCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", createFilterObject);
    });
}

function filterNobelPrizes(filter) {
    if (filter === null) {
        return nobels
    }

    let nobelCopy = {...nobels}
    nobelCopy.prizes = nobels.prizes.filter(prize => {
        if (filter.selectedCategories.length > 0 && !filter.selectedCategories.includes(prize.category)) {
            return false;
        }
        if (filter.yearMin && prize.year < filter.yearMin) {
            return false;
        }
        if (filter.yearMax && prize.year > filter.yearMax) {
            return false;
        }
        return true;
    });

    return nobelCopy
}

function hash(password) {
    return sha512(password);
}

function connectionUser(loginName, loginPassword) {
    const HashedPassword = localStorage.getItem(loginName)
    if (HashedPassword == null) {
        return false
    }

    if (HashedPassword === hash(loginPassword)) {
        return true
    }

    document.getElementById("loginError").textContent = "Mot de passe incorrecte"
    return false
}


function createFilterObject() {
    var yearMin = document.getElementById("yearMin").value;
    var yearMax = document.getElementById("yearMax").value;

    var selectedCategories = [];
    var categoryCheckboxes = document.querySelectorAll('input[name="category"]:checked');
    categoryCheckboxes.forEach(function (checkbox) {
        selectedCategories.push(checkbox.value);
    });

    var filterObject = {
        yearMin: yearMin,
        yearMax: yearMax,
        selectedCategories: selectedCategories
    };

    setLastFilter(filterObject)
    const nobelFilter = filterNobelPrizes(filterObject)
    displayNobels(nobelFilter)
}

document.getElementById("yearMin").addEventListener("change", createFilterObject);
document.getElementById("yearMax").addEventListener("change", createFilterObject);
