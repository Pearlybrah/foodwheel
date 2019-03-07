import React, { Component } from "react";
import Login from "./Login";
import NavBar from "./NavBar/NavBar";
import DisplayPage from "./DisplayPage";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function LandingPage() {
  return (
    <Router>
      <div>
        <Route component={NavBar} />
        <Switch>
          <Route path="/account" component={Login} />
          <Route path="/mytable" component={DisplayPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default LandingPage;
