import React from "react";
import { Link } from "react-router-dom";

const Signup = ({ signup }) => {
  return (
    <div className="bg-canvas p-5 d-flex justify-content-center">
      <form
        action=""
        className="shadow bg-light rounded-2 p-5"
        style={{ width: "25rem" }}
        onSubmit={(e) => signup(e)}
      >
        <div className="mb-2">
          <b className="fs-3">SIGN UP</b>
        </div>
        <input
          className="form-control mb-1 rounded-2"
          type="text"
          placeholder="Enter your name"
          name="name"
          required
        />
        <input
          className="form-control mb-1 rounded-2"
          type="text"
          placeholder="Enter your email"
          name="email"
          required
        />
        <input
          className="form-control mb-1 rounded-2"
          type="password"
          placeholder="Enter your password"
          name="password"
          required
        />
        <input
          className="form-control mb-1 rounded-2"
          type="text"
          placeholder="Enter your address"
          name="address"
          required
        />
        <input
          className="form-control mb-1 rounded-2"
          type="text"
          placeholder="Enter your phone number"
          name="phoneNo"
          required
        />
        <select className="form-select mb-1 rounded-2" name="role">
          <option value="ROLE_USER">USER</option>
          <option value="ROLE_ADMIN">ADMIN</option>
          <option value="ROLE_DELIVERY">DELIVERY MAN</option>
        </select>
        <input
          className="custom-btn3 mb-1"
          type="submit"
          value="Sign Up"
          style={{ width: "100%" }}
        />
        <Link to="/login" className="text-decoration-none link-dark">
          Already have an account? <b>Login</b>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
