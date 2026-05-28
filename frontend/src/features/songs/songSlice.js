import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { songApi } from "../../api/songApi";

export const fetchSongs = createAsyncThunk("songs/list", async (params = {}, { rejectWithValue }) => {
  try {
    return await songApi.list(params);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Không tải được bài hát");
  }
});

export const fetchSong = createAsyncThunk("songs/get", async (id, { rejectWithValue }) => {
  try {
    return await songApi.get(id);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Không tải được bài hát");
  }
});

const songSlice = createSlice({
  name: "songs",
  initialState: {
    songs: [],
    page: null,
    selectedSong: null,
    filters: { keyword: "", artistId: "", albumId: "", genreId: "" },
    loading: false,
    error: null,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.page = action.payload;
        state.songs = action.payload?.content || action.payload || [];
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSong.fulfilled, (state, action) => {
        state.selectedSong = action.payload;
      });
  },
});

export const { setFilters } = songSlice.actions;
export default songSlice.reducer;
