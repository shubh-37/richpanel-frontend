import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
// import { useNavigate } from "react-router-dom";

export const authContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  const [isLogin, setIslogin] = useState(false);
  // const navigate = useNavigate();

  async function signUpUser(user) {
    try {
      const response = await axios.post("http://localhost:3000/register", user);
      console.log(response);
      if (response.status === 201) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          setIslogin(true);
          return "success";
        }
      }
    } catch (error) {
      if (error.response.status === 500) {
        return "unknown";
      } else if (error.response.status === 409) {
        return "failure";
      }
    }
  }

  async function loginUser(user) {
    try {
      const response = await axios.post("http://localhost:3000/login", user);
      if (response.status === 200) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          setIslogin(true);
          return "success";
        }
      }
    } catch (error) {
      if (error.response.status === 500) {
        return "unknown";
      } else if (error.response.status === 404) {
        return "failure";
      }
    }
  }

  function logoutUser() {
    localStorage.removeItem("token");
    setIslogin(false);
  }
  return (
    <authContext.Provider
      value={{ isLogin, logoutUser, signUpUser, loginUser }}
    >
      {children}
    </authContext.Provider>
  );
}