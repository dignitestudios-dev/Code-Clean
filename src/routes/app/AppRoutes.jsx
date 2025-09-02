import BroadCastBookingDetail from "../../components/app/Profile/BroadCastBookingDetail";
import EditCard from "../../components/app/Settings/EditCard";
import PaymentMethod from "../../components/app/Settings/PaymentMethod";
import Chat from "../../pages/app/Chat/Chat";
import Home from "../../pages/app/Home";
import Bookingdetails from "../../pages/app/LandingPage/Bookingdetails";
import Bookinghistory from "../../pages/app/LandingPage/Bookinghistory";
import Bookingsrequests from "../../pages/app/LandingPage/Bookingsrequests";
import Custombooking from "../../pages/app/LandingPage/Custombooking";
import Favorites from "../../pages/app/LandingPage/Favorites";
import Serviceprovider from "../../pages/app/LandingPage/Serviceprovider";
import Profile from "../../pages/app/Profile/Profile";
import Settings from "../../pages/app/Settings/Settings";
import SettingAddCard from "../../pages/app/Settings/SettingAddCard";

export const appRoutes = [
  {
    url: "home",
    page: <Home />,
    name: "Home",
    isPublic: true,
  },
  {
    url: "service-provider",
    page: <Serviceprovider />,
    name: "Service provider",
    isPublic: true,
  },
  {
    url: "booking-details",
    page: <Bookingdetails />,
    name: "Booking details",
    isPublic: true,
  },
  {
    url: "messages",
    page: <Chat />,
    name: "Chat",
    isPublic: true,
  },
  {
    url: "app/profile",
    page: <Profile />,
    name: "Profile",
    isPublic: true,
  },
  {
    url: "app/settings",
    page: <Settings />,
    name: "Settings",
    isPublic: true,
  },
  {
    url: "app/create-card",
    page: <SettingAddCard />,

    name: "Create Card",
    isPublic: true,
  },
  {
    url: "app/edit-card",
    page: <EditCard />,
    name: "Edit Card",
    isPublic: true,
  },
  {
    url: "app/payment-method",
    page: <PaymentMethod />,
    name: "Payment Method",
    isPublic: true,
  },
  {
    url: "service-detail/:id",
    page: <BroadCastBookingDetail />,
    name: "Service Detail",
    isPublic: true,
  },
  {
    url: "custom-booking-details",
    page: <Custombooking />,
    name: "Custom Booking details",
    isPublic: true,
  },
  {
    url: "favorites",
    page: <Favorites />,
    name: "Favorites",
    isPublic: true,
  },
  {
    url: "booking-history",
    page: <Bookinghistory />,
    name: "Bookinghistory",
    isPublic: true,
  },
  {
    url: "booking-requests",
    page: <Bookingsrequests />,
    name: "Bookings Requests",
    isPublic: true,
  },
];
