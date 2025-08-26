const startBtn = document.getElementById("start-btn");
const startScn = document.getElementById("start-screen");
const gameScn = document.getElementById("game-screen");
startBtn?.addEventListener("click", () => {
  startScn?.classList.remove("active"); // remove active from start screen
  gameScn?.classList.add("active"); // now the game is active
});
