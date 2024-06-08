const select = document.getElementById("nbrIngredients")
select.addEventListener("change", () => {
    const sectionIngredient = document.getElementById("ingredients")
    sectionIngredient.innerHTML = ''

    for (let i = 0; i < select.value; i++) {
        const ingredient = document.createElement("div")
        ingredient.className = "ingredient"

        const nom = document.createElement("input")
        nom.id = "ingredient-" + (i + 1)
        nom.type = "text"
        nom.name = "ingredient-" + (i + 1)
        nom.value = ""
        nom.placeholder = "ingrédient"
        const qtt = document.createElement("input")
        qtt.id = "quantite-" + (i + 1)
        qtt.type = "text"
        qtt.name = "quantite-" + (i + 1)
        qtt.value = "1"
        const unite = document.createElement("input")
        unite.id = "unite-" + (i + 1)
        unite.type = "text"
        unite.name = "unite-" + (i + 1)
        unite.value = "p"
        unite.setAttribute("list", "unites")

        ingredient.append(nom, qtt, unite)
        sectionIngredient.append(ingredient)
    }
})

document.getElementById("butt_calc").addEventListener("click", () => {
    const nbrPersonnes = document.getElementById("nbrPersonnes").value
    const nbrConvives = document.getElementById("nbrConvives").value

    const ingredients = [];

    const nbrIngredients = parseInt(document.getElementById("nbrIngredients").value);

    for (let i = 1; i <= nbrIngredients; i++) {
        const ingredientName = document.getElementById(`ingredient-${i}`).value;
        const ingredientQuantity = parseFloat(document.getElementById(`quantite-${i}`).value);
        const ingredientUnit = document.getElementById(`unite-${i}`).value;

        const ingredient = {
            ingredient: ingredientName,
            quantite: ingredientQuantity,
            unite: ingredientUnit
        };
        ingredients.push(ingredient);
    }

    const recette = {
        nbrPersonnes: nbrPersonnes,
        nbrConvives: nbrConvives,
        ingredients: ingredients
    };

    let urlBase = 'https://panoramix.cg.helmo.be/~p150107/tutoriels';
    let data = JSON.stringify({ingredients: recette});
    fetch(`${urlBase}/js-ajax/exercices/three-rule.php`, {method: "POST", body: data})
        .then(response => {
            if (!response.ok) {
                throw new Error(`[${response.status}]: ${response.statusText} `);
            }
            return response;
        })
        .then(response => response.json())
        .then(result => {
            const quantitesList = document.getElementById("quantites");
            quantitesList.innerHTML = '';

            result.ingredients.forEach(ingredient => {
                const listItem = document.createElement('li');
                listItem.textContent = `${ingredient.ingredient}: ${ingredient.quantite} ${ingredient.unite}`;
                quantitesList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.log(error)
        })
})