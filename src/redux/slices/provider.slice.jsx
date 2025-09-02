import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";

// ================= INITIAL STATE =================
const initialState = {
  isLoading: false,
  error: null,
  success: null,
  provider_data: null,
  services: null,
  bookingRequestDetail: null,
  plans: null,
  getprofileloading: false,
  bookingRequest: null,
  bookingRequestLoader: false,
  paymentMethod: null,
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
      console.log(response, "response");
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to Fetch Plans";
      ErrorToast(msg); // Show error toast
      return thunkAPI.rejectWithValue(msg); // Handle rejection
    }
  }
);

export const getBookingRequest = createAsyncThunk(
  "/provider/booking/requests",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/${_}`);
      console.log(response, "data-item");
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Verification failed"
      );
    }
  }
);
export const getRequestDetail = createAsyncThunk(
  "/provider/requests/4/details",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/${_}`);
      console.log(response, "data-item");
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Verification failed"
      );
    }
  }
);
// RESEND OTP
export const AddCard = createAsyncThunk(
  "/provider/payment-methods",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(payload.url, payload?.payload);
      SuccessToast(response?.data?.message);
      return { success: true, message: response?.data?.message };
    } catch (error) {
      ErrorToast(error.response?.data?.message || "Card Add failed");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Card Add failed"
      );
    }
  }
);
export const RejectBookingRequest = createAsyncThunk(
  "/services/requests/{request_id}/reject",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `/services/requests/${payload?.requestId}/reject`,
        {
          reason: payload?.reason,
        }
      );
      SuccessToast(response?.data?.message);
      return { success: true, message: response?.data?.message };
    } catch (error) {
      ErrorToast(
        error.response?.data?.message || "Booking Request Accept failed"
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Booking Request Accept failed"
      );
    }
  }
);
export const AcceptBookingRequest = createAsyncThunk(
  "/services/requests/1/accept",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`/services/requests/${payload}/accept`);
      SuccessToast(response?.data?.message);
      return { success: true, message: response?.data?.message };
    } catch (error) {
      ErrorToast(
        error.response?.data?.message || "Booking Request Accept failed"
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Booking Request Accept failed"
      );
    }
  }
);
export const MarkStartJob = createAsyncThunk(
  "/bookings/1/action",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`/bookings/${payload?.id}/action`, {
        action: payload?.action,
      });
      SuccessToast(response?.data?.message);
      return { success: true, message: response?.data?.message };
    } catch (error) {
      ErrorToast(
        error.response?.data?.message || "Booking Request Accept failed"
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Booking Request Accept failed"
      );
    }
  }
);
export const getPaymentMethod = createAsyncThunk(
  "/provider/payment-methods/get-card", // The action type
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/provider/payment-methods"); // API request to fetch the profile
      return response.data; // Assuming the API returns the user profile data
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to Fetch Plans";
      ErrorToast(msg); // Show error toast
      return thunkAPI.rejectWithValue(msg); // Handle rejection
    }
  }
);

export const DeletePaymentMethod = createAsyncThunk(
  "/provider/payment-method/{payment_method_id}",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/provider/payment-method/${payload}`
      );
      SuccessToast(response?.data?.message);
      return { success: true, message: response?.data?.message };
    } catch (error) {
      ErrorToast(
        error.response?.data?.message || "Booking Request Accept failed"
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Booking Request Accept failed"
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
        state.plans = action.payload?.payment_methods;
        state.success = "Plans Get Successfully";
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getPaymentMethod.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getPaymentMethod.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentMethod = action.payload;
        state.success = "Payment Method Get Successfully";
      })
      .addCase(getPaymentMethod.rejected, (state, action) => {
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
      // get services
      .addCase(getBookingRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getBookingRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookingRequest = action.payload;
        state.success = "Booking Request Get Successfully";
      })
      .addCase(getBookingRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getRequestDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getRequestDetail.fulfilled, (state, action) => {
        console.log(action.payload, "payload");
        state.isLoading = false;
        state.bookingRequestDetail = action.payload;
        state.success = "Booking Request Detail Get Successfully";
      })
      .addCase(getRequestDetail.rejected, (state, action) => {
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
      })
      .addCase(DeletePaymentMethod.pending, (state) => {
        state.bookingRequestLoader = true;
        state.error = null;
        state.success = null;
      })
      .addCase(DeletePaymentMethod.fulfilled, (state, action) => {
        state.bookingRequestLoader = false;
        state.success = "Delete Successfully";
      })
      .addCase(DeletePaymentMethod.rejected, (state, action) => {
        state.bookingRequestLoader = false;
        state.error = action.payload;
      })
      //Accept Booking Req
      .addCase(AcceptBookingRequest.pending, (state) => {
        state.bookingRequestLoader = true;
        state.error = null;
        state.success = null;
      })
      .addCase(AcceptBookingRequest.fulfilled, (state, action) => {
        state.bookingRequestLoader = false;
        state.success = "Accept Request Successfully";
      })
      .addCase(AcceptBookingRequest.rejected, (state, action) => {
        state.bookingRequestLoader = false;
        state.error = action.payload;
      })
      .addCase(MarkStartJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(MarkStartJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = "Job Start Successfully";
      })
      .addCase(MarkStartJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //Accept Booking Req
      .addCase(RejectBookingRequest.pending, (state) => {
        state.bookingRequestLoader = true;
        state.error = null;
        state.success = null;
      })
      .addCase(RejectBookingRequest.fulfilled, (state, action) => {
        state.bookingRequestLoader = false;
        state.success = "Reject Request Successfully";
      })
      .addCase(RejectBookingRequest.rejected, (state, action) => {
        state.bookingRequestLoader = false;
        state.error = action.payload;
      });
  },
});

export const { resetError, resetProviderState } = providerSlice.actions;
export default providerSlice.reducer;
