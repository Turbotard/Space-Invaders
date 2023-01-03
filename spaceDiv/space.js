const stars = document.querySelector('.stars');
let xPos = 0;

setInterval(() => {
  xPos -= 2;
  stars.style.backgroundPosition = `${xPos}px 0`;
}, 30);

let game = document.getElementById("spaceInvader");

let largeurGame = game.offsetWidth;
let hauteurGame = game.offsetHeight;


function makeSpaceInvader(colonne,divParColonne,alien){

  let alienCompteur = 0; 
  ValeurVertical = largeurGame/divParColonne;
  ValeurColonne= hauteurGame/colonne;

  for(i =0; i<colonne;i++){

    let createCol = document.createElement("div");

    createCol.style.border = 'solid 1px black';
    createCol.style.height = `${ValeurColonne}px`;
    createCol.style.display = "flex";
    createCol.setAttribute("class","col")
    game.append(createCol);
   
    for(a=1; a<divParColonne;a++){

      if(a == 1){

        let divDansColonne = document.createElement("div");
        divDansColonne.style.width = `${ValeurVertical}px`;
        divDansColonne.style.height = `100%`;
        divDansColonne.style.border = 'solid 1px black';
        divDansColonne.setAttribute("class","start")
        createCol.append(divDansColonne);
  
        }


      if(a == divParColonne-1){

        let divDansColonne = document.createElement("div");
        divDansColonne.style.width = `${ValeurVertical}px`;
        divDansColonne.style.height = `100%`;
        divDansColonne.style.border = 'solid 1px black';
        divDansColonne.setAttribute("class","end")
        createCol.append(divDansColonne);
  
        }else{


          let divDansColonne = document.createElement("div");
          divDansColonne.style.width = `${ValeurVertical}px`;
          divDansColonne.style.height = `100%`;
          divDansColonne.style.border = 'solid 1px black';
          divDansColonne.setAttribute("class","potentiel");
          createCol.append(divDansColonne);
          
          if(alienCompteur < alien){

            console.log(alienCompteur);
            let cl = document.getElementsByClassName("potentiel");
            let change = cl[alienCompteur]
            change.style.backgroundImage = "url('/img/alien.jpg')";
            change.style.backgroundSize = "cover";
            console.log(change);

            alienCompteur++
          }

        }



    }

  }

}

makeSpaceInvader(10,10,32);
// makeSpaceInvader(10,10);



// let doc = document.getElementsByTagName("div");
// console.log(doc);

// let cl = document.getElementsByClassName("potentiel");
// console.log(cl);