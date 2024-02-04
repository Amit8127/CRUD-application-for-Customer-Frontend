import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import CustomerForm from "./components/CustomerForm";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="container">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute />}>
            <Route path="home" element={<Home />} />
            <Route path="customerForm" element={<CustomerForm />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
