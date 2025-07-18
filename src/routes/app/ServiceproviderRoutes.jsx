import AppointmentCalendar from "../../components/Serviceprovider/Appointment/Calendar";
import DiscoverDetail from "../../components/Serviceprovider/Discover/DiscoverDetail";
import DiscoverJobs from "../../components/Serviceprovider/Discover/DiscoverJobs";
import Dashboard from "../../pages/app/Serviceprovider/Dashboard";
import Subscription from "../../pages/app/Settings/Subscription";


export const serviceproviderRoutes = [

    {
        url: "dashboard",
        page: <Dashboard />,
        name: "Dashboard",
        isPublic: true,
    },
    {
        url: "calendar",
        page: <AppointmentCalendar />,
        name: "Appointment Calendar",
        isPublic: true,
    },
    {
        url: "discover-job",
        page: <DiscoverJobs />,
        name: "Discover Jobs",
        isPublic: true,
    },
    {
        url: "discover-detail/:id",
        page: <DiscoverDetail />,
        name: "Discover Detail",
        isPublic: true,
    },
    {
        url: "app/subscription",
        page: <Subscription />,
        name: "Subscription",
        isPublic: true,
    },
   
]