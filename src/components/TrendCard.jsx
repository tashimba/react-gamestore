import React from "react";
import { Link } from "react-router-dom";

const TrendCard = ({ data, index }) => {
  const margin = () => {
    if (index === 0) return "trending-item click ml-20";
    if (index === 19) return "trending-item click mr-20";
    else return "trending-item click";
  };

  return (
    <div>
      <Link to={`/game/${data.id}`}>
        <div className={margin()}>
          <img
            className="trending-item-img"
            // src="src\assets\CardBG.svg"
            src={data.background_image}
            alt="game"
          />
          <div className="trending-item-title">{data.name}</div>
        </div>
      </Link>
    </div>
  );
};

export default TrendCard;
