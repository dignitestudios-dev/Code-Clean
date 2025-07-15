import BroadCastBookingDetail from "../../components/app/Profile/BroadCastBookingDetail";
import Chat from "../../pages/app/Chat/Chat";
import Home from "../../pages/app/Home";
import Bookingdetails from "../../pages/app/LandingPage/Bookingdetails";
import Bookinghistory from "../../pages/app/LandingPage/Bookinghistory";
import Custombooking from "../../pages/app/LandingPage/Custombooking";
import Favorites from "../../pages/app/LandingPage/favorites";
import Serviceprovider from "../../pages/app/LandingPage/Serviceprovider";
import Profile from "../../pages/app/Profile/Profile";

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
        url: "chat",
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
    }
]