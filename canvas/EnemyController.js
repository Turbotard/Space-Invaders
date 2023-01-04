// ici,on va importer la classe Enemy depuis le fichier Enemy.js + la classe MovingDirection depuis le fichier MovingDirection.js
import Enemy from "./Enemy.js"; 
import MovingDirection from "./MovingDirection.js";

// on doit déclarer la classe EnemyController
export default class EnemyController { // export default est la syntaxe utilisée dans JS pour exporter une valeur ou une classe depuis un module(mtn on peut l'utiliser dans d'autres modules..)
  // on définit mtn une carte d'ennemis sous forme de tableau 
  enemyMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
  ];
  // et il faut définir un tableau qui contiendra les instances de la classe Enemy

  enemyRows = [];


  currentDirection = MovingDirection.right; // là on a définit la direction de déplacement des ennemis (vers la droite par défaut)
  xVelocity = 0; // là on definit la vitesse des déplacements "abscisse"
  yVelocity = 0;// là on definit la vitesse des déplacements "ordonées"
  
  // on leur définit leurs vitesses de déplacements par défaut "abs + ord "(1 par défaut)
  defaultXVelocity = 1;
  defaultYVelocity = 1;

  // on doit définir le délai avant que les ennemis ne descendent d'une ligne (là on mets 30 par défaut)
  moveDownTimerDefault = 30;
  moveDownTimer = this.moveDownTimerDefault;
  
  // et là on doit définir le délai avant qu'un ennemi ne tire une balle (ici on mets 10 par défaut)
  fireBulletTimerDefault = 10;
  fireBulletTimer = this.fireBulletTimerDefault;


  // le constructeur de la classe est une fonction qui s'exécute lorsque l'on crée un nouvel objet de type EnemyController
  constructor(canvas, enemyBulletController, playerBulletController) {// Elle permet de définir l'état initial de l'objet

    this.canvas = canvas;// on stocke une référence au canvas dans l'objet
    this.enemyBulletController = enemyBulletController;// et on stocke une référence au BulletController des ennemis dans l'objet
    this.playerBulletController = playerBulletController;// on stocke aussi une référence au BulletController du joueur dans l'objet
    this.createEnemies();// et il faut aussi créer les ennemis!

  }
//on rappele cette fonction (mettre a jour + afficher les ennemis)
  draw(ctx) {
    this.decrementMoveDownTimer();// alors la on  doit décrémenter le délai avant que les ennemis ne descendent d'une ligne

    this.updateVelocityAndDirection();// ici on met à jour la vitesse et la direction de déplacement des ennemis

    this.collisionDetection();// et on érifie s'il y a collision entre les balles du joueur et les ennemis

    this.drawEnemies(ctx);// on affiche les ennemis

    this.resetMoveDownTimer();// puis on réinitialise le délai avant que les ennemis ne descendent d'une ligne si nécessaire

    this.fireBullet();// fait tirer une balle aléatoirement parmi les ennemis

  }

  // on vérifie s'il y a collision entre les balles du joueur et les ennemis
  collisionDetection() {
    // et ca pour chaque ligne d'ennemis
    this.enemyRows.forEach((enemyRow) => {
      // pour chaque ennemi dans la ligne

      enemyRow.forEach((enemy, enemyIndex) => {
        // et SI il y a collision entre l'ennemi et une balle du joueur
        if (this.playerBulletController.collideWith(enemy)) {
          enemyRow.splice(enemyIndex, 1);// on supprime l'ennemi de la ligne

        }
      });
    });
    // la on va trier les lignes d'ennemis pour ne conserver que celles qui sont encore nos ennemis
    this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
  }
  // on va faire tirer une balle aléatoirement parmi les ennemis
  fireBullet() {
    // on décrémente le délai avant qu'un ennemi ne tire une balle
    this.fireBulletTimer--;
    // mtn SI le délai est écoulé on va le recommencer
    if (this.fireBulletTimer <= 0) {
      // Réinitialisation du délai
      this.fireBulletTimer = this.fireBulletTimerDefault;
      // puis on récupère tous les ennemis dans un tableau unique
      const allEnemies = this.enemyRows.flat();

      // pour que les ennemis puissent tirer il faut les selectionner 
      //on les sélectionne au hasard un des objets Enemy dans le tableau allEnemies
      const enemyIndex = Math.floor(Math.random() * allEnemies.length);// allEnemies.length= nombre d'elements ds mon tableau

      const enemy = allEnemies[enemyIndex];// pour etre plus clair : là on va utiliser l' index pour sélectionner l'objet Enemy correspondant dans le tableau allEnemies, et le stockera dans la variable enemy
    
      // Fait tirer une balle par l'ennemi
      this.enemyBulletController.shoot(enemy.x + enemy.width / 2, enemy.y, -3);
     /*
     1er argument --> correspond à la coordonnée x de l'objet enemy
     on le fait pour pouvoir déterminer le centre horizontal de l'objet enemy

     2eme argument --> correspond à la coordonnée y de l'objet enemy
     on le fait pour pouvoir déterminer le bord supérieur de l'objet enemy.

     et enfin le :
     
     3eme arguments --> c'est la vitesse verticale de la balle
     on avait mit -3 comme un nombre négatif indique que la balle se déplace vers le haut
     */

    }
  }


