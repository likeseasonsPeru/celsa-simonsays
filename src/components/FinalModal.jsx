import React from "react";
import emoji from "../assets/img/emoji.png";
import "../App.css";

export const FinalModal = ({ points = 0 }) => {
  return (
    <div className="modal">
      <div className="modal_box">
        <img src={emoji} alt="smile emoji" />
        <div>
          <p>!Felicidades!</p>
          <span>Tu puntuación más alta fue {points}</span>
        </div>
        <button>Volver a jugar</button>
      </div>
    </div>
  );
};
