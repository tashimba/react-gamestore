import React from "react";
import TrendCard from "./TrendCard";
import { Link } from "react-router-dom";

const TrendingGames = ({ games }) => {
  return (
    <div>
      <div className="trending">
        <div className="trending-title-view">
          <h1 className="trending-title">Trending</h1>
          <Link to={"/games"}>
            <button className="trending-view-btn">VIEW ALL</button>
          </Link>
        </div>
        <div className="trending-items">
          {games.map((el, index) => (
            <TrendCard data={el} key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingGames;
