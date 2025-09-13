// src/store/slices/user.slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";

// ================= INITIAL STATE =================
const initialState = {
  isLoading: false,
  userProfile: null,
  allservices: null,
  currentbookingdata: null,
  error: null,
  success: null,
  updateLoading: false,
  updateError: null,
  updateSuccess: null,
  allservicesloading: false,
  allserviceserror: null,
  allservicessuccess: null,
  currentbookingSucess: null,
  currentbookingerror: null,
  currentbookingLoading: false,
  bookinghistorydata: null,
  bookinghistorysuccess: null,
  bookinghistoryerror: null,
  bookinghistoryLoading: false,
  requestbookingsuccess: null,
  requestbookingerror: null,
  requestbookingLoading: false,
  requestbookingdata: null,
  hireProviderLoading: false,
  hireProviderSuccess: null,
  hireProviderError: null,
  CustomserviceproviderLoading: false,
  CustomserviceproviderError: null,
  CustomserviceproviderSuccess: null,
  paymentMethoduser: null,
  favoritesSuccess: null,
  favoritesLoading: false,
  favoritesError: null,
  bookingDetail: null,
};
// ================= THUNKS =================

// Hire Now Service Provider with optional userId
export const HireServiceProvider = createAsyncThunk(
  "/provider/requests/private", // Action type
  async (payload, thunkAPI) => {
    try {
      const { userId, providerData } = payload;

      // Agar userId hai to URL mein lagao, warna base endpoint use karo
      const endpoint = userId
        ? `/provider/requests/private/${userId}`
        : `/provider/requests/custom`;

      const res = await axios.post(endpoint, providerData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to submit provider data");
    }
  }
);

// Hire Now Service Provider with dynamic user ID in the URL and data in the body
export const RequestCustomService = createAsyncThunk(
  "/provider/requests/custom", // Action type
  async (payload, thunkAPI) => {
    try {
      const { customserviceData } = payload; // Destructure userId and providerData from payload
      // Sending the userId in the URL and providerData in the request body
      const res = await axios.post(
        `/provider/requests/custom`,
        customserviceData
      );
      // Return the response data after submission
      return res.data;
    } catch (error) {
      // Reject the promise with a custom error message
      return thunkAPI.rejectWithValue("Failed to submit provider data");
    }
  }
);

//Get Payment Method
export const getPaymentMethoduser = createAsyncThunk(
  "/payment-methods", // The action type
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/payment-methods"); // API request to fetch the profile
      return response.data; // Assuming the API returns the user profile data
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Failed to Get Payment Method of User";
      ErrorToast(msg); // Show error toast
      return thunkAPI.rejectWithValue(msg); // Handle rejection
    }
  }
);

// Fetch user profile
// export const fetchUserProfile = createAsyncThunk(
//   "/profile",
//   async (_, thunkAPI) => {
//     try {
//       const res = await axios.get("/profile");
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Failed to fetch profile");
//     }
//   }
// );

// Fetch user profile — page/per_page optional; agar na do to plain /profile hit hoga
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (args, thunkAPI) => {
    try {
      const hasPaging =
        args &&
        (typeof args.page !== 'undefined' || typeof args.per_page !== 'undefined');

      const config = { signal: thunkAPI.signal };

      if (hasPaging) {
        config.params = {};
        if (typeof args.page !== 'undefined') config.params.page = args.page;
        if (typeof args.per_page !== 'undefined') config.params.per_page = args.per_page;
      }

      // If hasPaging=false => no params sent (pure /profile)
      const res = await axios.get('/profile', config);
      return res.data;
    } catch (error) {
      if (axios.isCancel?.(error)) {
        return thunkAPI.rejectWithValue('Request cancelled');
      }
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error?.message || 'Failed to fetch profile'
      );
    }
  }
);


