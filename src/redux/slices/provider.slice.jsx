import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";

// ================= INITIAL STATE =================
const initialState = {
  isLoading: false,
  error: null,
  success: null,
  provider_data: null,
  services:null,
  plans: null,
  getprofileloading: false,
};
// ================= THUNKS =================

export const getProfile = createAsyncThunk(
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

export const getPlans = createAsyncThunk(
  "/plans", // The action type
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/plans"); // API request to fetch the profile
      return response.data; // Assuming the API returns the user profile data
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to Fetch Plans";
      ErrorToast(msg); // Show error toast
      return thunkAPI.rejectWithValue(msg); // Handle rejection
    }
  }
);

export const getServices = createAsyncThunk(
  "/provider/services", // The action type
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/provider/services"); // API request to fetch the profile
      console.log(response,"response")
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to Fetch Plans";
      ErrorToast(msg); // Show error toast
      return thunkAPI.rejectWithValue(msg); // Handle rejection
    }
  }
);

// RESEND OTP
export const AddCard = createAsyncThunk(
  "/provider/payment-methods",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("/provider/payment-methods", payload);    
      SuccessToast(response?.data?.message)
      return { success: true, message: response?.data?.message };

    } catch (error) {
      ErrorToast(error.response?.data?.message || "Card Add failed");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Card Add failed"
      );
    }
  }
);

// ================= SLICE =================
const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    resetProviderState(state) {
      state.error = null;
      state.success = null;
      state.isLoading = false;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Provide Profile
      .addCase(getProfile.pending, (state) => {
        state.getprofileloading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.getprofileloading = false;
        state.provider_data = action.payload;
        state.success = action.payload.message;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.getprofileloading = false;
        state.error = action.payload;
      })
      // Provider Plans
      .addCase(getPlans.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plans = action.payload;
        state.success = "Plans Get Successfully";
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // get services
      .addCase(getServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload;
        state.success = "Services Get Successfully";
      })
      .addCase(getServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //Add Card
      .addCase(AddCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(AddCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = "Card Add Successfully";
      })
      .addCase(AddCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError, resetProviderState } = providerSlice.actions;
export default providerSlice.reducer;
