import React from "react";
import { useSelector } from "react-redux";
import {
  searchSelect,
  searchLoadingSelect,
  setSearchValue,
  searchValueSelect,
} from "../redux/searchSlice";
import SkeletonGamesPage from "../components/loaders/SketelonGamesPage";
import GameCard from "../components/GameCard";

const SearchPage = () => {
  const searchValue = useSelector((state) => searchValueSelect(state));
  console.log(searchValue);
  const items = useSelector((state) => searchSelect(state));
  const loading = useSelector((state) => searchLoadingSelect(state));
  console.log(items);
  return (
    <div className="searchPage">
      {searchValue ? (
        <>
          <h1 className="searchPage-title">Search: "{searchValue}"</h1>
          <div className="gamesPage-content-games-main">
            {!loading ? (
              items.map((el, index) => <GameCard props={el} key={index} />)
            ) : (
              <>
                <SkeletonGamesPage />
                <SkeletonGamesPage />
                <SkeletonGamesPage />
                <SkeletonGamesPage />
              </>
            )}
          </div>
        </>
      ) : (
        <h1 style={{ textAlign: "center" }} className="searchPage-title">
          Enter your search
        </h1>
      )}
    </div>
  );
};

export default SearchPage;