//Get Payment getuserfavorites
export const getuserfavorites = createAsyncThunk(
  "/user/favorites", // The action type
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/user/favorites");
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to Get Favorites";
      ErrorToast(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

//Get Payment getuserfavorites
export const unfavoriteProvider = createAsyncThunk(
  "user/unfavoriteProvider",
  async (providerId, { rejectWithValue }) => {
    try {
      // Try the canonical DELETE first
      const res = await axios.delete(`/providers/${providerId}/favorite`);

      // Some APIs return 204 No Content, others include a body
      const data = res?.data ?? {};
      const serverMsg =
        data?.message ||
        // nice default if server is silent
        "Your favorite has been removed successfully.";

      // Prefer an explicit boolean if the API provides it
      const isFavorite =
        typeof data?.is_favorite === "boolean"
          ? data.is_favorite
          : false; // DELETE should mean not favorite

      return {
        providerId,
        message: serverMsg,
        isFavorite,
        raw: data,
      };
    } catch (err) {
      // Fallback for backends that toggle via POST
      try {
        const res = await axios.post(`/providers/${providerId}/favorite`, {
          action: "unfavorite",
        });

        const data = res?.data ?? {};
        // Some buggy APIs send the wrong text ("added"). Guard with is_favorite if present.
        const serverMsg = data?.message;
        const isFavorite =
          typeof data?.is_favorite === "boolean" ? data.is_favorite : false;

        const normalizedMsg =
          isFavorite === false
            ? serverMsg || "Your favorite has been removed successfully."
            : // if server says it's still favorite, force a sane message
            "Your favorite has been removed successfully.";

        return {
          providerId,
          message: normalizedMsg,
          isFavorite,
          raw: data,
        };
      } catch (err2) {
        const apiMsg =
          err2?.response?.data?.message ||
          err?.response?.data?.message ||
          "Failed to remove favorite";
        return rejectWithValue({ providerId, message: apiMsg });
      }
    }
  }
);

//Fetch Current Booking
export const fetchCurrentBooking = createAsyncThunk(
  "/user/current-bookings",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/user/current-bookings");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch profile");
    }
  }
);

//Fetch Current Booking
export const fetchBookingRequest = createAsyncThunk(
  "/user/booking/requests",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/user/booking/requests");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch profile");
    }
  }
);
export const fetchBookingDetail = createAsyncThunk(
  "/user/bookings/2/details",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`/user/bookings/${_}/details`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch profile");
    }
  }
);

