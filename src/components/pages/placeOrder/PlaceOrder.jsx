/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Footer from "../../footer/Footer";
import NavBar from "../../navBar/NavBar";
import "./PlaceOrder.css";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const { getTotalAmount, token, foodList, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    foodList.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + 2,
    };
    let response = await axios.post(`${url}/order/place`, orderData, {
      headers: { token },
    });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <>
      <div className="app">
        <NavBar />
        <form onSubmit={placeOrder} className="place-order">
          <div className="place-order-left">
            <p className="title">Delivery Informations</p>
            <div className="multi-fields">
              <input
                type="text"
                name="firstName"
                value={data.firstName}
                onChange={onChangeHandler}
                placeholder="First Name"
                required
              />
              <input
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={onChangeHandler}
                placeholder="Last Name"
                required
              />
            </div>
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              placeholder="Email address"
              required
            />
            <input
              type="text"
              name="street"
              value={data.street}
              onChange={onChangeHandler}
              placeholder="Street"
              required
            />
            <div className="multi-fields">
              <input
                type="text"
                name="city"
                value={data.city}
                onChange={onChangeHandler}
                placeholder="City"
                required
              />
              <input
                type="text"
                name="state"
                value={data.state}
                onChange={onChangeHandler}
                placeholder="State"
                required
              />
            </div>
            <div className="multi-fields">
              <input
                type="text"
                name="zipCode"
                value={data.zipCode}
                onChange={onChangeHandler}
                placeholder="Zip Code"
                required
              />
              <input
                type="text"
                name="country"
                value={data.country}
                onChange={onChangeHandler}
                placeholder="Country"
                required
              />
            </div>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={onChangeHandler}
              placeholder="Number Phone"
              required
            />
          </div>
          <div className="place-order-right">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalAmount()}</p>
                </div>
                <div className="diveder" />

                <div className="cart-total-details">
                  <p>Delivery Charge</p>
                  <p>${getTotalAmount() === 0 ? 0 : 2}</p>
                </div>
                <div className="diveder" />

                <div className="cart-total-details">
                  <p>Total</p>
                  <p>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</p>
                </div>
              </div>
              <button type="submit">PROCEED TO PAYMENT</button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PlaceOrder;
