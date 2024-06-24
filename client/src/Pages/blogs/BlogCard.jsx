import { Box, CardMedia, Typography } from "@mui/material";
import React from "react";
import { imageBaseUrl } from "../../components/service";
import moment from "moment";
import styles from "./styles";
import { Link } from "react-router-dom";
const BlogCard = ({ language, item }) => {
  return (
    <Box
      sx={{
        ...styles.card,
        direction: "rtl",
      }}
    >
      <Box elevation={3}>
        <CardMedia
          component="img"
          src={imageBaseUrl + item.image}
          sx={{
            borderRadius: "10px",
            height: {
              xs:300,
              md:400,
              xl:500,
              xl:550
            },
          }}
        />
        <div>
          <Typography variant="overline" color="textSecondary">
            {moment(item.createdAt).fromNow()}
          </Typography>
        </div>
        <div>
          <Typography variant="h6" sx={styles.blogTitle}>
            {item.title}
          </Typography>
          <Box
            variant="body2"
            sx={styles.blogDesc}
            dangerouslySetInnerHTML={{
              __html:
                item.description.length > 200
                  ? item.description.slice(0, 200) + "..."
                  : item.description,
            }}
          />
        </div>
        <Box sx={styles.seeMore}>
          <Link to={`/blogs/${item._id}/${item.title.replace(/\s/g, "-")}`}>
            {language === "en" ? "See More" : "شاهد المزيد"}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogCard;
