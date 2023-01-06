const buttons = document.querySelectorAll('.button');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    localStorage.setItem('buttonValue', this.value);
  });
}
const footer = document.querySelector('footer');

footer.addEventListener('click', function() {
  const audio = new Audio('../audio/met20.mp3');
  audio.play();
});

let audio2 = new Audio("../audio/acceuil.mp3");
audio2.volume = 0.07;
audio2.play();
// on va créer une constante pour les étoiles
const stars = document.querySelector(".stars"); // on va utiliser querySelector pour récupèrer l'élément avec la classe "stars"
let xPos = 0;

setInterval(() => {
  xPos -= 1;
  stars.style.backgroundPosition = `${xPos}px 0`;
}, 30);

