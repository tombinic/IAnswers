import { useState, useEffect} from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import SignIn from "layouts/authentication/sign-in";
import Dashboard from "layouts/dashboard";
import SignUp from "layouts/authentication/sign-up";
import Profile from "layouts/profile";
import APIs from "layouts/apis";
import Logout from "layouts/authentication/logout";

import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import routes from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

import brandWhite from "assets/images/logo.png";
import brandDark from "assets/images/logo.png";

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
  const [loaded,setLoaded] = useState(false);

  const [auth, setAuth] = useState({success: (infos==null)?false:infos.success,
                                    email : (infos==null)?"":infos.email,
                                    name: (infos==null)?"":infos.name,
                                    surname:(infos==null)?"":infos.surname,
                                    motto:(infos==null)?"":infos.motto,
                                  });

  const { pathname } = useLocation();

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
      var tmp = {topics: responseText.result, mainTopic:""};
      var tmpActive = JSON.parse(localStorage.getItem('active-topics'));
      var index = (tmpActive==null)?0:tmpActive.index;
      tmpActive = tmp.topics[index];
      tmpActive.index= index;
      localStorage.setItem('topics', JSON.stringify(tmp));
      localStorage.setItem('active-topics', JSON.stringify(tmpActive));
      /*
      if(topicStorage==null){
        localStorage.setItem('topics', JSON.stringify(tmp));
      }
      */
      setLoaded(true);
    })
    .catch((error) => {
        console.error("Error in login API: " + error);
        return null;
    });
  }

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const isLoggedin = () => {
    if(!auth.success){
      return (
      <Routes>
        <Route exact path="/authentication/sign-in" element={<SignIn setAuth={setAuth}/>}></Route>
        <Route exact path="/authentication/sign-up" element={<SignUp setAuth={setAuth} />}></Route>
        <Route  path="*"  element={<Navigate  to="/authentication/sign-in" />}></Route>
      </Routes>
      )
    } else {
      return(
        <Routes>
        <Route exact path="/dashboard" element={ <Dashboard />}></Route>
        <Route exact path="/profile" element={<Profile auth={auth}/>}></Route>
        <Route exact path="/logout" element={ <Logout setAuth={setAuth} />}></Route>
        <Route exact path="/apis" element={ <APIs />}></Route>
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

  if(!loaded){
    console.log("loaded");
    getTopics();
  }

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
