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
  discoverJobs: null,
  billings: null,
  wallet: null,
  transaction: null,
  badges: null,
  widrawData: null,
  getUserProfileDetail: null,
  CalendarBooking: null,
  CurrentBooking: null,
  StartJobLoading: false,
  DailyAvaliablity: null,
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
        error?.response.data?.message || "Verification failed"
      );
    }
  }
);
export const getUserProfile = createAsyncThunk(
  "/user/profile",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/profile?user_id=${_}`);
      return response.data; // Return entire API response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Verification failed"
      );
    }
  }
);

export const getBadges = createAsyncThunk("/badges", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/badges");
    return response.data; // Return entire API response
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error?.response.data?.message || "Verification failed"
    );
  }
});
export const getBillings = createAsyncThunk(
  "/provider/billings",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(_);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Verification failed"
      );
    }
  }
);
export const getTransactions = createAsyncThunk(
  "/provider/transactions",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(_);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Verification failed"
      );
    }
  }
);
export const getWallet = createAsyncThunk(
  "provider/withdrawals",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("provider/withdrawals");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Verification failed"
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
      const msg = error?.response.data?.message || "Failed to Fetch Plans";
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
      return response.data;
    } catch (error) {
      const msg = error?.response.data?.message || "Failed to Services";
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
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Verification failed"
      );
    }
  }
);

export const getCurrentBooking = createAsyncThunk(
  "/provider/current-bookings",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/${_}`);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Verification failed"
      );
    }
  }
);
export const getDiscoverJobs = createAsyncThunk(
  "/provider/discover/jobs",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(_);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Verification failed"
      );
    }
  }
);
export const getFilteredJobs = createAsyncThunk(
  "/filter/jobs",
  async (body, thunkAPI) => {
    try {
      const response = await axios.post("/filter/jobs", body);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Filter request failed"
      );
    }
  }
);

