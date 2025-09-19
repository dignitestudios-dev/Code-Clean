import axios from "axios";
import { ErrorToast } from "./components/global/Toaster";
import Cookies from "js-cookie";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
 
export const baseUrl = "https://api.codecleanpros.com/api";
 
async function getDeviceFingerprint() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
}
 
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  // If your API uses cookies (not just Bearer), enable this:
  // withCredentials: true,
});
 
// ✅ Add this header globally (works for Ngrok warning page)
instance.defaults.headers.common["ngrok-skip-browser-warning"] = "true";
 
instance.interceptors.request.use(
  async (request) => {
    const token = Cookies.get("access_token");
    if (!navigator.onLine) {
      ErrorToast("No internet connection. Please check your network and try again.");
      return Promise.reject(new Error("No internet connection"));
    }
 
    const fingerprint = await getDeviceFingerprint();
 
    request.headers = {
      ...request.headers,
      Accept: "application/json, text/plain, */*",
      devicemodel: fingerprint,
      deviceuniqueid: fingerprint,
      ...(token && { Authorization: `Bearer ${token}` }),
      // (Optional) keep header here too in case something overwrites defaults:
      "ngrok-skip-browser-warning": "true",
    };
 
    return request;
  },
  (error) => Promise.reject(error)
);
 
instance.interceptors.response.use(
  (response) => {
    // (Optional) safety net: ensure we actually got JSON, not the Ngrok HTML
    const ct = response.headers?.["content-type"] || "";
    if (!ct.includes("application/json")) {
      // This helps you catch silent 200/HTML cases
      return Promise.reject(new Error("Unexpected response from tunnel (HTML instead of JSON)."));
    }
    return response;
  },
  (error) => {
    if (error.code === "ECONNABORTED") {
      ErrorToast("Your internet connection is slow. Please try again.");
    }
    if (error.response?.status === 401) {
      Cookies.remove("token");
      Cookies.remove("user");
      ErrorToast("Session expired. Please relogin");
      // window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
 
export default instance;