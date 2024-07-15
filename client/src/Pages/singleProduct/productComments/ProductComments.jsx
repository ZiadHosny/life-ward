import {
  Avatar,
  Box,
  Stack,
  Typography,
  InputBase,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { toast } from "react-toastify";
import {
  colors as AllColors,
  publicFontFamily,
} from "../../../components/publicStyle/publicStyle";
import {
  useCreateCommentForProductMutation,
  useGetProductCommentsQuery,
  useRemoveCommentFromProductMutation,
} from "../../../APIs/commentApi";
import { imageBaseUrl } from "../../../components/service";
const TextField = ({ handleSubmit, placeholder, state, setState }) => {
  const [_, { language }] = useTranslation();
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        my: "10px",
      }}
    >
      <InputBase
        type="text"
        size="small"
        sx={{
          // py: 1,
          px: 3,
          width: 0.97,
          color: AllColors.main
        }}
        placeholder={placeholder}
        value={state}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && e.target.value) {
            handleSubmit();
          }
        }}
        onChange={(e) => setState(e.target.value)}
      />
      <Button
        sx={{
          // width: 0.03,
          minWidth: 0,
          mx: 1,
        }}
        onClick={() => {
          if (state) {
            handleSubmit();
          }
        }}
      >
        <SendIcon
          sx={{
            transform: language === "ar" ? "rotate(180deg)" : "rotate(0)",
            color: AllColors.main,
          }}
        />
      </Button>
    </Box>
  );
};

const CommentCard = ({ colors, item }) => {
  const { currentUser } = useSelector((state) => state);
  const [removeCommentFromProduct] = useRemoveCommentFromProductMutation();
  const [_, { language }] = useTranslation();
  const handleRemoveComment = () => {
    removeCommentFromProduct(item._id)
      .unwrap()
      .then((res) => {
        toast.success(res[`success_${language}`]);
      });
  };
  const customMoment = (time) => {
    const custom = moment(time).locale(language).fromNow();
    return custom;
  };
  return (
    <Box mb={"10px"}
      sx={{
        border: 1,
        borderColor: AllColors.main,
        borderRadius: 5,
        bgcolor: '#fbf7ff'
      }}>
      <Box
        sx={{
          margin: "10px",
          marginBottom: "0px",
        }}
      >
        <Stack
          direction={"column"}
          alignItems={"flex-start"}
          gap={"20px"}
          borderRadius={"20px"}
          p={"10px"}
          sx={{
            wordBreak: "break-word",
          }}
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}>
            <Avatar src={imageBaseUrl + item?.user.image} />
            <Typography
              sx={{
                fontSize: "15px",
                color: AllColors.main
              }}
              fontWeight={"bold"}
            >
              {item.user.name}
            </Typography>
            <Typography
              sx={{
                color: "#693096",
                fontSize: "12px",
              }}
            >
              Verified
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                width: '90%',
                margin: 'auto',
                fontSize: "20px",
                color: AllColors.main
              }}
              fontWeight={"bold"}
              variant={"body1"}>{item.comment}</Typography>
          </Box>
        </Stack>
      </Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={"15px"}
        px={
          currentUser
            ? currentUser?._id !== item.user._id
              ? "55px"
              : 0
            : "10px"
        }
      >
        <Typography sx={{ padding: 1, fontWeight: 'bold', color: '#777' }}>
          {customMoment(
            item.createdAt === item.updatedAt ? item.createdAt : item.updatedAt
          )}
        </Typography>
        {currentUser?._id === item.user._id && (
          <Button
            sx={{ minWidth: 0, color: "black" }}
            onClick={handleRemoveComment}
          >
            {language === "en" ? "delete" : "مسح"}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

const CommentCardMobile = ({ colors, item }) => {
  const { currentUser } = useSelector((state) => state);
  const [removeCommentFromProduct] = useRemoveCommentFromProductMutation();
  const [_, { language }] = useTranslation();
  const handleRemoveComment = () => {
    removeCommentFromProduct(item._id)
      .unwrap()
      .then((res) => {
        toast.success(res[`success_${language}`]);
      });
  };
  const customMoment = (time) => {
    const custom = moment(time).locale(language).fromNow();
    return custom;
  };
  return (
    <>
      <Box
        sx={{
          margin: "10px",
          marginBottom: "0px",
        }}
      >
        <Stack
          direction={"column"}
          alignItems={"flex-start"}
          gap={"20px"}
          borderRadius={"20px"}
          p={"10px"}
          sx={{
            wordBreak: "break-word",
          }}
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}>
            <Avatar src={imageBaseUrl + item?.user.image} />
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: AllColors.main
                  }}
                  fontWeight={"bold"}
                >
                  {item.user.name}
                </Typography>
                <Typography
                  sx={{
                    color: "#693096",
                    opacity: '.8',
                    fontSize: "12px",
                  }}
                >
                  Verified
                </Typography>
              </Box>
              <hr style={{ width: '80%', backgroundColor: AllColors.main, }} />
            </Box>
          </Box>

          <Box>
            <Typography
              sx={{
                width: '100%',
                margin: 'auto',
                fontSize: "15px",
                color: AllColors.main
              }}
              fontWeight={"bold"}
              variant={"body1"}>{item.comment}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={"15px"}
        px={
          currentUser
            ? currentUser?._id !== item.user._id
              ? "10px"
              : 0
            : "10px"
        }
      >
        <Typography sx={{ fontSize: 10, fontWeight: 'bold', color: '#777' }}>
          {customMoment(
            item.createdAt === item.updatedAt ? item.createdAt : item.updatedAt
          )}
        </Typography>
        {currentUser?._id === item.user._id && (
          <Button
            sx={{ minWidth: 0, color: "black" }}
            onClick={handleRemoveComment}
          >
            {language === "en" ? "delete" : "مسح"}
          </Button>
        )}
      </Stack>
      <hr style={{ width: '80%', height: '2px', backgroundColor: AllColors.main }} />
    </>
  );
};

