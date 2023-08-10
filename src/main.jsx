import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthContextProvider.jsx";
import ProductContextProvider from "./context/ProductContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