// cette fonction remet à 0 le compteur "moveDownTimer" lorsqu'il atteint 0


  resetMoveDownTimer() {
    if (this.moveDownTimer <= 0) {
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }
  // on demecremente le timer de descente des ennemis pour qu'on puisse apres 
  decrementMoveDownTimer() {
    if (
      this.currentDirection === MovingDirection.downLeft || // on verifie si la propiété "currentdirection" est strict egal a une valeur de movingdirection[...] OU ||
      this.currentDirection === MovingDirection.downRight
    ) {
      // et la si c'est vrai on décremente
      this.moveDownTimer--;
    }
  }
// cette fonction MET À JOUR la vitesse et la direction de déplacement de nos ennemis
  updateVelocityAndDirection() {
    // on creer une boucle for --> 
    for (const enemyRow of this.enemyRows) {
      // si "currentDirection va a droite"
      if (this.currentDirection === MovingDirection.right) {
      
        //alors on met y par defaut et x a 0
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;
        //on va recup l'ennemie le + a droite 
        const rightMostEnemy = enemyRow[enemyRow.length - 1];
        // on fait ATTENTION au canvas ici
        // dans ce cas SI cet ennemi est à la fin de la zone de jeu (sur le bord droit du canvas)
        if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
          // là on va changer la direction des ennemis pour qu' son descendant vers la gauche 
          this.currentDirection = MovingDirection.downLeft;
          break;// puis on quitte la boucle 
        }

        
        // on voit si la fonction est vrai 
      } else if (this.currentDirection === MovingDirection.downLeft) {// si ca va vers la gauche qd ils decendent
        if (this.moveDown(MovingDirection.left)) {// si la fct movedown est verifier (true) 
          break;// on quitte


        }
        // on fait ca pour la gauche aussi
        // meme chose mais mtn a gauche
      } else if (this.currentDirection === MovingDirection.left) {
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;
        const leftMostEnemy = enemyRow[0];
        if (leftMostEnemy.x <= 0) {
          this.currentDirection = MovingDirection.downRight;
          break;
        }
        // on voit si la fonction est vrai 
      } else if (this.currentDirection === MovingDirection.downRight) {
        if (this.moveDown(MovingDirection.right)) {
          break;
        }
      }
    }
  }


  // on gère le deplacements des ennemis
  moveDown(newDirection) {
    this.xVelocity = 0;
    this.yVelocity = this.defaultYVelocity;// pour qu'il se deplace tjrs horizontalement
    if (this.moveDownTimer <= 0) {// par contre si le timer de descente est inférieur ou = à 0 
      this.currentDirection = newDirection;// on met a jour la nouvvelle direction
      return true;
    }
    return false;
  }

  // retour sur le canvcas mtn : on va utiliser cette fonction pr dessiner dessus
  drawEnemies(ctx) {
    // on selectionne  chaque ennemi dans la liste
    this.enemyRows.flat().forEach((enemy) => {//(flat: methode qui ns permet d'aplatir)
      enemy.move(this.xVelocity, this.yVelocity);//on deplace l'ennemie en fonction des vitessse definis en x et y
      enemy.draw(ctx);//l'ennemi est dessiné sur le canvas
    });
  }

  
  // mtn on créer les ennemis à partir de la map d'ennemis
  createEnemies() {
    this.enemyMap.forEach((row, rowIndex) => {//tableau + position index
      this.enemyRows[rowIndex] = [];// on la créer pr pouvoir plus tard stocker les ennemis de chaque lignes
      row.forEach((enemyNubmer, enemyIndex) => {// pour chaque ennemi dans la ligne

        // si l'ennemi existe(>0)
        if (enemyNubmer > 0) {
          // alors on ajoute l'ennemi à la liste d'ennemis de cette ligne
          this.enemyRows[rowIndex].push(
            //TRES DROLE
            // PEUT MOFIER LE NOMBRE ET LA QTT D'ENNEMI
            new Enemy(enemyIndex * 50, rowIndex * 35 , enemyNubmer)
          );
        }
      });
    });
  }

  collideWith(sprite) {
    return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
  }
}
