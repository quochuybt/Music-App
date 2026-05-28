import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../api/authApi";
import { storage } from "../../utils/storage";

const savedUser = storage.getItem("user");
const savedToken = storage.getItem("token");

export const login = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
  try {
    return await authApi.login(payload);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Đăng nhập thất bại");
  }
});

export const register = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
  try {
    return await authApi.register(payload);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Đăng ký thất bại");
  }
});

export const getCurrentUser = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try {
    return await authApi.me();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Không lấy được người dùng");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser,
    token: savedToken,
    isAuthenticated: Boolean(savedToken && savedUser),
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      storage.removeItem("token");
      storage.removeItem("user");
    },
    loadUserFromStorage(state) {
      state.user = storage.getItem("user");
      state.token = storage.getItem("token");
      state.isAuthenticated = Boolean(state.user && state.token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        storage.setItem("user", action.payload.user);
        storage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = Boolean(state.token);
        storage.setItem("user", action.payload);
      });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
