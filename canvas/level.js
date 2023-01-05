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
audio2.volume = 0.09;
audio2.play();

