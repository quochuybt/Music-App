import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { playlistApi } from "../../api/playlistApi";

export const fetchPlaylists = createAsyncThunk("playlists/list", playlistApi.list);
export const fetchPlaylist = createAsyncThunk("playlists/get", playlistApi.get);

const playlistSlice = createSlice({
  name: "playlists",
  initialState: { playlists: [], selectedPlaylist: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = action.payload || [];
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPlaylist = action.payload;
      })
      .addMatcher((action) => action.type.startsWith("playlists/") && action.type.endsWith("/pending"), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action) => action.type.startsWith("playlists/") && action.type.endsWith("/rejected"), (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export default playlistSlice.reducer;
