// auth.slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../axios";

const initialState = {
  isLoading: false,
  error: null,
  userData: null,
  accessToken: null,
  refreshToken: null,
  success: null,
};

export const login = createAsyncThunk('/login', async (credentials, thunkAPI) => {
  try {
    const res = await axios.post('/login', credentials);
    // Flexible mapping
    const {
      message,
      token,
      access_token,
      refreshToken,
      refresh_token,
      user,
      userData,
      data,
    } = res.data || {};

    const foundToken =
      token ?? access_token ?? data?.token ?? data?.access_token ?? null;

    const foundRefresh =
      refreshToken ?? refresh_token ?? data?.refreshToken ?? data?.refresh_token ?? null;

    const foundUser = user ?? userData ?? data?.user ?? null;

    if (!foundToken) {
      return thunkAPI.rejectWithValue('Token not found in response');
    }

    // Write cookie safely
    const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
    const encoded = encodeURIComponent(foundToken);
    // Clear any old bad cookie
    document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
    // Set new cookie
    document.cookie =
      `access_token=${encoded}; Path=/; Max-Age=86400` +
      (isHttps ? `; Secure; SameSite=None` : `; SameSite=Lax`);

    // Optional: also persist in localStorage (handy for dev)
    localStorage.setItem('access_token', foundToken);
    if (foundRefresh) localStorage.setItem('refresh_token', foundRefresh);

    return {
      message: message || 'Login successful',
      accessToken: foundToken,
      refreshToken: foundRefresh ?? null,
      userData: foundUser ?? null,
    };
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data?.message || 'Login failed');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  // Remove both tokens
  document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  return 'Logout successful';
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState(state) {
      state.error = null;
      state.success = null;
      state.isLoading = false;
      // note: accessToken ko yahan clear NA karo
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null; // stale messages clear
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.userData = action.payload.userData;
        state.success = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.userData = null;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export const { resetError, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
