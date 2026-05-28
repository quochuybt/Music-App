import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { favoriteApi } from "../../api/favoriteApi";

export const fetchFavorites = createAsyncThunk("favorites/list", favoriteApi.list);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: { favorites: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload || [];
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export default favoriteSlice.reducer;
