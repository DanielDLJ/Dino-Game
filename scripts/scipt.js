const dino = document.querySelector(".dino");
const background = document.querySelector(".background");

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (
    event.keyCode === 32 || // "space"
    event.keyCode === 38 || // ↑
    event.keyCode === 87 // "W"
  ) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 160) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement("div");
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add("cactus");
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + "px";

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
      createRandom();
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);

  //   setTimeout(createCactus(), randomTime);
}

function createBird() {
  const bird = document.createElement("div");
  let birdPosition = 1000;
  let birdPositionTop = 60;
  var random_boolean = Math.random() < 0.5;

  if (random_boolean) birdPositionTop = 120;

  if (isGameOver) return;

  bird.classList.add("bird");
  background.appendChild(bird);
  bird.style.left = birdPosition + "px";
  bird.style.top = birdPositionTop + "px";

  let leftTimer = setInterval(() => {
    if (birdPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      createRandom();
      background.removeChild(bird);
    } else if (
      ((birdPositionTop === 120 && position <= 80) || //bottom
        (birdPositionTop === 60 &&  position > 60)) && //top
      birdPosition > 0 &&
      birdPosition < 60
    ) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      birdPosition -= 10;
      bird.style.left = birdPosition + "px";
    }
  }, 20);
}

function createRandom() {
  var random_boolean = Math.random() < 0.5;
  if (random_boolean) createBird();
  else createCactus();
}

createRandom();
document.addEventListener("keyup", handleKeyUp);
