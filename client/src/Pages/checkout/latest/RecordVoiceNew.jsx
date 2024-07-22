import { useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { publicFontFamily } from "../../../components/publicStyle/publicStyle";
import CloseIcon from "@mui/icons-material/Close";
import MicIcon from "@mui/icons-material/Mic";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
const RecordVoiceNew = ({ setRecordVoice, recordVoice, setFieldValue }) => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [blob, setBlob] = useState(null);

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,

    muteAudio,
    clearBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true,
  });
  useEffect(() => {
    let intervalId;
    if (isActive && status === "recording") {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);
        setCounter((counter) => counter + 1);
      }, 1000);
    }
    if (!isActive && status === "stopped") {
      setCounter(0);
      setSecond("00");
      setMinute("00");
    }
    return () => clearInterval(intervalId);
  }, [isActive, counter, status]);
  const [_, { language }] = useTranslation();
  useEffect(() => {
    if (mediaBlobUrl) {
      setRecordVoice(async () => {
        const response = await fetch(mediaBlobUrl);
        const blobResponse = await response.blob();
        setRecordVoice(blobResponse);
      });
      setFieldValue("congratz.content.data", "voice");
    } else {
      setRecordVoice();
    }
  }, [mediaBlobUrl]);
  const handleSaveRecording = () => {
    stopRecording();
    pauseRecording();
  };
  return (
    <Box
      sx={{
        width: 1,
        height: "auto",
      }}
    >
      {["paused", "recording"].includes(status) && (
        <div
          style={{
            display: "flex",
            marginBottom: "10px",
          }}
        >
          <p
            style={{
              fontFamily: publicFontFamily,
              padding: "5px 10px",
              border: "1px solid #693096",
              fontSize: "1rem",
              cursor: "default",
              color: "#693096",
              borderRadius: "5px",
              fontWeight: "bold",
              transition: "all 300ms ease-in-out",
              backgroundColor: "red !important",
              paddingBottom: "3px",
              margin: "0",
            }}
          >
            {`${minute}:${second}`}
          </p>
        </div>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          direction: language === "en" ? "ltr" : "rtl",
        }}
      >
        <button
          type="button"
          style={{
            fontFamily: publicFontFamily,
            padding: "5px 8px",
            borderColor: "#693096",
            borderWidth: '1px',
            marginLeft: "15px",
            fontSize: "35px",
            cursor: "pointer",
            borderRadius: "5px",
            fontWeight: "bold",
            backgroundColor: "white",
            transition: "all 300ms ease-in-out",
          }}
          onClick={() => {
            if (!isActive) {
              startRecording();
            } else {
              // pauseRecording();
              handleSaveRecording();
            }
            setIsActive(!isActive);
          }}
        >
          {!isActive ? (
            <MicIcon
              sx={{
                color: "#693096",
              }}
            />
          ) : (
            <StopIcon
              sx={{
                color: "#693096",
                transform: language === "en" ? `rotate(0)` : `rotate(180deg)`,
              }}
            />
          )}
        </button>
        {["paused"].includes(status) && (
          <button
            type="button"
            style={{
              fontFamily: publicFontFamily,
              padding: "5px 10px",
              border: "1px solid #693096",
              fontSize: "1rem",
              cursor:
                /* status !== "record
              ing" ? "default" :  */ "pointer",
              color: "#693096",
              borderRadius: "5px",
              fontWeight: "bold",
              transition: "all 300ms ease-in-out",
              backgroundColor: "red !important",
            }}
            onClick={handleSaveRecording}
          >
            {language === "en" ? "Save" : "أحفظ"}
          </button>
        )}
      </Box>
      {mediaBlobUrl && (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={"20px"}
          mt={"20px"}
        >
          <audio type="audio/mpeg" src={mediaBlobUrl} controls />
          <Button
            sx={{
              cursor: "pointer",
              height: 20,
              width: 5,
              minWidth: 0,
              // mt: "110px",
            }}
          >
            <CloseIcon
              sx={{
                fontSize: "2rem",
                color: "red",
                cusror: "pointer",
              }}
              onClick={() => {
                // setRecordVoice("");
                clearBlobUrl();
              }}
            />
          </Button>
        </Stack>
      )}
    </Box>
  );
};
export default RecordVoiceNew;
