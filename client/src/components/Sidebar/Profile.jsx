import * as React from "react";
import {
    Avatar,
    Box,
    Button,
    CardMedia,
    Menu,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { colors, publicFontFamily } from "../publicStyle/publicStyle";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./../../store/Store";
import { savedProductsApi } from "../../APIs/SavedProductApi";
import cartApi from "../../APIs/cartApi";
import { setSaved } from "../../APIs/savedSlice";
import { setCart } from "../../APIs/cartSlice";
import CloseIcon from "@mui/icons-material/Close";
import { removeCurrentUser } from "../../APIs/userSlice";
import { useLogoutMutation } from "../../APIs/UserApis";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { dashboardUrl } from "../service";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useCreateGuestUserMutation } from "../../APIs/gestUserApi";
import { ProfileMenuData } from "../nav/nav.data";

export default function Profile() {
    const { currentUser } = useSelector((state) => state);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const open = Boolean(anchorEl);

    const [createGuestUser] = useCreateGuestUserMutation()

    const handleLogout = () => {
        handleClose();
        logout().then(() => {
            localStorage.clear();
            localStorage.clear();
            store.dispatch(savedProductsApi.util.resetApiState());
            store.dispatch(cartApi.util.resetApiState());
            dispatch(setSaved(0));
            dispatch(setCart(0));
            navigate("/");
            dispatch(removeCurrentUser());
            createGuestUser()
                .unwrap()
                .then((res) => {
                    localStorage.setItem('token', res.token)
                })
        });
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [_, { language }] = useTranslation();
    const handleClickMenuItem = (item) => {
        item.name_en === "Logout" ? handleLogout() : navigate(item.path);
        handleClose();
    };
    console.log(currentUser, 'currentUser')


    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, }}>
            {currentUser?.imageUrl ?
                <Avatar
                    sx={{
                        width: {
                            sm: "50px",
                            sx: '50px',
                        },
                        height: {
                            sm: "50px",
                            sx: '50px',
                        },
                    }}
                    alt={currentUser.name} src={currentUser.imageUrl}
                />
                :
                <PersonOutlineIcon
                    sx={{
                        width: {
                            sm: "50px",
                            sx: '50px',
                        },
                        height: {
                            sm: "50px",
                            sx: '50px',
                        },
                        color: '#EBEBEB',
                    }}
                />}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                color: "#EBEBEB",
            }}>
                {currentUser &&
                    ["rootAdmin", "subAdmin", "adminA", "adminB", "adminC"].includes(
                        currentUser.role
                    ) ? (
                    <>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            onClick={() => window.open(dashboardUrl, "_blank")}
                            sx={{
                                padding: '0px',
                                margin: '0px',
                                color: '#EBEBEB',
                                cursor: "pointer",
                                gap: 1,
                                "&:hover": {
                                    bgcolor: "rgba(0, 0, 0, 0.04)",
                                },
                            }}
                        >
                            <DashboardIcon fontSize="small" />
                            <Typography
                                sx={{
                                    fontSize: {
                                        sm: '10px',
                                        xs: '10px',
                                    },
                                    fontFamily: publicFontFamily,
                                    fontWeight: "bold",
                                }}
                            >
                                {language === "en" ? "Dashboard" : "لوحة التحكم"}
                            </Typography>
                        </Stack>
                        <hr style={{ width: '80%', margin: 0 }} />
                    </>
                ) : undefined}
                {currentUser &&
                    [
                        "rootAdmin",
                        "subAdmin",
                        "adminA",
                        "adminB",
                        "adminC",
                        "user",
                    ].includes(currentUser.role)
                    ?
                    <>
                        <Button
                            sx={{
                                color: '#EBEBEB',
                                padding: '0px',
                                margin: '0px',
                                fontSize: {
                                    sm: '10px',
                                    xs: '10px',
                                },
                                fontWeight: "bold",
                                fontFamily: publicFontFamily,
                            }}
                            variant="text"
                            onClick={() => {
                                navigate('/profile')
                            }}>
                            {
                                language === "en"
                                    ? "Profile"
                                    : "الصفحة الشخصية"
                            }
                        </Button>
                        <hr style={{ width: '80%', margin: 0 }} />
                        <Button
                            sx={{
                                padding: '0px',
                                margin: '0px',
                                color: '#EBEBEB',
                                fontWeight: "bold",
                                fontSize: {
                                    sm: '10px',
                                    xs: '10px',
                                },
                                fontFamily: publicFontFamily,
                            }}
                            variant="text"
                            onClick={() => {
                                handleLogout();
                                handleClose();
                            }}>
                            {
                                language === "en"
                                    ? "Logout"
                                    : "تسجيل خروج"
                            }
                        </Button>
                    </>
                    :
                    <>
                        <Button
                            sx={{
                                textAlign: 'start',
                                fontSize: {
                                    sm: '10px',
                                    xs: '10px',
                                },
                                fontWeight: "bold",
                                color: '#EBEBEB',
                                padding: '0px',
                                margin: '0px',
                                fontFamily: publicFontFamily,

                            }}
                            variant="text"
                            onClick={() => {
                                navigate('/sign-in')
                            }}>
                            {
                                language === "en"
                                    ? "Login"
                                    : "تسجيل دخول"
                            }
                        </Button>
                        <hr style={{ width: '80%', margin: 0 }} />
                        <Button
                            sx={{
                                fontSize: {
                                    sm: '10px',
                                    xs: '10px',
                                },
                                fontWeight: "bold",
                                padding: '0px',
                                margin: '0px',
                                color: '#EBEBEB',
                                fontFamily: publicFontFamily,
                            }}
                            variant="text"
                            onClick={() => {
                                navigate('/register ')
                            }}>
                            {
                                language === "en"
                                    ? "Register"
                                    : "إنشاء حساب"
                            }
                        </Button>
                    </>
                }
            </Box>

            {/* <Tooltip
                title={
                    currentUser &&
                        [
                            "rootAdmin",
                            "subAdmin",
                            "adminA",
                            "adminB",
                            "adminC",
                            "user",
                        ].includes(currentUser.role)
                        ? language === "en"
                            ? "Profile"
                            : "الصفحة الشخصية"
                        : language === "en"
                            ? "Sign in"
                            : "تسجيل دخول"
                }
            >
                <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    disableRipple
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minWidth: 0,
                        borderRadius: 0,
                        bgcolor: "transparent !important",
                    }}
                >
                    {open ? (
                        <CloseIcon
                            sx={{
                                fontSize: {
                                    width: "40px",
                                    height: "40px",
                                },
                                color: 'white',
                            }}
                        />
                    ) : (
                        <>
                            <PersonOutlineIcon
                                sx={{
                                    fontSize: {
                                        width: "40px",
                                        height: "40px",
                                    },
                                    color: 'white',
                                }}
                            />
                        </>
                    )}
                </Button>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock
                sx={{
                    width: "100%",
                }}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                {ProfileMenuData.filter(({ name_en }) =>
                    (currentUser && currentUser?.role !== "guest" && currentUser?.email) || currentUser?.phone
                        ? name_en !== "Login" && name_en !== "Register"
                        : name_en !== "Profile" && name_en !== "Logout"
                ).map((item) => (
                    <Stack
                        key={item.name_en}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        onClick={() => handleClickMenuItem(item)}
                        sx={{
                            cursor: "pointer",
                            gap: "10px",
                            p: "10px",
                            "&:hover": {
                                bgcolor: "rgba(0, 0, 0, 0.04)",
                            },
                            bgcolor:
                                item.name_en === "Profile" && pathname === "/profile"
                                    ? `#fff !important `
                                    : undefined,
                            svg: {
                                color:
                                    item.name_en === "Profile" && pathname === "/profile"
                                        ? `#fff !important `
                                        : undefined,
                            },
                        }}
                    >
                        {item.icon}
                        <Typography
                            sx={{
                                fontFamily: publicFontFamily,
                                fontWeight: "bold",
                                color: colors.main,
                            }}
                        >
                            {item[`name_${language}`]}
                        </Typography>
                    </Stack>
                ))}
                {currentUser &&
                    ["rootAdmin", "subAdmin", "adminA", "adminB", "adminC"].includes(
                        currentUser.role
                    ) ? (
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        onClick={() => window.open(dashboardUrl, "_blank")}
                        sx={{
                            cursor: "pointer",
                            gap: "10px",
                            p: "10px",
                            "&:hover": {
                                bgcolor: "rgba(0, 0, 0, 0.04)",
                            },
                        }}
                    >
                        <DashboardIcon
                            sx={{
                                color: "#7C4AA3",
                            }}
                        />
                        <Typography
                            sx={{
                                fontFamily: publicFontFamily,
                                fontWeight: "bold",
                                color: colors.main,
                            }}
                        >
                            {language === "en" ? "Dashboard" : "لوحة التحكم"}
                        </Typography>
                    </Stack>
                ) : undefined}
            </Menu> */}
        </div >
    );
}
