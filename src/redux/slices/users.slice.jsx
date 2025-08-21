// src/store/slices/user.slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";

// ================= INITIAL STATE =================
const initialState = {
  isLoading: false,
  userProfile: null,
  allservices: null,
  error: null,
  success: null,
  updateLoading: false,
  updateError: null,
  updateSuccess: null,
  allservicesloading: false,
  allserviceserror: null,
  allservicessuccess: null,
};

// ================= THUNKS =================

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "/user/profile",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/user/profile");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch profile");
    }
  }
);


export const fetchallservices = createAsyncThunk(
  "/users/providers",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/users/providers");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch services");
    }
  }
);



// Update user profile and fetch updated profile
export const updateUserProfile = createAsyncThunk(
  "/user/updateProfile",
  async (payload, thunkAPI) => {
    try {
      const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;

      const res = await axios.post("/user/profile", payload, {
        headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
      });

      // After updating, fetch the updated profile data
      thunkAPI.dispatch(fetchUserProfile());

      return res.data;
    } catch (error) {
      const serverData = error?.response?.data;
      const msg =
        serverData?.message ||
        (Array.isArray(serverData?.errors)
          ? serverData.errors.join(", ")
          : "Failed to update profile");
      ErrorToast(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// ================= SLICE =================
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState(state) {
      state.error = null;
      state.success = null;
      state.updateError = null;
      state.updateSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ----- fetch profile -----
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ----- fetch all services -----
      .addCase(fetchallservices.pending, (state) => {
        state.allservicesloading = true;
        state.allserviceserror = null;
        state.allservicessuccess = null;
      })
      .addCase(fetchallservices.fulfilled, (state, action) => {
        state.allservicesloading = false;
        state.allservices = action.payload;
        state.allservicessuccess = "Successfully fetched services!";
      })
      .addCase(fetchallservices.rejected, (state, action) => {
        state.allservicesloading = false;
        state.allserviceserror = action.payload;
      })
      
      // ----- update profile -----
      .addCase(updateUserProfile.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateSuccess = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updateLoading = false;

        // Merge updated fields into userProfile
        state.userProfile = {
          ...(state.userProfile || {}),
          ...(action.payload || {}),
        };

        state.updateSuccess = "Profile updated successfully";
        SuccessToast(state.updateSuccess);
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
