import Grid from "@mui/material/Grid";
import { useState, forwardRef} from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import QuestionCard from "examples/Cards/QuestionCard";
import $ from 'jquery';

const  Dashboard = forwardRef (( {  }, ref) => {
  var topicStorage = null;

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
      body: JSON.stringify({subject: activeTopic.title, question: question})
		})
		.then((response) => response.text())
		.then((responseText) => {
        responseText = JSON.parse(responseText);
        console.log(responseText.answers[0].text);
        alert(activeTopic.title);
        if(responseText.answers.length == 0) {
          setAnswer(null);
          setBtnLoaded(false);
        }
        else {

          setAnswer(responseText.answers[0].text);
          var html = $(("#" + activeTopic.title)).html();
          var newHtml = html.replace('' + responseText.answers[0].text, '<b><i>'+responseText.answers[0].text+'</i></b>');
          $(("#" + activeTopic.title)).html(newHtml);
          setBtnLoaded(false);
        }
		});
	}

  const changeTopic = () => {
    setLoaded(!loaded);
  }

  topicStorage = JSON.parse(localStorage.getItem('topics'));
  var activeTopic = JSON.parse(localStorage.getItem('active-topics'));
  var topicsList = [];

  topicsList = (topicStorage == null)?null:topicStorage.topics.map((element, index) =>
  <Grid item xs={12} md={6} lg={4}>
    <MDBox mb={1.5}>
   <ComplexStatisticsCard
      color="success"
      icon={element.icon}
      title={element.title}
      count={element.topic}
      index={index}
      subtitle={{
        label: "Go to",
        amount: element.title,
      }}
      topics = {topicStorage.topics}
      reload = {changeTopic}
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
                  title={(activeTopic === null)?"":activeTopic.title}
                  description={(activeTopic === null)?"":activeTopic.title}
                  date={(activeTopic === null)?"":activeTopic.title}
                  image ={(activeTopic === null)?"":activeTopic.blob}
                  reload={setReload}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="success"
                id={(activeTopic === null)?"":activeTopic.title}
                title={(activeTopic === null)?"":activeTopic.title}
                description={(activeTopic === null)?"":activeTopic.text}
                date={(activeTopic === null)?"":activeTopic.topic}
              />
            </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Grid item xs={12} md={6} lg={12}>
        <MDBox mb={3} >
          <QuestionCard
            onClick={sendQuestion}
            btnState={btnLoaded}
            handleQuestionChange={handleQuestionChange}
          />
        </MDBox>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
});

export default Dashboard;
