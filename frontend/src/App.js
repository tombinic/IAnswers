/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect} from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import SignIn from "layouts/authentication/sign-in";
import Dashboard from "layouts/dashboard";
import SignUp from "layouts/authentication/sign-up";
import Profile from "layouts/profile";
import Tables from "layouts/tables";

// ToDo - togliere
import Logout from "layouts/authentication/logout";


// Material Dashboard 2 React themes
import theme from "assets/theme";


// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";



// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

// COntext

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const infos = JSON.parse(localStorage.getItem('auth'));

  const [auth, setAuth] = useState({success: (infos==null)?false:infos.success,
                                    email : (infos==null)?"":infos.email,
                                    name: (infos==null)?"":infos.name,
                                    surname:(infos==null)?"":infos.surname
                                  });

  const [topics, setTopics] = useState(null);

  const getTopics = () => {
    fetch('http://localhost:3005/topics',
    {
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       method: 'POST',
       credentials: 'same-origin',
       body: JSON.stringify({})
    })
    .then((response) => response.text())
    .then((responseText) => {
      responseText = JSON.parse(responseText);
      setTopics({topics: responseText.result, mainTopic: (auth.success)?(topics === null)?"":(topics.mainTopic):responseText.result[0]});
    })
    .catch((error) => {
        console.error("Error in login API: " + error);
        return null;
    });
    }

    getTopics();

  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);


  // Function called to force route to SignIn in case of not precedent logIn
  const isLoggedin = () => {

    if(!auth.success){
      return (
      <Routes>
        <Route exact path="/authentication/sign-in" element={<SignIn setAuth={setAuth}/>}></Route>
        <Route exact path="/authentication/sign-up" element={<SignUp setAuth={setAuth} />}></Route>
        <Route  path="*"  element={<Navigate  to="/authentication/sign-in" />}></Route>
      </Routes>
      )
    }else{

      return(
        <Routes>
        <Route exact path="/dashboard" element={ <Dashboard topics={topics} setTopics={setTopics}/>}></Route>
        <Route exact path="/profile" element={<Profile auth={auth}/>}></Route>
        <Route exact path="/logout" element={ <Logout setAuth={setAuth} />}></Route>
        <Route exact path="/tables" element={ <Tables />}></Route>
        <Route path="*" element={<Navigate  to="/dashboard" />}></Route>
        </Routes>
      )
    }
  }

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="IAnswers"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}

        </>
      )}
      {layout === "vr" && <Configurator />}
      {isLoggedin()}


    </ThemeProvider>
  );
}
