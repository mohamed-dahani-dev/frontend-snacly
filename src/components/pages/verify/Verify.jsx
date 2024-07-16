/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./Verify.css";
import NavBar from "../../navBar/NavBar";
import Footer from "../../footer/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);

  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(`${url}/order/verify`, {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="app">
        <NavBar />
        <div className="spinner">
          <div className="rotate" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Verify;
