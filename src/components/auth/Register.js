import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    cityName: "",
    stateName: "",
    sex: "",
    profilePic: "",
    isAdmin: false,
  });

  let navigate = useNavigate();

  const registerNewUser = () => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "capstone_user",
            JSON.stringify({
              id: createdUser.id,
            })
          );

          navigate("/");
        }
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    return fetch(`http://localhost:8088/users?email=${user.email}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.length > 0) {
          // Duplicate email. No good.
          window.alert("Account with that email address already exists");
        } else {
          // Good email, create user.
          registerNewUser();
        }
      });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
        <fieldset>
          <label htmlFor="firstName"> First Name </label>
          <input
            onChange={updateUser}
            type="text"
            id="firstName"
            className="form-control"
            placeholder="Enter your first name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="lastName"> Last Name </label>
          <input
            onChange={updateUser}
            type="text"
            id="lastName"
            className="form-control"
            placeholder="Enter your last name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email"> Email address </label>
          <input
            onChange={updateUser}
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="cityName"> City </label>
          <input
            onChange={updateUser}
            type="text"
            id="cityName"
            className="form-control"
            placeholder="City"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="stateName"> State </label>
          <input
            onChange={updateUser}
            type="text"
            id="stateName"
            className="form-control"
            placeholder="State"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="profilePic"> Profile Image </label>
          <input
              onChange={updateUser}
              type="text"
              id="profilePic"
              className="form-control"
              placeholder="Image URL"
              required
          />
        </fieldset>
        <fieldset>
          <input
            onChange={(evt) => {
              const copy = { ...user };
              copy.isAdmin = evt.target.checked;
              setUser(copy);
            }}
            type="checkbox"
            id="isAdmin"
          />
          <label htmlFor="userType"> Admin </label>
        </fieldset>
        <fieldset>
          <button type="submit"> Register </button>
        </fieldset>
      </form>
    </main>
  );
};
