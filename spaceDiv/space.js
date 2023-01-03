let game = document.getElementById("spaceInvader");

let largeurGame = game.offsetWidth;
let hauteurGame = game.offsetHeight;


function makeSpaceInvader(colonne,divParColonne){

  ValeurVertical = largeurGame/divParColonne;
  ValeurColonne= hauteurGame/colonne;

  for(i =0; i<colonne;i++){

    let createCol = document.createElement("div");

    createCol.style.border = 'solid 1px black';
    createCol.style.height = `${ValeurColonne}px`;
    createCol.style.display = "flex";
    createCol.setAttribute("class","col")
    game.append(createCol);
    console.log(colonne);

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
          createCol.append(divDansColonne);

        }



    }

  }

}

makeSpaceInvader(10,10);



let doc = document.getElementsByTagName("div");
console.log(doc);