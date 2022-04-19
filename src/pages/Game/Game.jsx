import React, { useRef } from "react";
import "./Game.css";

export const Game = () => {
  let sequence = [];
  let humanSequence = [];
  let level = 0;
  const infoRef = useRef();
  const headingRef = useRef();
  const startButton = document.querySelector(".js-start");
  const info = document.querySelector(".js-info");
  const heading = document.querySelector(".js-heading");
  const tileContainer = document.querySelector(".js-container");

  function resetGame(text) {
    alert(text);
    sequence = [];
    humanSequence = [];
    level = 0;
    startButton.classList.remove("hidden");
    heading.textContent = "Simon Game";
    info.classList.add("hidden");
    tileContainer.classList.add("unclickable");
  }

  function humanTurn(level) {
    tileContainer.classList.remove("unclickable");
    info.textContent = `Your turn: ${level} Tap${level > 1 ? "s" : ""}`;
  }

  function activateTile(color) {
    const tile = document.querySelector(`[data-tile='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);

    tile.classList.add("activated");
    sound.play();

    setTimeout(() => {
      tile.classList.remove("activated");
    }, 300);
  }

  function playRound(nextSequence) {
    nextSequence.forEach((color, index) => {
      setTimeout(() => {
        activateTile(color);
      }, (index + 1) * 600);
    });
  }

  function nextStep() {
    const tiles = ["red", "green", "blue", "yellow"];
    const random = tiles[Math.floor(Math.random() * tiles.length)];

    return random;
  }

  function nextRound() {
    level += 1;

    tileContainer.classList.add("unclickable");
    info.textContent = "Wait for the computer";
    heading.textContent = `Level ${level} of 30`;

    const nextSequence = [...sequence];
    nextSequence.push(nextStep());
    playRound(nextSequence);

    sequence = [...nextSequence];
    setTimeout(() => {
      humanTurn(level);
    }, level * 600 + 1000);
  }

  function handleClick(tile) {
    const index = humanSequence.push(tile) - 1;
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();

    const remainingTaps = sequence.length - humanSequence.length;

    if (humanSequence[index] !== sequence[index]) {
      return resetGame("Oops! Game over, you pressed the wrong tile.");
    }

    if (humanSequence.length === sequence.length) {
      if (humanSequence.length === 30) {
        return resetGame("Congrats, You Legend! You completed all the levels");
      }

      humanSequence = [];
      info.textContent = "Correcto! Espera el siguiente!";
      setTimeout(() => {
        nextRound();
      }, 1000);
      return;
    }

    info.textContent = `Tu turno${remainingTaps} Tap${
      remainingTaps > 1 ? "s" : ""
    }`;
  }

  function startGame() {
    startButton.classList.add("hidden");
    info.classList.remove("hidden");
    tileContainer.classList.remove("unclickable");
    nextRound();
  }

  const StartBtn = () => {
    startGame();
  };
  const TileContainer = (e) => {
    const { tile } = e.target.dataset;
    if (tile) handleClick(tile);
  };
  return (
    <>
      <main className="game">
        <div className="game_head">
          <h1 ref={headingRef} className="heading js-heading">
            Niveles: 30
          </h1>
          <h1 ref={headingRef} className="heading js-heading">
            Resultado: {0}
          </h1>
        </div>

        <section
          className="tile-container js-container unclickable"
          onClick={TileContainer}
        >
          <div className="tile tile-red" data-tile="red"></div>
          <div className="tile tile-green" data-tile="green"></div>
          <div className="tile tile-blue" data-tile="blue"></div>
          <div className="tile tile-yellow" data-tile="yellow"></div>
        </section>

        <footer className="info-section">
          <button className="start-button js-start" onClick={StartBtn}>
            Empezar
          </button>
          <span ref={infoRef} className="info js-info hidden"></span>
        </footer>
      </main>

      <div className="hidden">
        <audio
          src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
          data-sound="red"
        ></audio>
        <audio
          src="https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
          data-sound="green"
        ></audio>
        <audio
          src="https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
          data-sound="blue"
        ></audio>
        <audio
          src="https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
          data-sound="yellow"
        ></audio>
      </div>
    </>
  );
};
