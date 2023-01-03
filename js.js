class Player {
  // Constructeur de la classe Player
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.shootTime = 0; // Moment où le joueur a tiré pour la dernière fois
  }

  // Méthode qui permet au joueur de se déplacer vers la gauche
  moveLeft() {
    this.x -= 5;
    console.log("gauche")
  }

  // Méthode qui permet au joueur de se déplacer vers la droite
  moveRight() {
    this.x += 5;
    console.log("droite")
  }

  // Méthode qui permet au joueur de tirer
  shoot() {
    // Vérifie si le joueur peut tirer (cooldown de 500 ms)
    if (Date.now() - this.shootTime > 500) {
      // Création d'un nouveau tir
      let shot = new Shot(this.x, this.y);
      game.shots.push(shot);
      this.shootTime = Date.now();
    }
  }
}

class Shot {
  // Constructeur de la classe Shot
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Alien {
  // Constructeur de la classe Alien
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alive = true;
  }

  // Méthode qui vérifie si l'alien est touché par un tir
  isHit(x, y) {
    return this.x === x && this.y === y;
  }

  // Méthode qui tue l'alien
  destroy() {
    this.alive = false;
  }

  // Méthode qui indique si l'alien est mort
  isDead() {
    return !this.alive;
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
      shot.y -= 5;
    });

    // Vérification des collisions
    this.aliens.forEach((alien) => {
      this.shots.forEach((shot) => {
        if (alien.isHit(shot.x, shot.y)) {
          alien.destroy();
          this.addScore(1); // Ajout d'un point au score
        }
      });
    });
  }
}
