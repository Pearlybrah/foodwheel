import React, { Component } from "react";
import { getFromStorage, setInStorage } from "../utils/storage";

class Login extends Component {
  state = {
    isLoading: true,
    signUpError: "",
    signInError: "",
    token: "",
    signInEmail: "",
    signInPassword: "",
    signUpFirstName: "",
    signUpLastName: "",
    signUpEmail: "",
    signUpPassword: ""
  };

  componentDidMount() {
    const obj = getFromStorage("the-main-app");
    if (obj && obj.token) {
      const { token } = obj;
      fetch("/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  onSignUp = event => {
    event.preventDefault();
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;

    this.setState({
      isLoading: true
    });
    fetch("/api/account/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpFirstName: "",
            signUpLastName: "",
            signUpEmail: "",
            signUpPassword: ""
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          });
        }
      });
  };

  onSignIn = event => {
    event.preventDefault();
    const { signInEmail, signInPassword } = this.state;
    this.setState({ isLoading: true });
    console.log("signin", signInEmail);
    fetch("/api/account/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage("the-main-app", { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: "",
            signInPassword: "",
            token: json.token
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false
          });
        }
      });
  };

  logout = event => {
    event.preventDefault();

    const obj = getFromStorage("the-main-app");
    if (obj && obj.token) {
      const { token } = obj;
      fetch("/api/account/logout?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    }
  };

  render() {
    const {
      isLoading,
      token,
      signInError,
      signUpError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
    if (!token) {
      return (
        <div>
          <div>
            {signInError ? <p>{signInError}</p> : null}
            <p>Sign In</p>
            <input
              type="email"
              name="signInEmail"
              placeholder="Email"
              value={signInEmail}
              onChange={this.handleInputChange}
            />
            <br />
            <input
              type="password"
              name="signInPassword"
              placeholder="Password"
              value={signInPassword}
              onChange={this.handleInputChange}
            />
            <br />
            <button onClick={this.onSignIn}>Sign In</button>
          </div>
          <div>
            {signUpError ? <p>{signUpError}</p> : null}
            <p>Sign Up</p>
            <input
              type="text"
              name="signUpFirstName"
              placeholder="First Name"
              value={signUpFirstName}
              onChange={this.handleInputChange}
            />
            <br />
            <input
              type="text"
              name="signUpLastName"
              placeholder="Last Name"
              value={signUpLastName}
              onChange={this.handleInputChange}
            />
            <br />
            <input
              type="email"
              name="signUpEmail"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.handleInputChange}
            />
            <br />
            <input
              type="password"
              name="signUpPassword"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.handleInputChange}
            />
            <br />
            <button onClick={this.onSignUp}>Sign Up</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p>Account</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Login;
