import React, { Component } from "react";
import "style.css";
    
function SignupPage() {
    return (
        //I dont think this is the correct way of doing these forms but I wanted to get the structure layed out and review it 
        //later in the night.
        <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
        <br>
      <form>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <input type="submit" value="Submit" />
      </form>
        <br>
      <form>
        <label>
          Birthday:
          <input type="text" name="birthday" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

export default SignupPage;