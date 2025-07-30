import axios from "axios";
import { ErrorToast } from "./components/global/Toaster"; // Import your toaster functions
import Cookies from "js-cookie";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

// Set the base URL
export const baseUrl = "https://closing-neatly-doberman.ngrok-free.app/api";

// Function to get the device fingerprint asynchronously
async function getDeviceFingerprint() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId; // Unique device ID
}

// Create axios instance
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000, // Timeout set to 10 seconds
});

// Request interceptor
instance.interceptors.request.use(
  async (request) => {
    const token = Cookies.get("token");

    if (!navigator.onLine) {
      // No internet connection
      ErrorToast(
        "No internet connection. Please check your network and try again."
      );
      return Promise.reject(new Error("No internet connection"));
    }

    // Get device fingerprint asynchronously
    const fingerprint = await getDeviceFingerprint();

    // Merge existing headers with token and fingerprint
    request.headers = {
      ...request.headers, // Keep existing headers
      Accept: "application/json, text/plain, */*",
      devicemodel: fingerprint,
      deviceuniqueid: fingerprint,
      ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization header only if token exists
    };

    return request;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      // Slow internet or request timeout
      ErrorToast("Your internet connection is slow. Please try again.");
    }

    if (error.response && error.response.status === 401) {
      // Unauthorized error (401)
      Cookies.remove("token");
      Cookies.remove("user");
      ErrorToast("Session expired. Please relogin");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default instance;
