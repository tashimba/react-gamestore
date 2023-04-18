import React from "react";
import { Link } from "react-router-dom";

const TrendCard = ({ data, cardRef }) => {
  return (
    <div>
      <Link to={`/game/${data.id}`}>
        <div className="trending-item click">
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
