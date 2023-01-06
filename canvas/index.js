// ici,on va importer la classe EnemyController depuis le fichier EnemyController.js
// on fait la meme chose apres pour la classe player et bullets
import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

// mtn on va RECUPERER l'élément canvas avec l'id "game"
const canvas = document.getElementById("game"); //(c'est + rapide avec getElementById)
// ensuite on crée un contexte de dessin pour le canvas
const ctx = canvas.getContext("2d");
//on définit une largeur ici sur 700
canvas.width = 700;
//puis on donne la hauteur
canvas.height = 600;
//la on va créer une image qui sera utilisée comme fond
const background = new Image();
// il ne reste plus qu'a récupèrer l'image à partir de mon fichier "../images/space.png"
background.src = "../img/background1.jpg";
const refreshButton = document.getElementById('replay');

refreshButton.addEventListener('click', function() {
  location.reload();
});

// on va créer une constante pour les étoiles
const stars = document.querySelector(".stars"); // on va utiliser querySelector pour récupèrer l'élément avec la classe "stars"
let xPos = 0;

setInterval(() => {
  xPos -= 1;
  stars.style.backgroundPosition = `${xPos}px 0`;
}, 30);

// on créer les instances:
// une instance de BulletController pour les balles du joueur
const playerBulletController = new BulletController(canvas, 20, "red", true); // --> Pour etre plus precis , cette constante est définie pour contenir une nouvelle instance de la classe "BulletController"
/*
--> ici "canvas" est un référence au canvas HTML (index.html) dans lequel le jeu est dessiné 
--> le "10"  est le nombre de balles que le BulletController gère
--> le "red" est simplement la couleur des balles gérées par ce BulletController.
--> et le "true " indique que ce BulletController gère les balles du joueur.
*/
// une instance de BulletController pour les balles ennemies
const enemyBulletController = new BulletController(canvas, 3, "	#00FF00", false);
// une instance de EnemyController en lui passant les instances de BulletController
const enemyController = new EnemyController(
  canvas,
  enemyBulletController, // --> pour les balles ennemies
  playerBulletController // --> et pour les balles du joueur
);
// crée une instance de Player en lui passant l'instance de BulletController pour les balles du joueur
const player = new Player(canvas, 3, playerBulletController);

// on va définir une variable pour suivre si la partie est terminée ou non
let isGameOver = false;
// et la si il a gagné ou pas
let didWin = false;









// mtn on va devoir définir une FONCTION qui va GÈRER les ACTIONS de chaque images du jeu

function game() {
  
  checkGameOver(); // on vérifie si la partie est terminée puis on utilise la methode "drawiImage() " de l'objt ctx (elle va nous permettre de dessiner une image sur un canvas.)
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);// après on dessine l'image de fond sur le canvas et 

  displayGameOver();// puis on affiche le message de fin de partie si la partie est terminée

//et SI la partie n'est pas terminée, 
  if (!isGameOver) {
    // on dessine les instances de EnemyController, Player, playerBulletController, et enemyBulletController
    enemyController.draw(ctx); 
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}





// ensuite on définit une fonction qui AFFICHE le MESSAGE de fin de partie

function displayGameOver() {
  if (isGameOver) {
    let gameOverMessage = "Game Over!";
    if (didWin) {
      gameOverMessage = "You Win!";
    }
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(gameOverMessage, canvas.width / 2, canvas.height / 2);
  }
}




  
// puis on définit une boucle infinie qui va appeller la fonction game toutes les 1000/60 secondes (en gros 60 fois par seconde)

function checkGameOver() {
  if (isGameOver) {
    return;
  }

// SI le joueur est touché par une balle ennemie
  if (enemyBulletController.collideWith(player)) {
    isGameOver = true; // on va définir la variable de fin de partie sur vrai

  }

// SI le joueur entre en collision avec un ennemi
  if (enemyController.collideWith(player)) {
    isGameOver = true; // on fait le meme -- on définit la variable de fin de partie sur vrai
  }
  
// et SI il n'y a plus d'ennemis

  if (enemyController.enemyRows.length === 0) {
    didWin = true;// là on peut définir la variable de victoire sur vrai!!
    // et donc on définit la variable de fin de partie sur VRAI
    isGameOver = true;
  }
  if (
    enemyController.enemyRows[enemyController.enemyRows.length - 1].some(
      (enemy) => enemy.y + enemy.height >= canvas.height
    )
  ) {
    // Si c'est le cas, termine la partie et affiche le message de défaite
    isGameOver = true;
    didWin = false;
  }

}










setInterval(game, 1000 / 60);













// musique du jeu
let audio = new Audio("../audio/musiquefond.mp3");
audio.volume = 0.1;
audio.play();
