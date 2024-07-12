import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterXIcon from "../../assets/TwiiterX-Icon.png";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { colors } from "../publicStyle/publicStyle";
import {
    Box,
    CardMedia,
    Stack,
    Tooltip,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export const FollowUs = () => {
    const [_, { language: lang }] = useTranslation();

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap="10px"
        >
            <Box sx={{ fontWeight: 'bold', fontSize: 20 }}>
                {lang === 'ar' ? 'تابعنا علي:' : 'Follow us on:'}
            </Box>
            {/* Twitter */}
            <Tooltip title={lang === "en" ? "Twitter" : "تويتر"}>
                <a
                    href="https://twitter.com/lifewardshop"
                    target="_blank"
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#fff  ",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CardMedia
                        src={TwitterXIcon}
                        component={"img"}
                        fill={"red"}
                        sx={{
                            height: "30px",
                            width: "30px",
                            objectFit: "fill",
                        }}
                    />
                </a>
            </Tooltip>
            {/* Facebook */}
            <Tooltip title={lang === "en" ? "Facebook" : "فيسبوك"}>
                <a
                    href="https://www.facebook.com/profile.php?id=61556544278224&mibextid=PtKPJ9/"
                    target="_blank"
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#fff  ",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <FacebookOutlinedIcon
                        sx={{
                            fontSize: "30px",
                            color: colors.main,
                        }}
                    />
                </a>
            </Tooltip>
            {/* Instagram */}
            <Tooltip title={lang === "en" ? "Instagram" : "انستجرام"}>
                <a
                    href="https://www.instagram.com/lifewardshop?igsh=OGF2Y3UxazJobXhv&utm_source=qr"
                    target="_blank"
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#fff  ",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <InstagramIcon
                        sx={{
                            fontSize: "30px",
                            color: colors.main,
                        }}
                    />
                </a>
            </Tooltip>
            {/* youtube */}
            <Tooltip title={lang === "en" ? "Youtube" : "يوتيوب"}>
                <a
                    href="https://youtube.com"
                    target="_blank"
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#fff  ",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <YouTubeIcon
                        sx={{
                            fontSize: "30px",
                            color: colors.main,
                        }}
                    />
                </a>
            </Tooltip>
        </Stack>
    )
}
