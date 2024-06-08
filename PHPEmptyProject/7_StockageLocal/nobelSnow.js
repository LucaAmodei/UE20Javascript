const ACCOUNTS_MAP_KEY = "accountsMap";
const AUTHENTICATED_USER = "connectedUser";
const NOBEL_LIST_RESOURCE = "nobelList";
const FILTER_KEY = "filter";
const FROM_YEAR_KEY = "fromYear";
const TO_YEAR_KEY = "toYear";

function showFilter() {
    let nobelFilter = document.getElementById("nobelFilter");
    nobelFilter.style.display = "block";

    let loginSection = document.getElementById("login");
    loginSection.style.display = "none";
}

function hideFilter() {
    let nobelFilter = document.getElementById("nobelFilter");
    nobelFilter.style.display = "none";

    let loginSection = document.getElementById("login");
    loginSection.style.display = "flex";
}

function restoreAccountsMap() {
    let accountsJson = localStorage.getItem(ACCOUNTS_MAP_KEY);
    if (!accountsJson) {
        return new Map();
    }

    let accountsObject = JSON.parse(accountsJson);
    let accountsEntries = Object.entries(accountsObject);
    let accountsMap = new Map(accountsEntries);
    return accountsMap;
}

function saveAccountsMap(accountsMap) {
    let accountsObject = Object.fromEntries(accountsMap);
    let accountsJson = JSON.stringify(accountsObject);
    localStorage.setItem(ACCOUNTS_MAP_KEY, accountsJson)
}

function loginUser(username) {
    localStorage.setItem(AUTHENTICATED_USER, username);
}

function isLoggedIn() {
    return localStorage.getItem(AUTHENTICATED_USER);
}

function logout() {
    localStorage.removeItem(AUTHENTICATED_USER);
}

function saveFilter(filterSet) {
    let filterArray = Array.from(filterSet);
    let filterJSON = JSON.stringify(filterArray);
    localStorage.setItem(FILTER_KEY, filterJSON);
}

function getFilter() {
    let filterJSON = localStorage.getItem(FILTER_KEY);
    if (!filterJSON) {
        return new Set();
    }
    let filterArray = JSON.parse(filterJSON);

    return new Set(filterArray);
}

function getFromYear() {
    let fromYear = localStorage.getItem(FROM_YEAR_KEY);
    if (!fromYear) {
        return 0;
    }
    return Number.parseInt(fromYear);
}

function getToYear() {
    let toYear = localStorage.getItem(TO_YEAR_KEY);
    if (!toYear) {
        return 3000;
    }
    return Number.parseInt(toYear);
}

function setYears(from, to) {
    localStorage.setItem(FROM_YEAR_KEY, from);
    localStorage.setItem(TO_YEAR_KEY, to);
}

if (isLoggedIn()) {
    showFilter();
} else {
    hideFilter();
}

let accounts = restoreAccountsMap();

let newAccountButton = document.getElementById("buttNewAccount");
newAccountButton.addEventListener("click", () => {
    let usernameField = document.getElementById("accountName");
    let username = usernameField.value;
    let passwordField = document.getElementById("accountPassword");
    let password = passwordField.value;
    let passwordHash = sha512(password);

    if (accounts.has(username)) {
        let errorSpan = document.getElementById("accountError");
        errorSpan.innerText = `Username "${username}" already exists.`
    } else {
        accounts.set(usernameField.value, passwordHash);
        usernameField.value = null;
        passwordField.value = null;
        saveAccountsMap(accounts);
        showFilter();
        loginUser(username);
    }
});

let loginButton = document.getElementById("buttLogin");
loginButton.addEventListener("click", () => {
    let usernameField = document.getElementById("loginName");
    let username = usernameField.value;
    let passwordField = document.getElementById("loginPassword");
    let password = passwordField.value;

    let passwordHash = sha512(password);

    let errorSpan = document.getElementById("loginError");
    let recordedPasswordHash = accounts.get(username);
    if (passwordHash !== recordedPasswordHash) {
        errorSpan.innerText = "Username or password invalid";
        return;
    }

    // Hide the login shit, login the user and show the filters
    loginUser(username);
    showFilter();
});

let logoutButton = document.getElementById("buttLogout");
logoutButton.addEventListener("click", () => {
    logout();
    hideFilter();
});


