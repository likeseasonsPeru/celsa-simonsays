import React from "react";
import "./Register.css";
import IMG from "../../assets/img/logo-celsa-form.png";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    cellphone: "",
    career: "",
  });

  const [show, setShow] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    const v = Object.values(user);
    const validation = v.filter((v) => v === "");
    if (validation.length > 0) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1000);
      return;
    }
    localStorage.setItem("userCelsa", JSON.stringify(user));
    history.push("/game");
  };

  return (
    <div className="containerReg">
      <div className="containerReg_box">
        <img className="containerReg_box-imgReg" src={IMG} alt="Logo Celsa" />
        <form className="containerReg_box-form" onSubmit={handleForm}>
          <label className="containerReg_box-form-label" htmlFor="name">
            Nombre:
          </label>
          <input
            type="text"
            className="containerReg_box-form-input"
            id="name"
            value={user.name}
            onChange={(v) => setUser({ ...user, name: v.target.value })}
          />
          <label className="containerReg_box-form-label" htmlFor="Name">
            Apellidos:
          </label>
          <input
            type="text"
            className="containerReg_box-form-input"
            id="lastname"
            value={user.lastname}
            onChange={(v) => setUser({ ...user, lastname: v.target.value })}
          />
          <label className="containerReg_box-form-label" htmlFor="email">
            Correo:
          </label>
          <input
            type="email"
            className="containerReg_box-form-input"
            id="email"
            value={user.email}
            onChange={(v) => setUser({ ...user, email: v.target.value })}
          />
          <label className="containerReg_box-form-label" htmlFor="cellphone">
            Celular:
          </label>
          <input
            type="tel"
            className="containerReg_box-form-input"
            id="cellphone"
            value={user.cellphone}
            onChange={(v) => setUser({ ...user, cellphone: v.target.value })}
          />
          <label className="containerReg_box-form-label" htmlFor="career">
            Ocupación:
          </label>
          <input
            type="text"
            className="containerReg_box-form-input"
            id="career"
            value={user.career}
            onChange={(v) => setUser({ ...user, career: v.target.value })}
          />
          {show && (
            <p className="containerReg_box-form-errMessage">
              Complete los campos correctamente
            </p>
          )}
          <button className="containerReg_box-form-btn">!jugar! </button>
        </form>
      </div>
    </div>
  );
};
