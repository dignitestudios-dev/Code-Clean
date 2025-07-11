import { Route, Routes } from "react-router";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import DummyHome from "./pages/app/DummyHome";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/authentication/Login";
import Forget from "./pages/authentication/Forget";
import Mail from "./pages/authentication/Mail";
import ResetPassword from "./pages/authentication/ResetPassword";
import PasswordUpdate from "./pages/authentication/PasswordUpdated";
import SignUp from "./pages/onboarding/SignUp";
import LandingPage from "./pages/app/LandingPage/LandingPage";
import { Navigate } from "react-router";
import Badge from "./pages/app/Badges/Badge";
import RoleSelection from "./pages/onboarding/RoleSelection";
import { appRoutes } from "./routes/app/AppRoutes";
import '@fontsource/inter/400.css'; // or 500, 600, etc.
import '@fontsource/inter/500.css'; // or 500, 600, etc.
import '@fontsource/inter/600.css'; // or 500, 600, etc.
import '@fontsource/inter/100.css'; // or 500, 600, etc.
import '@fontsource/inter/200.css'; // or 500, 600, etc.

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/app/landing"} />} />

    
      <Route path="app" element={<DashboardLayout />}>
           <Route path="landing" element={<LandingPage />} />
        <Route path="badge" element={<Badge />} />
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="role-selection" element={<RoleSelection />} />
      </Route>

      <Route path="">
        {appRoutes?.map((Link , i) => (
          <Route path={Link.url} key={i} element={Link.page} />
        ))}
      </Route>

      <Route path="auth" element={<AuthLayout />}>
       <Route path="role-selection" element={<RoleSelection />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<Forget />} />
        <Route path="email-verify" element={<Mail />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="password-updated" element={<PasswordUpdate />} />
      </Route>

      <Route
        path="*"
        element={<div className="text-7xl">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
