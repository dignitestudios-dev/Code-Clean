import Dashboard from "../../pages/app/Serviceprovider/Dashboard";
import Jobdetails from "../../pages/app/Serviceprovider/Jobdetails";
import Userprovider from "../../pages/app/Serviceprovider/Userprovider";
import Wallet from "../../pages/app/Serviceprovider/Wallet";


export const serviceproviderRoutes = [

    {
        url: "dashboard",
        page: <Dashboard />,
        name: "Dashboard",
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
   
]