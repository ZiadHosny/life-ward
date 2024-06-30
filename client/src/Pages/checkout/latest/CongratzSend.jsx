// import { Box, Button, Stack } from "@mui/material";
// import React from "react";
// import {
//   colors,
//   publicFontFamily,
// } from "../../../components/publicStyle/publicStyle";
// import CheckTextInput from "./CheckTextInput";

// const CongratzSend = ({ formik , language }) => {
//   const { values, setValues, errors, touched, handleBlur, handleChange } =
//     formik;
//   const addCongratzType = (type) => {
//     setValues({
//       ...values,
//       congratz: { type, content: { from: "", to: "", data: "" } },
//     });
//   };
//   return (
//     <Box
//       sx={{
//         border: values.congratzStatus ? 1 : 0,
//         borderColor: "divider",
//         borderRadius: "20px",
//         transition: "max-height ease 0.4s",
//         height: 400,
//         maxHeight: values.congratzStatus ? 400 : 0,
//         mb: values.congratzStatus ? "25px" : 0,
//         overflow: "hidden",
//       }}
//     >
//       <Stack
//         sx={{
//           flexDirection: {
//             md: "row",
//             xs: "column",
//           },
//           alignItems: "flex-start",
//           justifyContent: "flex-start",
//           p: "20px",
//           gap: "20px",
//         }}
//       >
//         <Button
//           sx={{
//             fontFamily: publicFontFamily,
//             fontWeight: "bold",
//             fontSize: "16px",
//             border: 1,
//             borderColor: colors.main,
//             bgcolor:
//               values.congratz.type === "text"
//                 ? `${colors.main} !important`
//                 : "#fff !important",
//             color: values.congratz.type === "text" ? "#fff" : colors.main,
//           }}
//           onClick={() => addCongratzType("text")}
//         >
//           {language === "en" ? "text" : "نص"}
//         </Button>
//         <Button
//           sx={{
//             fontFamily: publicFontFamily,
//             fontWeight: "bold",
//             fontSize: "16px",
//             color: colors.main,
//             border: 1,
//             borderColor: colors.main,
//             bgcolor:
//               values.congratz.type === "voice"
//                 ? `${colors.main} !important`
//                 : "#fff !important",
//             color: values.congratz.type === "voice" ? "#fff" : colors.main,
//             transition: "background-color 0.4s",
//           }}
//           onClick={() => addCongratzType("voice")}
//         >
//           {language === "en" ? "Voice" : "مقطع صوتي"}
//         </Button>
//         <Button
//           sx={{
//             fontFamily: publicFontFamily,
//             fontWeight: "bold",
//             fontSize: "16px",
//             color: colors.main,
//             border: 1,
//             borderColor: colors.main,
//             bgcolor:
//               values.congratz.type === "video"
//                 ? `${colors.main} !important`
//                 : "#fff !important",
//             color: values.congratz.type === "video" ? "#fff" : colors.main,
//             transition: "background-color 0.4s, color 0.4s ",
//           }}
//           onClick={() => addCongratzType("video")}
//         >
//           {language === "en" ? "Video" : "فيديو"}
//         </Button>
//       </Stack>
//       <Stack
//         sx={{
//           flexDirection: {
//             md: "row",
//             xs: "column",
//           },
//           alignItems: "flex-start",
//           justifyContent: "space-between",
//           p: "20px",
//         }}
//       >
//         <CheckTextInput
//           type="text"
//           name="from"
//           label={language === "en" ? "Sender" : "المرسل"}
//           // value={values.congratz.content.from}
//           // error={errors.congratz.content.from}
//           // touched={touched.congratz.content.from}
//           // handleChange={handleChange}
//           // handleBlur={handleBlur}
//         />
//         <CheckTextInput
//           type="text"
//           name="to"
//           label={language === "en" ? "Reciever" : "المستلم"}
//           // value={values.congratz.content.to}
//           // error={errors.congratz.content.to}
//           // touched={touched.congratz.content.to}
//           // handleChange={handleChange}
//           // handleBlur={handleBlur}
//           setCreditFocus={null}
//         />
//       </Stack>
//     </Box>
//   );
// };

// export default CongratzSend;
