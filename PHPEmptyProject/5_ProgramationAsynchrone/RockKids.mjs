import {DepotScores} from "./DepotScores.mjs";
import {Arbitre, Enfant} from "./Personne.mjs";

let enfants = [
    new Enfant('Andréa Maxence'),
    new Enfant('Ronan Vivien'),
    new Enfant('Demetrio Yasmin'),
    new Enfant('Kanya Lorenzo'),
    new Enfant('Claptrap Jessica'),
    new Enfant('Sung Li')
];

let jury = [
    new Arbitre('Faro Lindemans'),
    new Arbitre('Dave Gilmort'),
    new Arbitre('Angus Old'),
    new Arbitre('Jacques Hetchamp')
];

let scores = new DepotScores(jury);
for (const e of enfants) {
    await e.obtenirScores(jury, scores);
}

scores.printWinner()