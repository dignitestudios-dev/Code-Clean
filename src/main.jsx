import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router"; // Use `react-router-dom` instead of `react-router`
import { ToasterContainer } from "./components/global/Toaster.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // Import the store from your redux store file
import { LoadScript } from "@react-google-maps/api";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {" "}
        <LoadScript
          googleMapsApiKey="AIzaSyCkfrN8GHu0s3I_mL4MHJA62c7p54t3kYg"
          libraries={["places"]}
        >
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENTID}
          >
            <App />
          </GoogleOAuthProvider>
        </LoadScript>
      </Provider>
      <ToasterContainer /> {/* Toaster for global notifications */}
    </BrowserRouter>
  </StrictMode>
);
