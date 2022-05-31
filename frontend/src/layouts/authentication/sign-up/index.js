import { useState,createContext, useContext, forwardRef} from "react";
import { Link } from "react-router-dom";
import { sha3_512 } from 'js-sha3';
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Box from "components/Box";
import Typography from "components/Typography";
import Input from "components/Input";
import Button from "components/Button";
import CoverLayout from "layouts/authentication/components/CoverLayout";

import bgImage from "assets/images/bg1.gif";

const Cover = forwardRef(( { setAuth }, ref) => {
  const [pw, setPw] = useState(null);
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [motto, setMotto] = useState(null);

  console.log(username === null);

  const handleOnSignUp = (e) => {
    if (pw === null || username === null || name === null || surname === null || motto === null ||
        pw == "" || username == "" || name == "null" || surname == "" || motto == "") {
        alert("Please insert all data");
    }
    else {
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
           body: JSON.stringify({password: hash, username: username, name: name, surname: surname, motto: motto})
        })
        .then((response) => response.text())
        .then((responseText) => {
          responseText = JSON.parse(responseText);
          if(responseText.message === "Successful")
          {
            console.log(responseText.extra);
            var infos = {success : true, name: responseText.extra.name, surname: responseText.extra.surname, username: responseText.extra.username, motto: responseText.extra.motto};
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
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
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
        <Box
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
          <Typography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us
          </Typography>
          <Typography display="block" variant="button" color="white" my={1}>
            Enter your data to register
          </Typography>
        </Box>
        <Box pt={4} pb={3} px={3}>
          <Box component="form" role="form">
            <Box mb={1}>
              <Input type="text" label="Name" variant="standard" fullWidth onChange={(e) => handleNameChange(e)}/>
            </Box>
            <Box mb={1}>
              <Input type="text" label="Surname" variant="standard" fullWidth onChange={(e) => handleSurnameChange(e)}/>
            </Box>
            <Box mb={1}>
              <Input type="username" label="Username" variant="standard" fullWidth onChange={(e) => handleUsernameChange(e)}/>
            </Box>
            <Box mb={1}>
              <Input type="password" label="Password" variant="standard" fullWidth onChange={(e) => handlePasswordChange(e)}/>
            </Box>
            <Box mb={1}>
              <Input type="text" label="Motto" variant="standard" fullWidth onChange={(e) => handleMottoChange(e)}/>
            </Box>
            <Box mt={4} mb={1}>
              <Button variant="gradient" color="info" fullWidth onClick={(e) => handleOnSignUp(e)}>
                sign in
              </Button>
            </Box>
            <Box mt={3} mb={1} textAlign="center">
              <Typography variant="button" color="text">
                Already have an account?{" "}
                <Typography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </CoverLayout>
  );
});

export default Cover;
