import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GameCard from "../components/GameCard";
import axios from "axios";
import { fetchTrending, trendingSelect } from "../redux/trendingSlice";
import { fetchGames, gamesSelect, loadingSelect } from "../redux/gamesSlice";
import Skeleton from "../components/loaders/SketelonGamesPage";

const GamesPage = () => {
  const [pag, setPag] = React.useState(0);

  const popupRef = React.useRef();
  const items = useSelector((state) => gamesSelect(state));

  const loading = useSelector((state) => loadingSelect(state));
  const dispatch = useDispatch();
  const [genres, setGenres] = React.useState([]);
  const platforms = [
    { index: 0, id: "4", name: "PC" },
    { index: 1, id: "1", name: "Xbox One" },
    { index: 2, id: "18", name: "PlayStation 4" },
    { index: 3, id: "186", name: "Xbox Series S/X" },
    { index: 4, id: "187", name: "PlayStation 5" },
  ];
  const sortItems = ["Rating", "Released", "Added"];
  const [viewPlatfoms, setViewPlatfoms] = React.useState(true);
  const [viewGenres, setViewGenres] = React.useState(false);
  const [viewSort, setViewSort] = React.useState(false);
  const [activePlatform, setActivePlatform] = React.useState(0);
  const [activeGenre, setActiveGenre] = React.useState();
  const [activeSort, setActiveSort] = React.useState(0);
  const [searchPage, setSearchPage] = React.useState(1);
  const [fetchingScroll, setFetchingScroll] = React.useState(true);
  const searchSort = sortItems[activeSort].toLowerCase();
  const searchPlatform = platforms.find((el) => el.index === activePlatform);
  const searchGenre = genres[activeGenre];
  const searchQuery = { searchSort, searchPlatform, searchGenre, searchPage };
  React.useEffect(() => {
    const clickPopupOut = (e) => {
      if (popupRef.current && !e.composedPath().includes(popupRef.current)) {
        setViewSort(false);
      }
    };
    document.body.addEventListener("click", clickPopupOut);
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(
        "https://rawg.io/api/genres?token&key=761dc63765ef4ef49ab5f16f35027d63"
      )
      .then((data) => setGenres(data.data.results));
  }, []);

  React.useEffect(() => {
    dispatch(fetchGames(searchQuery));
    console.log(searchPage);
  }, [activeSort, activePlatform, activeGenre, searchPage]);

  React.useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    setFetchingScroll(false);
    return function () {
      console.log("remove");
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      10
    ) {
      console.log(
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight)
      );
      setFetchingScroll(true);
      setSearchPage(searchPage + 1);
    }
  };
  console.log(searchPage);
  return (
    <>
      <div className="gamesPage">
        <div className="gamesPage-content">
          <div className="gamesPage-content-games">
            <div className="gamesPage-content-games-header">
              <h1 className="gamesPage-content-games-header-title">
                {sortItems[activeSort]}
              </h1>

              <div
                ref={popupRef}
                className="gamesPage-content-games-header-title-sort"
              >
                <div
                  onClick={() => {
                    setViewSort(!viewSort);
                  }}
                  className="gamesPage-content-games-header-title-sort-title"
                >
                  <div>Sort by</div>
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

                {viewSort && (
                  <div className="gamesPage-content-games-header-title-sort-popup">
                    {sortItems.map((el, index) => (
                      <div
                        className={activeSort === index ? "activated" : ""}
                        onClick={() => {
                          setActiveSort(index);
                          setViewSort(false);
                        }}
                        key={index}
                      >
                        {el}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="gamesPage-content-games-main">
              {!loading ? (
                items.length === 0 ? (
                  <div style={{ color: "white" }}>
                    There are no "{genres[activeGenre].name}" games on "
                    {platforms[activePlatform].name}"
                  </div>
                ) : (
                  items.map((el, index) => <GameCard props={el} key={index} />)
                )
              ) : (
                <>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </>
              )}
            </div>
          </div>
          <div className="gamesPage-content-filter">
            <h2 className="gamesPage-content-filter-title">Filters</h2>

            <div className="gamesPage-content-filter-platforms">
              <div
                onClick={() => setViewPlatfoms(!viewPlatfoms)}
                className="gamesPage-content-filter-platforms-title"
              >
                <h2>Platform</h2>
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
              {viewPlatfoms && (
                <div className="gamesPage-content-filter-platforms-main">
                  {platforms.map((el, index) => (
                    <div
                      onClick={() => {
                        activePlatform === index
                          ? setActivePlatform(-1)
                          : setActivePlatform(index);
                      }}
                      className={activePlatform === index ? "activated" : ""}
                      key={index}
                    >
                      {el.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="gamesPage-content-filter-genres">
              <div
                onClick={() => setViewGenres(!viewGenres)}
                className="gamesPage-content-filter-genres-title"
              >
                <h2>Genre</h2>
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
              {viewGenres && (
                <div className="gamesPage-content-filter-genres-main">
                  {genres.length &&
                    genres.map((el, index) => (
                      <div
                        onClick={() => {
                          activeGenre === index
                            ? setActiveGenre()
                            : setActiveGenre(index);
                        }}
                        className={activeGenre === index ? "activated" : ""}
                        key={index}
                      >
                        {el.name}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamesPage;
