import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LogoCelsa from "../../assets/img/logo-celsa-form.png";
import Swal from "sweetalert2";
import emoji from "../../assets/img/emoji.png";
import "./Game.css";
import axios from "axios";

export const Game = () => {
  const history = useHistory();
  const [sequence, setSequence] = useState([]);
  const [humanSequence, setHumanSequence] = useState([]);
  const [level, setLevel] = useState(0);
  const startButton = useRef();
  const info = useRef();
  const heading = useRef();
  const tileContainer = useRef();

  function resetGame(text) {
    console.log(text);
    Swal.fire({
      icon: false,
      imageUrl: emoji,
      title: "!FELICIDADES!",
      text: `Tu puntuación más alta fue ${level}`,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonColor: "#ff0000",
      cancelButtonText: "VOLVER A JUGAR",
    }).then(() => {
      history.push("/");
    });
    setSequence([]);
    setHumanSequence([]);
    setLevel(0);
    startButton.current.classList.remove("hidden");
    heading.current.textContent = "Simon Game";
    info.current.classList.add("hidden");
    tileContainer.current.classList.add("unclickable");
    // history.push("/");
  }

  function humanTurn(lvl) {
    tileContainer.current.classList.remove("unclickable");
    info.current.textContent = `Tu turno: ${lvl} Tap${lvl > 1 ? "s" : ""}`;
  }

  function activateTile(color) {
    const sound = document.querySelector(`[data-sound='${color}']`);
    const tile = document.querySelector(`[data-tile='${color}']`);

    sound.play();
    tile.classList.add("activated");

    setTimeout(() => {
      tile.classList.remove("activated");
    }, 524);
  }

  function playRound(nextSequence) {
    nextSequence.forEach((color, index) => {
      setTimeout(() => {
        activateTile(color);
      }, (index + 1) * 700);
    });
  }

  function nextStep() {
    const tiles = ["red", "green", "blue", "yellow"];
    const random = tiles[Math.floor(Math.random() * tiles.length)];

    return random;
  }

  function nextRound() {
    setLevel((level) => level + 1);

    tileContainer.current.classList.add("unclickable");
    info.current.textContent = "Espere...";
    heading.current.textContent = `Level ${level} de 30`;

    const nextSequence = [...sequence];
    nextSequence.push(nextStep());
    playRound(nextSequence);

    setSequence([...nextSequence]);
    setTimeout(() => {
      humanTurn(level);
    }, level * 700 + 1000);
  }

  function handleClick(tile) {
    const sdn = document.querySelector(`[data-sound='${tile}']`);
    const restart = () => {
      sdn.pause();
      sdn.currentTime = 0;
    };
    const playSdn = sdn.play();
    const condition = humanSequence.length > 1 && playSdn;
    const scdCondition =
      humanSequence[humanSequence.length - 2] ===
      humanSequence[humanSequence.length - 1];

    if (condition || (condition && scdCondition)) {
      restart();
    }
    const index = humanSequence.push(tile) - 1;
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();

    const remainingTaps = sequence.length - humanSequence.length;

    if (humanSequence[index] !== sequence[index]) {
      return resetGame(
        "¡Ups! Se acabó el juego, presionaste el botón equivocado."
      );
    }

    if (humanSequence.length === sequence.length) {
      if (humanSequence.length === 30) {
        return resetGame(
          "¡Felicidades, Leyenda! Has completado todos los niveles."
        );
      }

      setHumanSequence([]);
      info.current.textContent = "Correcto! Espera el siguiente!";
      setTimeout(() => {
        nextRound();
      }, 1000);
      return;
    }

    info.current.textContent = `Tu turno ${remainingTaps} Tap${
      remainingTaps > 1 ? "s" : ""
    }`;
  }

  function startGame() {
    startButton.current.classList.add("hidden");
    info.current.classList.remove("hidden");
    tileContainer.current.classList.remove("unclickable");
    nextRound();
  }

  const StartBtn = () => {
    startGame();
  };
  const TileContainer = (e) => {
    const { tile } = e.target.dataset;
    if (tile) handleClick(tile);
  };

  const sendUser = async (usr) => {
    try {
      await axios.get(
        "https://likeseasons.com/clientes/celsa/api-registro/index.php",
        { params: usr }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const localUser = localStorage.getItem("userCelsa");
    if (localUser) {
      const lclUsr = JSON.parse(localUser);
      sendUser(lclUsr);
    }
  }, []);
  return (
    <>
      <main className="game">
        <div className="game_head">
          <h1 ref={heading} className="heading js-heading">
            Niveles: 30
          </h1>
          <h1 className="heading js-heading">Resultado: {level}</h1>
        </div>

        <div className="cont-box">
          <section
            ref={tileContainer}
            className="tile-container js-container unclickable"
            onClick={TileContainer}
          >
            <div className="tile tile-red" data-tile="red"></div>
            <div className="tile tile-green" data-tile="green"></div>
            <div className="tile tile-blue" data-tile="blue"></div>
            <div className="tile tile-yellow" data-tile="yellow"></div>
          </section>
          <div className="tile-logo">
            <img className="tile_logo-img" src={LogoCelsa} alt="Logo Celsa" />
          </div>
        </div>

        <footer className="info-section">
          <button
            ref={startButton}
            className="start-button js-start"
            onClick={StartBtn}
          >
            Empezar
          </button>
          <span ref={info} className="info js-info hidden"></span>
        </footer>
      </main>

      <div className="hidden">
        {/* 0.41775 */}
        <audio
          src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
          data-sound="red"
        ></audio>
        {/* 0.418333 */}
        <audio
          src="https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
          data-sound="green"
        ></audio>
        {/* 0.5228 */}
        <audio
          src="https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
          data-sound="blue"
        ></audio>
        {/* 0.5235 */}
        <audio
          src="https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
          data-sound="yellow"
        ></audio>
      </div>
    </>
  );
};
