import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, Button, Grid, Card, CardContent, Stack } from "@mui/material";
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { Co2Sharp } from "@mui/icons-material";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getCourseContent } from "src/redux/actions";
import PurchaseCourses from "src/sections/courses/purchaseCourses";
import YourCourse from "src/sections/courses/yourCourse";

const Page = () => {
  const dispatch = useDispatch();
  const { courseData, error, loading } = useSelector((state) => state.courseData);
  console.log("sht", courseData);
  const courseDataFetched = courseData[0];
  const [userMail, setUserMail] = useState("");

  const getUserEmail = async () => {
    const response = await localStorage.getItem("userMail").slice(1, -1);
    setUserMail(response);
  };

  useEffect(() => {
    getUserEmail();
  }, []);

  useEffect(() => {
    if (userMail) {
      console.log("inside", userMail);
      dispatch(getCourseContent(userMail));
    }
  }, [userMail]);

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
                {courseData.length == 0 ? (
                  <PurchaseCourses />
                ) : (
                  <YourCourse courseDataFetched={courseDataFetched} />
                )}
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
