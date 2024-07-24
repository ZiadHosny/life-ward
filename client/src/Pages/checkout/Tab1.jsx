import { Box, Button, InputBase, Stack, Typography } from '@mui/material'
import { useTranslation } from "react-i18next";
import UploadFile from "./latest/UploadFile";
import RecordVoideNew from "./latest/RecordVoiceNew";
import { colors, publicFontFamily } from '../../components/publicStyle/publicStyle';
import CheckTextInput from './latest/CheckTextInput';
import CheckTextArea from './latest/CheckTextArea';

const arabicTypes = {
    text: "تهنئة نصية",
    voice: "ملف صوت",
    video: "فيديو",
};

export const Tab1 = ({
    recordVoice,
    setRecordVoice,
    uploadedVideo,
    setUploadVideo,
    values,
    handleChange,
    handleBlur,
    errors,
    setValues,
    touched,
    setFieldValue,
}) => {

    const [_, { language: lang }] = useTranslation();

    const handleUploadVideo = (file) => {
        setUploadVideo(file);
        setFieldValue("congratz.content.data", file.name);
    };

    const addCongratzType = (type) => {
        setValues({
            ...values,
            congratz: { type, content: { ...values?.congratz.content, data: "" } },
        });
        setUploadVideo(null);
    };

    return (
        <Box sx={{
            mx: 'auto',
            width: {
                lg: '70%',
                md: '90%',
                sm: '100%',
                xs: '100%'
            },
            bgcolor: '#f2e5fc',
            borderRadius: 5,
            display: 'flex',
            flexDirection: 'column',
            paddingX: 3,
            paddingY: 4,
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography
                    sx={{
                        fontSize: {
                            lg: 35,
                            md: 25,
                            sm: 25,
                            xs: 15,
                        },
                        color: colors.main,
                        fontWeight: "bolder",
                        fontFamily: publicFontFamily,

                    }}>
                    {lang === 'en' ?
                        "Would you like to send a congratulations?"
                        : "هل تود ارسال تهنئة؟"}
                </Typography>
                <InputBase
                    type="checkbox"
                    id="cogratz"
                    sx={{
                        accentColor: colors.main,
                        '& .MuiInputBase-input': {
                            cursor: "pointer",
                            height: {
                                md: 50,
                                sm: 30,
                                xs: 25,
                            },
                            width: {
                                md: 50,
                                sm: 30,
                                xs: 25,
                            }
                        }
                    }}
                    name="congratzStatus"
                    value={values?.congratzStatus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Box>

            <Box
                sx={{
                    transition: "all ease 0.4s",
                    maxHeight: values?.congratzStatus ? 1500 : 0,
                    my: values?.congratzStatus ? "25px" : 0,
                    overflow: "hidden",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Stack
                    sx={{
                        width: '100%',
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: {
                            md: '100px',
                            sm: '0px'
                        },
                        py: "20px",
                        gap: "20px",
                    }}>
                    {["text", "voice", "video"].map((item) => (
                        <Button
                            key={item}
                            sx={{
                                fontFamily: publicFontFamily,
                                fontWeight: "bold",
                                fontSize: "16px",
                                border: 1,
                                borderRadius: 5,
                                borderColor: colors.main,
                                bgcolor:
                                    values?.congratz?.type === item
                                        ? `${colors.main} !important`
                                        : "#fff",
                                color: values?.congratz?.type === item ? "#fff" : colors.main,
                            }}
                            onClick={() => addCongratzType(item)}
                        >
                            {lang === "en" ? item : arabicTypes[item]}
                        </Button>
                    ))}
                </Stack>
                <Stack
                    sx={{
                        flexDirection: {
                            md: "row",
                            xs: "column",
                        },
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        px: "20px",
                        gap: 3,
                        width: '100%',
                    }}
                >
                    <CheckTextInput
                        type="text"
                        name="congratz.content.from"
                        label={lang === "en" ? "Sender" : "المرسل"}
                        value={values.congratz?.content?.from}
                        error={errors.congratz?.content?.from}
                        touched={touched.congratz?.content?.from}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    <CheckTextInput
                        type="text"
                        name="congratz.content.to"
                        label={lang === "en" ? "Reciever" : "المستلم"}
                        value={values.congratz?.content?.to}
                        error={errors.congratz?.content?.to}
                        touched={touched.congratz?.content?.to}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />

                </Stack>
                <Stack
                    sx={{
                        width: '100%',
                    }}>
                    {values?.congratz?.type === "text" ? (
                        <CheckTextArea
                            name="congratz.content.data"
                            label={lang === "en" ? "Text" : "النص"}
                            value={values.congratz?.content?.data}
                            error={errors.congratz?.content?.data}
                            touched={touched.congratz?.content?.data}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />
                    ) : undefined}

                </Stack>

                {values?.congratz?.type === "voice" ? (
                    <Box my="25px" px="25px">
                        <RecordVoideNew
                            setRecordVoice={setRecordVoice}
                            recordVoice={recordVoice}
                            setFieldValue={setFieldValue}
                        />
                    </Box>
                ) : undefined}
                {values?.congratz?.type === "video" ? (
                    <Box my="25px" px="25px">
                        <UploadFile
                            acceptFile={"video/*"}
                            label={lang === "en" ? "Upload video" : "حمل فيديو"}
                            language={lang}
                            formikKey={values.congratz?.content?.data}
                            setState={handleUploadVideo}
                            error={errors.congratz?.content?.data}
                            isTouched={touched.congratz?.content?.data}
                        />
                    </Box>
                ) : undefined}
                {values?.congratz?.type === "video"
                    ? uploadedVideo && (
                        <Box mb="25px" px="25px">
                            <CardMedia
                                controls
                                component="video"
                                sx={{
                                    height: {
                                        md: 400,
                                        xs: 280,
                                    },
                                    width: {
                                        md: 400,
                                        xs: 1,
                                    },
                                }}
                                src={URL.createObjectURL(uploadedVideo)}
                            />
                        </Box>
                    )
                    : undefined}
            </Box>
        </Box>
    )
}