const ProductComments = ({ colors, productId }) => {
  const [_, { language }] = useTranslation();
  const { currentUser } = useSelector((state) => state);
  const [comment, setComment] = useState("");
  const [createCommentForProduct] = useCreateCommentForProductMutation();
  const { data, isLoading } = useGetProductCommentsQuery(
    `${productId}?limit=1000`
  );
  const handleSubmit = () => {
    createCommentForProduct({
      comment,
      productId,
    })
      .unwrap()
      .then((res) => {
        toast.success(res[`success_${language}`]);
        setComment("");
      })
      .catch((err) => {
        toast.error(err.data[`error_${language}`]);
      });
  };
  if (isLoading) {
    return null;
  }

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "none",
        width: 0.9,
        mx: "auto",
        direction: language === "en" ? "ltr" : "rtl",
        mb: "50px",
        pb: "40px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          py: '15px',
          paddingX: {
            md: '40px',
            sm: 0,
          },
          fontSize: {
            xl: "40px",
            lg: "35px",
            md: "25px",
            sm: "25px"
          },
          color: AllColors.main,
          fontWeight: 'bold',
          textAlign: language === "en" ? "left" : "right",
          textTransform: "capitalize",
          fontFamily: publicFontFamily,
        }}
      >
        {language === "en" ? "Comments" : "التعليقات"}
      </Typography>
      <Box
        sx={{
          display: {
            md: 'flex',
            sm: 'none',
            xs: 'none'
          },
          flexDirection: 'column',
          gap: 3,
        }}>
        {data?.data.map((item) => (
          <CommentCard item={item} key={item._id} colors={colors} />
        ))}
      </Box>
      {data?.data && data?.data.length > 0 &&
        <Box
          sx={{
            display: {
              md: 'none',
              sm: 'flex'
            },
            border: 1,
            borderColor: AllColors.main,
            borderRadius: 5,
            bgcolor: '#fbf7ff',
            flexDirection: 'column',
            gap: 3,
            paddingBottom: 2,
            marginBottom: 5,
          }}>
          {data?.data.map((item) => (
            <CommentCardMobile item={item} key={item._id} colors={colors} />
          ))}
        </Box>
      }
      {currentUser && (
        <Box mt={"20px"}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            mx={'20px'}
            gap={"10px"}>
            <Avatar src={imageBaseUrl + currentUser?.image} />
            <Typography sx={{ color: AllColors.main, fontWeight: 'bold' }} variant={"h6"}>
              {
                currentUser[
                currentUser.name
                  ? "name"
                  : currentUser.email
                    ? "email"
                    : "phone"
                ]
              }
            </Typography>
          </Stack>
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "50px",
              my: "10px",
              bgcolor: '#faf6fe'
            }}
          >
            <TextField
              state={comment}
              setState={setComment}
              placeholder={
                data?.data?.find((item) => item.user._id === currentUser?._id)
                  ? language === "en"
                    ? "Edit the comment"
                    : "تعديل التعليق"
                  : language === "en"
                    ? "Add comment"
                    : "أضف تعليقك"
              }
              handleSubmit={handleSubmit}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductComments;
