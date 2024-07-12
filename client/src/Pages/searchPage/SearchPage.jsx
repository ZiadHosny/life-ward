import { Box, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FilterAttributesMenu from "../departments/FilterAttributesMenu";
import { SearchInput } from "./utilies/SearchInput";
import { useGetAllProductsQuery } from "../../APIs/ProductApis";
import Loader from "../../components/loader/loader";
import { useTheme } from "@emotion/react";
import { publicFontFamily } from "../../components/publicStyle/publicStyle";
import { useSearchParams } from "react-router-dom";
import DepartmentProduct from "../departments/DepartmentProduct";
const SearchPage = () => {
  const [_, { language: lang }] = useTranslation();
  const [params, setSearchParams] = useSearchParams();
  const [manipulateAtts, setManipulateAtts] = useState("");
  const [priceSearchedClicked, setPriceSearchedClicked] = useState(false);
  const [priceQuery, setPriceQuery] = useState("");
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useGetAllProductsQuery(
    query
      .concat(`&${params.toString()}`)
      .concat(manipulateAtts + `&${priceQuery}`)
  );
  const [paginationData, setPaginationData] = useState({});
  const { totalPages } = paginationData;
  const [selectedAtts, setSelectedAtts] = useState([]);
  const [priceState, setPriceState] = React.useState({
    from: 0,
    to: 0,
  });
  const handlPagination = (e, page) => {
    params.set("page", page);
    setSearchParams(params);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  const pageNumber = params.get("page") || 1;
  useEffect(() => {
    params.set("limit", 24);
    params.set("page", pageNumber);
  }, [query, pageNumber]);
  useEffect(() => {
    if (data && !error) {
      setPaginationData(data.paginationResult);
    } else {
      setPaginationData({});
    }
  }, [data, error]);
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
    if (selectedAtts.length) {
      const reduceAttValues = selectedAtts.reduce(
        (acc, item) => [...acc, ...item.values],
        []
      );
      const valuesStrings = reduceAttValues
        .map(({ value_en }) => `&attributes.values.value_en=${value_en}`)
        .join("&");
      setManipulateAtts(valuesStrings);
    } else {
      setManipulateAtts("");
    }
  }, [selectedAtts]);
  useEffect(() => {
    let query;
    if (priceSearchedClicked) {
      query = `priceAfterDiscount[gte]=${priceState.from}&priceAfterDiscount[lte]=${priceState.to}`;
    } else {
      query = ``;
    }
    setPriceQuery(query);
  }, [priceSearchedClicked]);

  return (
    <Box
      sx={{
        py: "200px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "80%",
            },
            mb: {
              xs: "10px",
              md: "0px",
            },
            display: "flex",
            justifyContent: "center",
            mx: "auto",
          }}
        >
          <SearchInput onChange={(value) => setQuery(value)} />
        </Box>
      </Box>
      <Stack
        width={{ xs: "100%", md: "80%" }}
        direction={"row"}
        justifyContent={"flex-end"}
        mx={"auto"}
        mt={"20px"}
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
      <Box mt={"20px"}>
        {isLoading ? (
          <Stack direction={"row"} justifyContent={"center"}>
            <Loader />
          </Stack>
        ) : data && !error ? (
          <Stack
            direction={"row"}
            justifyContent={"center"}
            flexWrap={"wrap"}
            gap={"20px"}
          >
            {data?.data?.map((product, index) => {

              return <DepartmentProduct item={product} key={index} />;
            })}
          </Stack>
        ) : (
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"20vh"}
          >
            <Typography
              sx={{
                color: "red",
                fontFamily: publicFontFamily,
                fontWeight: "bold",
                fontSize: "30px",
              }}
            >
              {lang === "en" ? "No products found" : "لا يوجد منتجات"}
            </Typography>
          </Stack>
        )}
      </Box>
      <Box
        sx={{
          direction: "ltr",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
          width: "100%",
          direction: lang === "ar" ? "ltr" : "rtl",
        }}
      >
        <Pagination
          count={totalPages ? totalPages : 1}
          page={Number(params.get("page" || 1))}
          variant="text"
          shape="rounded"
          onChange={handlPagination}
          sx={{
            "& > svg": {
              transform: `rotateY(${lang === "en" ? "0deg" : "180deg"
                }) !important`,
            },
            "& button": {
              width: "32px",
              height: "32px",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default SearchPage;
