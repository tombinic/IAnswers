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
import QuestionCard from "examples/Cards/QuestionCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";



const  Dashboard = forwardRef (( {  }, ref) => {
  const { sales, tasks } = reportsLineChartData;


  const [topics, setTopics] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [btnLoaded, setBtnLoaded] = useState(false);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  }

  const sendQuestion = () => {
    setBtnLoaded(true);
		fetch('http://localhost:3005/question',
		{
			headers:
			{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			credentials: 'same-origin',
      body: JSON.stringify({subject: topics.mainTopic.title, question: question})
		})
		.then((response) => response.text())
		.then((responseText) => {

        responseText = JSON.parse(responseText);
        if(responseText.answers.length == 0) {
          setAnswer(null);
          setBtnLoaded(false);
        }
        else {
          setAnswer(responseText.answers[0].text);
          setBtnLoaded(false);
        }
      console.log(responseText);
		});
	}

  const getTopics = () => {
    setLoaded(true);
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

     setTopics({topics: responseText.result, mainTopic: (topics === null)?"":(topics.mainTopic)});
     localStorage.setItem('topics', JSON.stringify(topics));


    })
    .catch((error) => {
        console.error("Error in login API: " + error);
        return null;
    });
    }

    if(!loaded) {
      getTopics();
      if(JSON.parse(localStorage.getItem('topics')) != null) {
        console.log("riga 114");
        setTopics(JSON.parse(localStorage.getItem('topics')));
      }
    }

  var topicsList = [];

  topicsList = (topics === null)?null:topics.topics.map((element, index) =>
  <Grid item xs={12} md={6} lg={4}>
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
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title={(topics === null)?"":topics.mainTopic.title}
                  description={(topics === null)?"":topics.mainTopic.summary}
                  date={(topics === null)?"":topics.mainTopic.topic}
                  chart={sales}

                />
                <Grid item xs={12} md={6} lg={12}>
                  <MDBox py={3} mb={3}>
                    <QuestionCard
                      color="success"
                      title={(topics === null)?"":topics.mainTopic.title}
                      description={(topics === null)?"":topics.mainTopic.summary}
                      date={(topics === null)?"":topics.mainTopic.topic}
                      chart={sales}
                      onClick={sendQuestion}
                      btnState={btnLoaded}
                      handleQuestionChange={handleQuestionChange}
                    />
                  </MDBox>
                </Grid>
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="success"
                title={(topics === null)?"":topics.mainTopic.title}
                description={(topics === null)?"":topics.mainTopic.text}
                date={(topics === null)?"":topics.mainTopic.topic}
                chart={sales}

              />
            </MDBox>
            </Grid>

          </Grid>
        </MDBox>

      </MDBox>
      <Footer />
    </DashboardLayout>
  );
});

export default Dashboard;
