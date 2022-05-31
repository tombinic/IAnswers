import Grid from "@mui/material/Grid";
import { useState } from "react";
import Box from "components/Box";
import DashboardLayout from "objects/LayoutContainers/DashboardLayout";
import DashboardNavbar from "objects/DashboardNavbar";
import Footer from "objects/Footer";
import TopicViewCard from "objects/Cards/TopicViewCard";
import ComplexStatisticsCard from "objects/Cards/MainCard";
import QuestionCard from "objects/Cards/QuestionCard";
import $ from 'jquery';

function Dashboard() {
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
        var old_hmtl  =  (activeTopic.text);
        $(("#" + activeTopic.title)).html(old_hmtl);
        responseText = JSON.parse(responseText);
        if(responseText.answers.length === 0) {
          setAnswer(null);
          setBtnLoaded(false);
          alert("No answers found for : " +question );
        }
        else {
          setAnswer(responseText.answers[0].text);
          var html = $(("#" + activeTopic.title)).html();
          var newHtml = html.replace('' + responseText.answers[0].text, '<h1>'+responseText.answers[0].text+'</h1>');
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
    <Box mb={1.5}>
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
    </Box>
  </Grid>);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Grid container spacing={3}>
            {topicsList}
        </Grid>
        <Box mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Box mb={3}>
                <TopicViewCard
                  color="success"
                  title={(activeTopic === null)?"":activeTopic.title}
                  description={(activeTopic === null)?"":activeTopic.title}
                  subtitle={(activeTopic === null)?"":activeTopic.title}
                  image ={(activeTopic === null)?"":activeTopic.blob}
                  reload={setReload}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
            <Box mb={3}>
              <TopicViewCard
                color="success"
                id={(activeTopic === null)?"":activeTopic.title}
                title={(activeTopic === null)?"":activeTopic.title}
                description={(activeTopic === null)?"":activeTopic.text}
                date={(activeTopic === null)?"":activeTopic.topic}
              />
            </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Grid item xs={12} md={6} lg={12}>
        <Box mb={3} >
          <QuestionCard
            onClick={sendQuestion}
            btnState={btnLoaded}
            handleQuestionChange={handleQuestionChange}
          />
        </Box>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