if (!localStorage.getItem(NOBEL_LIST_RESOURCE)) {
    let textResponse = await fetch("http://dartagnan.cg.helmo.be/~p150107/tutoriels/js-stockages/exercices/nobels.php")
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status} : ${response.statusText}`);
            }
            return response;
        })
        .then(response => response.text())
        .catch(error => console.log(error));

    localStorage.setItem(NOBEL_LIST_RESOURCE, textResponse);
}

let nobelRessourceJson = localStorage.getItem(NOBEL_LIST_RESOURCE);
let nobelRessource = JSON.parse(nobelRessourceJson);
let categories = nobelRessource.prizes
    .map(prize => prize.category)
    .reduce((uniqueCategoryList, category) => {
        if (!uniqueCategoryList.includes(category)) {
            uniqueCategoryList.push(category);
        }
        return uniqueCategoryList;
    }, [])
    .sort();

let categoriesElement = document.getElementById("categories");

let currentFilter = getFilter();
let fromYear =
    saveFilter(currentFilter);

categories.forEach(category => {
    let categoryElement = document.createElement("div");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${category}`;
    checkbox.name = `checkbox-${category}`;
    if (currentFilter.has(category)) {
        checkbox.checked = true;
    }

    let label = document.createElement("label");
    label.htmlFor = `checkbox-${category}`;
    label.innerText = category;

    categoryElement.appendChild(checkbox);
    categoryElement.appendChild(label);

    categoryElement.addEventListener("input", () => {
        if (checkbox.checked) {
            currentFilter.add(category);
        } else {
            currentFilter.delete(category);
        }
        saveFilter(currentFilter);
        refreshList();
    });
    categoriesElement.appendChild(categoryElement);
});

// Handles the date filter
let fromYearInput = document.getElementById("yearMin");
let toYearInput = document.getElementById("yearMax");

fromYearInput.value = getFromYear();
toYearInput.value = getToYear();

fromYearInput.addEventListener("input", () => {
    setYears(fromYearInput.value, toYearInput.value);
    refreshList();
});

toYearInput.addEventListener("input", () => {
    setYears(fromYearInput.value, toYearInput.value);
    refreshList();
});

// This function works but is useless in this scenario, ignore this...
function comparator(a, b) {
    if (a.year != b.year) {
        return b.year - a.year;
    }

    if (a.category < b.category) {
        return -1;
    }

    if (a.category > b.category) {
        return 1;
    }

    return 0;
}

refreshList();
function refreshList() {
    // Removing all the content in the results if there was any
    let results = document.getElementById("prizes");
    results.innerHTML = "";

    // Adding some new content based on the filters
    nobelRessource.prizes
        .filter(prize => prize.year >= getFromYear())
        .filter(prize => prize.year <= getToYear())
        .filter(prize => currentFilter.has(prize.category))
        .forEach(prize => {
            let results = document.getElementById("prizes");
            let yearTitle = document.getElementById("year-title-" + prize.year);
            if (!yearTitle) {
                yearTitle = document.createElement("h3");
                yearTitle.innerText = prize.year;
                yearTitle.id = "year-title-" + prize.year;
                results.appendChild(yearTitle);
            }

            let categoryTitle = document.getElementById(prize.year + "-category-title-" + prize.category);
            if (!categoryTitle) {
                categoryTitle = document.createElement("h4");
                categoryTitle.innerText = prize.category;
                categoryTitle.id = prize.year + "-category-title-" + prize.category;
                results.appendChild(categoryTitle);

                let prizeList = document.createElement("ul");
                prizeList.id = prize.year + "-category-prizes-" + prize.category;
                results.appendChild(prizeList);
            }

            let prizeList = document.getElementById(prize.year + "-category-prizes-" + prize.category);

            let laureatesText = prize.laureates.map(laureate => {
                let firstLetterFirstName = laureate.firstname.substring(0, 1);
                return `${firstLetterFirstName}. ${laureate.surname}, `
            }).reduce((acc, laureate) => acc + laureate, "");

            let achievement = prize.laureates[0].motivation.slice(1, -1);
            let prizeText = laureatesText + achievement;

            let prizeElement = document.createElement("li");
            prizeElement.innerText = prizeText;
            prizeList.appendChild(prizeElement);
        });
}