import React from "react";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartItemsSelect } from "../redux/cartSlice";

const Cart = () => {
  const items = useSelector((state) => cartItemsSelect(state));

  return (
    <>
      <div className="cart">
        {items.length ? (
          <>
            <h1 className="cart-title">Cart:</h1>
            <div className="cart-items">
              {items.map((el, index) => (
                <CartItem data={el} key={index} />
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-footer-back">
                <Link to={"/"}>
                  <h1 className="game-content-header-back click">← Store</h1>
                </Link>
              </div>
              <h2 className="cart-footer-buy">Buy now</h2>
            </div>
          </>
        ) : (
          <div className="cartEmpty">
            <h1 style={{ marginBottom: "50px" }}>The cart is empty!</h1>
            <div>
              <div>
                <Link to={"/"}>
                  <h1 className="game-content-header-back click">← Store</h1>
                </Link>
              </div>
              {/* <h2 className="cart-footer-buy">Buy now</h2> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
