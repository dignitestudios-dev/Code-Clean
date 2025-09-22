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
import Bookingrequestuser from "../../pages/app/LandingPage/Bookingrequestuser";

export const appRoutes = [
  {
    url: "home",
    page: <Home />,
    name: "Home",
    isPublic: false,
  },
  {
    url: "service-provider",
    page: <Serviceprovider />,
    name: "Service provider",
    isPublic: false,
  },
  {
    url: "booking-details",
    page: <Bookingdetails />,
    name: "Booking details",
    isPublic: false,
  },
   {
    url: "booking-request",
    page: <Bookingrequestuser />,
    name: "Booking details",
    isPublic: false,
  },
  {
    url: "messages",
    page: <Chat />,
    name: "Chat",
    isPublic: false,
  },
  {
    url: "app/profile",
    page: <Profile />,
    name: "Profile",
    isPublic: false,
  },
  {
    url: "app/settings",
    page: <Settings />,
    name: "Settings",
    isPublic: false,
  },
  {
    url: "app/create-card",
    page: <SettingAddCard />,

    name: "Create Card",
    isPublic: false,
  },
  {
    url: "app/edit-card",
    page: <EditCard />,
    name: "Edit Card",
    isPublic: false,
  },
  {
    url: "app/payment-method",
    page: <PaymentMethod />,
    name: "Payment Method",
    isPublic: false,
  },
  {
    url: "service-detail/:id",
    page: <BroadCastBookingDetail />,
    name: "Service Detail",
    isPublic: false,
  },
  {
    url: "custom-booking-details",
    page: <Custombooking />,
    name: "Custom Booking details",
    isPublic: false,
  },
  {
    url: "favorites",
    page: <Favorites />,
    name: "Favorites",
    isPublic: false,
  },
  {
    url: "booking-history",
    page: <Bookinghistory />,
    name: "Bookinghistory",
    isPublic: false,
  },
  {
    url: "booking-requests",
    page: <Bookingsrequests />,
    name: "Bookings Requests",
    isPublic: false,
  },
];
