/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";
import NavBar from "../../navBar/NavBar";
import Footer from "../../footer/Footer";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);

  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      `${url}/order/userorders`,
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <>
      <div className="app">
        <NavBar />
        <div className="my-orders">
          <h2>My Orders</h2>
          <div className="container">
            {data.map((order, index) => {
              return (
                <div className="order" key={index}>
                  <span className="icon-box"></span>
                  <p>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p className="amount">${order.amount}</p>
                  <p>Items : {order.items.length}</p>
                  <p className="status">
                    <span>&#x25cf;</span>
                    {order.status}
                  </p>
                  <button onClick={fetchOrders}>Track Order</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
