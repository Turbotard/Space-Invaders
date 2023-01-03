// Fonction qui dessine le jeu sur le canvas
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
function draw(ctx) {
  

  // Effacement du canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Dessin des aliens et du joueur sur le canvas
  game.aliens.forEach((alien) => {
    if (alien.alive) {
      // Dessin de l'alien normal
      ctx.fillRect(alien.x, alien.y, 10, 10);
    } else {
      // Dessin de l'alien en train de mourir
      ctx.fillStyle = "red";
      ctx.fillRect(alien.x, alien.y, 10, 10);
    }
  });

  // Dessin du joueur sur le canvas
  ctx.fillRect(game.player.x, game.player.y, 10, 10);

  // Dessin des tirs sur le canvas
  game.shots.forEach((shot) => {
    ctx.fillRect(shot.x, shot.y, 3, 3);
  });
}

class Player {
  // Constructeur de la classe Player
  constructor(x, y) {
    this.x = x+125;
    this.y = y+280;
    this.shootTime = 0; // Moment où le joueur a tiré pour la dernière fois
  }

  // Méthode qui permet au joueur de se déplacer vers la gauche
  moveLeft() {
    this.x -= 25;
  }

  // Méthode qui permet au joueur de se déplacer vers la droite
  moveRight() {
    this.x += 25;
  }

  // Méthode qui permet au joueur de tirer
  shoot() {
    // Vérifie si le joueur peut tirer (cooldown de 500 ms)
    if (Date.now() - this.shootTime > 500) {
      // Création d'un nouveau tir
      let shot = new Shot(this.x+5, this.y+5);
      game.shots.push(shot);
      this.shootTime = Date.now();
    }
  }
}

class Shot {
  // Constructeur de la classe Shot
  constructor(x, y, game) {
    this.x = x;
    this.y = y;
    this.game = game;
    this.speed = 8;
    this.width = 5;
    this.height = 15;
  }

  // Méthode qui met à jour la position du tir
  update() {
    this.y -= this.speed;
  }

  // Méthode qui dessine le tir
  draw(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}



class Game {
  // Constructeur de la classe Game
  constructor() {
    this.aliens = [];
    this.player = new Player(100, 200);
    this.shots = [];
    this.score = 0;
  }

  // Méthode qui permet d'ajouter des points au score
  addScore(points) {
    this.score += points;
  }

   // Méthode qui met à jour l'état du jeu
   update() {
   // Mise à jour de la position des tirs
   this.shots.forEach((shot) => {
    shot.update();
  });

     // Vérification des collisions entre les tirs et les aliens
    this.aliens.forEach((alien) => {
      if (alien.alive) {
        this.shots.forEach((shot) => {
          if (alien.isColliding(shot)) {
            alien.destroy();
            this.score += 100;
          }
        });
      }
    });
    // Suppression des tirs et des aliens morts
    this.shots = this.shots.filter((shot) => shot.y > 0);
    this.aliens = this.aliens.filter((alien) => !alien.destroy());

    // Mise à jour de la position des aliens
    this.aliens.forEach((alien) => {
      if (alien.alive) {
        alien.update();
      }
      else{
        alien.update();
      }
    });
    if (this.gameOver) {
      this.ctx.font = "48px serif";
      this.ctx.fillText("Game Over!", 200, 250);
      this.ctx.fillText(`Score: ${this.score}`, 200, 300);
    }
    
  }
  
}
class Alien {
  
  // Constructeur de la classe Alien
  constructor(x, y, game) {
   this.x = x;
   this.y = y;
   this.game = game;
   this.alive = true;
   this.width = 50;
   this.height = 50;
 }

 // Méthode qui dessine l'alien
 draw(ctx) {
   ctx.fillStyle = "green";
   ctx.fillRect(this.x, this.y, this.width, this.height);
 }

 // Méthode qui met à jour la position de l'alien
 update() {
   this.x += Math.sin(Date.now() / 1000);
 }

 // Méthode qui vérifie si le tir touche l'alien
 isColliding(shot) {
   return (
     shot.x < this.x + this.width &&
     shot.x + shot.width > this.x &&
     shot.y < this.y + this.height &&
     shot.y + shot.height > this.y
   );
 }

 // Méthode qui détruit l'alien
 destroy() {
   // Retire l'alien de la liste des aliens dans la classe Game
   this.game.aliens.splice(this.game.aliens.indexOf(this), 1);
 }
}

// Création d'un nouveau jeu
let game = new Game();

// Mise à jour et dessin du jeu à chaque frame
function gameLoop() {
  // Mise à jour de l'état du jeu
  game.update();

  // Dessin du jeu
  game.draw(ctx);

  // Si le jeu n'est pas terminé, on relance la boucle
  if (!game.gameOver) {
    requestAnimationFrame(gameLoop);
  }
}



// Gestion des événements de clavier
document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowLeft":
      game.player.moveLeft();
      break;
    case "ArrowRight":
      game.player.moveRight();
      break;
    case "Space":
      game.player.shoot();
      break;
  }
});

// Appel de la fonction gameLoop pour démarrer le jeu
requestAnimationFrame(gameLoop);
// Création de la grille de aliens
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 5; j++) {
    let alien = new Alien(i * 50, j * 50);
    game.aliens.push(alien);
  }
}

// Chargement des images
let alienImage = new Image();
alienImage.src = "alien.jpg";

let playerImage = new Image();
playerImage.src = "player.jpg";

game.aliens.forEach((alien) => {
  if (alien.alive) {
    game.shots.forEach((shot) => {
      if (alien.isColliding(shot)) {
        // L'alien a été touché par le tir
        alien.destroy();
      }
    });
  }
});
// Suppression des tirs qui ont touché un alien
game.shots = game.shots.filter((shot) => {
  let hasHit = false;
  game.aliens.forEach((alien) => {
    if (alien.isColliding(shot)) {
      hasHit = true;
    }
  });
  return !hasHit;
});
