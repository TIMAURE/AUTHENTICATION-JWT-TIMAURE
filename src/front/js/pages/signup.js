import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  async function submitForm(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let first_name = formData.get("firstName");
    let last_name = formData.get("lastName");
    let email = formData.get("email");
    let password = formData.get("password");
    let signedUp = await actions.signup(first_name, last_name, email, password);
    if (signedUp) navigate("/login");
  }

  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <div className="row">
          <div className="col-6 mb-3">
            <label htmlFor="firstNameInput" className="form-label">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              className="form-control"
              id="firstNameInput"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="lastNameInput" className="form-label">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              className="form-control"
              id="lastNameInput"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
        <div>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
