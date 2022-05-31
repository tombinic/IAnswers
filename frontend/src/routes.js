import Dashboard from "layouts/dashboard";
import Tables from "layouts/apis";
import Profile from "layouts/profile";
import Logout from "layouts/authentication/logout";
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "APIs",
    key: "apis",
    icon: <Icon fontSize="small">Api</Icon>,
    route: "/apis",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Log out",
    key: "Log out",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
    component: <Logout />,
  },
];

export default routes;
