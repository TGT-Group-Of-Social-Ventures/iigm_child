import { Box, Button, Card, Grid } from "@mui/material";
import React, { useState } from "react";
import ReactPlayer from "react-player";

const CoursePlayer = ({url}) => {
  // const [currentStream, setCurrentStream] = useState(false);
  // console.log(url);
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
      <Grid container spacing={3} >
        <Grid xs={12} md={4} lg={4}>
              <ReactPlayer
                url={url}
                controls={true}
                config={playerConfig}
                // width="500px"
                // height="360px"
              />
        </Grid>
      </Grid>
    </>
  );
};

export default CoursePlayer;
