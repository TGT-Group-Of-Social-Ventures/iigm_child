import React, { useState } from "react";
import {
    Paper,
    Typography,
    Box,
    Button,
    Grid,
    Card,
    CardContent,
} from "@mui/material";
import Head from 'next/head';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CoursePlayer from "../components/reactPlayer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LockIcon from "@mui/icons-material/Lock";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Co2Sharp } from "@mui/icons-material";



const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const cardStyle = {
    display: "flex",
    maxWidth: "100%",
    padding: "24px",
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
    border: 1
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

const courseData = {
    "courseTitle": "Introduction to Goat Management",
    "id": "IIGM",
    "totalVideos": "30",
    "watchingHours": "10 hours",
    "introVideo": "https://www.dropbox.com/scl/fi/bg83rgw1xjihpe615eqr6/TGTIntroductionVideo-Dev-Purpose.mp4?rlkey=dxh39zxqe7ffyaxt0sfukyu0m&dl=0",
    "description": "Course on goat healthcare",
    "department": "IIGMA",
    "price": "5000",
    "thumbnail": "https://www.open.edu/openlearn/pluginfile.php/3277384/tool_ocwmanage/articletext/0/become_a_student_inline.jpg",
    "descriptionSummary": "Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text.",
    "courseDetails": "Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text. Course Demo Text.",
    "courseTopics": ["couresTopic", "couresTopic", "couresTopic", "couresTopic", "couresTopic", "couresTopic", "couresTopic"],
    "courseOverview": {
        "header": "Introduction to Goat Management",
        "body": "The Course Focuses on Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text"
    },
    "courseContent": {
        "header": "View All The Course Contents Here",
        "body": ["Chapter1", "Chapter2", "Chapter3"]
    },
    "otherInformation": {
        "header": "Other Course Related Information",
        "body": "Other Important Notices and Information Related to the Course. Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text"
    },
    "eligibilityCriteria": {
        "header": "Check If You Are Eligible For This Course",
        "body": ["Detail1", "Detail2", "Detail3", "Detail4"]
    },
    "courseContents": [
        {
            "courseTitle": "Sub Heading1",
            "lectureLink": "https://dl.dropboxusercontent.com/s/t05zdw2woogo4kh/ACW_3.mp4",
            "description": "Description for Video 1. Sed ac urna vitae tortor congue pretium.",
            "disabled": "false"
        },
        {
            "courseTitle": "Sub Heading2",
            "lectureLink": "",
            "description": "Description for Video 2. Sed ac urna vitae tortor congue pretium.",
            "disabled": "false"
        },
        {
            "courseTitle": "Sub Heading3",
            "lectureLink": "",
            "description": "Description for Video 3. Sed ac urna vitae tortor congue pretium.",
            "disabled": "true"
        },
        {
            "courseTitle": "Sub Heading4",
            "lectureLink": "",
            "description": "Description for Video 4. Sed ac urna vitae tortor congue pretium.",
            "disabled": "true"
        }
    ]
}

console.log('render');

const Page = () => {
    const [expanded, setExpanded] = useState(false);
    const [playerLink, setPlayerLink] = useState(courseData.introVideo)
    console.log('introVideo', courseData.introVideo);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleVideoPlay = async (event, link) => {
        event.preventDefault();
        setPlayerLink(link);
    }
    return (
        <>
            <Head>
                <title>
                    Course || IIGM
                </title>
            </Head>
            <Box m={"20px"}>
                <Typography
                    title={"Course Description"}
                    subtitle={"View all your courses here"}
                />
                <Box style={containerStyle}>
                    <Grid elevation={0} display={"flex"} p={"24px"} textAlign={"center"} sx={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
                        <Grid minWidth={"50%"} sx={12}>
                            <Card elevation={0}>
                                <CardContent>
                                    <Paper sx={{ width: "100%", display: "flex" }} elevation={0}>
                                        <Typography variant="h5">Course Name:</Typography>
                                        <Typography variant="h5" >
                                            {courseData.courseTitle}
                                        </Typography>
                                    </Paper>
                                    <br />
                                    <Grid style={playerStyle}>
                                        <CoursePlayer url={playerLink} />
                                    </Grid>
                                    <br />
                                    <Grid display={"flex"} direction={"column"}>
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
                                                            {courseData.courseOverview.header}
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography>
                                                            {courseData.courseOverview.body}
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
                                                            {courseData.courseContent.header}
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
                                                                        {courseData.courseContent.body.map((item) => (
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
                                                            {courseData.otherInformation.header}
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography>
                                                            {courseData.otherInformation.body}
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
                                                            {courseData.eligibilityCriteria.header}
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography>
                                                            {courseData.eligibilityCriteria.body[0]}
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </div>
                                        </Box>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid xs={12} minWidth={"50%"}>
                            <Card elevation={0}>
                                <CardContent>
                                    <Paper sx={{ width: "100%", display: "flex" }} elevation={0}>
                                        <Typography variant="h6" >
                                            Course Content:
                                        </Typography>
                                    </Paper>
                                    <div style={scrollableContainerStyle}>
                                        <Grid container spacing={3}>
                                            {courseData.courseContents.map((course, index) => (
                                                <Grid item xs={12} sm={12} key={index}>
                                                    <Accordion
                                                        disabled={course.disabled === true ? true : false}
                                                    >
                                                        <AccordionSummary
                                                            expandIcon={
                                                                course.disabled === true ? (
                                                                    <LockIcon />
                                                                ) : (
                                                                    <ExpandMoreIcon />
                                                                )
                                                            }
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <Typography variant="h5">
                                                                {course.courseTitle}
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Typography>
                                                                <p style={{ marginBottom: "8px" }}>
                                                                    {course.description}
                                                                </p>
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
                </Box>
            </Box>
        </>
    );
};

console.log(Page);
console.log(typeof (page));



Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
)
export default Page;
