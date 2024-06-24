import { Box, Button, CardMedia, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import video from "../../assets/video.mp4";
import videoWall from "../../assets/video-wall.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { colors } from "../../components/publicStyle/publicStyle";
const VedioPage = ({ handleClose }) => {
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: state ? "#94bcc099" : undefined,
        position: "relative",
      }}
    >
      <Button
        sx={{
          position: "absolute",
          top: "10vh",
          left: "10vw",
          zIndex: "2",
          bgcolor: "red",
          bgcolor: "#CFE1E3 !important",
        }}
        onClick={handleClose}
      >
        <KeyboardBackspaceIcon
          sx={{
            color: colors.main,
          }}
        />
      </Button>
      <CardMedia
        component="video"
        src={video}
        title="YouTube video player"
        allowfullscreen
        type="video/mp4"
        // ref={videoRef}
        controls
        autoPlay
        sx={{
          height: "80vh",
          width: 1,
          mx: "auto",
        }}
      />
    </Box>
  );
};

export default VedioPage;
