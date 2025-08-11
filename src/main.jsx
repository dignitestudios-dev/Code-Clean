import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router"; // Use `react-router-dom` instead of `react-router`
import { ToasterContainer } from "./components/global/Toaster.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // Import the store from your redux store file

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>  {/* Provide the store to the entire app */}
        <App />
      </Provider>
      <ToasterContainer /> {/* Toaster for global notifications */}
    </BrowserRouter>
  </StrictMode>
);