//Fetch Booking History
export const fetchBookinghistory = createAsyncThunk(
  "/user/booking-history",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/user/booking-history");
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
export const CancelBookingRequest = createAsyncThunk(
  "/user/booking/cancel",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("/user/booking/cancel", payload);
      SuccessToast("Booking Canceled Successfull");
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
      const isFormData =
        typeof FormData !== "undefined" && payload instanceof FormData;

      const res = await axios.post("/user/profile", payload, {
        headers: isFormData
          ? { "Content-Type": "multipart/form-data" }
          : undefined,
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

// Change Password
export const changePassword = createAsyncThunk(
  "/user/update-password", // Action type
  async (payload, thunkAPI) => {
    try {
      // payload = { old_password, password, password_confirmation }
      const res = await axios.post("/update-password", payload);

      // success toast
      SuccessToast("Password updated successfully!");

      return res.data;
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to update password";
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

      .addCase(changePassword.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateSuccess = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = "Password updated successfully!";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
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

      // ----- Fetch all Current Booking -----
      .addCase(fetchCurrentBooking.pending, (state) => {
        state.currentbookingLoading = true;
        state.currentbookingerror = null;
        state.currentbookingSucess = null;
      })
      .addCase(fetchCurrentBooking.fulfilled, (state, action) => {
        state.currentbookingLoading = false;
        state.currentbookingdata = action.payload;
        state.currentbookingSucess = "Successfully fetched Current Booking!";
      })
      .addCase(fetchCurrentBooking.rejected, (state, action) => {
        state.currentbookingLoading = false;
        state.currentbookingerror = action.payload;
      })
      // ----- Fetch Booking Detail---
      .addCase(fetchBookingDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchBookingDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookingDetail = action.payload;
      })
      .addCase(fetchBookingDetail.rejected, (state, action) => {
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
      //Get payment Method for user
      .addCase(getPaymentMethoduser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(getPaymentMethoduser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentMethoduser = action.payload;
        state.success = "Payment Method Get Successfully";
      })
      .addCase(getPaymentMethoduser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ----- Fetch all Current Booking -----
      .addCase(fetchBookingRequest.pending, (state) => {
        state.requestbookingLoading = true;
        state.requestbookingerror = null;
        state.requestbookingsuccess = null;
      })
      .addCase(fetchBookingRequest.fulfilled, (state, action) => {
        state.requestbookingLoading = false;
        state.requestbookingdata = action.payload;
        state.requestbookingsuccess = "Successfully fetched Booking History!";
      })
      .addCase(fetchBookingRequest.rejected, (state, action) => {
        state.requestbookingLoading = false;
        state.requestbookingerror = action.payload;
      })

      // ----- Fetch all Current Booking -----
      .addCase(fetchBookinghistory.pending, (state) => {
        state.bookinghistoryLoading = true;
        state.bookinghistoryerror = null;
        state.bookinghistorysuccess = null;
      })
      .addCase(fetchBookinghistory.fulfilled, (state, action) => {
        state.bookinghistoryLoading = false;
        state.bookinghistorydata = action.payload;
        state.bookinghistorysuccess = "Successfully fetched Booking History!";
      })
      .addCase(fetchBookinghistory.rejected, (state, action) => {
        state.bookinghistoryLoading = false;
        state.bookinghistoryerror = action.payload;
      })

      // ----- Fetch all Favorites -----
      .addCase(getuserfavorites.pending, (state) => {
        state.favoritesLoading = true;
        state.favoritesError = null;
        state.favoritesSuccess = null;
      })
      .addCase(getuserfavorites.fulfilled, (state, action) => {
        state.favoritesLoading = false;
        state.favoritesData = action.payload;
        state.favoritesSuccess = "Successfully fetched favoritesData";
      })
      .addCase(getuserfavorites.rejected, (state, action) => {
        state.favoritesLoading = false;
        state.favoritesError = action.payload;
      })

      // ----- Unfavorite Provider -----
      .addCase(unfavoriteProvider.pending, (state) => {
        state.favoritesError = null;
      })
      .addCase(unfavoriteProvider.fulfilled, (state, action) => {
        const { providerId, message } = action.payload || {};

        if (providerId != null) {
          state.favoritesData = (state.favoritesData || []).filter(p => p.id !== providerId);
        }

        state.favoritesSuccess = message || "Your favorite has been removed successfully.";
        SuccessToast(state.favoritesSuccess);
      })
      .addCase(unfavoriteProvider.rejected, (state, action) => {
        const msg =
          action.payload?.message ||
          action.error?.message ||
          "Failed to remove favorite";
        state.favoritesError = msg;
        ErrorToast(msg);
      })


      .addCase(HireServiceProvider.pending, (state) => {
        state.hireProviderLoading = true;
        state.hireProviderSuccess = null;
        state.hireProviderError = null;
      })
    .addCase(HireServiceProvider.fulfilled, (state, action) => {
      state.hireProviderLoading = false;
      state.hireProviderSuccess = "Service provider hired successfully!";
      SuccessToast(state.hireProviderSuccess);
    })
    .addCase(HireServiceProvider.rejected, (state, action) => {
      state.hireProviderLoading = false;
      state.hireProviderError = action.payload;
      ErrorToast(state.hireProviderError);
    })

    //Custom Service Data
    .addCase(RequestCustomService.pending, (state) => {
      state.CustomserviceproviderLoading = true;
      state.CustomserviceproviderSuccess = null;
      state.CustomserviceproviderError = null;
    })
    .addCase(RequestCustomService.fulfilled, (state, action) => {
      state.CustomserviceproviderLoading = false;
      state.CustomserviceproviderSuccess =
        "Custom Service provider hired successfully!";
      SuccessToast(state.CustomserviceproviderSuccess);
    })
    .addCase(RequestCustomService.rejected, (state, action) => {
      state.CustomserviceproviderLoading = false;
      state.CustomserviceproviderError = action.payload;
      ErrorToast(state.CustomserviceproviderError);
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
