import React from "react";
import "./Register.css";
import IMG from "../../assets/img/logo-celsa-form.png";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    cellphone: "",
    email: "",
    job: "",
  });
  const [btnRef, setBtnRef] = useState(false);

  const [show, setShow] = useState(false);

  const handleForm = async (e) => {
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
    // localStorage.setItem("userCelsa", JSON.stringify(user));
    // history.push("/game");
    setBtnRef(true);
    try {
      const resp = await axios.get(
        "https://likeseasons.com/clientes/celsa/api-registro/index.php",
        { params: user }
      );
      console.log(resp);
      localStorage.setItem("userCelsa", JSON.stringify(user));
      history.push("/game");
      setBtnRef(false);
    } catch (error) {
      console.log(error);
      setBtnRef(false);
    }
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
            value={user.firstname}
            onChange={(v) => setUser({ ...user, firstname: v.target.value })}
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
            value={user.job}
            onChange={(v) => setUser({ ...user, job: v.target.value })}
          />
          {show && (
            <p className="containerReg_box-form-errMessage">
              Complete los campos correctamente
            </p>
          )}
          {btnRef && (
            <div className="loading">
              <div></div>
            </div>
          )}
          <button disabled={btnRef} className="containerReg_box-form-btn">
            !jugar!{" "}
          </button>
        </form>
      </div>
    </div>
  );
};
