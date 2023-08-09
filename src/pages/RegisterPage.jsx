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

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  function notify(event, type) {
    event.preventDefault();
    if (type === "failure") {
      toast.error("Username already found!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: isDarkMode ? "light" : "dark",
      });
    } else {
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
    const response = await signUpUser(user);
    if (response === "success") {
      notify(e, response);
    } else {
      notify(e, response);
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
            name="firstName"
            id="name"
            required
            placeholder="Shubh"
            onChange={(e) => userHandler(e)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
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
            {" "}Login
          </Link>
        </p>
      </div>
    </div>
  );
}
