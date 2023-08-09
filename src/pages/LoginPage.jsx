import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthContextProvider";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Login() {
  const { guestLogin, loginUser } = useContext(authContext);
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  function notify(event, type) {
    event.preventDefault();
    if (type === "failure") {
      toast.error("User not found!", {
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
      toast.success("Login successful!", {
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

  function inputHandler(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }
  async function submitLogin(e) {
    e.preventDefault();
    const response = await loginUser(user);
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
        style={
          {
            // backgroundColor: isDarkMode ? "#bfdbfe" : "#dbeafe",
            // color: isDarkMode ? "black" : "",
          }
        }
      >
        <p className="signup-heading">Login to your account</p>
        <form onSubmit={(e) => submitLogin(e)} className="form-parent">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="awesomeShubh"
            required
            onChange={(e) => inputHandler(e)}
          />
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="shubh@123"
              required
              onChange={(e) => inputHandler(e)}
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
            Login
          </button>
          <p className="signup-text">
            New to MyRichApp?
            <Link to="/register" className="signup-link">
              {" "}
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
