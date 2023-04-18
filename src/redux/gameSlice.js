import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKey } from "../pages/MainPage";

export const fetchGame = createAsyncThunk("game/fetchGame", async (id) => {
  const { data } = await axios.get(
    `https://api.rawg.io/api/games/${id}?key=${apiKey}`
  );
  const res = await axios.get(
    `https://api.rawg.io/api/games/${id}/screenshots?key=${apiKey}`
  );
  const images = res.data.results;
  return { data, images };
});

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    data: [],
    loadingGame: true,
    screenshots: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGame.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.screenshots = action.payload.images;
      state.loadingGame = false;
    });
    builder.addCase(fetchGame.rejected, (action) => {
      console.log("error: ", action);
    });
    builder.addCase(fetchGame.pending, (state) => {
      state.loadingGame = true;
    });
  },
});

export const gameSelect = (state) => {
  return state.game.data;
};
export const loadingGameSelect = (state) => {
  return state.game.loadingGame;
};
export const imagesGameSelect = (state) => {
  return state.game.screenshots;
};

export default gameSlice.reducer;
