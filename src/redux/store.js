import { configureStore } from "@reduxjs/toolkit";
import trending from "./trendingSlice";
import games from "./gamesSlice";
import game from "./gameSlice";
import search from "./searchSlice";
import cart from "./cartSlice";

export default configureStore({
  reducer: { trending, games, game, search, cart },
});
