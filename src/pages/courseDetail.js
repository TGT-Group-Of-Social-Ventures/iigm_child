import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, Button, Grid, Card, CardContent, Stack } from "@mui/material";
import Head from "next/head";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CoursePlayer from "../components/reactPlayer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LockIcon from "@mui/icons-material/Lock";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { Co2Sharp } from "@mui/icons-material";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getCourseContent } from "src/redux/actions";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  display: "flex",
  // maxWidth: "100%",
  // padding: "24px",
  // textAlign: "center",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

const cardStyleDiff = {
  display: "flex",
  minWidth: "50%",
  maxWidth: "50%",
  padding: "4px",
  textAlign: "center",
  // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

const chapterTitleStyle = {
  fontSize: "1.8rem",
  marginBottom: "12px",
};

const videoLinkStyle = {
  fontSize: "1rem",
  color: "blue",
  textDecoration: "none",
  border: 1,
};

const scrollableContainerStyle = {
  maxHeight: "90%",
  overflowY: "auto",
  padding: "12px",
};

const playerStyle = {
  minWidth: "50px",
  maxWidth: "50px",
  // maxHeight:"30px"
};




const Page = () => {
  const dispatch = useDispatch();
  const { courseData, error, loading } = useSelector((state) => state.courseData);
  const courseDataFetched = courseData[0];
  const [expanded, setExpanded] = useState(false);
  const [playerLink, setPlayerLink] = useState("");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleVideoPlay = async (event, link) => {
    event.preventDefault();
    setPlayerLink(link);
  };

  useEffect(() => {
    dispatch(getCourseContent());
  }, []);


  return (
    <>
      <Head>
        <title>Course || IIGM</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">CGF Course</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={6}>
                  <Card elevation={0} sx={cardStyle}>
                    <CardContent>
                      <Paper sx={{ width: "100%", display: "flex" }} elevation={0}>
                        <Typography variant="h5">Course Name:</Typography>
                        <Typography variant="h5">{courseDataFetched.courseTitle}</Typography>
                      </Paper>
                      <br />
                      <CoursePlayer url={playerLink} />
                      <Grid style={playerStyle}></Grid>
                      <br />
                      <Grid container direction="column">
                        <Typography variant="h6">Course Details</Typography>
                        <Box>
                          <div>
                            <Accordion
                              expanded={expanded === "panel1"}
                              onChange={handleChange("panel1")}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                              >
                                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                                  Course Overview
                                </Typography>
                                <Typography sx={{ color: "text.secondary" }}>
                                  {courseDataFetched.courseOverview.header}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                {courseDataFetched.courseOverview.body}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion
                              expanded={expanded === "panel2"}
                              onChange={handleChange("panel2")}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                              >
                                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                                  Course Contents
                                </Typography>
                                <Typography sx={{ color: "text.secondary" }}>
                                  {courseDataFetched.courseContent.header}
                                  Test 3
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                  <List
                                    sx={{
                                      width: "100%",
                                      maxWidth: 360,
                                      bgcolor: "background.paper",
                                      position: "relative",
                                      overflow: "auto",
                                      maxHeight: 300,
                                      "& ul": { padding: 0 },
                                    }}
                                    subheader={<li />}
                                  >
                                    <li>
                                      <ul>
                                        {courseDataFetched.courseContent.body.map((item) => (
                                          <ListItem key={`${item}`}>
                                            <ListItemText primary={`${item}`} />
                                          </ListItem>
                                        ))}
                                      </ul>
                                    </li>
                                  </List>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion
                              expanded={expanded === "panel3"}
                              onChange={handleChange("panel3")}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                              >
                                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                                  Other Information
                                </Typography>
                                <Typography sx={{ color: "text.secondary" }}>
                                  {courseDataFetched.otherInformation.header}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                {courseDataFetched.otherInformation.body}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion
                              expanded={expanded === "panel4"}
                              onChange={handleChange("panel4")}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                              >
                                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                                  Eligibility Criteria
                                </Typography>
                                <Typography sx={{ color: "text.secondary" }}>
                                  {courseDataFetched.eligibilityCriteria.header}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>
                                {courseDataFetched.eligibilityCriteria.body[0]}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        </Box>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} md={6} lg={6}>
                  <Card elevation={0}>
                    <CardContent>
                      <Paper sx={{ width: "100%", display: "flex" }} elevation={0}>
                        <Typography variant="h6">Course Content:</Typography>
                      </Paper>
                      <div style={scrollableContainerStyle}>
                        <Grid container spacing={3}>
                          {courseDataFetched.courseContents.map((course, index) => (
                            <Grid item xs={12} sm={12} key={index}>
                              <Accordion disabled={course.disabled === true ? true : false}>
                                <AccordionSummary
                                  expandIcon={
                                    course.disabled === true ? <LockIcon /> : <ExpandMoreIcon />
                                  }
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography variant="h5">{course.courseTitle}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography>
                                    <p style={{ marginBottom: "8px" }}>{course.description}</p>
                                  </Typography>
                                  <Typography variant="subtitle1" gutterBottom>
                                    Lecture Link:{" "}
                                    <button
                                      onClick={(e) => handleVideoPlay(e, course.lectureLink)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={videoLinkStyle}
                                    >
                                      Start Lecture
                                    </button>
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            </Grid>
                          ))}
                        </Grid>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
