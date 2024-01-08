import { Box, Button, Card, Grid } from "@mui/material";
import React, { useState, useEffect ,forwardRef} from "react";
import ReactPlayer from "react-player";

const CoursePlayer = React.forwardRef(({ url }, ref) => {
  const handleContextMenu = (e) => {
    // Prevent the default right-click behavior
    e.preventDefault();
  };
  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("contextmenu", handleContextMenu);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
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
      <Box ref={ref} width="100%" position="relative" paddingTop="56.25%">
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
});

export default CoursePlayer;
