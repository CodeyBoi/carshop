import React from "react";
import TextField from "../components/textfield.jsx";
import { homeButton } from "./index";

const Signup = ({ setToken }) => {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const handleSignup = async event => {
    event.preventDefault();

    /* Validation */
    if (!name || !email || !password || !passwordConfirm) {
      alert("Please fill in all fields.");
      return false;
    }

    if (password !== passwordConfirm) {
      alert("Passwords do not match.");
      return false;
    }

    fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, email })
    })
      .then(res => res.json())
      .then(data => setToken(data.token))
      .then(() => window.location = "/")
      .catch(err => console.log(`Error when creating user: ${err}`));
  }

  return (
    <form onSubmit={handleSignup}>
      <p>
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={val => setName(val)} />
      </p>
      <p>
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={val => setEmail(val)} />
      </p>
      <p>
        <TextField
          id="password"
          label="Password"
          value={password}
          type="password"
          onChange={val => setPassword(val)} />
      </p>
      <p>
        <TextField
          id="passwordConfirm"
          label="Confirm password"
          value={passwordConfirm}
          type="password"
          onChange={val => setPasswordConfirm(val)} />
      </p>
      <button className="styled button" type="submit">Sign up</button>
      {homeButton}
    </form>
  );
}

export default Signup;