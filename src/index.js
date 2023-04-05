import { newGame, restartGame } from "../src/gameLoop";

newGame();

// New game listener
const restartButtons = document.querySelectorAll(".popup");
restartButtons.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    restartGame();
    btn.style.display = "none";
  });
});
