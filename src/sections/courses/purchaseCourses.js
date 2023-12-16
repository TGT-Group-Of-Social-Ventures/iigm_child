import React from "react";
import {
  Box,
  Container,
  IconButton,
  Typography,
  useTheme,
  Button,
  CircularProgress,
} from "@mui/material";

export default function purchaseCourses() {
  return (
    <Box m="20px">
      <Header title={"Your Courses"} subtitle={"View All Your Courses Here"} />
      <Box m="40px 0 0 0">
        <Container display={"flex"}>
          <Box textAlign="center">
            <Typography variant="h6">You've not purchased any course.</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/allcourses")}
              sx={{ marginTop: "16px" }}
            >
              Purchase Courses
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
