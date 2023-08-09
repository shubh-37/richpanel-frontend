import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthContextProvider";
import "../css/register.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Register() {
  const { signUpUser } = useContext(authContext);
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const emailChecker =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  function notify(event, type) {
    event.preventDefault();
    if (type === "failure") {
      toast.error("User already exists. Please login.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: isDarkMode ? "light" : "dark",
      });
    } else if (type === "wrong email") {
      toast.error("Please enter valid email ID!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: isDarkMode ? "light" : "dark",
      });
    } else if (type === "success") {
      toast.success("Sign up successful!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: isDarkMode ? "light" : "dark",
      });
    } else {
      toast.error("Please try again after sometime!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: isDarkMode ? "light" : "dark",
      });
    }
  }
  function userHandler(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }
  async function submitUser(e) {
    e.preventDefault();
    if (user?.emailId.match(emailChecker)) {
      const response = await signUpUser(user);
      if (response === "success") {
        notify(e, response);
      } else {
        notify(e, response);
      }
    } else {
      notify(e, "wrong email");
    }
  }
  return (
    <div className="background">
      <div
        className="signup-parent"
        // style={{
        //   backgroundColor: isDarkMode ? "#bfdbfe" : "#dbeafe",
        //   color: isDarkMode ? "black" : "",
        // }}
      >
        <p className="signup-heading">Create Account</p>
        <form onSubmit={(e) => submitUser(e)} className="form-parent">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Shubh"
            onChange={(e) => userHandler(e)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="emailId"
            id="email"
            required
            placeholder="example@gmail.com"
            onChange={(e) => userHandler(e)}
          />
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="shubh@123"
              required
              onChange={(e) => userHandler(e)}
            />
            <span className="password-toggle" onClick={() => togglePassword()}>
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          <label htmlFor="remember" style={{ fontSize: "x-small" }}>
            <input type="checkbox" name="remember" id="remember" />
            Remember me
          </label>
          <button type="submit" className="signup-btn">
            Sign up
          </button>
        </form>
        <p className="signup-text">
          Already have an account?
          <Link to="/login" className="signup-link">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
