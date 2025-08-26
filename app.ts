const startBtn = document.getElementById("start-btn");
const startScn = document.getElementById("start-screen");
const gameScn = document.getElementById("game-screen");
startBtn?.addEventListener("click", () => {
  startScn?.classList.remove("active"); // remove active from start screen
  gameScn?.classList.add("active"); // now the game is active
});

const generateProblem = () => {
  // HTMLInputElement tells typescript there is a .value, since it's an input type
  const min1 = document.getElementById("min-1") as HTMLInputElement;
  const min1Value = parseInt(min1?.value);
  const max1 = document.getElementById("max-1") as HTMLInputElement;
  const max1Value = parseInt(max1?.value);
  const min2 = document.getElementById("min-2") as HTMLInputElement;
  const min2Value = parseInt(min2?.value);
  const max2 = document.getElementById("max-2") as HTMLInputElement;
  const max2Value = parseInt(max2?.value);

  const num1 = Math.floor(
    Math.random() * (max1Value - min1Value + 1) + min1Value
  );
  const num2 = Math.floor(
    Math.random() * (max2Value - min2Value + 1) + min2Value
  );
  const answer = num1 * num2;
  return { num1: num1, num2: num2, answer: answer };
};
