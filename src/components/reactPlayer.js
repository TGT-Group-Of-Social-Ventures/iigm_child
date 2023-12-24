import { Box, Button, Card, Grid } from "@mui/material";
import React, { useState } from "react";
import ReactPlayer from "react-player";

const CoursePlayer = ({ url }) => {
  // const [currentStream, setCurrentStream] = useState(false);
  // console.log(url);
  const playerConfig = {
    file: {
      attributes: {
        controlsList: "nodownload",
        disablePictureInPicture: true,
      },
    },
  };

  return (
    <>
      <Box width="100%"
position="relative"
paddingTop="56.25%">
        {/* 56.25% is the aspect ratio for a 16:9 video */}
        <ReactPlayer
          url={url}
          controls={true}
          config={playerConfig}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </Box>
    </>
  );
};

export default CoursePlayer;
