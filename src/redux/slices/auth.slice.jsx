// src/store/slices/auth.slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";

// ================= INITIAL STATE =================
const initialState = {
  isLoading: false,
  isResendLoading: false,
  error: null,
  emailError: null,
  success: null,
  user_data: null,
  accessToken: null,
  refreshToken: null,
  token: null,
  logoutLoading: false,
  logoutSuccess: null,
  logoutError: null,
  resetpasswordLoading: false,
  resetpasswordSuccess: null,
  resetpasswordError: null,
  isResendSuccess: null,
};
// ================= THUNKS =================

// LOGIN
export const login = createAsyncThunk(
  "/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/login", credentials);
      const {
        message,
        token,
        access_token,
        refreshToken,
        refresh_token,
        user,
        user_data,
        data,
      } = res.data || {};

      const foundToken =
        token ?? access_token ?? data?.token ?? data?.access_token ?? null;
      const foundRefresh =
        refreshToken ??
        refresh_token ??
        data?.refreshToken ??
        data?.refresh_token ??
        null;
      const foundUser = user ?? user_data ?? data?.user ?? null;

      if (!foundToken) {
        return thunkAPI.rejectWithValue("Token not found in response");
      }

      // Write cookie
      const isHttps =
        typeof window !== "undefined" && window.location.protocol === "https:";
      const encoded = encodeURIComponent(foundToken);

      document.cookie =
        "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT"; // Clear old cookie
      document.cookie =
        `access_token=${encoded}; Path=/; Max-Age=86400` +
        (isHttps ? "; Secure; SameSite=None" : "; SameSite=Lax");

      // Local storage
      localStorage.setItem("access_token", foundToken);
      if (foundRefresh) localStorage.setItem("refresh_token", foundRefresh);

      return {
        message: message || "Login successful",
        accessToken: foundToken,
        refreshToken: foundRefresh ?? null,
        user_data: foundUser ?? null,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e.response?.data?.message || "Login failed"
      );
    }
  }
);

// RESET PASSWORD
export const resetPassword = createAsyncThunk(
  "/password/reset",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("/password/reset", payload);
      const message = res?.data?.message || "Password reset successful";
      // optional toast
      SuccessToast(message);
      return { message };
    } catch (error) {
      const msg = error?.response?.data?.message || "Password reset failed";
      // optional toast
      ErrorToast(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const logout = createAsyncThunk("/user/logout", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const existingToken =
    state.auth?.accessToken || localStorage.getItem("access_token") || null;

  try {
    await axios.get("/user/logout", {
      headers: existingToken
        ? { Authorization: `Bearer ${existingToken}` }
        : {},
    });
    return { message: "Logout successful" };
  } catch (e) {
    return thunkAPI.rejectWithValue(
      e?.response?.data?.message || "Logout failed"
    );
  } finally {
    const isHttps =
      typeof window !== "undefined" && window.location.protocol === "https:";
    document.cookie =
      `access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT` +
      (isHttps ? `; Secure; SameSite=None` : `; SameSite=Lax`);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
});

export const getProfile = createAsyncThunk(
  "/user/profile",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/user/profile");
      return response.data; // Return entire API response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Verification failed"
      );
    }
  }
);
export const getProviderProfile = createAsyncThunk(
  "/provider/profile",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/provider/profile");
      return response.data; // Return entire API response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Verification failed"
      );
    }
  }
);

// REGISTER
export const Register = createAsyncThunk(
  "/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/register", credentials);
      const { accessToken, refreshToken, user_data } = response.data;

      if (typeof window !== "undefined") {
        document.cookie = `access_token=${accessToken}; path=/; max-age=86400; secure; samesite=strict`;
        localStorage.setItem("refresh_token", refreshToken);
      }
      SuccessToast(response?.data?.message);
      return { accessToken, refreshToken, user_data };
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// COMPLETE PROFILE
export const CompleteUserProfile = createAsyncThunk(
  "/user/complete-profile",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("/user/complete-profile", payload);

      const { accessToken, refreshToken, user_data } = response.data;

      // Update storage if new tokens are returned
      if (typeof window !== "undefined") {
        if (accessToken) {
          document.cookie = `access_token=${accessToken}; path=/; max-age=86400; secure; samesite=strict`;
          localStorage.setItem("access_token", accessToken);
        }
        if (refreshToken) {
          localStorage.setItem("refresh_token", refreshToken);
        }
      }

      SuccessToast(response?.data?.message);
      return { accessToken, refreshToken, user_data };
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);


