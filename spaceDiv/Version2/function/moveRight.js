import { removeAlien } from "./removeAlien.js";
import { placeAlien } from "./placeAlien.js";
import {deplacementGauche} from "./moveLeft.js";


export function deplacementDroite(){

    let alienLocalStorage = JSON.parse(localStorage.getItem('tableauAlien'));
    let checkDerrnierAlien = alienLocalStorage[alienLocalStorage.length-1];
    let checkNextDiv = document.getElementsByTagName("div")[checkDerrnierAlien+1];

    if(checkNextDiv.getAttribute("class") == "end"){

        alienLocalStorage = alienLocalStorage.map(x => x + 20);
        localStorage.setItem('tableauAlien', JSON.stringify(alienLocalStorage));

        removeAlien();
        placeAlien();
        clearInterval(intervalDroite);
        let intervalGauche = setInterval(deplacementGauche,1000);

    }else{

        alienLocalStorage = alienLocalStorage.map(x => x + 1);
        localStorage.setItem('tableauAlien', JSON.stringify(alienLocalStorage));

        removeAlien();
        placeAlien();
    }
    
}