import React from "react";
import "./Register.css";
import IMG from "../../assets/img/logo-celsa-form.png";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

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
    setBtnRef(true);
    const users = JSON.parse(localStorage.getItem("usersCelsa"));
    const totalUsrs = [...users, user];
    localStorage.setItem("usersCelsa", JSON.stringify(totalUsrs));
    setTimeout(() => {
      localStorage.setItem("userCelsa", JSON.stringify(user));
      history.push("/game");
      setBtnRef(false);
    }, 500);
  };
  useEffect(() => {
    const useProve = [
      {
        cellphone: "+1 (798) 311-6568",
        email: "gehejud@mailinator.com",
        firstname: "Jada Bullock",
        job: "Proident excepturi ",
        lastname: "York",
      },
    ];
    const lclUsr = localStorage.getItem("usersCelsa");
    if (!lclUsr) {
      localStorage.setItem("usersCelsa", JSON.stringify(useProve));
    }
  }, []);

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
