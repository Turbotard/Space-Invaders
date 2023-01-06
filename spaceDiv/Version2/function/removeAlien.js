


export function removeAlien(){

    let findAlien = document.getElementsByClassName("alien");

    let longeurTableauAlien = findAlien.length

    let w;
    for(w=0;w<longeurTableauAlien;w++){
        
        // console.log(findAlien[i])
        findAlien[0].classList.remove("alien");

    }
}