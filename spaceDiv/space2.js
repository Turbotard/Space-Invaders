
let recep = document.getElementById("spaceInvader");

function makeGame(div){

    for(i=0; i<div;i++){

        let boite = document.createElement("div");
        boite.setAttribute("class","div");
        recep.append(boite);

    }

}


makeGame(210);