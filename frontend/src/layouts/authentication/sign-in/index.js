import { useState,createContext, useContext, forwardRef} from "react";
import { sha3_512 } from 'js-sha3';
import { Link , Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import BasicLayout from "layouts/authentication/components/BasicLayout";

import bgImage from "assets/images/bg.gif";

const Basic = forwardRef(( { setAuth }, ref) => {
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);
  const [pw, setPw] = useState(null);
  const [email, setEmail] = useState(null);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleOnLogin = (e) => {
    let hash = sha3_512(pw);

    e.preventDefault();
    fetch('http://localhost:3005/login',
      {
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         method: 'POST',
         credentials: 'same-origin',
         body: JSON.stringify({email: email, password: hash})
      })
      .then((response) => response.text())
      .then((responseText) => {
        responseText = JSON.parse(responseText);
        if(responseText.message === "Successful")
        {
          var infos = {success : true, email : responseText.email, name : responseText.name, surname : responseText.surname, motto: responseText.motto};
          localStorage.setItem('auth', JSON.stringify(infos));
          setAuth(infos);
        }
        else
        {
          alert("Wrong credentials!");
        }
      })
      .catch((error) => {
          console.error("Error in login API: " + error);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPw(e.target.value);
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={3}>
              <MDTypography component={MuiLink} href="https://github.com/nicolotombini" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={3}>
              <MDTypography component={MuiLink} href="https://www.linkedin.com/in/nicol%C3%B2-tombini-124b52235/" variant="body1" color="white">
                <LinkedInIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth onChange={(e) => handleEmailChange(e)}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth onChange={(e) => handlePasswordChange(e)}/>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={(e) => handleOnLogin(e)}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
});

export default Basic;
