class DictioTemporary {

    constructor(entries) {
        this.entries = new Map()
        for (let key in entries) {
            if (entries.hasOwnProperty(key)) {
               this.entries.set(key, entries[key])
            }
        }
    }

    clear() {
        this.entries.clear()
    }

    static load() {

    }

    cleanString(text) {
        let result = ''
        for(let char of text) {
            if(char === '.' || char === ';' || char === ',' || char === '!' || char === '?' || char === '"' || char === ':') {
                continue
            }
            result += char
        }
        return result.toLowerCase()
    }
}

let dictionary = new DictioTemporary({clavier : " Ensemble des touches d'une machine à écrire sur lesquelles on appuie avec les doigts pour écrire.", crayon: "Morceau de boiscylindrique fin contenant une mine en son centre, taillé afin d'obtenir une pointe àl'extrémité et qui permet de dessiner, colorier ou écrire avec la main"});

let value = "Morceau de bois cylindrique fin contenant une\" mine en son centre, taillé afin d'obtenir une pointe à l'extrémité et qui permet de dessiner, colorier ou écrire avec la main !"
value = dictionary.cleanString(value)

console.log(value)
