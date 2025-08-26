// START
const startBtn = document.getElementById("start-btn");
const startScn = document.getElementById("start-screen");
// GAME
const gameScn = document.getElementById("game-screen");
const timeLimit = document.getElementById("time-limit") as HTMLInputElement;
const timerDisplay = document.getElementById("timer");
let timerInterval: number | null = null; // timer id to stop it later
let timeLeft: number; // seconds, 120, 119, 118
const problemDiv = document.getElementById("problem")!; //! = non-null assertion
// add here so we don't keep adding listeners
problemDiv.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  if (target.id === "answer") {
    if (parseInt(target.value) === answer) {
      score++;
      document.getElementById("score")!.textContent = score.toString();
      generateProblem();
    }
  }
});

let score = 0;
let answer: number;
// RESULTS
const resultScn = document.getElementById("result-screen");
const stopBtn = document.getElementById("stop-btn");
stopBtn?.addEventListener("click", () => {
  endGame();
});
const retryBtn = document.getElementById("retry");
retryBtn?.addEventListener("click", () => {
  // reset score but keep same settings
  score = 0;
  document.getElementById("score")!.textContent = "0";
  // go back to game
  resultScn?.classList.remove("active");
  startScn?.classList.add("active");
  // auto-start the game
  startBtn?.click();
});
const changeSettingsBtn = document.getElementById("new-settings");
changeSettingsBtn?.addEventListener("click", () => {
  // reset score
  score = 0;
  document.getElementById("score")!.textContent = "0";
  // start screen
  resultScn?.classList.remove("active");
  startScn?.classList.add("active");
});

// START GAME BUTTON
startBtn?.addEventListener("click", () => {
  // validate inputs
  const min1 = parseInt(
    (document.getElementById("min-1") as HTMLInputElement).value
  );
  const max1 = parseInt(
    (document.getElementById("max-1") as HTMLInputElement).value
  );
  const min2 = parseInt(
    (document.getElementById("min-2") as HTMLInputElement).value
  );
  const max2 = parseInt(
    (document.getElementById("max-2") as HTMLInputElement).value
  );
  const timeLimitValue = parseInt(timeLimit.value);
  // no nulls
  if (
    isNaN(min1) ||
    isNaN(max1) ||
    isNaN(min2) ||
    isNaN(max2) ||
    isNaN(timeLimitValue)
  ) {
    alert("fill in all fields");
    return;
  }
  if (min1 > max1 || min2 > max2) {
    alert("min must be <= max");
    return;
  }
  if (timeLimitValue < 0) {
    alert("Time cannot be negative!");
    return;
  }
  timeLeft = timeLimitValue;
  if (timeLimitValue > 0) {
    timerInterval = setInterval(() => {
      timeLeft -= 1;
      timerDisplay!.textContent = `${timeLeft}`;
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  } else {
    timerDisplay!.textContent = "∞";
  }

  startScn?.classList.remove("active"); // remove active from start screen
  gameScn?.classList.add("active"); // now the game is active

  generateProblem();
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
  answer = num1 * num2; // set var globally, set it per question here
  problemDiv.innerHTML = `${num1} * ${num2} = <input id="answer" type="number">`;
  (document.getElementById("answer") as HTMLInputElement)?.focus();
};

const endGame = () => {
  gameScn?.classList.remove("active");
  resultScn?.classList.add("active");
  if (timerInterval) clearInterval(timerInterval);

  // update final score display
  const finalScore = document.getElementById("final-score");
  if (finalScore) {
    finalScore.textContent = `score: ${score}`;
  }
};
