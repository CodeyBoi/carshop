import React from "react";
import TextField from "../components/textfield";
import { homeButton } from "./index";
import PropTypes from "prop-types";
import ErrorBoundary from "../components/errorboundary";

const loginUser = async credentials => {
  return fetch("/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  })
    .then(res => res.json());
}

const Login = ({ setToken }) => {

      const [email, setEmail] = React.useState("");
      const [password, setPassword] = React.useState("");

      const handleSubmit = async event => {
        event.preventDefault();

        if (!email || !password) {
          alert("Please fill in all fields.");
          return false;
        }

        const login = await loginUser({ email, password })
          .catch(err => console.log(`Error when logging in: ${err}`));

        if (login.accepted) {
          setToken(login.token);
          window.location = "/";
        } else {
          alert(login.message);
        }
      }

      return (
        <form onSubmit={handleSubmit}>
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
          <button className="styled button" type="submit">Login</button>


          {homeButton}
        </form>
      );
    }

Login.propTypes = {
      setToken: PropTypes.func.isRequired
    }

export default Login;