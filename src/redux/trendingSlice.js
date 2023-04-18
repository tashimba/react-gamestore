import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKey } from "../pages/MainPage";

export const fetchTrending = createAsyncThunk(
  "trending/fetchTrendingStatus",
  async () => {
    const { data } = await axios.get(
      `https://rawg.io/api/games?dates=2022-10-01,2023-12-31&ordering=-rating&token&key=${apiKey}`
    );
    const res = data.results;
    return res;
  }
);

export const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    items: [],
    loading: true,
  },
  reducers: {
    // setItemsRed(state, action) {
    //   state.items = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrending.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTrending.rejected, (action) => {
      console.log("error: ", action);
    });
    builder.addCase(fetchTrending.pending, (state) => {
      console.log("pending");
      state.loading = true;
    });
  },
});

// export const { setItemsRed } = trendingSlice.actions;

export const trendingSelect = (state) => {
  return state.trending.items;
};
export const trendingLoadingSelect = (state) => {
  return state.trending.loading;
};

export default trendingSlice.reducer;
