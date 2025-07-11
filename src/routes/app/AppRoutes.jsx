import Home from "../../pages/app/Home";
import Bookingdetails from "../../pages/app/LandingPage/Bookingdetails";
import Serviceprovider from "../../pages/app/LandingPage/Serviceprovider";

export const appRoutes = [

    {
        url: "home",
        page: <Home />,
        name: "Home",
        isPublic: true,
    },
    {
        url: "service-provider",
        page: <Serviceprovider/>,
        name: "Service provider",
        isPublic: true,
    },
    {
        url: "booking-details",
        page: <Bookingdetails/>,
        name: "Booking details",
        isPublic: true,
    }
]