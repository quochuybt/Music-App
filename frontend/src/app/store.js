import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import playerReducer from "../features/player/playerSlice";
import themeReducer from "../features/theme/themeSlice";
import songReducer from "../features/songs/songSlice";
import playlistReducer from "../features/playlists/playlistSlice";
import favoriteReducer from "../features/favorites/favoriteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
    theme: themeReducer,
    songs: songReducer,
    playlists: playlistReducer,
    favorites: favoriteReducer,
  },
});
