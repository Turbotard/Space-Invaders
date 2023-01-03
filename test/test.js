const ENEMY_WIDTH = 40;
const ENEMY_HEIGHT = 40;
const ENEMY_SPEED = 5;
const ENEMY_CREATION_INTERVAL = 1000; // 1 seconde

const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 40;
const PLAYER_SPEED = 10;

const MISSILE_WIDTH = 20;
const MISSILE_HEIGHT = 20;
const MISSILE_SPEED = 15;

let enemies = [];
let missiles = [];
let player;

function startGame() {
    // Masquer l'écran de démarrage et afficher l'écran de jeu
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
  
    // Créer le joueur et l'ajouter à la page
    let player = {
      id: "player",
      x: 200,
      y: 550,
    };
    createPlayer(player);
  
    // Démarrer la boucle de jeu
    gameLoop();
  }
  
  document.getElementById("start-button").addEventListener("click", startGame); 
function gameLoop() {
    // Mettre à jour l'état du jeu
      // Dessiner tous les éléments
  drawEnemies();
  drawMissiles();
  drawPlayer();

  // Mettre à jour l'affichage
  updateDisplay();

  // Répéter la boucle de jeu à intervalle régulier
  setTimeout(gameLoop, 1000 / FPS);
}
function createEnemy(enemy) {
    // Créer un nouvel élément div qui représente l'ennemi
    let enemyElement = document.createElement("div");
    enemyElement.id = enemy.id;
    enemyElement.classList.add("enemy");
    enemyElement.style.left = enemy.x + "px";
    enemyElement.style.top = enemy.y + "px";
    document.getElementById("game").appendChild(enemyElement);
  }
  
  function createPlayer(player) {
    // Créer un nouvel élément div qui représente le joueur
    let playerElement = document.createElement("div");
    playerElement.id = player.id;
    playerElement.classList.add("player");
    playerElement.style.left = player.x + "px";
    playerElement.style.top = player.y + "px";
    document.getElementById("game").appendChild(playerElement);
  }
  setInterval(createEnemy, ENEMY_CREATION_INTERVAL);
function drawEnemies() {
  enemies.forEach((enemy) => {
    let enemyElement = document.getElementById(enemy.id);
    if (!enemyElement) {
      enemyElement = document.createElement("div");
      enemyElement.id = enemy.id;
      enemyElement.className = "enemy";
      document.getElementById("game-screen").appendChild(enemyElement);
    }
    enemyElement.style.left = enemy.x + "px";
    enemyElement.style.top = enemy.y + "px";
  });
}

function drawMissiles() {
  missiles.forEach((missile) => {
    let missileElement = document.getElementById(missile.id);
    if (!missileElement) {
      missileElement = document.createElement("div");
      missileElement.id = missile.id;
      missileElement.className = "missile";
      document.getElementById("game-screen").appendChild(missileElement);
    }
    missileElement.style.left = missile.x + "px";
    missileElement.style.top = missile.y + "px";
  });
}

function drawPlayer() {
  let playerElement = document.getElementById("player");
  if (!playerElement) {
    playerElement = document.createElement("div");
    playerElement.id = "player";
    playerElement.className = "player";
    document.getElementById("game-screen").appendChild(playerElement);
  }
  playerElement.style.left = player.x + "px";
  playerElement.style.top = player.y + "px";
}

function updateDisplay() {
  document.getElementById("score").innerHTML = "Score: " + score;
  document.getElementById("lives").innerHTML = "Lives: " + lives;
}
let rightPressed = false;
let leftPressed = false;

function keyDownHandler(event) {
  if (event.keyCode === 39) {
    rightPressed = true;
  } else if (event.keyCode === 37) {
    leftPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.keyCode === 39) {
    rightPressed = false;
  } else if (event.keyCode === 37) {
    leftPressed = false;
  }
}

function updatePlayer() {
  if (rightPressed && player.x < GAME_WIDTH - PLAYER_WIDTH){
    player.x += PLAYER_SPEED;
    }
  }
  if (leftPressed && player.x > 0) {
    player.x -= PLAYER_SPEED;
    }


function shoot() {
    // Créer un nouveau missile à la position du joueur
    let player = document.getElementById("player");
    let x = player.offsetLeft + PLAYER_WIDTH / 2 - MISSILE_WIDTH / 2;
    let y = player.offsetTop;
    let missile = {
        id: "missile-" + Date.now(),
        x: x,
        y: y,
    };
    missiles.push(missile);
    }
    
    document.getElementById("shoot-button").addEventListener("click", shoot);
function createMissile(missile) {
    // Créer un nouvel élément div qui représente le missile
    let missileElement = document.createElement("div");
    missileElement.id = missile.id;
    missileElement.classList.add("missile");
    missileElement.style.left = missile.x + "px";
    missileElement.style.top = missile.y + "px";
    document.getElementById("game").appendChild(missileElement);
    }
            
function updateEnemies() {
    enemies.forEach((enemy) => {
    enemy.y += ENEMY_SPEED;
    });
    }
    
    function updateMissiles() {
    missiles.forEach((missile) => {
    missile.y -= MISSILE_SPEED;
    });
    }
    
    function checkCollisions() {
    enemies.forEach((enemy, enemyIndex) => {
    missiles.forEach((missile, missileIndex) => {
    if (
    enemy.x < missile.x + MISSILE_WIDTH &&
    enemy.x + ENEMY_WIDTH > missile.x &&
    enemy.y < missile.y + MISSILE_HEIGHT &&
    enemy.y + ENEMY_HEIGHT > missile.y
    ) {
    // Collision détectée !
    // Enlever l'ennemi et le missile du jeu
    enemies.splice(enemyIndex, 1);
    missiles.splice(missileIndex, 1);
    
        // Incrémenter le score
        score++;
      }
    });
});
}
  
   
document.getElementById("start-button").addEventListener("click", startGame);