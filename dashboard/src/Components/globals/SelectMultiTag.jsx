import { useTheme } from "@emotion/react";
import { Box, Typography, FormControl, MenuItem, Select, OutlinedInput, Checkbox, ListItemText } from "@mui/material";
import React from "react";

const SelectMultiTag = ({
    label,
    error,
    touched,
    value,
    name,
    handleChange,
    itemField,
    optionsData,
}) => {
    const { colors, customColors } = useTheme();
    const [list, setList] = React.useState([]);

    return (
        <Box
            sx={{
                mt: "15px",
                position: "relative",
            }}
        >
            <Typography
                sx={{
                    color: colors.text,
                    fontWeight: "bold",
                    fontSize: "15px",
                }}
            >
                {label}
            </Typography>
            <FormControl
                sx={{
                    width: 1,
                    svg: {
                        color: `${colors.main} !important`,
                    },
                }}
            >
                <Select
                    multiple
                    renderValue={(selected) => {
                        const values = optionsData.filter((e) => {
                            return selected.includes(e._id)
                        })
                        const res = values.map((e) => e[itemField])
                        return res.join(', ')
                    }}
                    input={<OutlinedInput label="Tag" />}
                    value={value}
                    name={name}
                    onChange={(e) => {
                        const value = e.target.value
                        setList(typeof value === 'string' ? value.split(',') : value)
                        handleChange(e)
                    }}
                    displayEmpty
                    sx={{
                        width: 1,
                        border: 1,
                        height: 45,
                        borderColor:
                            customColors[error && touched ? "dangerous" : "inputBorderColor"],
                        bgcolor: customColors.bg,
                    }}
                >
                    {optionsData.map((item, idx) => {
                        return (
                            <MenuItem key={idx} value={item._id}>
                                <Checkbox checked={list.indexOf(item._id) > -1} />
                                <ListItemText primary={item[itemField]} />
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            {
                error && touched ? (
                    <Typography
                        sx={{
                            color: colors.dangerous,
                        }}
                    >
                        {error}
                    </Typography>
                ) : undefined
            }
        </Box >
    );
};

export default SelectMultiTag;
