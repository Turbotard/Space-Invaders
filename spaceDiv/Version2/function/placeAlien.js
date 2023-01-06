


export function placeAlien(){
    let alienLocalStorage = JSON.parse(localStorage.getItem('tableauAlien'));
    let a;
    for(a=0;a<alienLocalStorage.length;a++){

        let afficheDiv = document.getElementsByTagName("div")[alienLocalStorage[a]]
        afficheDiv.setAttribute("class","alien");
    }
    
}