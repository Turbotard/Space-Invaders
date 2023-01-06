export function makeGame(div){

    let recep = document.getElementsByClassName("grille")[0];
    let numeroDeDebutDiv = [1,21,41,61,81,101,121,141,161,181,201,221];
    let numeroDeFinDiv = [20,40,60,80,100,120,140,160,180,200,220,240];

    let nombreDeDiv = 1;

    let i;

    for(i=0 ; i<div; i++){

        let createDiv = document.createElement("div");

        if(numeroDeDebutDiv.indexOf(nombreDeDiv)!=-1){

            createDiv.setAttribute("class","start");
            recep.append(createDiv);
            nombreDeDiv++;


        }else if(numeroDeFinDiv.indexOf(nombreDeDiv)!=-1){

            createDiv.setAttribute("class","end");
            recep.append(createDiv);
            nombreDeDiv++;

        } else{

            recep.append(createDiv);
            nombreDeDiv++;
        }
        
    }
    
    }



    


