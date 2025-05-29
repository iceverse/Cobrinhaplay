const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
let snake = [{ x: 200, y: 200 }];
let direction = "right";
let food = {
  x: Math.floor(Math.random() * (canvasSize / box)) * box,
  y: Math.floor(Math.random() * (canvasSize / box)) * box,
};
let score = 0;

document.addEventListener("keydown", updateDirection);

function updateDirection(event) {
  const key = event.key;
  if (key === "ArrowUp" && direction !== "down") direction = "up";
  if (key === "ArrowDown" && direction !== "up") direction = "down";
  if (key === "ArrowLeft" && direction !== "right") direction = "left";
  if (key === "ArrowRight" && direction !== "left") direction = "right";
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhar a cobrinha
  snake.forEach((part, index) => {
    context.fillStyle = index === 0 ? "#00ff00" : "#66ff66";
    context.fillRect(part.x, part.y, box, box);
  });

  // Desenhar a comida
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);

  // Mover a cobra
  let head = { ...snake[0] };
  if (direction === "right") head.x += box;
  if (direction === "left") head.x -= box;
  if (direction === "up") head.y -= box;
  if (direction === "down") head.y += box;

  // Fim de jogo se sair do canvas ou se bater no corpo
  if (
    head.x < 0 || head.x >= canvasSize ||
    head.y < 0 || head.y >= canvasSize ||
    snake.some((segment, i) => i !== 0 && segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(game);
    alert("💀 Game Over! Pontuação: " + score);
    return;
  }

  snake.unshift(head);

  // Comer comida
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
  } else {
    snake.pop();
  }
}

const game = setInterval(draw, 150);
