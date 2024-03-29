// on définit la classe Player
export default class Player {
  upPressed = false;// on définit une variable pour savoir si la touche haut est enfoncée ou non
  downPressed = false;// on définit une variable pour savoir si la touche bas est enfoncée ou non
  rightPressed = false;// on définit une variable pour savoir si la touche droite est enfoncée ou non
  leftPressed = false;// la meme mais pr la gauche
  shootPressed = false; // la meme mais pr le tir(espace)


  // on définit le constructeur de la classe Player
  constructor(canvas, velocity, bulletController) {// on lui passe en paramètre le canvas, la vitesse et le controller de bullet
    // on définit les propriétés de la classe Player
    this.canvas = canvas;
    this.velocity = velocity;
    this.bulletController = bulletController;

    // on définit les propriétés de l'image du joueur
    this.x = this.canvas.width / 2;// on définit la position X du joueur
    this.y = this.canvas.height - 75;// on définit la position Y du joueur
   
    this.height = 48;// on définit la hauteur du joueur
    this.width = 70;// on définit la largeur du joueur
    this.image = new Image(); // on définit une nouvelle img (mon joueur)
    this.image.src = "images/avion-removebg-preview.png";
    
    document.addEventListener("keydown", this.keydown);// on définit une variable pour savoir si la touche droite est enfoncée ou non
    document.addEventListener("keyup", this.keyup);// on définit une variable pour savoir si la touche gauche est enfoncée ou non
  }


  // on définit une fonction pour DESSINER le JOUEUR
  draw(ctx) {
    if (this.shootPressed) {// si la touche espace est enfoncée
      // on tire une balle (position X du joueur + la moitié de sa largeur, la position Y du joueur, la vitesse et la taille de la balle
      this.bulletController.shoot(this.x + this.width / 2, this.y, 5, 10);// on tire une balle
    }
    
    this.toMove();// on déplace le joueur
    this.touchCanvasBorder();// on vérifie si le joueur touche LES COTÉS du canvas
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
// on définit une fonction pour vérifier si le joueur touche les cotés du canvas
  touchCanvasBorder() {
    //gauche
    if (this.x < 0) {// si la position X du joueur est inférieur à 0
      this.x = 0;// on définit la position X du joueur à 0
    }

    //droite
    if (this.x > this.canvas.width - this.width) {// si la position X du joueur est supérieur à la largeur du canvas - la largeur du joueur
      this.x = this.canvas.width - this.width;// on définit la position X du joueur à la largeur du canvas - la largeur du joueur
    }
    //haut
    if (this.y < 0) {// si la position Y du joueur est inférieur à 0
      this.y = 0;// on définit la position Y du joueur à 0
    }
    //bas
    if (this.y > this.canvas.height - this.height) {// si la position Y du joueur est supérieur à la hauteur du canvas - la hauteur du joueur
      this.y = this.canvas.height - this.height;// on définit la position Y du joueur à la hauteur du canvas - la hauteur du joueur  
  }
}
  

  toMove() {// on définit une fonction pour déplacer le joueur
    if (this.rightPressed) {// si la touche droite est enfoncée
      this.x += this.velocity;//  on ajoute la vitesse à la position X du joueur
    }if (this.leftPressed) {//si la touche gauche est enfoncée
      this.x += -this.velocity;// on ajoute la vitesse à la position X du joueur

    }
    if (this.upPressed) {
      this.y += -this.velocity;
    }
    if (this.downPressed) {
      this.y += this.velocity;
    }
  }









  keydown = (event) => {
    if (event.code == "ArrowRight") { // Flèche droite pour aller à droite
      this.rightPressed = true;
    }
    if (event.code == "ArrowLeft") { // Flèche gauche pour aller à gauche
      this.leftPressed = true;
    }
    if (event.code == "Space") {
      this.shootPressed = true;
      let samba = new Audio("../audio/samba.mp3");
      samba.volume = 0.3;
      samba.play();
    }
    if (event.code == "ArrowUp") { // Flèche vers le haut pour aller vers le haut
      this.upPressed = true;
    }
    if (event.code == "ArrowDown") { // Flèche vers le bas pour aller vers le bas
      this.downPressed = true;
    }
  };
  
  keyup = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPressed = false;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = false;
    }
    if (event.code == "Space") {
      this.shootPressed = false;
    }
    if (event.code == "ArrowUp") {
      this.upPressed = false;
    }
    if (event.code == "ArrowDown") {
      this.downPressed = false;
    }
  };  
}
