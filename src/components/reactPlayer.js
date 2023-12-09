import { Box, Button, Card, Grid } from "@mui/material";
import React, { useState } from "react";
import ReactPlayer from "react-player";

const CoursePlayer = ({url}) => {
  // const [currentStream, setCurrentStream] = useState(false);
  console.log(url);
  const playerConfig = {
    file: {
      attributes: {
        controlsList: 'nodownload',
        disablePictureInPicture: true
      },
    },
  };

  return (
    <>
      <Grid container spacing={2} width={"100%"}>
        <Grid item display={"flex"} width={"100%"}>
          <Box>
            <Card elevation={5} maxWidth={"100%"}>
              <ReactPlayer
                url={url}
                controls={true}
                config={playerConfig}
              />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CoursePlayer;
