import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";

// ================= INITIAL STATE =================
const initialState = {
  isLoading: false,
  error: null,
  success: null,
  provider_data: null,
};
// ================= THUNKS =================

export const getProfile = createAsyncThunk(
  "/provider/profile",
  async (payload, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token =
        state.auth.accessToken ||
        localStorage.getItem("access_token") ||
        state.auth.token;
      if (!token) {
        return thunkAPI.rejectWithValue("No token found, please login again");
      }
      const response = await axios.post(
        "/provider/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { user } = response.data;
      console.log(response.data, "data");

      SuccessToast(response?.data?.message);
      return { user };
    } catch (error) {
      ErrorToast(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Verification failed"
      );
    }
  }
);

// ================= SLICE =================
const ProviderSlice = createSlice({
  name: "Provider",
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
      // Provide
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        console.log(action.payload, "payload");
        state.isLoading = false;
        state.provider_data = action.payload.user;
        state.success = action.payload.message;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError, resetProviderState } = ProviderSlice.actions;
export default ProviderSlice.reducer;
