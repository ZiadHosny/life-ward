import * as React from 'react';
import Button from '@mui/material/Button';
import * as Yup from "yup";
import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, submitDialog } from '../../APIs/dialogSlice';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SaPhoneInput from '../../components/SaPhoneInput/SaPhoneInput';
import { useFormik } from 'formik';
import { publicFontFamily } from '../../components/publicStyle/publicStyle';

export const Dialog = () => {
    const [, { language: lng }] = useTranslation();
    const { open } = useSelector(state => state.dialog)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [value, setValue] = React.useState('yourself');

    const formik = useFormik({
        initialValues: {
            phone: ''
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .matches(
                    // /^966\d{9}$/,
                    /^\d+$/,
                    lng == "en"
                        ? "Phone must be numbers only"
                        : "رقم الجوال يجب ان يكون أرقام فقط"
                )
                .min(
                    9,
                    lng == "en"
                        ? "Phone must be 9 numbers"
                        : "رقم الجوال يجب ان يكون 9 أرقام"
                )
                .max(
                    9,
                    lng == "en"
                        ? "Phone must be 9 numbers"
                        : "رقم الجوال يجب ان يكون 9 أرقام"
                )
                .required(lng === "en" ? "Phone is required" : "رقم الجوال مطلوب"),
        }),
        onSubmit: ({ phone }) => {
            dispatch(submitDialog({
                phone,
                for: value
            }))
        }
    })

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
    } = formik;

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const handleClose = () => {
        navigate('/cart')
        dispatch(closeDialog())
    };

    return (
        <DialogMui
            maxWidth='xl'
            sx={{
                backgroundColor: "#693096",
            }}
            open={open}
            PaperProps={{
                component: 'form',
                sx: {
                    borderRadius: 5,
                    bgcolor: '#f2e5fc',
                },
                onSubmit: (event) => {
                    event.preventDefault();
                    if (value === 'yourself') {
                        dispatch(submitDialog({
                            phone: '',
                            for: 'yourself',
                        }))
                    } else {
                        handleSubmit()
                    }
                },
            }}>
            <DialogTitle
                fontFamily={publicFontFamily}
                sx={{
                    color: "#693096",
                    fontSize: 30
                }}>
                {lng === "en"
                    ? "Who will you send flowers to?"
                    : "لمن سوف ترسل الورد؟"
                }
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    fontFamily={publicFontFamily}
                    sx={{ fontSize: 20 }}>
                    {lng === "en"
                        ? "If you are sending flowers to a friend, choose a friend and enter his mobile number."
                        : "اذا كنت سوف ترسل الورد لصديق اختار صديق وادخل رقم الموبايل الخاص به."
                    }
                </DialogContentText>
                <RadioGroup
                    name="radio-buttons-group"
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={value}
                    sx={{
                        fontSize: 20,
                        paddingTop: 2,
                        color: "#693096",
                        '& .Mui-checked': {
                            color: '#693096',
                        },
                    }}
                    onChange={onChange}>
                    <FormControlLabel
                        value="yourself"
                        control={<Radio />}
                        label={lng === "en" ? "For yourself" : "إلي نفسك"} />
                    <FormControlLabel
                        value="friend"
                        control={<Radio />}
                        label={lng === "en" ? "For Friend" : "إلي صديق لك"} />
                </RadioGroup>
                {value === 'friend' ?
                    <SaPhoneInput
                        type="text"
                        name="phone"
                        label={lng === "en" ? "Phone" : "رقم الجوال"}
                        value={values.phone}
                        error={errors.phone}
                        touched={touched.phone}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    /> : <></>
                }
            </DialogContent>
            <DialogActions
                sx={{
                    gap: 4,
                }}>
                <Button
                    sx={{
                        color: "#fff",
                        backgroundColor: "#693096", fontSize: 20,
                        '&:hover': {
                            backgroundColor: '#693096',
                            color: '#fff',
                        },
                    }}
                    onClick={handleClose}>
                    {lng === "en" ? "Cancel" : "الغاء"}
                </Button>
                <Button
                    sx={{
                        color: "#fff",
                        backgroundColor: "#693096", fontSize: 20,
                        '&:hover': {
                            backgroundColor: '#693096',
                            color: '#fff',
                        },
                    }}
                    type="submit">
                    {lng === "en" ? "Ok" : "اوافق"}
                </Button>
            </DialogActions>
        </DialogMui >
    );
}