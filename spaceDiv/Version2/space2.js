

import {makeGame} from '../Version2/function/makeGame.js'
import { placeAlien } from './function/placeAlien.js';
import { removeAlien } from './function/removeAlien.js';
import { deplacementDroite } from './function/moveRight.js';


makeGame(240);

let alien = [5,6,7,8,9,10,11,12,13,14,15,16,17,25,26,27,28,29,30,31,32,33,34,35,36,37,45,46,47,48,49,50,51,52,53,54,55,56,57];

localStorage.setItem('tableauAlien', JSON.stringify(alien));

placeAlien();



let intervalDroite = setInterval(deplacementDroite,1000);







