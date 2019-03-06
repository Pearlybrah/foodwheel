const express = require("express");
const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

//SignUp
module.exports = app => {
  app.post("/api/account/signup", (req, res, next) => {
    const { body } = req;
    const { firstName, lastName, password } = body;
    let { email } = body;

    if (!firstName) {
      res.send({
        success: false,
        message: "Error: First Name Can Not Be Blank"
      });
    }
    if (!lastName) {
      res.send({
        success: false,
        message: "Error: Last Name Can Not Be Blank"
      });
    }
    if (!password) {
      res.send({
        success: false,
        message: "Error: Password Can Not Be Blank"
      });
    }
    email = email.toLowerCase();

    User.find(
      {
        email: email
      },
      (err, previousUser) => {
        if (err) {
          res.send({
            message: "Error: Server Error"
          });
        } else if (previousUser.length > 0) {
          res.send({
            message: "Error, User Already Exists"
          });
        }

        const newUser = new User();
        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
          if (err) {
            res.send({
              success: false,
              message: "Error. Server Error"
            });
          }
          res.send({
            success: true,
            message: "Sign Up Successful!"
          });
        });
      }
    );
  });

  app.post("/api/account/signin", (req, res) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;

    if (!email) {
      res.send({
        success: false,
        message: "Error: Email Can Not Be Blank"
      });
    }
    if (!password) {
      res.send({
        success: false,
        message: "Error: Password Can Not Be Blank"
      });

      email = email.toLowerCase();

      User.find(
        {
          email: email
        },
        (err, users) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error. Server Error"
            });
          }
          if (users.length != 1) {
            return res.send({ success: true, message: "Invalid" });
          }

          const user = users[0];
          if (!user.validPassword(password)) {
            return res.send({ success: false, message: "Invalid" });
          }

          const userSession = new UserSession();
          userSession.userId = user._id;
          userSession.save((err, doc) => {
            if (err) {
              res.send({
                success: false,
                message: "Invalid"
              });
            }
            return res.send({
              success: true,
              message: "Valid SignIn",
              token: doc._id
            });
          });
        }
      );
    }
  });

  app.get("/api/account/verify", (req, res) => {
    const { query } = req;
    const { token } = query;

    UserSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
        if ((err, sessions)) {
          return res.send({
            success: false,
            message: "Server error"
          });
        }
        if (sessions.length != -1) {
          return res.send({
            success: true,
            message: "Success"
          });
        }
      }
    );
  });

  app.get("/api/account/logout", (req, res) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: { isDeleted: true }
      },
      null,
      err => {
        if (err) {
          return res.send({
            success: false,
            message: "Server error"
          });
        }
        return res.send({
          success: true,
          message: "Success"
        });
      }
    );
  });
};
