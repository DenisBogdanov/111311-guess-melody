const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

let currentScreenNumber = 0;

const uiMain = document.querySelector(`section.main`);
const uiApp = document.querySelector(`main.app`);

const uiArrows = document.createElement(`div`);
uiArrows.classList.add(`arrows__wrap`);
uiArrows.innerHTML = `
    <style>
      .arrows__wrap {
        position: absolute;
        top: 135px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn"><-</button>
    <button class="arrows__btn">-></button>`;

uiApp.appendChild(uiArrows);
const uiButtons = uiApp.querySelectorAll(`.arrows__btn`);

const uiScreens = Array.from(document.querySelectorAll(`template`)).map((t) => t.content);

const showScreen = (screenNumber = currentScreenNumber) => {
  uiMain.innerHTML = ``;
  uiMain.appendChild(uiScreens[currentScreenNumber = (screenNumber + uiScreens.length) % uiScreens.length].cloneNode(true));
};

document.addEventListener(`keydown`, (event) => {
  if (event.keyCode === LEFT_ARROW) {
    showScreen(--currentScreenNumber);
  } else if (event.keyCode === RIGHT_ARROW) {
    showScreen(++currentScreenNumber);
  }
});

uiButtons.forEach((btn, index) => btn.addEventListener(`click`, () => {
  showScreen(index === 0 ? --currentScreenNumber : ++currentScreenNumber);
}));

showScreen();
