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

// @mui material components
import Grid from "@mui/material/Grid";
import { useState, forwardRef} from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";



const  Dashboard = forwardRef (( { topics, setTopics }, ref) => {
  const { sales, tasks } = reportsLineChartData;
  var topicsList = [];

  topicsList = (topics === null)?null:topics.topics.map((element, index) =>
  <Grid item xs={12} md={6} lg={3}>
    <MDBox mb={1.5}>
   <ComplexStatisticsCard
      color="success"
      icon={element.icon}
      title={element.title}
      count={element.topic}
      index={index}
      percentage={{
        label: "Go to",
        amount: element.title,
      }}
      topics = {topics}
      setTopics = {setTopics}

    />
    </MDBox>
  </Grid>);

  return (


    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
            {topicsList}
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>

            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title={(topics === null)?"":topics.mainTopic.title}
                  description={(topics === null)?"":topics.mainTopic.summary}
                  date={(topics === null)?"":topics.mainTopic.topic}
                  chart={sales}

                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>

            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>

            </Grid>
            <Grid item xs={12} md={6} lg={4}>

            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
});

export default Dashboard;
