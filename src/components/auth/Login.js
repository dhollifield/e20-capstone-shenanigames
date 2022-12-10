import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [email, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUsers) => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
            "capstone_user",
            JSON.stringify({
              id: user.id,
              isAdmin: user.isAdmin
            })
          );

          navigate("/");
        } else {
          window.alert("Invalid login");
        }
      });
  };

  return <>

    <div className="navImgContainer">
      <h1 className="loginPageTitle">ShenaniGAMES</h1>
    </div>
    <div className="tagLine">Explore the Fun World of Tabletop Games</div>
  
  (
    <main className="container--login">
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h2>Please sign in</h2>
          <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <input
              type="email"
              value={email}
              onChange={(evt) => set(evt.target.value)}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <button className="submitButton" type="submit">Sign in</button>
          </fieldset>
          <section className="link--register">
            <button className="registerButton">
              <Link to="/register">Not a member yet?</Link>
            </button>
          </section>
        </form>
      </section>
    </main>
  );
  </>
};
