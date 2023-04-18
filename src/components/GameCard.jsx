import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, fetchCartItem, removeItem } from "../redux/cartSlice";
import { fetchGame, gameSelect } from "../redux/gameSlice";
import { cartItemsSelect } from "../redux/cartSlice";

const GameCard = (props) => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = React.useState(false);
  const cartItems = useSelector((state) => cartItemsSelect(state));
  const handleAddToCart = () => {
    addedToCart
      ? (setAddedToCart(false), dispatch(removeItem(props.props.id)))
      : (setAddedToCart(true), dispatch(fetchCartItem(props.props.id)));
  };
  const checkAdded = () => {
    setAddedToCart(cartItems.find((el) => el.id === props.props.id));
  };
  React.useEffect(() => {
    checkAdded();
  }, []);

  return (
    <div>
      <div className="games-item">
        <Link to={`/game/${props.props.id}`}>
          <img
            className="games-item-img"
            src={props.props.background_image}
            alt="game"
          />
        </Link>
        <div className="games-item-info">
          <Link to={`/game/${props.props.id}`}>
            <h3 className="games-item-title">{props.props.name}</h3>
            {props.props.genres && (
              <div className="games-item-descr">
                {props.props.genres.map(
                  (el, index) =>
                    index < 3 && (
                      <div className="games-item-descr-item" key={index}>
                        {el.name}
                      </div>
                    )
                )}
              </div>
            )}
            <div className="games-item-platforms">
              {props.props?.parent_platforms[0] && (
                <div className="games-item-platforms-item">
                  {props.props.parent_platforms[0].platform.name}
                </div>
              )}

              {
                <div className="games-item-platforms-item">
                  {props.props?.parent_platforms[1].platform.name}
                </div>
              }
              {props.props.parent_platforms[2] && (
                <div className="games-item-platforms-item">
                  {props.props.parent_platforms[2].platform.name}
                </div>
              )}
            </div>
          </Link>
          <div
            className={addedToCart ? "games-item-add added" : "games-item-add"}
            onClick={() => handleAddToCart()}
          >
            {!addedToCart ? (
              <span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 22 20"
                  height="0.8em"
                  width="0.8em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path>
                  </g>
                </svg>
              </span>
            ) : (
              <span className="added-span">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 22 20"
                  height="0.8em"
                  width="0.8em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                  </g>
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
