//Question 1
const CLE="XAZ568";
const URL_ANNUAIRE="https://dartagnan.cg.helmo.be/~p150107/js2/qcm/annuaire.php";
function nomPrenom({matricule, courriel} = {}) {
    return Promise.race([
        fetch(`${URL_ANNUAIRE}?courriel=${courriel}`, {method: "GET" }).then(
            data => data.json()
        ).then(
            data => {return {"nom": data.nom, "prenom": data.prenom}}
        ),
        fetch(`${URL_ANNUAIRE}?matricule=${matricule}&cle=${CLE}`, {method: "POST"}).then(
            data => data.json()
        ).then(
            data => {return {"nom": data.nom, "prenom": data.prenom}}
        )]
    );
}

//Question 2
const CLE="XAZ568";
const URL_ANNUAIRE="https://dartagnan.cg.helmo.be/~p150107/js2/qcm/annuaire.php";
function verifieNomPrenom({matricule, courriel} = {}) {
    let getValue = fetch(`${URL_ANNUAIRE}?courriel=${courriel}`, {method: "GET" }).then(response => {
        if (!response.ok){
            throw new Error(`[${response.status}]: ${response.statusText} `);
        }
        return response;
    }).then(response => response.json()).then(
        reponse => {
            return {"nom": reponse.nom, "prenom": reponse.prenom}
        }
    )
    let data = JSON.stringify({matricule: matricule, cle: CLE});
    let postValue =  fetch(`${URL_ANNUAIRE}`, {method: "POST", body :data}).then(response => {
        if (!response.ok){
            throw new Error(`[${response.status}]: ${response.statusText} `);
        }
        return response;
    }).then(response => response.json()).then(
        reponse => {
            return {"nom": reponse.nom, "prenom": reponse.prenom}
        }
    )


    return Promise.all([getValue, postValue]).then(value => {
        return  {correct : isExisting(value), parCourriel:{"nom": value[0].nom, "prenom": value[0].prenom} , parMatricule: {"nom": value[1].nom, "prenom": value[1].prenom}} ;
    });

}

function isExisting(value){

    if (value[0].nom === "Non trouvé" || value[0].prenom === "Non trouvé" || value[1].nom === "Non trouvé" || value[1].prenom === "Non trouvé" ) return false;
    else if (value[0].nom === value[1].nom && value[0].prenom === value[1].prenom) return true;
    else return false;

}