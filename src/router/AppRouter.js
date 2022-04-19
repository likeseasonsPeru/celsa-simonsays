import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Game } from "../pages/Game/Game";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";

export const AppRouter = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = localStorage.getItem("userCelsa");
    if (getUser) {
      setUser(JSON.parse(getUser));
    }
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/game">{user ? <Game /> : <Redirect to="/" />}</Route>
        </Switch>
      </Router>
    </>
  );
};
