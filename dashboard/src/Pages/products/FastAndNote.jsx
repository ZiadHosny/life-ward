import React, { useState, useEffect } from "react";
import {
  useCreateCoastValueMutation,
  useGetCoastQuery,
  useUpdateCoastValueMutation,
} from "../../api/fastCoast.api";
import { useGetNoteQuery } from "../../api/note.api";
import { Box, Stack } from "@mui/material";
import ReuasbleField from "./ReuasbleField";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import { toast } from "react-toastify";
import {
  useCreateNoteValueMutation,
  useUpdateNoteValueMutation,
} from "../../api/note.api";

const FastAndNote = () => {
  const { palette } = useTheme();

  const [_, { language }] = useTranslation();
  const { data: dataCoast, error } = useGetCoastQuery();
  const { data: dataNote } = useGetNoteQuery();
  const [notetext, setNoteText] = useState("");
  const [coastValue, setCoastValue] = useState(0);
  console.log(dataNote);
  useEffect(() => {
    if (dataCoast) {
      setCoastValue(dataCoast?.data[0]?.value || 0);
    }
    if (dataNote) {
      setNoteText(dataNote?.data[0]?.value || "");
    }
  }, [dataCoast, dataNote]);
  const [createCoastValue] = useCreateCoastValueMutation();
  const [updateCoastValue] = useUpdateCoastValueMutation();
  const [createNoteValue] = useCreateNoteValueMutation();
  const [updateNoteValue] = useUpdateNoteValueMutation();
  const handleChangeNote = () => {
    if (dataNote === undefined) {
      if (notetext) {
        createNoteValue({ value: notetext })
          .unwrap()
          .then((res) => {
            toast.success(res[`success_${language}`]);
            setNoteText(res.data.value);
          })
          .catch((error) => {
            toast.success(error?.data?.[`error_${language}`]);
          });
      } else {
        toast.error(
          language === "en"
            ? "Write the note to save it"
            : "أكتب الملحوظة لتسجيلها"
        );
      }
    } else {
      updateNoteValue({
        payload: { value: notetext },
        id: dataNote?.data[0]._id,
      })
        .unwrap()
        .then((res) => {
          toast.success(res[`success_${language}`]);
          setNoteText(res.data.value);
        })
        .catch((error) => {
          toast.success(error?.data?.[`error_${language}`]);
        });
    }
  };

  const handleChangeFastCoast = () => {
    if (dataCoast === undefined) {
      if (coastValue < 1) {
        toast.error(
          language === "en"
            ? "Add fast coast to save it"
            : "أضف تكلفة سريعة لتجسيلها"
        );
      } else {
        createCoastValue({
          value: coastValue,
        })
          .unwrap()
          .then((res) => {
            toast.success(res[`success_${language}`]);
            setCoastValue(res.data.value);
          });
      }
    } else {
      updateCoastValue({
        payload: { value: coastValue },
        id: dataCoast?.data[0]?._id,
      })
        .unwrap()
        .then((res) => {
          toast.success(res[`success_${language}`]);
          setCoastValue(res.data.value);
        });
    }
  };
  return (
    <Stack direction={"row"} justifyContent={"flex-end"}>
      <Box
        sx={{
          display: {
            md: "flex",
            xs: "block",
          },
          gap: 3,
          pb: 2,
          px: 2,
          mt: "50px",
          bgcolor: palette.mode === "dark" ? "#3D5A58" : "transparent",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",

          width: {
            md: "auto",
            xs: 1,
          },
        }}
      >
        <ReuasbleField
          context={language === "en" ? "note" : "ملحوظة"}
          type={"text"}
          state={notetext}
          setState={setNoteText}
          handleClick={handleChangeNote}
          lang={language}
        />
        <ReuasbleField
          context={
            language === "en" ? "fast delivery coast" : "قيمة الشحن السريع"
          }
          type={"number"}
          state={coastValue}
          setState={setCoastValue}
          handleClick={handleChangeFastCoast}
          lang={language}
        />
      </Box>
    </Stack>
  );
};

export default FastAndNote;
