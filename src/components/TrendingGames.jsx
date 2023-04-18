import React from "react";
import TrendCard from "./TrendCard";
import { Link } from "react-router-dom";

const TrendingGames = ({ games }) => {
  // const btnTitles = ["VIEW ALL", "HIDE"];

  // const [count, setCount] = React.useState(3);
  // const [btn, setBtn] = React.useState(btnTitles[0]);
  const cardRef = React.useRef();
  console.log(cardRef.current);
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
