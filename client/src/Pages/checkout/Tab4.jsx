import { Grid, Typography } from '@mui/material';
import { PaymentMoyasar } from './PaymentMoyasar';
import { colors, publicFontFamily } from '../../components/publicStyle/publicStyle';
import { useTranslation } from 'react-i18next';

export const Tab4 = () => {
    const [_, { language }] = useTranslation();

    return (
        <Grid
            item lg={4} xs={12}
            sx={{
                mx: 'auto',
                width: {
                    lg: '70%',
                    md: '90%',
                    sm: '100%',
                    xs: '100%'
                },
                pb: 10,
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
                    p: 5,
                    color: colors.main,
                    fontWeight: "bolder",
                    fontFamily: publicFontFamily,

                }}>
                {language == "en" ? "Select Payment Method?" : "اختر طريقة الدفع؟"}
            </Typography>
            <PaymentMoyasar />
        </Grid>
    )
}
