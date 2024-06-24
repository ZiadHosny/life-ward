import { Box, Grid, Typography, Avatar, CardMedia, Stack } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useGetAllBlogsQuery } from "../../APIs/blogsApi";
import styles from "./styles";
import BlogCard from "./BlogCard";
import { publicFontFamily } from "../../components/publicStyle/publicStyle";
const BlogsPage = () => {
  const [_, { language }] = useTranslation();
  const {
    data: dataBlogs,
    error: errorBlogs,
    isLoading,
  } = useGetAllBlogsQuery();
  return (
    <Box sx={styles.root}>
      <Box sx={styles.container}>
        <div sx={styles.header}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            align={"center"}
            sx={{
              fontFamily: publicFontFamily,
              fontWeight: "bold",
              color: "#693096",
            }}
          >
            {language === "en" ? "Blogs" : "مدوناتنا"}
          </Typography>
        </div>
        {isLoading ? (
          <Stack sx={styles.wrapper}>
            <div className="loader"></div>
          </Stack>
        ) : dataBlogs && !errorBlogs ? (
          <Stack direction={"row"} justifyContent={"center"} flexWrap={"wrap"}>
            {dataBlogs.data.map((item) => (
              <BlogCard language={language} item={item} key={item?._id} />
            ))}
          </Stack>
        ) : (
          <Stack sx={styles.wrapper}>
            <Typography
              sx={{
                fontSize: "26px",
                color: "red",
                fontfamily: `${publicFontFamily} !important`,
              }}
            >
              {errorBlogs?.data && errorBlogs.data[`error_${language}`]}
            </Typography>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default BlogsPage;
