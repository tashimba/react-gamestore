import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem } from "../redux/cartSlice";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="cart-item">
        <Link to={`/game/${data.id}`} className="cart-item-game">
          <div className="cart-item-game">
            <img src={data.background_image} alt="img" />
            <h3 className="cart-item-game-title">{data.name}</h3>
          </div>
        </Link>

        <button
          onClick={() => {
            dispatch(removeItem(data.id));
          }}
          className="cart-item-delete"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1.7em"
            width="1.7em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
            </g>
          </svg>
        </button>
      </div>
      <hr />
    </>
  );
};

export default CartItem;
