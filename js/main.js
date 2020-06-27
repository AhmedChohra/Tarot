
//déclaration des variables
let html = ``;
let card, nb;

/**
 * Génère un nombre aléatoire compris entre un minimum et un maximum et le retourne
 * 
 * @param {number} min 
 * @param {number} max 
 */
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Parcourt un ensemble de données pour retourner la ligne correspondant à l'index spécifié
 * 
 * @param {number} index : index qu'on souhaite atteindre dans le set
 * @param {Set} set : ensemble de données duquel on souhaite extraire une ligne de donnée
 */

 // Parcourt l'ensemble de données, récupère la ligne correspondant au nombre aléatoire (en la comparant avec le count, qui s'incremante à chaque ligne) et la renvoi. 
function atIndex(number, set) {
    let count = 1;
    for (let line of set) {
        if (count  === (number)) {
            return line;
        }
        count++;
    }
}

/**
 * Crée une <li> qui affiche l'image et les infos de la carte tirée dans la ul#tirage
 * 
 * @param {number} nb : nombre généré aléatoirement
 * @param {object} card : une ligne de l'ensemble de données (set) arcanes
 */

function displayCard() {
    // html correspond à la li à afficher, elle se concatène pour pouvoir afficher plus d'une carte, elle utilise les données de l'objet card et de (nb -1) (pour récupérer l'image)
    html += `<li><img src="images/${nb - 1}.jpg" alt="${card.nom}"> 
    <h2>${card.num} - ${card.nom}</h2>
    <p>${card.signification}</p>
    </li>`;
    //html est ensuite injecté dans ul#tirage 
    document.querySelector("ul#tirage").innerHTML = html;
}

/**
 * Fonction appelée quand on clique sur le bouton "Tire moi une carte"
 * Se charge de tirer une carte aléatoire et d'appeler la fonction qui l'affiche dans la ul
 * Au bout de 3 cartes tirées, le bouton disparait et un autre permettant de relancer la page apparait
 */
function pickCard() {
    do {
        /**
         * tire un nombre aléatoire compris entre 1 et la taille du set contenant la liste des arcanes
         * si cette carte a déjà été tiré, le système en tire une autre
         */
        nb = getRandomInteger(1, (arcanes.size));
    } while (tirage.has(nb))

    /**
     * ajoute le numéro de la carte dans le set contenant tous les numéros de cartes tirées
     */
    tirage.add(nb);

    /**
     * les Set n'ont pas de méthodes permettant de récupérer la valeur se trouvant à un index en particulier, comme les tableaux. 
     * Nous appelons donc une fonction (atIndex) qui permet de reproduire cette fonctionnalité en lui passant l'index souhaité et l'ensemble de données à parcourir. 
     * Cette fonction a pour objectif de nous retourner l'item se trouvant à la ligne choisie
     */
    //let card = -> à coder
    //récupère les données renvoyées par la fonction atIndex et l'affecte à un objet card
    card = atIndex(nb, arcanes);

    /**
     * Appelle la fonction qui permet d'afficher la carte tirée
     */
    // -> à coder
    // affiche la carte
    displayCard();

    /**
     * Si 3 cartes ont été tirées :
     * on cache le bouton #go pour ne pas pouvoir en tirer d'autre
     * on affiche le bouton #replay qui permet de lancer un autre tirage
     */
    if (tirage.size == 3) {
        document.querySelector("#go").classList.add("hide");
        document.querySelector("#replay").classList.remove("hide");
    }
}


let tirage = new Set(); //variable qui contiendra les numéros des cartes tirées

/**
 * Code qui ne s'éxécute que quand la page est chargée
 */
document.addEventListener('DOMContentLoaded', function () {
    //gestionnaire d'événement sur le bouton #go qui permet de tirer une carte et l'afficher (appel de la fonction pickCard)
    // -> à coder
    document.querySelector("#go").addEventListener('click', pickCard);

    //gestionnaire d'événement sur le bouton #replay qui permet de rafraichir la page
    document.querySelector("#replay").addEventListener('click', function () {
        window.location.reload();
    });
});