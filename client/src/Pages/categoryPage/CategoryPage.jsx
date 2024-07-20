import { Box, Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cards from "../../components/cards/Cards";
import CustomError from "../../components/Error/Error";
import Loader from "../../components/loader/loader";
import { useTranslation } from "react-i18next";
import { setSubId } from '../../APIs/subSlice'
import {
  publicFontFamily,
  publicSizes,
} from "../../components/publicStyle/publicStyle";
import useFetchDepartments from "../departments/useFetchDepartments";
import FilterAttributesMenu from "../departments/FilterAttributesMenu";
import { useDispatch, useSelector } from "react-redux";
import SubSubMenu from "./SubSubMenu";
function CategoryPage() {
  // MANIPULATING THE STRUCTURE OF THE PRODUCTS ARRAY TO MAKE THE REQUIRED DESIGN
  const [pros, setPros] = useState();
  const { categoryId } = useParams();
  const dispatch = useDispatch()
  const { categoriesSlice, sub: subSlice } = useSelector((state) => state);
  const [selectedAtts, setSelectedAtts] = React.useState([]);
  const [priceSearchedClicked, setPriceSearchedClicked] = React.useState(false);

  const subCategoryId = subSlice.subId
  const setSubCategoryId = (id) => {
    dispatch(setSubId(id))
  }

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
    query += `&${joinedValues_en}`;
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
  const [subSubId, setSubSubId] = useState("");
  const { products, error, isLoading } = useFetchDepartments(
    `category=${categoryId}${subCategoryId ? `&subCategory=${subCategoryId}&` : ``
    }${subSubId ? `subSubCategory=${subSubId}` : ``}` + manipulateQuery(),
    priceState
  );
  const [page, setPage] = React.useState(1);
  const [_, { language }] = useTranslation();
  const [subCategories, setSubCategories] = React.useState();

  const hundleAddAtt = (attribute, selectedValue, event) => {
    console.log(attribute, selectedValue, "abdallah");
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
      if (products?.length) {
        let arr = [];
        for (let i = 0; i < items.length; i += 8) {
          arr.push(items.slice(i, i + 8));
        }
        setPros(arr);
      }
    }
    productsPattern(products);
  }, [products]);

  const currentCategory = categoriesSlice?.find(
    (cat) => cat?.id === categoryId
  );
  return (
    <Box
      sx={{
        pb: 7,
        overflowX: "hidden",
        pt: {
          xs: "180px",
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
          gap: "20px",
          bgcolor: "#DBCDE6",
          py: "10px",
        }}
      >
        {currentCategory &&
          currentCategory.subs.map((sub, idx) =>
            sub?.subSubCategories?.length > 0 ? (
              <SubSubMenu
                key={idx}
                item={sub}
                subSubId={subSubId}
                setSubSubId={setSubSubId}
                setSubCategoryId={setSubCategoryId}
                subCategoryId={subCategoryId}
              />
            ) : (
              <Button
                key={idx}
                disableRipple
                sx={{
                  color: subCategoryId === sub.id ? "#74409E" : "#8455A9",
                  fontWeight: subCategoryId === sub.id ? "bolder" : "600",
                  transform: "scale(1) !important",
                  fontFamily: publicFontFamily,
                  fontSize:
                    subCategoryId === sub.id ? "16px" : publicSizes.xSmall,
                  transition: "all 0.4s",
                }}
                onClick={() => {
                  setSubCategoryId(sub.id);
                  setSubSubId("");
                }}
              >
                {sub[`title_${language}`]}
              </Button>
            )
          )}
        <Button
          disableRipple
          sx={{
            color: "#8455A9",
            fontWeight:
              subCategoryId === "" && subSubId === "" ? "bolder" : "600",

            transform: "scale(1) !important",
            fontFamily: publicFontFamily,
            fontSize:
              subCategoryId === "" && subSubId === ""
                ? "16px"
                : publicSizes.xSmall,
            transition: "all 0.4s",
          }}
          onClick={() => {

            setSubCategoryId("");
            setSubSubId("");
          }}
        >
          {language === "en" ? "All category products" : "جميع منتجات القسم"}
        </Button>
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
          <Box>
            <Box
              sx={{
                pb: "100px",
                mt: "30px",
              }}
            >
              <Cards
                page={page}
                setPage={setPage}
                subCategories={subCategories}
                setSubCategories={setSubCategories}
                items={products}
                currentCategory={currentCategory}
              />
            </Box>
          </Box>
          {/* {subProducts?.errorMessage && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
              sx={{
                height: "10vh",
                py: "6vh",
              }}
            >
              <Typography
                sx={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                {subProducts.errorMessage}
              </Typography>
            </Stack>
          )} */}
        </>
      ) : (
        <CustomError errorMessage={error} />
      )}
    </Box>
  );
}

export default CategoryPage;
{
  /* <SeparateDepartment category={category} manipulateQuery={manipulateQuery} />; */
}