export const UpdateProviderProfile = createAsyncThunk(
  "/provider/update-profile",
  async (payload, thunkAPI) => {
    try {
       console.log(payload,"update ProfileRecord");
      const response = await axios.post(
        `/provider/profile`,payload
      );

      SuccessToast("Profile Update Successfully");
     

      return response?.data?.user;
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);


// COMPLETE Provider PROFILE
export const CompleteProviderProfile = createAsyncThunk(
  "/provider/complete-profile",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("/provider/complete-profile", payload);
      const { accessToken, refreshToken, userData } = response.data;

      if (typeof window !== "undefined") {
        if (accessToken) {
          document.cookie = `access_token=${accessToken}; path=/; max-age=86400; secure; samesite=strict`;
          localStorage.setItem("access_token", accessToken);
        }
        if (refreshToken) {
          localStorage.setItem("refresh_token", refreshToken);
        }
      }

      SuccessToast(response?.data?.message);
      return { accessToken, refreshToken, userData };
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);
export const CreateService = createAsyncThunk(
  "/services/create",
  async (payload, thunkAPI) => {
    try {
      console.log(payload, "payload");
      const response = await axios.post("/services/create", payload);

      const { accessToken, refreshToken, userData } = response.data;

      if (typeof window !== "undefined") {
        if (accessToken) {
          document.cookie = `access_token=${accessToken}; path=/; max-age=86400; secure; samesite=strict`;
          localStorage.setItem("access_token", accessToken);
        }
        if (refreshToken) {
          localStorage.setItem("refresh_token", refreshToken);
        }
      }

      SuccessToast(response?.data?.message);
      return { accessToken, refreshToken, userData };
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);
export const UpdateService = createAsyncThunk(
  "/services/id",
  async (payload, thunkAPI) => {
    try {
      console.log(payload, "payload");
      const response = await axios.post(
        `/services/${payload?.id}`,
        payload?.data
      );

      const { accessToken, refreshToken, userData } = response.data;

      if (typeof window !== "undefined") {
        if (accessToken) {
          document.cookie = `access_token=${accessToken}; path=/; max-age=86400; secure; samesite=strict`;
          localStorage.setItem("access_token", accessToken);
        }
        if (refreshToken) {
          localStorage.setItem("refresh_token", refreshToken);
        }
      }

      SuccessToast("Service Update Successfully");
      return { accessToken, refreshToken, userData };
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);

export const DeleteService = createAsyncThunk(
  "/services/id",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.delete(`/services/${payload}`);
      SuccessToast("Delete Service Successfully");
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);

export const CreateCertificate = createAsyncThunk(
  "/provider/certificate",
  async (payload, thunkAPI) => {
    try {
      // Get token from localStorage or Redux
      const token = thunkAPI.getState().auth.token;
      console.log(token);
      if (!token) {
        return thunkAPI.rejectWithValue("No token found, please login again");
      }
      const response = await axios.post("/provider/certificate", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { accessToken, refreshToken, userData } = response.data;

      if (typeof window !== "undefined") {
        if (accessToken) {
          document.cookie = `access_token=${accessToken}; path=/; max-age=86400; secure; samesite=strict`;
          localStorage.setItem("access_token", accessToken);
        }
        if (refreshToken) {
          localStorage.setItem("refresh_token", refreshToken);
        }
      }

      SuccessToast(response?.data?.message);
      return { accessToken, refreshToken, userData };
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);
export const UpdateCertificate = createAsyncThunk(
  "/provider/certificate/id",
  async (payload, thunkAPI) => {
    try {
      console.log(payload, "payload");
      const response = await axios.post(
        `provider/certificate/${payload?.id}`,
        payload?.data
      );

      const { accessToken, refreshToken, userData } = response.data;

      if (typeof window !== "undefined") {
        if (accessToken) {
          document.cookie = `access_token=${accessToken}; path=/; max-age=86400; secure; samesite=strict`;
          localStorage.setItem("access_token", accessToken);
        }
        if (refreshToken) {
          localStorage.setItem("refresh_token", refreshToken);
        }
      }

      SuccessToast("Certificate Update Successfully");
      return { accessToken, refreshToken, userData };
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);

export const DeleteCertificate = createAsyncThunk(
  "/provider/certificate/",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.delete(`/provider/certificate/${payload}`);
      SuccessToast("Delete Certificate Successfully");
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);



export const CreateVerification = createAsyncThunk(
  "/provider/verification",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) {
        return thunkAPI.rejectWithValue("No token found, please login again");
      }

      const formData = new FormData();
      formData.append("national_id_front", payload.national_id_front);
      formData.append("national_id_back", payload.national_id_back);

      const response = await axios.post("/provider/verification", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const { accessToken, refreshToken, userData } = response.data;

      if (typeof window !== "undefined") {
        if (accessToken) {
          document.cookie = `access_token=${accessToken}; path=/; max-age=86400; secure; samesite=strict`;
          localStorage.setItem("access_token", accessToken);
        }
        if (refreshToken) {
          localStorage.setItem("refresh_token", refreshToken);
        }
      }

      SuccessToast(response?.data?.message);
      return { accessToken, refreshToken, userData };
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Verification failed"
      );
    }
  }
);

// VERIFY EMAIL
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

// RESEND OTP
export const ResentOtp = createAsyncThunk(
  "/resend-otp",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("/resend-otp", payload);
      SuccessToast(response?.data?.message || "OTP sent successfully");
      return { success: true, message: response?.data?.message }; // Return success
    } catch (error) {
      ErrorToast(error.response?.data?.message || "Resend OTP failed");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Resend OTP failed"
      );
    }
  }
);

// ================= SLICE =================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState(state) {
      state.error = null;
      state.success = null;
      state.isLoading = false;
    },
    resetError(state) {
      state.error = null;
    },
    resetLogoutState(state) {
      state.logoutLoading = false;
      state.logoutSuccess = null;
      state.logoutError = null;
    },
    clearResetState(state) {
      state.resetLoading = false;
      state.resetSuccess = null;
      state.resetError = null;
    },
    clearforgetpasswordState(state) {
      state.isResendLoading = false;
      state.isResendSuccess = null;
      state.emailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user_data = action.payload.user_data;
        state.success = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // GetProfile
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user_data = action.payload.user;
        state.success = action.payload.message;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //Update Profile
      .addCase(UpdateProviderProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(UpdateProviderProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = "Profile Update Successfully";
        state.user_data=action.payload
      })
      .addCase(UpdateProviderProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Provider Profile
      .addCase(getProviderProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getProviderProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user_data = action.payload;
        state.success = action.payload.message;
      })
      .addCase(getProviderProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // RESET PASSWORD
      .addCase(resetPassword.pending, (state) => {
        state.resetLoading = true;
        state.resetError = null;
        state.resetSuccess = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetLoading = false;
        state.resetSuccess =
          action.payload?.message || "Password reset successful";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetLoading = false;
        state.resetError = action.payload || "Password reset failed";
      })
      // LOGOUT
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
        state.logoutError = null;
        state.logoutSuccess = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logoutLoading = false;
        state.logoutSuccess = action.payload?.message || "Logout successful";

        // clear auth state
        state.user_data = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.success = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.payload || "Logout failed";

        // still ensure client state is logged-out
        state.user_data = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      // REGISTER
      .addCase(Register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user_data = action.payload.user_data;
      })
      .addCase(Register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(CreateService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateService.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(CreateService.rejected, (state, action) => {
        state.isLoading = false;
      })
      // VERIFY EMAIL
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // RESEND OTP
      .addCase(ResentOtp.pending, (state) => {
        state.isResendLoading = true;
      })
      .addCase(ResentOtp.fulfilled, (state, action) => {
        state.isResendLoading = false;
        state.isResendSuccess = action.payload.success; // Set success flag
        state.success = action.payload.message; // Save the success message
      })
      .addCase(ResentOtp.rejected, (state, action) => {
        state.isResendLoading = false;
        state.isResendSuccess = false; // Set success to false if error occurs
        state.emailError = action.payload;
      });
  },
});

export const {
  resetError,
  resetAuthState,
  clearforgetpasswordState,
  resetLogoutState,
  clearResetState,
} = authSlice.actions;
export default authSlice.reducer;
