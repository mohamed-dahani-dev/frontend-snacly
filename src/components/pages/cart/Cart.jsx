import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../../context/StoreContext";
import NavBar from "../../navBar/NavBar";
import Footer from "../../footer/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Cart = () => {
  const { foodList, cartItems, removeFromCart, getTotalAmount, url } =
    useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <>
      <div className="cart app">
        <NavBar />
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <div className="diveder" />
          {foodList.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-item cart-items-title">
                    <img src={`${url}/images/${item.image}`} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <span
                      onClick={() => {
                        removeFromCart(item._id);
                      }}
                      className="icon-close"
                    ></span>
                  </div>
                  <div className="diveder" />
                </div>
              );
            }
          })}
          <div className="cart-bottom">
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
              <button
                onClick={() => {
                  navigate("/order");
                  if (!localStorage.getItem("token")) {
                    toast.error("You have Sign in First");
                  }
                }}
              >
                PROCEED TO CHECK OUT
              </button>
            </div>
            <div className="cart-promocode">
              <div>
                <p>If you have a promo code, Enter it here</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder="Promo Code" />
                  <button type="submit">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
