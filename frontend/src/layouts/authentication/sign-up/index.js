import { useState,createContext, useContext, forwardRef} from "react";
import { Link } from "react-router-dom";
import { sha3_512 } from 'js-sha3';
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";

import bgImage from "assets/images/bg1.gif";

const Cover = forwardRef(( { setAuth }, ref) => {
  const [pw, setPw] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [motto, setMotto] = useState(null);

  const handleOnSignUp = (e) => {

    let hash = sha3_512(pw);

    e.preventDefault();
    fetch('http://localhost:3005/signup',
      {
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         method: 'POST',
         credentials: 'same-origin',
         body: JSON.stringify({password: hash, email: email, name: name, surname: surname, motto: motto})
      })
      .then((response) => response.text())
      .then((responseText) => {
        responseText = JSON.parse(responseText);
        if(responseText.message === "Successful")
        {
          console.log(responseText.extra);
          var infos = {success : true, name: responseText.extra.name, surname: responseText.extra.surname, email: responseText.extra.email, motto: responseText.extra.motto};
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleMottoChange = (e) => {
    setMotto(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPw(e.target.value);
  };


  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your data to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={1}>
              <MDInput type="text" label="Name" variant="standard" fullWidth onChange={(e) => handleNameChange(e)}/>
            </MDBox>
            <MDBox mb={1}>
              <MDInput type="text" label="Surname" variant="standard" fullWidth onChange={(e) => handleSurnameChange(e)}/>
            </MDBox>
            <MDBox mb={1}>
              <MDInput type="email" label="Email" variant="standard" fullWidth onChange={(e) => handleEmailChange(e)}/>
            </MDBox>
            <MDBox mb={1}>
              <MDInput type="password" label="Password" variant="standard" fullWidth onChange={(e) => handlePasswordChange(e)}/>
            </MDBox>
            <MDBox mb={1}>
              <MDInput type="text" label="Motto" variant="standard" fullWidth onChange={(e) => handleMottoChange(e)}/>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={(e) => handleOnSignUp(e)}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
});

export default Cover;
