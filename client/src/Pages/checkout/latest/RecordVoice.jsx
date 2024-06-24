import React, { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { Stack } from "@mui/material";
import ReactAudioPlayer from "react-audio-player";
import CloseIcon from "@mui/icons-material/Close";
export default function RecordVoice({ setRecordVoice, setFieldValue }) {
  const [audioSrc, setAudioSrc] = useState("");
  const addAudioElement = (voice) => {
    const extension = "mp3";
    const filename = `audio.${extension}`;
    const url = URL.createObjectURL(voice);
    const blob = new Blob([voice], { type: `audio/${extension}` });
    const audioWithExtension = new File([blob], filename, {
      lastModified: new Date(),
    });
    setAudioSrc(url);
    setRecordVoice(audioWithExtension);
    setFieldValue("congratz.content.data", "voice");
  };
  return (
    <Stack
      sx={{
        flexDirection: {
          md: "row",
          xs: "column",
        },
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "20px",
      }}
    >
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadOnSavePress={false}
        downloadFileExtension={false}
        showVisualizer={true}
      />
      {audioSrc ? (
        <Stack direction={"row"} alignItems={"flex-start"}>
          <ReactAudioPlayer src={audioSrc} controls downloadFileExtension />
          <CloseIcon
            sx={{
              fontSize: "1.5em",
              color: "red",
              margin: "0 5px",
              cusror: "pointer",
            }}
            onClick={() => setAudioSrc()}
          />
        </Stack>
      ) : undefined}
    </Stack>
  );
}
