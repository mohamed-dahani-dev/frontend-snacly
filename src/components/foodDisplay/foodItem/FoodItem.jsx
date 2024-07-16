/* eslint-disable react/prop-types */
import { StoreContext } from "../../../context/StoreContext";
import "./FoodItem.css";
import { useContext } from "react";
const FoodItem = ({ id, name, image, price, description, rating }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={`${url}/images/${image}`}
          alt=""
        />
        {!cartItems[id] ? (
          <span
            onClick={() => {
              addToCart(id);
            }}
            className="add icon-plus"
          ></span>
        ) : (
          <div className="item-food-counter">
            <span
              className="icon-minus"
              onClick={() => {
                removeFromCart(id);
              }}
            ></span>
            <p>{cartItems[id]}</p>
            <span
              className="icon-plus"
              onClick={() => {
                addToCart(id);
              }}
            ></span>
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-info-rating">
          <p className="food-item-info-rating-name">{name}</p>
          <div className="food-item-info-rating-star">
            <p>{rating}</p>
            <span className="icon-star"></span>
          </div>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
