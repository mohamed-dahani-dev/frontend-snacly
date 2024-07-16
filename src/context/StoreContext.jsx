/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);

  const url = "http://localhost:3000";

  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("Your Name");

  const [cartItems, setCartItems] = useState({});

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/food`);
    setFoodList(response.data.data);
  };

  const cartList = async (token) => {
    const response = await axios.post(
      `${url}/cart`,
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(`${url}/cart/add`, { itemId }, { headers: { token } });
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        `${url}/cart/delete`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // still login when the user reloads the page
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        cartList(localStorage.getItem("token"));
      }
      if (localStorage.getItem("userName")) {
        setUserName(localStorage.getItem("userName"));
      }
    };
    loadData();
  }, []);

  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    url,
    token,
    setToken,
    userName,
    setUserName,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
