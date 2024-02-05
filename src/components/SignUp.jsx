import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUp } from "../services/adminService";
import Loader from "./Loader/Loader";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const validatePassword = () => {
    setIsPasswordValid(password.length >= 8);
  };

  const validateConfirmPassword = () => {
    setIsConfirmPasswordValid(confirmPassword === password);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    signUp({ email, password })
      .then((resp) => {
        toast.success("Admin Successfully Created");
        setSubmitted(false);
        navigate("/login");
      })
      .catch((err) => {
        setSubmitted(false);
        if (err.response.status == 400) {
          toast.error("Email already in use");
        } else {
          toast.error(err.message);
        }
      });

      setEmail("");
      setIsEmailValid(false);
      setPassword("");
      setIsPasswordValid(false);
      setConfirmPassword(null);
      setIsConfirmPasswordValid(false)
  };
  return (
    <>
      {submitted ? <Loader /> :
      <div className="row justify-content-center pt-5">
        <h2 className="text-center">SignUp Page</h2>
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
              id="password"
              placeholder="Enter password (length should be 8 characters)"
              onChange={(e) => setPassword(e.target.value.trim())}
              onBlur={validatePassword}
              style={{
                border: isPasswordValid ? "2px solid green" : "2px solid red",
              }}
              name="password"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm password (length should be 8 characters)"
              onChange={(e) => setConfirmPassword(e.target.value.trim())}
              onBlur={validateConfirmPassword}
              style={{
                border: isConfirmPasswordValid
                  ? "2px solid green"
                  : "2px solid red",
              }}
              name="confirm password"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              submitted ||
              !isEmailValid ||
              !isPasswordValid ||
              !isConfirmPasswordValid
            }
            className="btn btn-outline-primary mb-3"
          >
            SignUp
          </button>
          <p style={{ textAlign: "center" }}>
            Already have an Account? Click here to{" "}
            <span
              style={{ color: "#316cf4", fontWeight: "500", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              LogIn.
            </span>
          </p>
        </div>
      </div>}
    </>
  );
};

export default SignUp;
