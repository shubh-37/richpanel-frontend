import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import SubscriptionDetail from "./pages/SubscriptionDetailPage";
import Checkout from "./pages/CheckoutPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/plans" element={<SubscriptionDetail />} /> 
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
