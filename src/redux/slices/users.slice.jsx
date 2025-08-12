// src/store/slices/user.slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios"; // Adjust according to where your axios instance is located
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";

// ================= INITIAL STATE =================
const initialState = {
  isLoading: false,
  userProfile: null,
  error: null,
  success: null,
};

// ================= THUNKS =================

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "/user/profile", // The action type
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/user/profile"); // API request to fetch the profile
      return response.data; // Assuming the API returns the user profile data
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to fetch profile";
      ErrorToast(msg); // Show error toast
      return thunkAPI.rejectWithValue(msg); // Handle rejection
    }
  }
);

// ================= SLICE =================
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Optional: You can add other actions to update state directly if needed
    resetUserState(state) {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = action.payload; // Set user profile data
        state.success = "Profile fetched successfully"; // Optional: success message
        SuccessToast(state.success); // Show success toast
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Handle error
      });
  },
});

// Export actions and reducer
export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
