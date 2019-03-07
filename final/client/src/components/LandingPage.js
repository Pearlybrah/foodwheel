import React, { Component } from "react";
import Login from "./Login";
import NavBar from "./NavBar/NavBar";
import DisplayPage from "./DisplayPage";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function LandingPage() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/restuarantdata" component={DisplayPage} />
      </Switch>
    </Router>
  );
}

export default LandingPage;
