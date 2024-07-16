/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yub from "yup";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errorValidation, setErrorValidation] = useState("");

  // error validation style
  const errorValidationStyle = {
    marginTop: "-10px",
    color: "red",
    fontSize: "14px",
  };

  // validation
  const validationSchema = Yub.object({
    name: Yub.string()
      .trim()
      .min(4, "length must be at least 4 characters long")
      .max(255, "length must be at most 255 characters long")
      .required("The name is required"),
    email: Yub.string()
      .email("invalid email address")
      .trim()
      .min(5, "length must be at least 5 characters long")
      .max(255, "length must be at most 255 characters long")
      .required("The email is required"),
    password: Yub.string()
      .min(6, "length must be at least 6 characters long")
      .required("The password is required"),
  });

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const { url, setToken, setUserName } = useContext(StoreContext);

  const onLogin = async (event) => {
    event.preventDefault();

    // validation of inputs
    try {
      await validationSchema.validate(data, { abortEarly: false });
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
        setErrorValidation(newError);
      });
    }

    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/user/login";
    } else if (currState === "Sign Up") {
      newUrl += "/user/register";
    } else if (currState === "Forgot Password") {
      newUrl += "/user/forgot-password";
    }

    // logic of login and register
    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setUserName(response.data.userName);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", response.data.userName || data.name);
      setShowLogin(false);
      toast.success("Login successful");
    } else if (response.data.sendEmail) {
      // setUserId(response.data.userId);
      // setEmail(response.data.email);
      // setResetPasswordToken(response.data.token);
      toast.success(response.data.message);
    } else if (!response.data.sendEmail) {
      toast.error(response.data.errorMessage);
    } else {
      toast.error(response.data.errorMessage);
    }
  };

  // text of button
  const textBtn = () => {
    if (currState === "Sign Up") {
      return "Create Account";
    } else if (currState === "Login") {
      return "Login";
    } else if (currState === "Forgot Password") {
      return "Forgot Password";
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <span
            onClick={() => {
              setShowLogin(false);
            }}
            className="icon-close"
          ></span>
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" ? (
            <>
              <input
                type="text"
                name="name"
                onChange={onChange}
                value={data.name}
                placeholder="Your Name"
              />
              <p style={errorValidationStyle}>{errorValidation.name}</p>
            </>
          ) : (
            <></>
          )}
          <input
            type="email"
            name="email"
            onChange={onChange}
            value={data.email}
            placeholder="Your Email"
          />
          <p style={errorValidationStyle}>{errorValidation.email}</p>
          {currState === "Forgot Password" ? (
            <></>
          ) : (
            <>
              <input
                type="password"
                name="password"
                onChange={onChange}
                value={data.password}
                placeholder="Password"
              />
              <p style={errorValidationStyle}>{errorValidation.password}</p>
            </>
          )}
        </div>
        <button
          style={
            currState === "Forgot Password" ? { marginBottom: "20px" } : null
          }
          type="submit"
        >
          {textBtn()}
        </button>
        {currState === "Forgot Password" ? (
          <></>
        ) : (
          <div className="login-popup-conditions">
            <input type="checkbox" required />
            <p>Bye, Continuig i agree to the terms of use & privacy policy. </p>
          </div>
        )}
        {currState === "Sign Up" ? (
          <p className="login-popup-question">
            Already have an account?
            <span
              onClick={() => {
                setCurrState("Login");
              }}
            >
              Login Here!
            </span>
          </p>
        ) : (
          <>
            <p className="login-popup-question">
              {currState === "Forgot Password"
                ? "Login in your account"
                : "Create a new account"}
              <span
                onClick={() => {
                  if (currState === "Forgot Password") {
                    setCurrState("Login");
                  } else {
                    setCurrState("Sign Up");
                  }
                }}
              >
                Click Here!
              </span>
            </p>
            {currState === "Forgot Password" ? (
              <></>
            ) : (
              <p className="login-popup-question">
                <span
                  onClick={() => {
                    setCurrState("Forgot Password");
                  }}
                >
                  Forgot Password?
                </span>
              </p>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
