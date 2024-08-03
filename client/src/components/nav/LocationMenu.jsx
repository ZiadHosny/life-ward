import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useFetchAllCities } from '../../hooks/cities.hooks'
import { useTranslation } from "react-i18next";
import { publicFontFamily } from "../publicStyle/publicStyle";
import { colors } from "./nav.styes";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCity } from "../../APIs/citySlice";
import { useGetBestLocationMutation } from "../../APIs/locationApi";

export const LocationMenu = () => {
    const [getBestLocation, { }] = useGetBestLocationMutation()

    const [nearestCity, setNearestCity] = useState()
    const { currentCity } = useSelector(state => state.city)
    const dispatch = useDispatch()
    const [_, { language }] = useTranslation();
    const { cities } = useFetchAllCities();

    const handleChange = (event) => {
        dispatch(setCurrentCity(cities.data.find(e => e._id === event.target.value) ?? currentCity))
    };
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async function (position) {
                const nearestCity = await getBestLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                setNearestCity(nearestCity.data?.data)
            });
        } else {
            console.log("Geolocation is not available in your browser.");
        }
    }, []);

    useEffect(() => {
        dispatch(
            setCurrentCity(
                nearestCity ??
                // cities.data.find((city) => city._id === localStorage['city']) ??
                cities.data.find((city) => city.default) ??
                cities.data[0]
            )
        );
    }, [cities, nearestCity, localStorage])

    return (
        <>
            {currentCity &&
                <Select
                    size="small"
                    sx={{
                        m: 1,
                        fontSize: {
                            md: 15,
                            sm: 13,
                            xs: 10,
                        },
                        textAlign: 'center',
                        minWidth: {
                            md: 90,
                            sm: 80,
                            xs: 60,
                        },
                        fontWeight: 'bold',
                        bgcolor: colors.main,
                        color: 'white',
                        fontFamily: publicFontFamily,
                        border: 'none',
                        borderRadius: '10%',
                        '& .MuiSelect-icon': {
                            color: 'white',
                        }
                    }}
                    onChange={handleChange}
                    value={currentCity._id}
                >
                    {cities.data.map((city) => {
                        return (
                            <MenuItem
                                sx={{
                                    fontFamily: publicFontFamily,
                                    fontSize: 15,
                                    textAlign: 'center',
                                    color: colors.main,
                                    fontWeight: 'bold',
                                }}
                                value={city._id}
                                key={city._id}
                            >
                                {city[`name_${language}`]}
                            </MenuItem>
                        )
                    })}
                </Select>
            }

        </>
    )
}
