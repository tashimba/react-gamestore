import React from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGame, gameSelect, loadingGameSelect } from "../redux/gameSlice";
import Loader from "../components/loaders/Loader/Loader";
import { addItem, cartItemsSelect } from "../redux/cartSlice";
import { removeItem } from "../redux/cartSlice";
import Slider from "../components/slider/Slider";
import { imagesGameSelect } from "../redux/gameSlice";

const GamePage = () => {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => cartItemsSelect(state));
  const data = useSelector((state) => gameSelect(state));
  console.log(data);
  const loading = useSelector((state) => loadingGameSelect(state));
  const screenshots = useSelector((state) => imagesGameSelect(state));

  const [cartState, setCartState] = React.useState();
  const [addedCart, setAddedCart] = React.useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [infoActive, setInfoActive] = React.useState(false);
  React.useEffect(() => {
    dispatch(fetchGame(id));
  }, []);
  // const checkAddedCart = () => {
  //   console.log
  // };

  React.useEffect(() => {
    setAddedCart(cartItems.find((el) => el.id === data.id));
  }, [addedCart]);

  const handleAddToCart = () => {
    addedCart
      ? (setAddedCart(false), dispatch(removeItem(data.id)))
      : (setAddedCart(true), dispatch(addItem(data)));
  };

  return (
    <>
      {!loading ? (
        <div className="game-content">
          <div className="game-content-header">
            {/* <Link to={"/"}> */}
            <h1
              onClick={() => navigate(-1)}
              className="game-content-header-back click"
            >
              ← Store
            </h1>
            {/* </Link> */}
            <div className="game-content-header-title">
              <h1>{data?.name}</h1>
            </div>
          </div>
          <div className="game-content-main">
            {screenshots.length ? (
              <>
                <div className="game-content-main-slider">
                  <Slider images={screenshots} maxWidth={"800px"} />
                </div>
                <div className="game-content-main-right">
                  <div className="game-content-main-right-about">
                    <h2>About</h2>
                    <div className="game-content-main-right-about-info">
                      {data?.description_raw}
                    </div>

                    <div className="game-content-main-right-about-more">
                      {infoActive ? (
                        <div className="game-content-main-right-about-more-active">
                          <a
                            style={{
                              textDecoration: "none",
                              color: "white",
                              fontSize: "18px",
                              fontWeight: "800",
                            }}
                            href={data?.website}
                          >
                            {data?.name} Website
                          </a>
                          {data?.released && (
                            <div className="released">
                              Released: {data?.released.split("-").join(".")}
                            </div>
                          )}

                          <div className="developers">
                            {" "}
                            Developers: {data?.developers[0]?.name}
                          </div>
                          <div className="genres">
                            {" "}
                            Genres:{" "}
                            {data?.genres.map(
                              (el, index) =>
                                el.name + (data.genres[index + 1] ? ", " : "")
                            )}
                          </div>
                          <div className="rating">Rating: {data?.rating}</div>
                          <div className="hide">
                            <span onClick={() => setInfoActive(!infoActive)}>
                              Hide
                            </span>
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g>
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"></path>
                              </g>
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <div className="game-content-main-right-about-more-noactive">
                          <span onClick={() => setInfoActive(!infoActive)}>
                            More
                          </span>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g>
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                            </g>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      addedCart
                        ? "game-content-main-right-cart cartPage-added"
                        : "game-content-main-right-cart"
                    }
                    onClick={() => handleAddToCart()}
                  >
                    {addedCart ? (
                      <>
                        <h3 className="game-content-main-right-cart-add-title">
                          Added
                        </h3>
                        <div className="game-content-main-right-cart-add-plus">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 22 20"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g>
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                            </g>
                          </svg>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="game-content-main-right-cart-price">
                          15.99$
                        </div>
                        <div className="game-content-main-right-cart-add">
                          <div className="game-content-main-right-cart-add-title">
                            Add to cart
                          </div>
                          <div className="game-content-main-right-cart-add-plus">
                            +
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="game-content-main-right">
                <div className="game-content-main-right-about">
                  <h2>About</h2>
                  <div className="game-content-main-right-about-info">
                    {data?.description_raw}
                  </div>

                  <div className="game-content-main-right-about-more">
                    {infoActive ? (
                      <div className="game-content-main-right-about-more-active">
                        <a
                          style={{
                            textDecoration: "none",
                            color: "white",
                            fontSize: "18px",
                            fontWeight: "800",
                          }}
                          href={data?.website}
                        >
                          {data?.name} Website
                        </a>
                        {data?.released && (
                          <div className="released">
                            Released: {data?.released.split("-").join(".")}
                          </div>
                        )}

                        <div className="developers">
                          {" "}
                          Developers: {data?.developers[0]?.name}
                        </div>
                        <div className="genres">
                          {" "}
                          Genres:{" "}
                          {data?.genres.map(
                            (el, index) =>
                              el.name + (data.genres[index + 1] ? ", " : "")
                          )}
                        </div>
                        <div className="rating">Rating: {data?.rating}</div>
                        <div className="hide">
                          <span onClick={() => setInfoActive(!infoActive)}>
                            Hide
                          </span>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g>
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"></path>
                            </g>
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="game-content-main-right-about-more-noactive">
                        <span onClick={() => setInfoActive(!infoActive)}>
                          More
                        </span>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                          </g>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={
                    addedCart
                      ? "game-content-main-right-cart cartPage-added"
                      : "game-content-main-right-cart"
                  }
                  onClick={() => handleAddToCart()}
                >
                  {addedCart ? (
                    <>
                      <h3 className="game-content-main-right-cart-add-title">
                        Added
                      </h3>
                      <div className="game-content-main-right-cart-add-plus">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 22 20"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                          </g>
                        </svg>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="game-content-main-right-cart-price">
                        15.99$
                      </div>
                      <div className="game-content-main-right-cart-add">
                        <div className="game-content-main-right-cart-add-title">
                          Add to cart
                        </div>
                        <div className="game-content-main-right-cart-add-plus">
                          +
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default GamePage;
