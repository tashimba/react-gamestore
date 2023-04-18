import React from "react";
import GameCard from "../components/GameCard";
import axios from "axios";
import games from "../games.json";
import { Link } from "react-router-dom";
import TrendCard from "../components/TrendCard";
import TrendingGames from "../components/TrendingGames";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTrending,
  trendingLoadingSelect,
  trendingSelect,
} from "../redux/trendingSlice";
import { fetchGames, gamesSelect, loadingSelect } from "../redux/gamesSlice";
import SliderMainPage from "../components/slider/SliderMainPage";

export const apiKey = "761dc63765ef4ef49ab5f16f35027d63";

const MainPage = () => {
  const items = useSelector((state) => state.games.items);
  const itemsLoading = useSelector((state) => loadingSelect(state));
  const trending = useSelector((state) => trendingSelect(state));
  const trendingLoading = useSelector((state) => trendingLoadingSelect(state));
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    dispatch(fetchGames());
  }, []);

  React.useEffect(() => {
    dispatch(fetchTrending());
  }, []);

  return (
    <>
      {!itemsLoading && !trendingLoading && (
        <div className="main">
          <div className="main-cont">
            <SliderMainPage data={items} />
            <TrendingGames games={trending} />
          </div>
          <div className="main-content">
            <div className="games">
              <div className="games-title">
                <h1>Most Popular</h1>
                <Link to={"/games"}>
                  <button className="games-title-view-btn">VIEW ALL</button>
                </Link>
              </div>
              <div className="games-items">
                {items.map((el, index) => (
                  <GameCard props={el} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
