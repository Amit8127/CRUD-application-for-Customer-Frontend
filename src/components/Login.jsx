import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/adminService";
import { toast } from "react-toastify";
import { doLogin } from "../auth/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const validatePassword = () => {
    setIsPasswordValid(password.length >= 8);
  };

  const handleSubmit = () => {
    var data = { email, password };
    setSubmitted(true);
    login(data)
      .then((data) => {
        //save the data to tha localstorage
        doLogin(data, () => {
          toast.success("User Login Success");
        });
        navigate("/admin/home");
        setSubmitted(false);
      })
      .catch((error) => {
        setSubmitted(false);
        if (error.response.status == 401) {
          toast.error("Invalid Username or Password");
        } else {
          toast.error("Error in Login");
        }
      });
  };
  return (
    <div className="row justify-content-center pt-5">
      <h2 className="text-center">LogIn Page</h2>
      <div className=" card col-sm-6">
        <div className="mb-3 mt-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value.trim())}
            onBlur={validateEmail}
            style={{
              border: isEmailValid ? "2px solid green" : "2px solid red",
            }}
            name="email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value.trim())}
            onBlur={validatePassword}
            style={{
              border: isPasswordValid ? "2px solid green" : "2px solid red",
            }}
            name="pswd"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitted || !isPasswordValid || !isEmailValid}
          className="btn btn-primary mb-3"
        >
          LogIn
        </button>

        <p style={{ textAlign: "center" }}>
          Don't have an Account? Click here to{" "}
          <span
            style={{ color: "#0d6efd", fontWeight: "500", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            SingUp.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
