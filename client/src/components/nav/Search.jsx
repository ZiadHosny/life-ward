import { useState, useEffect, Fragment, useRef } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { colors } from './nav.styes';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Menu, Modal, Popover, Popper, Stack, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetAllProductsQuery } from '../../APIs/ProductApis';
import { SearchInput } from '../../Pages/searchPage/utilies/SearchInput';
import Loader from '../loader/loader';
import { publicFontFamily } from '../publicStyle/publicStyle';

export const Search = ({ mobile = false }) => {
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
    const [_, { language: lang }] = useTranslation();
    const [query, setQuery] = useState("");
    const { data, error, isLoading, } = useGetAllProductsQuery(
        query
            .concat(`&limit=24`)
    );

    const SearchList = ({ onClose }) => {

        const ref = useRef(null);

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    onClose();
                }
            };

            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [onClose]);


        return (
            <List
                ref={ref}
                sx={{
                    position: 'absolute',
                    top: 50,
                    overflow: 'auto',
                    maxHeight: '50vh',
                    width: '100%',
                    zIndex: 2000,
                    border: 1,
                    borderColor: colors.main,
                    bgcolor: 'white',
                    color: colors.main
                }}>
                {isLoading ? (
                    <Loader />
                ) : data && !error ? (
                    <>
                        {data?.data?.map((product, index) => {
                            return (
                                <Fragment key={product._id}>
                                    <ListItemButton
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            navigate(
                                                `/productDetails/${product._id}/${product.title_en.replace(/ /g, "-")}`
                                            );
                                            setOpen(false)
                                        }
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar src={product.imagesUrl[0]}>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                lang === "en" ? product?.title_en : product?.title_ar
                                            }
                                            primaryTypographyProps={{ color: colors.main, fontWeight: 'bold' }}
                                            secondary={
                                                <>
                                                    {product?.priceAfterDiscount}
                                                    {" "}
                                                    {lang === "en" ? "SAR" : "ر.س"}
                                                </>
                                            }
                                            sx={{ color: 'black' }}
                                        />
                                    </ListItemButton>
                                    {data?.data.length - 1 > index ?
                                        <hr style={{ backgroundColor: colors.main }} /> :
                                        <></>
                                    }
                                </Fragment>
                            )
                        })}
                    </>
                ) : (
                    <Typography
                        sx={{
                            color: colors.main,
                            textAlign: 'center',
                            fontFamily: publicFontFamily,
                            fontWeight: "bold",
                            fontSize: "30px",
                        }}
                    >
                        {lang === "en" ? "No products found" : "لا يوجد منتجات"}
                    </Typography>
                )}
            </List>
        )
    }

    return (
        <div
            style={{
                position: 'relative',
                zIndex: 2000,
            }}>
            <Paper
                component="form"
                sx={{
                    height: 50,
                    p: '2px 4px',
                    borderRadius: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    border: 1,
                    opacity: mobile ? '.7' : '1',
                    borderColor: colors.main,
                    width: {
                        md: "400px",
                        lg: "600px",
                    },
                }}>
                <IconButton
                    type="button"
                    sx={{
                        p: '10px',
                        color: colors.main,
                    }}
                    aria-label="search">
                    <SearchIcon
                        fontSize='large'
                        sx={{ fontWeight: 'bold' }} />
                </IconButton>
                <SearchInput
                    onChange={(value) => setQuery(value)}
                    setOpen={setOpen}
                />
            </Paper>
            {query && open ? <SearchList onClose={() => setOpen(false)} /> : <></>}
        </div >
    )
}