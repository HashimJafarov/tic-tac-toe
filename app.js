const game = document.getElementById("game");
const result = document.getElementById("result");
const score = document.getElementById("score");
const scoreX = document.createElement("li");
const scoreO = document.createElement("li");
scoreX.textContent = "X:0";
scoreO.textContent = "O:0";
score.append(scoreX, scoreO);
let player = true;
let winner = null;
let gameArray = Array(9).fill(null);
let resetbtn = document.getElementById("reset");
resetbtn.style.display = "none";
let squares = document.querySelectorAll(".square");
let scores = {
  X: 0,
  O: 0,
};
console.log(gameArray);
let winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const gameWinner = () => {
  winningPositions.map((position) => {
    let [a, b, c] = position;
    if (
      gameArray[a] &&
      gameArray[a] === gameArray[b] &&
      gameArray[b] === gameArray[c]
    ) {
      winner = gameArray[a];
      scores[winner]++;
      scoreX.textContent = `X: ${scores.X}`;
      scoreO.textContent = `O: ${scores.O}`;
      result.textContent = `WINNER: ${gameArray[a]}`;
      document.querySelectorAll(".square")[a].classList.add("match");
      document.querySelectorAll(".square")[b].classList.add("match");
      document.querySelectorAll(".square")[c].classList.add("match");
      resetbtn.style.display = "block";
    }
  });
  let checkFull = gameArray.every((t) => t);
  if (checkFull && !winner) {
    result.textContent = "Draw";
    resetbtn.style.display = "block";
  }
};

game.addEventListener("click", (e) => {
  if (e.target.textContent !== "" || winner) {
    return;
  }
  e.target.textContent = player ? "X" : "O";
  let scale = 0;
  const interval = setInterval(() => {
    e.target.style.transform = `scale(${scale})`;
    scale += 0.2;
    if (scale >= 1) {
      clearInterval(interval);
    }
  }, 200);
  let coordinate = e.target.getAttribute("coordinate");
  gameArray[coordinate] = player ? "X" : "O";
  player = !player;
  gameWinner();
});
resetbtn.addEventListener("click", () => {
  winner = null;
  gameArray = Array(9).fill(null);
  result.textContent = "";
  [...squares].map((a) => {
    a.textContent = "";
    a.classList.remove("match");
    a.style.transform = "scale(1)";
  });
  resetbtn.style.display = "none";
});
