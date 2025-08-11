import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
const initialState = {
  isLoading: false,
  isResendLoading: false,
  error: null,
  userData: null,
  accessToken: null,
  refreshToken: null,
  token:null
};

// Async thunk for logging in
export const login = createAsyncThunk(
  "/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/login", credentials);
      const { accessToken, refreshToken, userData } = response.data;

      console.log(axios, "axios");

      // Save the tokens to cookies/localStorage if needed
      if (typeof window !== "undefined") {
        document.cookie = `access_token=${accessToken}; path=/; max-age=86400; secure; samesite=strict`;
        localStorage.setItem("refresh_token", refreshToken); // Store refresh token
      }

      return { accessToken, refreshToken, userData };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// Async thunk for logging out
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    // API call for logging out, if necessary
    localStorage.removeItem("refresh_token");
    document.cookie = `access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`; // Clear cookie

    return "Logout successful";
  } catch (error) {
    return thunkAPI.rejectWithValue("Logout failed");
  }
});

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.userData = action.payload.userData;
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
      })
      // REGISTER (✅ Automatically login user after register)
      .addCase(Register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.userData = action.payload.userData;
      })
      .addCase(Register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
         console.log(action,"action")
        state.isLoading = false;     
        state.token=action.payload.token  
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(ResentOtp.pending, (state) => {
        state.isResendLoading = true;
      })
      .addCase(ResentOtp.fulfilled, (state, action) => {
        state.isResendLoading = false;       
      })
      .addCase(ResentOtp.rejected, (state, action) => {
        state.isResendLoading = false;
        state.error = action.payload;
      });
  },
});

export const Register = createAsyncThunk(
  "/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/register", credentials);
      const { accessToken, refreshToken, userData } = response.data;
      if (typeof window !== "undefined") {
        document.cookie = `access_token=${accessToken}; path=/; max-age=86400; secure; samesite=strict`;
        localStorage.setItem("refresh_token", refreshToken);
      }
      SuccessToast(response?.data?.message);
      return { accessToken, refreshToken, userData };
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const CompleteUserProfile = createAsyncThunk(
  "/user/profile",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("/user/profile", payload);
      const { accessToken, refreshToken, userData } = response.data;
      if (typeof window !== "undefined") {
        document.cookie = `access_token=${accessToken}; path=/; max-age=86400; secure; samesite=strict`;
        localStorage.setItem("refresh_token", refreshToken);
      }
      SuccessToast(response?.data?.message);
      return { accessToken, refreshToken, userData };
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "/verify-email",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("/verify-email", payload);
      SuccessToast(response?.data?.message || "Email verified successfully");
      return response.data;
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Verification failed"
      );
    }
  }
);
export const ResentOtp = createAsyncThunk(
  "/resend-otp",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("/resend-otp", payload);
      console.log(response?.data?.message)
      SuccessToast(response?.data?.message || "Email verified successfully");
      return response.data;
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Verification failed"
      );
    }
  }
);

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
