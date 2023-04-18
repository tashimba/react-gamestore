import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiKey } from "../pages/MainPage";

export const fetchCartItem = createAsyncThunk(
  "cart/fetchCartItem",
  async (id) => {
    const { data } = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${apiKey}`
    );
    return data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      state.items = state.items.filter((el) => el.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItem.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(fetchCartItem.rejected, (action) => {
      console.log("error: ", action);
    });
  },
});

export const cartItemsSelect = (state) => {
  return state.cart.items;
};
export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
