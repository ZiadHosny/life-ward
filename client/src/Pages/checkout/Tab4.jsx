import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { colors, publicFontFamily } from '../../components/publicStyle/publicStyle'
import { useTranslation } from 'react-i18next';

export const Tab4 = () => {
    const [_, { language: lang }] = useTranslation();

    return (
        <Grid
            item lg={4} xs={12}
            sx={{
                textAlign: 'center',
                my: 3,
                borderRadius: 8,
                bgcolor: '#f2e5fc',
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
                    "Enter the following information?"
                    : "ادخل المعلومات التالية؟"}
            </Typography>

        </Grid>
    )
}
