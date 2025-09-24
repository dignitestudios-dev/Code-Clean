import AppointmentCalendar from "../../components/Serviceprovider/Appointment/Calendar";
import DiscoverDetail from "../../components/Serviceprovider/Discover/DiscoverDetail";
import DiscoverJobs from "../../components/Serviceprovider/Discover/DiscoverJobs";
import Dashboard from "../../pages/app/Serviceprovider/Dashboard";
import Subscription from "../../pages/app/Settings/Subscription";
import Jobdetails from "../../pages/app/Serviceprovider/Jobdetails";
import Userprovider from "../../pages/app/Serviceprovider/Userprovider";
import Wallet from "../../pages/app/Serviceprovider/Wallet";
import ServiceproviderProfile from "../../pages/app/Serviceprovider/ServiceProviderProfile";
import ChatSP from "../../pages/app/Serviceprovider/ChatSP";
import Badgesp from "../../pages/app/Serviceprovider/Badgesp";
import DiscoverJobDetail from "../../pages/app/Serviceprovider/DiscoverJobDetail";

export const serviceproviderRoutes = [
  {
    url: "dashboard",
    page: <Dashboard />,
    name: "Dashboard",
    isPublic: false,
  },
  {
    url: "calendar",
    page: <AppointmentCalendar />,
    name: "Appointment Calendar",
    isPublic: false,
  },
  {
    url: "discover-job",
    page: <DiscoverJobs />,
    name: "Discover Jobs",
    isPublic: false,
  },
  {
    url: "discover-detail/:id",
    page: <DiscoverDetail />,
    name: "Discover Detail",
    isPublic: false,
  },
  {
    url: "app/subscription",
    page: <Subscription />,
    name: "Subscription",
    isPublic: false,
  },
  {
    url: "job-details",
    page: <Jobdetails />,
    name: "Job Details",
    isPublic: false,
  },
  {
    url: "discover-job-details",
    page: <DiscoverJobDetail />,
    name: "Job Details",
    isPublic: false,
  },
  {
    url: "user-provider/:id",
    page: <Userprovider />,
    name: "User Provider",
    isPublic: false,
  },
  {
    url: "wallet",
    page: <Wallet />,
    name: "User Provider",
    isPublic: false,
  },
  {
    url: "provider-profile",
    page: <ServiceproviderProfile />,
    name: "Provider Profile",
    isPublic: false,
  },
   {
    url: "chat-sp",
    page: <ChatSP />,
    name: "Chat",
    isPublic: false,
  },
     {
    url: "badge-sp",
    page: <Badgesp />,
    name: "Badge-Sp",
    isPublic: false,
  },
];
