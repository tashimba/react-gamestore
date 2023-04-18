import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKey } from "../pages/MainPage";

export const fetchGames = createAsyncThunk(
  "games/fetchGamesStatus",
  async (params) => {
    if (params === undefined) {
      const { data } = await axios.get(
        `https://rawg.io/api/games?&token&key=${apiKey}`
      );
      console.log(data);
      const res = data.results;
      return res;
    }

    const { searchSort, searchPlatform, searchGenre, searchPage } = params;
    if (searchGenre !== undefined) {
      const { data } = await axios.get(
        `https://rawg.io/api/games?ordering=-${searchSort}&metacritic=85,100&page=${searchPage}&platforms=${searchPlatform.id}&genres=${searchGenre.slug}&token&key=${apiKey}`
      );
      const res = data.results;
      return res;
    } else {
      const { searchPage } = params;
      const { data } = await axios.get(
        `https://rawg.io/api/games?ordering=-${searchSort}&metacritic=85,100&page=${searchPage}&platforms=${searchPlatform.id}&token&key=${apiKey}`
      );
      const res = data.results;
      return res;
    }
  }
);

export const gamesSlice = createSlice({
  name: "games",
  initialState: {
    items: [],
    loading: true,
  },
  reducers: {
    setGames(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      console.log(action.payload);
      state.items = [...state.items, ...action.payload];
      console.log(state.items);
      state.loading = false;
    });
    builder.addCase(fetchGames.rejected, (action) => {
      console.log("error: ", action);
    });
    builder.addCase(fetchGames.pending, (state) => {
      state.loading = true;
    });
  },
});

export const gamesSelect = (state) => {
  return state.games.items;
};
export const loadingSelect = (state) => {
  return state.games.loading;
};
export const { setGames } = gamesSlice.actions;
export default gamesSlice.reducer;
