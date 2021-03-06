const keyboard = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const btnReset = document.querySelector(".btn__reset");
const keyboardBtn = document.querySelector("button");
const chosen = document.querySelector(".chosen");
const hearts = document.querySelectorAll("img");
const overlay = document.querySelector("#overlay");
const title = document.querySelector(".title");

let missed = 0;

const phrases = [
  "Hello World",
  "Treehouse",
  "Silicon Valley",
  "Google",
  "Meta",
];

btnReset.addEventListener("click", () => {
  const overlay = document.querySelector("#overlay");
  overlay.style.display = "none";
});

const randomPhrase = function getRandomPhraseAsArray(arr) {
  const phraseGenerator = arr[Math.floor(Math.random() * arr.length)];
  const singleArrayLetters = Array.from(phraseGenerator);
  return singleArrayLetters;
};

const output = randomPhrase(phrases);

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const ul = document.querySelector("#phrase ul");
    const li = document.createElement("li");
    li.textContent = arr[i];
    ul.append(li);
    if (arr[i] !== " ") {
      li.className = "letter";
    } else {
      li.className = "space";
    }
  }
}

addPhraseToDisplay(output);

/*Check Letter Function*/
function checkLetter(buttonClicked) {
  const liLetter = document.querySelectorAll(".letter");
  let match = null;
  for (let i = 0; i < liLetter.length; i++) {
    if (
      liLetter[i].textContent.toLowerCase() ===
      buttonClicked.textContent.toLowerCase()
    ) {
      liLetter[i].classList.add("show");
      liLetter[i].classList.add("transition");
      match = buttonClicked.textContent;
    }
  }
  return match;
}

/*Keyboard Event Listener*/
const click = document.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName === "BUTTON") {
    target.className = "chosen";
    target.setAttribute("disabled", "");
    const letterFound = checkLetter(target); /*Check Letter Function*/
    if (letterFound === null) {
      const hearts = document.querySelectorAll("img");
      hearts[missed].setAttribute("src", "images/lostHeart.png");
      missed++;
    }
  }
  checkWin();
});


/*Reload Function*/
function reloadTheGame() {
  const reload = document.querySelector(".btn__reset");
  reload.addEventListener("click", () => {
    location.reload();
  });
}

/*Checking For Win*/
function checkWin() {
  const liLetter = document.querySelectorAll(".letter");
  const show = document.querySelectorAll(".show");
  const ul = document.getElementById("unorderedList");
  const btnReset = document.querySelector(".btn__reset");
  if (liLetter.length === show.length) {
    overlay.style.display = "flex";
    overlay.className = "win";
    title.textContent = "You Won! Well Done!";
    ul.style.display = "none";
    btnReset.textContent = "Reset Game";
    reloadTheGame();
  } else if (missed > 4) {
    overlay.style.display = "flex";
    overlay.className = "lose";
    title.textContent = "Game Over";
    ul.style.display = "none";
    btnReset.textContent = "Reset Game";
    reloadTheGame();
  }
}