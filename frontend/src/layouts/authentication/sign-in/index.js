import { useState, forwardRef} from "react";
import { sha3_512 } from 'js-sha3';
import { Link  } from "react-router-dom";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Box from "components/Box";
import Typography from "components/Typography";
import Input from "components/Input";
import Button from "components/Button";
import BasicLayout from "layouts/authentication/components/BasicLayout";

import bgImage from "assets/images/bg.gif";

const Basic = forwardRef(( { setAuth }, ref) => {

  const [pw, setPw] = useState(null);
  const [username, setUsername] = useState(null);

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
         body: JSON.stringify({username: username, password: hash})
      })
      .then((response) => response.text())
      .then((responseText) => {
        responseText = JSON.parse(responseText);
        if(responseText.message === "Successful")
        {
          var infos = {success : true, username : responseText.username, name : responseText.name, surname : responseText.surname, motto: responseText.motto};
          localStorage.setItem('auth', JSON.stringify(infos));
          setAuth(infos);
        }
        else
        {
          alert(responseText.message);
        }
      })
      .catch((error) => {
          console.error("Error in login API: " + error);
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPw(e.target.value);
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <Box
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
          <Typography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </Typography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={3}>
              <Typography component={MuiLink} href="https://github.com/nicolotombini" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography component={MuiLink} href="https://www.linkedin.com/in/nicol%C3%B2-tombini-124b52235/" variant="body1" color="white">
                <LinkedInIcon color="inherit" />
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box pt={4} pb={3} px={3}>
          <Box component="form" role="form">
            <Box mb={2}>
              <Input type="username" label="Username" fullWidth onChange={(e) => handleUsernameChange(e)}/>
            </Box>
            <Box mb={2}>
              <Input type="password" label="Password" fullWidth onChange={(e) => handlePasswordChange(e)}/>
            </Box>
            <Box mt={4} mb={1}>
              <Button variant="gradient" color="info" fullWidth onClick={(e) => handleOnLogin(e)}>
                sign in
              </Button>
            </Box>
            <Box mt={3} mb={1} textAlign="center">
              <Typography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <Typography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </BasicLayout>
  );
});

export default Basic;
