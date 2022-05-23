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
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import QuestionCard from "examples/Cards/QuestionCard";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";





const  Dashboard = forwardRef (( {  }, ref) => {
  const { sales, tasks } = reportsLineChartData;


  // const [topics, setTopics] = useState(null);
  const [reload, setReload] = useState(false);
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
      body: JSON.stringify({subject: topicStorage.mainTopic.title, question: question})
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
      var tmp = {topics: responseText.result, mainTopic:""};
      localStorage.setItem('topics', JSON.stringify(tmp));
      topicStorage = JSON.parse(localStorage.getItem('topics'));
      setLoaded(true);
      //setTopics(tmp);
    })
    .catch((error) => {
        console.error("Error in login API: " + error);
        return null;
    });
    }
    var topicStorage = null;

    if(!loaded) {
      if(JSON.parse(localStorage.getItem('topics')) != null) {
        topicStorage = JSON.parse(localStorage.getItem('topics'));
        setLoaded(true);
      } 
      else{
        getTopics();
      }
    }else{
      topicStorage = JSON.parse(localStorage.getItem('topics'));
    }

    //topicStorage = JSON.parse(localStorage.getItem('topics'));


  var topicsList = [];
 
  //topics.mainTopic = topics.topics[index];

  topicsList = (topicStorage === null)?null:topicStorage.topics.map((element, index) =>
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
      topics = {topicStorage.topics}
      reload = {setLoaded}

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
                  title={(topicStorage === null)?"":topicStorage.mainTopic.title}
                  description={(topicStorage === null)?"":topicStorage.mainTopic.title}
                  date={(topicStorage === null)?"":topicStorage.mainTopic.title}
                  chart={sales}
                  image ={(topicStorage === null)?"":topicStorage.mainTopic.blob}
                  reload={setReload}

                />
                <Grid item xs={12} md={6} lg={12}>
                  <MDBox py={3} mb={3}>
                    <QuestionCard
                      color="success"
                      title={(topicStorage === null)?"":topicStorage.mainTopic.title}
                      description={(topicStorage === null)?"":topicStorage.mainTopic.summary}
                      date={(topicStorage === null)?"":topicStorage.mainTopic.topic}
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
                title={(topicStorage === null)?"":topicStorage.mainTopic.title}
                description={(topicStorage === null)?"":topicStorage.mainTopic.text}
                date={(topicStorage === null)?"":topicStorage.mainTopic.topic}
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
