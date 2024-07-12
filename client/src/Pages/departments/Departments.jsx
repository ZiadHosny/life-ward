import { Box, Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cards from "../../components/cards/Cards";
import CustomError from "../../components/Error/Error";
import Loader from "../../components/loader/loader";
import useFetchCategories from "../home/category/useFetchCategories";
import useFetchDepartments from "./useFetchDepartments";
import { useLazyGetAllSubCategoriesQuery } from "../../APIs/categoriesApi";
import {
  useGetAllCategoriesQuery,
  useLazyGetProductsByDepartmentsQuery,
} from "../../APIs/categoriesApi";
import { useTranslation } from "react-i18next";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Typography } from "@mui/joy";
import {
  colors,
  publicFontFamily,
  publicSizes,
} from "../../components/publicStyle/publicStyle";
import SeparateDepartment from "./SeparateDepartment";
import FilterAttributesMenu from "./FilterAttributesMenu";
import ProductCard from "../../components/productCard/ProductCard";
import CartIcon from "./carticon.svg";

function Departments() {
  // MANIPULATING THE STRUCTURE OF THE PRODUCTS ARRAY TO MAKE THE REQUIRED DESIGN
  const [pros, setPros] = useState();
  const { categoryId } = useParams();
  const [selectedAtts, setSelectedAtts] = React.useState([]);
  const [priceSearchedClicked, setPriceSearchedClicked] = React.useState(false);

  const [priceState, setPriceState] = React.useState({
    from: 0,
    to: 0,
  });
  const manipulateQuery = () => {
    let query = "";
    const reduceSelectedValues = selectedAtts.reduce(
      (acc, selected) => [...acc, ...selected.values],
      []
    );
    const joinedValues_en = reduceSelectedValues
      .map(({ value_en }) => `attributes.values.value_en=${value_en}`)
      .join("&");
    query += `${joinedValues_en}`;
    if (priceSearchedClicked) {
      query += `${joinedValues_en ? "&" : ""}priceAfterDiscount[gte]=${priceState.from
        }&priceAfterDiscount[lte]=${priceState.to}`;
    } else {
      query.replace(
        `${joinedValues_en ? "&" : ""}priceAfterDiscount[gte]=${priceState.from
        }&priceAfterDiscount[lte]=${priceState.to}`,
        ""
      );
    }
    return query;
  };
  const { products, error, isLoading } = useFetchDepartments(
    // categoryId + manipulateQuery(),
    // priceState
    "limit=1000&" + manipulateQuery(),
    priceState
  );
  const { pathname } = useLocation();
  const [page, setPage] = React.useState(1);
  const [_, { language }] = useTranslation();
  const [subCategories, setSubCategories] = React.useState();
  const { data: dataCategories } = useGetAllCategoriesQuery();
  const [allCategories, setAllCategories] = React.useState();
  const [subProducts, setSubProducts] = React.useState({
    data: null,
    errorMessage: "",
  });
  const [getAllSubCategories] = useLazyGetAllSubCategoriesQuery();
  const [getProductsByDepartments] = useLazyGetProductsByDepartmentsQuery();

  const fetchCategories = () => {
    getAllSubCategories(
      pathname === "/departments" ? "" : categoryId,
      page ? page : ""
    ).then(({ isError, data }) => {
      if (!isError) {
        setSubCategories(data.data);
        setSubProducts({
          ...subProducts,
          data: null,
        });
      }
    });
    // getProductsByDepartments()
    //   .unwrap()
    //   .then((res) => {
    //      
    //   });
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    if (dataCategories?.data) {
      setAllCategories(dataCategories?.data);
    }
  }, [dataCategories]);
  const navigate = useNavigate();
  const hundleAddAtt = (attribute, selectedValue, event) => {
    const { checked, value } = event.target;
    const existedAtt = selectedAtts.find(
      (item) => item.key_en === attribute.key_en
    );
    if (checked) {
      existedAtt
        ? setSelectedAtts(
          selectedAtts.map((item) =>
            item.key_en === attribute.key_en
              ? {
                key_en: attribute.key_en,
                key_ar: attribute.key_ar,
                values: [...existedAtt.values, { ...selectedValue }],
              }
              : item
          )
        )
        : setSelectedAtts([
          ...selectedAtts,
          {
            key_en: attribute.key_en,
            value_en: attribute.key_ar,
            values: [selectedValue],
          },
        ]);
    } else {
      existedAtt.values.length > 1
        ? setSelectedAtts(
          selectedAtts.map((item) =>
            item.key_en === existedAtt.key_en
              ? {
                ...existedAtt,
                values: existedAtt.values.filter(
                  (item) => item.value_en !== value
                ),
              }
              : item
          )
        )
        : setSelectedAtts(
          selectedAtts.filter((sel) => sel.key_en !== existedAtt.key_en)
        );
    }
  };
  useEffect(() => {
    function productsPattern(items) {
      if (products?.length > 0) {
        let arr = [];
        for (let i = 0; i < items.length; i += 8) {
          arr.push(items.slice(i, i + 8));
        }


        setPros(arr);
      }
    }
    productsPattern(products);
  }, [products]);
  return (
    <Box
      sx={{
        pb: 7,
        overflowX: "hidden",
        pt: {
          xs: "80px",
          md: "200px",
          lg: "250px",

        },
      }}
    >
      <Box
        sx={{
          bgcolor: "",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "5px",
          bgcolor: "#DBCDE6",
          py: "10px",
        }}
      >
        <Button
          disableRipple
          sx={{
            color: pathname === `/departments` ? "#74409E" : "#8455A9",
            fontWeight: pathname === `/departments` ? "bolder" : "600",

            transform: "scale(1) !important",
            fontFamily: publicFontFamily,
            fontSize: pathname === `/departments` ? "21px" : publicSizes.xSmall,
            transition: "all 0.4s",
          }}
          onClick={() => navigate(`/departments`)}
        >
          {language === "en" ? "All categories" : "جميع الأقسام"}
        </Button>
        {allCategories?.map((category, idx) => (
          <Button
            key={idx}
            disableRipple
            sx={{
              color:
                pathname ===
                  `/departments/${category._id}/${category.name_en.replace(
                    /\s/g,
                    "-"
                  )}`
                  ? "#74409E"
                  : "#8455A9",
              fontWeight:
                pathname ===
                  `/departments/${category._id}/${category.name_en.replace(
                    /\s/g,
                    "-"
                  )}`
                  ? "bolder"
                  : "600",

              transform: "scale(1) !important",
              fontFamily: publicFontFamily,
              fontSize:
                pathname ===
                  `/departments/${category._id}/${category.name_en.replace(
                    /\s/g,
                    "-"
                  )}`
                  ? "21px"
                  : publicSizes.xSmall,
              transition: "all 0.4s",
            }}
            onClick={() =>
              navigate(
                `/departments/${category._id}/${category.name_en.replace(
                  /\s/g,
                  "-"
                )}`
              )
            }
          >
            {category[`name_${language}`]}
          </Button>
        ))}
      </Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        sx={{
          width: 0.8,
          mx: "auto",
          mt: "30px",
          gap: "20px",
        }}
      >
        <FilterAttributesMenu
          selectedAtts={selectedAtts}
          setSelectedAtts={setSelectedAtts}
          priceState={priceState}
          hundleAddAtt={hundleAddAtt}
          setPriceState={setPriceState}
          priceSearchedClicked={priceSearchedClicked}
          setPriceSearchedClicked={setPriceSearchedClicked}
        />
      </Stack>
      {isLoading ? (
        <Loader />
      ) : !error ? (
        <>
          <Box
            sx={{
              mb: "50px",
              pt: "25px",
              px: { xl: "10%", lg: "10%", md: "5%", xs: "10px" },
            }}
          >
            {pros?.map((set, index) => (
              <Grid container key={index}>
                <Grid
                  item
                  xs={12}
                  md={3}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    gap: 3,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {set[1] && <ProductCard item={set[1]} />}
                  {set[2] && <ProductCard item={set[2]} />}
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {set[0] && <ProductCard item={set[0]} newest={true} />}
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    gap: 3,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {set[3] && <ProductCard item={set[3]} />}
                  {set[4] && <ProductCard item={set[4]} />}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    gap: { md: 25, xs: 3 },
                    my: 10,
                  }}
                >
                  {set[5] && <ProductCard item={set[5]} />}
                  {set[6] && <ProductCard item={set[6]} />}
                  {set[7] && <ProductCard item={set[7]} />}
                </Grid>
              </Grid>
            ))}
          </Box>
        </>
      ) : (
        <CustomError errorMessage={error} />
      )}
    </Box>
  );
}

export default Departments;
{
  /* <SeparateDepartment category={category} manipulateQuery={manipulateQuery} />; */
}
