import React, { useState, useRef,forwardRef, useEffect} from "react";
import Accordion from "@mui/material/Accordion";
import {
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LockIcon from "@mui/icons-material/Lock";
import CoursePlayer from "src/components/reactPlayer";
import { flexbox } from "@mui/system";
import axios from "axios";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  display: "flex",
  maxWidth: "100%",
  // padding: "24px",
  textAlign: "center",
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
  display: "flex",
};

export default function YourCourse({ courseDataFetched }) {
  const playerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [playerLink, setPlayerLink] = useState("");
  const [isLockedModalOpen, setIsLockedModalOpen] = useState(false);

    useEffect(()=>{
      if(courseDataFetched){
        setPlayerLink(courseDataFetched.introVideo)
      }
    },[])

  const handleAccordionClick = (event, isDisabled) => {
    event.preventDefault();
    if (isDisabled) {
      // If the module is locked, open the locked modal
      setIsLockedModalOpen(true);
    }
  };

  const handleCloseLockedModal = () => {
    // Close the locked modal
    setIsLockedModalOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleVideoPlay = async (event, link) => {
    event.preventDefault();
    try {
      // console.log(link);
      const response = await axios.get(
        `https://backend.iigminstitute.com/api/video/getSignedURL?videoKey=${link}`
      );
      const data = await response.data;
      // Set the signed URL in the state
      setPlayerLink(data.signedUrl);
      if (playerRef.current) {
        playerRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error fetching signed URL:", error);
    }
  };

  const handleRegistrationLink = async (e) => {
    const googleFormUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSdR7U0HipoGZJuTmr2RM9mBpVqx6-wgt-qI1GJwNJcluXKE5Q/viewform";
    window.open(googleFormUrl, "_blank");
  };

  return (
    <>
      <Grid xs={12} md={6} lg={6}>
        <Card
          elevation={0}
          //  sx={cardStyle}
        >
          <CardContent>
            <Paper sx={{ width: "100%", display: "flex" }} elevation={0}>
              <Typography variant="h5">Course Name:</Typography>
              <Typography variant="h5">{courseDataFetched.courseTitle}</Typography>
            </Paper>
            <br />
            <CoursePlayer ref={playerRef} url={playerLink} />
            <br />
            <Grid container direction="column">
              <Typography variant="h6">Course Details</Typography>
              <Box>
                <div>
                  <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>Course Overview</Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {courseDataFetched.courseOverview.header}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{courseDataFetched.courseOverview.body}</Typography>
                    </AccordionDetails>
                  </Accordion>
                  {/* <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>Course Contents</Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {courseDataFetched.courseContent.header}
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
                  </Accordion> */}
                  <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
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
                        {/* {courseDataFetched.otherInformation.body} */}
                        Course material will be shared here on 5th Jan.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
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
                      {courseDataFetched.eligibilityCriteria.body.map((criteria, index) => (
                        <Typography key={index}>
                          {index + 1} {criteria}
                        </Typography>
                      ))}
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
                    <div onClick={(e) => handleAccordionClick(e, course.disabled)}>
                      <Accordion disabled={course.disabled}>
                        <AccordionSummary
                          expandIcon={course.disabled ? <LockIcon /> : <ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography variant="h5">{course.courseTitle}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <p style={{ marginBottom: "8px" }}>{course.description}</p>
                          </Typography>
                          {course.session &&
                            course.session.map((value, sessionIndex) => (
                              <div key={sessionIndex}>
                                <Typography variant="subtitle1" gutterBottom>
                                  {value.sessionName}
                                </Typography>
                                <Grid>
                                  {value.sessionLink.map((link, index) => (
                                    <button
                                      onClick={(e) => handleVideoPlay(e, link)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={videoLinkStyle}
                                      key={index}
                                    >
                                      Start Lecture
                                    </button>
                                  ))}
                                </Grid>
                              </div>
                            ))}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Dialog open={isLockedModalOpen} onClose={handleCloseLockedModal}>
        <DialogTitle>Course is locked</DialogTitle>
        <DialogContent>
          {/* Customize the content of the locked modal here */}
          <Typography variant="body1">
            This module is locked as course is starting from 5th Jan 2024. If not Enrolled, Enroll
            Now to start course.
          </Typography>
          <a href="https://forms.gle/EFZ7sqa18MXtkJxJ9">Enrollment Link</a>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLockedModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
