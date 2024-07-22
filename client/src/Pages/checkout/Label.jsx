import { Avatar, Box, Typography } from "@mui/material"
import { colors, publicFontFamily } from "../../components/publicStyle/publicStyle";

export const Label = ({ title, value, number }) => {
    const color = value === number - 1 ? colors.main : 'gray'

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
            <Avatar
                sx={{
                    width: {
                        lg: 20,
                        md: 15,
                        sm: 10,
                        xs: 8,
                    },
                    height: {
                        lg: 20,
                        md: 15,
                        sm: 10,
                        xs: 8,
                    },
                    fontSize: '16px',
                    bgcolor: 'transparent',
                    color: color,
                    borderColor: color,
                    border: 1,
                    padding: '10px'
                }}>
                {number}
            </Avatar>
            <Typography
                sx={{
                    fontSize: {
                        lg: 20,
                        md: 15,
                        sm: 12,
                        xs: 10,
                    },
                    color: color,
                    fontWeight: "bold",
                    fontFamily: publicFontFamily,
                }}>
                {title}
            </Typography>
        </Box>
    )
}

export const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
}
