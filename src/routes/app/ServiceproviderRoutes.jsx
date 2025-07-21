import AppointmentCalendar from "../../components/Serviceprovider/Appointment/Calendar";
import DiscoverDetail from "../../components/Serviceprovider/Discover/DiscoverDetail";
import DiscoverJobs from "../../components/Serviceprovider/Discover/DiscoverJobs";
import Dashboard from "../../pages/app/Serviceprovider/Dashboard";
import Subscription from "../../pages/app/Settings/Subscription";
import Jobdetails from "../../pages/app/Serviceprovider/Jobdetails";
import Userprovider from "../../pages/app/Serviceprovider/Userprovider";
import Wallet from "../../pages/app/Serviceprovider/Wallet";
import ServiceproviderProfile from "../../pages/app/Serviceprovider/ServiceProviderProfile";

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
  {
    url: "job-details",
    page: <Jobdetails />,
    name: "Job Details",
    isPublic: true,
  },
  {
    url: "user-provider",
    page: <Userprovider />,
    name: "User Provider",
    isPublic: true,
  },
  {
    url: "wallet",
    page: <Wallet />,
    name: "User Provider",
    isPublic: true,
  },
  {
    url: "provider-profile",
    page: <ServiceproviderProfile />,
    name: "Provider Profile",
    isPublic: true,
  },
];
