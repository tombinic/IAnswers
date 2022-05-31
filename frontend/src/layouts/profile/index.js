import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Box from "components/Box";
import Typography from "components/Typography";
import DashboardLayout from "objects/LayoutContainers/DashboardLayout";
import DashboardNavbar from "objects/DashboardNavbar";
import Footer from "objects/Footer";
import ProfileProfileInfoCard from "objects/Cards/ProfileInfoCard";
import TopicCard from "objects/Cards/TopicCard";
import Header from "layouts/profile/Header";
import {forwardRef, React} from "react";

const Overview = forwardRef(( { auth }, ref) => {
  const topics = JSON.parse(localStorage.getItem('topics'));
  var topicsList = [];
  topicsList = (topics!=null)?topics.topics.map((element, index) =>
  <Grid item xs={12} md={6} xl={3}>
    <TopicCard
      image={(topics==null)?"":element.blob}
      label={element.topic}
      title={element.title}
      description={element.summary}
      action={{
        type: "internal",
        route: "/dashboard",
        color: "info",
        label: "Go to topic",
      }}
      index={index}
    />
  </Grid>):[];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box mb={2} />
      <Header auth={auth}>
        <Box mt={5} mb={12}>
            <Grid item xs={12} md={6} xl={12} sx={{ display: "flex" }}>
              <ProfileProfileInfoCard
                title="profile information"
                description={auth.motto}
                info={{
                  surname: auth.surname,
                  name: auth.name,
                  username: auth.username,
                  location: "ITA",
                }}

                shadow={false}
              />
          </Grid>
        </Box>
        <Box pt={2} px={2} lineHeight={1.25}>
          <Typography variant="h6" fontWeight="medium">
            Topics
          </Typography>
          <Box mb={1}>
            <Typography variant="button" color="text">
              All topics in our website!
            </Typography>
          </Box>
        </Box>
        <Box p={2}>
          <Grid container spacing={6}>
          {topicsList}
          </Grid>
        </Box>
      </Header>
      <Footer />
    </DashboardLayout>
    );
  });

export default Overview;
