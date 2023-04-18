import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKey } from "../pages/MainPage";

export const fetchSearch = createAsyncThunk(
  "search/fetchSearch",
  async (params) => {
    const { inputValue } = params;
    console.log(inputValue);
    const resp = await axios.get(
      `https://rawg.io/api/games?search=${inputValue
        .split(" ")
        .join("-")
        .toLowerCase()}&key=${apiKey}`
    );
    console.log(resp);
    const res = resp.data.results;
    return res;
  }
);
export const searchSlice = createSlice({
  name: "search",
  initialState: {
    items: [],
    loading: true,
    searchValue: "",
  },
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchSearch.fulfilled,
      (state, action) => {
        state.items = action.payload;
        state.loading = false;
      },
      builder.addCase(fetchSearch.rejected, (action) => {
        console.log(action);
      }),
      builder.addCase(fetchSearch.pending, (state) => {
        state.loading = true;
      })
    );
  },
});

export const searchSelect = (state) => {
  return state.search.items;
};
export const searchLoadingSelect = (state) => {
  return state.search.loading;
};
export const searchValueSelect = (state) => {
  return state.search.searchValue;
};
export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
