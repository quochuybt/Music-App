import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { historyApi } from "../../api/historyApi";
import { storage } from "../../utils/storage";

export const playSongWithHistory = createAsyncThunk("player/playSongWithHistory", async (song, { getState }) => {
  // Playback is simulated in Redux; logged-in users still write listening history.
  if (getState().auth.isAuthenticated) {
    historyApi.add(song.id).catch(() => {});
  }
  return song;
});

const playerSlice = createSlice({
  name: "player",
  initialState: {
    currentSong: null,
    queue: [],
    isPlaying: false,
    volume: storage.getItem("playerVolume", 70),
    progress: 0,
    currentIndex: 0,
  },
  reducers: {
    setCurrentSong(state, action) {
      state.currentSong = action.payload;
      state.progress = 0;
    },
    playSong(state, action) {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.progress = 0;
    },
    pauseSong(state) {
      state.isPlaying = false;
    },
    togglePlay(state) {
      if (state.currentSong) state.isPlaying = !state.isPlaying;
    },
    nextSong(state) {
      if (!state.queue.length) return;
      state.currentIndex = (state.currentIndex + 1) % state.queue.length;
      state.currentSong = state.queue[state.currentIndex];
      state.isPlaying = true;
      state.progress = 0;
    },
    previousSong(state) {
      if (!state.queue.length) return;
      state.currentIndex = state.currentIndex === 0 ? state.queue.length - 1 : state.currentIndex - 1;
      state.currentSong = state.queue[state.currentIndex];
      state.isPlaying = true;
      state.progress = 0;
    },
    setVolume(state, action) {
      state.volume = Number(action.payload);
      storage.setItem("playerVolume", state.volume);
    },
    setProgress(state, action) {
      state.progress = action.payload;
    },
    setQueue(state, action) {
      state.queue = action.payload || [];
      state.currentIndex = Math.max(0, state.queue.findIndex((song) => song.id === state.currentSong?.id));
    },
    clearPlayer(state) {
      state.currentSong = null;
      state.isPlaying = false;
      state.progress = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(playSongWithHistory.fulfilled, (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.progress = 0;
    });
  },
});

export const { setCurrentSong, playSong, pauseSong, togglePlay, nextSong, previousSong, setVolume, setProgress, setQueue, clearPlayer } =
  playerSlice.actions;
export default playerSlice.reducer;
