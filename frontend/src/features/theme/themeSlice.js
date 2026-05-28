import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../../utils/storage";

const applyTheme = (mode) => {
  document.documentElement.classList.toggle("dark", mode === "dark");
};

const initialMode = storage.getItem("theme", "light");
applyTheme(initialMode);

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: initialMode },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
      storage.setItem("theme", state.mode);
      applyTheme(state.mode);
    },
    setTheme(state, action) {
      state.mode = action.payload;
      storage.setItem("theme", state.mode);
      applyTheme(state.mode);
    },
    loadThemeFromStorage(state) {
      state.mode = storage.getItem("theme", "light");
      applyTheme(state.mode);
    },
  },
});

export const { toggleTheme, setTheme, loadThemeFromStorage } = themeSlice.actions;
export default themeSlice.reducer;