export const getRequestDetail = createAsyncThunk(
  "/provider/requests/4/details",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/${_}`);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Verification failed"
      );
    }
  }
);
export const CancelBookingRequest = createAsyncThunk(
  "/provider/booking/cancel",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("/provider/booking/cancel", payload);
      SuccessToast("Booking Canceled Successfull");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch services");
    }
  }
);
export const ReportAnIssue = createAsyncThunk(
  "/report-issue",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("/report/issue", payload);

      SuccessToast(response?.data?.message || "Report Successfully");

      return { success: true, message: response?.data?.message };
    } catch (error) {
      ErrorToast(error?.response.data?.message || "Report failed");
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Report failed"
      );
    }
  }
);

export const reportUser = createAsyncThunk(
  "report/user",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`/report/${payload?.id}`, {
        reason: payload?.reason,
      });

      SuccessToast(response?.data?.message || "User reported successfully");
      return { success: true, message: response?.data?.message };
    } catch (error) {
      ErrorToast(error?.response.data?.message || "Report failed");
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Report failed"
      );
    }
  }
);
// RESEND OTP
export const AddCard = createAsyncThunk(
  "/payment-methods",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("/payment-methods", payload);
      SuccessToast(response?.data?.message);
      return { success: true, message: response?.data?.message };
    } catch (error) {
      ErrorToast(error?.response.data?.message || "Card Add failed");
      // return thunkAPI.rejectWithValue(
      //   error?.response.data?.message || "Card Add failed"
      // );
    }
  }
);
export const EditStripeCard = createAsyncThunk(
  "/edit/payment-methods",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(payload.url, {
        expiry_month: payload?.expiry_month,
        expiry_year: payload?.expiry_year,
      });
      SuccessToast("Update Card Succefully");
      return { success: true, message: response?.data?.message };
    } catch (error) {
      ErrorToast(error?.response.data?.message || "Card Add failed");
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Card Add failed"
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
        error?.response.data?.message || "Booking Request Accept failed"
      );
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Booking Request Accept failed"
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
        error?.response.data?.message || "Booking Request Accept failed"
      );
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Booking Request Accept failed"
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
        error?.response.data?.message || "Booking Request Accept failed"
      );
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Booking Request Accept failed"
      );
    }
  }
);

export const getPaymentMethod = createAsyncThunk(
  "/payment-methods/get-card", // The action type
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/payment-methods"); // API request to fetch the profile
      return response.data; // Assuming the API returns the user profile data
    } catch (error) {
      const msg = error?.response.data?.message || "Failed to Payment Method";
      ErrorToast(msg); // Show error toast
      return thunkAPI.rejectWithValue(msg); // Handle rejection
    }
  }
);
export const getCalendar = createAsyncThunk(
  "/provider/bookings", // The action type
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `/provider/bookings/monthly?${payload && `month=${payload}`} `
      ); // API request to fetch the profile
      return response.data; // Assuming the API returns the user profile data
    } catch (error) {
      const msg = error?.response.data?.message || "Failed to Calendar";
      ErrorToast(msg); // Show error toast
      return thunkAPI.rejectWithValue(msg); // Handle rejection
    }
  }
);
export const getDailyAvaliablity = createAsyncThunk(
  "/provider/availability", // The action type
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(payload); // API request to fetch the profile
      return response.data; // Assuming the API returns the user profile data
    } catch (error) {
      const msg = error?.response.data?.message || "Failed to Calendar";
      ErrorToast(msg); // Show error toast
      return thunkAPI.rejectWithValue(msg); // Handle rejection
    }
  }
);

export const DeletePaymentMethod = createAsyncThunk(
  "/payment-method/{payment_method_id}",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.delete(`/payment-method/${payload}`);
      SuccessToast(response?.data?.message);
      return { success: true, message: response?.data?.message };
    } catch (error) {
      ErrorToast(
        error?.response.data?.message || "Delete Payment Method failed"
      );
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Delete Payment Method failed"
      );
    }
  }
);
export const DeleteBank = createAsyncThunk(
  "/provider/bank-details/id",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.delete(`/provider/bank-details/${payload}`);
      SuccessToast(response?.data?.message);
      return { success: true, message: response?.data?.message };
    } catch (error) {
      ErrorToast(error?.response.data?.message || "Delete Bank failed");
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Delete Bank failed"
      );
    }
  }
);
export const SubscriptionCancel = createAsyncThunk(
  "/subscriptions/cancel",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`subscriptions/cancel`, payload);
      SuccessToast(response?.data?.message);
      return { success: true, message: response?.data?.message };
    } catch (error) {
      ErrorToast(
        error?.response.data?.message || "Booking Request Accept failed"
      );
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Booking Request Accept failed"
      );
    }
  }
);
export const SubscriptionUpgrade = createAsyncThunk(
  "/plan/subscribe",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`plan/subscribe`, payload);
      SuccessToast(response?.data?.message);
      return { success: true, message: response?.data?.message };
    } catch (error) {
      ErrorToast(
        error?.response.data?.message || "Booking Request Accept failed"
      );
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Booking Request Accept failed"
      );
    }
  }
);
// Bank Details

export const AddBank = createAsyncThunk(
  "/provider/bank-details",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("provider/bank-details", payload);
      SuccessToast(response?.data?.message);
      return { success: true, message: response?.data?.message };
    } catch (error) {
      ErrorToast(error?.response.data?.message || "Bank Add failed");
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Bank Add failed"
      );
    }
  }
);
export const ConnectWithStripeAccount = createAsyncThunk(
  "//provider/connect/onboarding/link",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get("/provider/connect/onboarding/link");
      return { success: true, data: response?.data };
    } catch (error) {
      ErrorToast(error?.response.data?.message || "Bank Add failed");
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "Bank Add failed"
      );
    }
  }
);

export const widrawFunds = createAsyncThunk(
  "/withdrawals",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post("/withdrawals", payload);
      SuccessToast("withdraw Funds Successfully");
      return { success: true, data: response?.data };
    } catch (error) {
      ErrorToast(error?.response.data?.message || "withdraw Funds failed");
      return thunkAPI.rejectWithValue(
        error?.response.data?.message || "withdraw Funds failed"
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
      .addCase(ConnectWithStripeAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(ConnectWithStripeAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        window.open(action.payload.data?.url, "_blank");
      })
      .addCase(ConnectWithStripeAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.getprofileloading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.getprofileloading = false;
        state.getUserProfileDetail = action.payload;
        state.success = action.payload.message;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.getprofileloading = false;
        state.error = action.payload;
      })
      .addCase(getBadges.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getBadges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.badges = action.payload;
        state.success = action.payload.message;
      })
      .addCase(getBadges.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCalendar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getCalendar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.CalendarBooking = action.payload;
        state.success = action.payload.message;
      })
      .addCase(getCalendar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getDailyAvaliablity.pending, (state) => {
        state.bookingRequestLoader = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getDailyAvaliablity.fulfilled, (state, action) => {
        state.bookingRequestLoader = false;
        state.DailyAvaliablity = action.payload;
        state.success = action.payload.message;
      })
      .addCase(getDailyAvaliablity.rejected, (state, action) => {
        state.bookingRequestLoader = false;
        state.error = action.payload;
      })
      .addCase(ReportAnIssue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(ReportAnIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.badges = action.payload;
        state.success = action.payload.message;
      })
      .addCase(reportUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(reportUser.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(reportUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(ReportAnIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Provider Plans
      .addCase(getBillings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getBillings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.billings = action.payload;
        state.success = "Billings Get Successfully";
      })
      .addCase(getBillings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getWallet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wallet = action.payload;
        state.success = "Wallet Get Successfully";
      })
      .addCase(getWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getPlans.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.plans = action.payload?.data;
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
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transaction = action.payload;
        state.success = "Transactions Get Successfully";
      })
      .addCase(getTransactions.rejected, (state, action) => {
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
      .addCase(getCurrentBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getCurrentBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.CurrentBooking = action.payload;
        state.success = "Booking Get Successfully";
      })
      .addCase(getCurrentBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Booking Cancel
      .addCase(CancelBookingRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(CancelBookingRequest.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(CancelBookingRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getRequestDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getRequestDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookingRequestDetail = action.payload;
        state.success = "Booking Request Detail Get Successfully";
      })
      .addCase(getRequestDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getDiscoverJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getDiscoverJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discoverJobs = action.payload;
        state.success = "Discover Jobs Get Successfully";
      })
      .addCase(getDiscoverJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getFilteredJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getFilteredJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discoverJobs = action.payload;
        state.success = "Filtered Discover Jobs Get Successfully";
      })
      .addCase(getFilteredJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //Add Card
      .addCase(AddBank.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(AddBank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = "Bank Add Successfully";
      })
      .addCase(AddBank.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(widrawFunds.pending, (state) => {
        state.bookingRequestLoader = true;
        state.error = null;
        state.success = null;
      })
      .addCase(widrawFunds.fulfilled, (state, action) => {
        state.bookingRequestLoader = false;
        state.widrawData = action?.payload?.data;
        state.success = "withdraw Funds Successfully";
      })
      .addCase(widrawFunds.rejected, (state, action) => {
        state.bookingRequestLoader = false;
        state.error = action.payload;
      })
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
      .addCase(EditStripeCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(EditStripeCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = "Card Edit Successfully";
      })
      .addCase(EditStripeCard.rejected, (state, action) => {
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
      .addCase(DeleteBank.pending, (state) => {
        state.StartJobLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(DeleteBank.fulfilled, (state, action) => {
        state.StartJobLoading = false;
        state.success = "Delete Successfully";
      })
      .addCase(DeleteBank.rejected, (state, action) => {
        state.StartJobLoading = false;
        state.error = action.payload;
      })
      .addCase(SubscriptionCancel.pending, (state) => {
        state.bookingRequestLoader = true;
        state.error = null;
        state.success = null;
      })
      .addCase(SubscriptionCancel.fulfilled, (state, action) => {
        state.bookingRequestLoader = false;
        state.success = "Cancel Successfully";
      })
      .addCase(SubscriptionCancel.rejected, (state, action) => {
        state.bookingRequestLoader = false;
        state.error = action.payload;
      })
      .addCase(SubscriptionUpgrade.pending, (state) => {
        state.bookingRequestLoader = true;
        state.error = null;
        state.success = null;
      })
      .addCase(SubscriptionUpgrade.fulfilled, (state, action) => {
        state.bookingRequestLoader = false;
        state.success = "Subscription Upgrade Successfully";
      })
      .addCase(SubscriptionUpgrade.rejected, (state, action) => {
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
        state.StartJobLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(MarkStartJob.fulfilled, (state, action) => {
        state.StartJobLoading = false;
        state.success = "Job Start Successfully";
      })
      .addCase(MarkStartJob.rejected, (state, action) => {
        state.StartJobLoading = false;
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
