import {
  Box,
  Button,
  CardMedia,
  Grid,
  InputBase,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useFormik } from "formik";
import { productValues } from "../../formik/initValues";
import { productErrors } from "../../formik/errors";
import ProductQualities from "../../Components/product/ProductQualities";
import { useNavigate, useParams } from "react-router-dom";
import { useUploadFilesMutation } from "../../api/upload.api";
import {
  useGetProductById,
  useUpdateProductInfo,
} from "../../hooks/products.hooks";
import ProductAttributes from "../../Components/product/ProductAttributes";
import MetaAccordions from "../../Components/metaAccordion/MetaAccordions";
import SelectTag from "../../Components/globals/SelectTag";
import { useFetchAllCategories } from "../../hooks/categories.hooks";
import { useFetchSubCategoriesByCategoryId } from "../../hooks/subCategories.hooks";
import { paymentTypes } from "../../Components/product/productAssets";
import ProductKeywords from "../../Components/product/ProductKeywords";
import UploadFiles from "../../Components/globals/UploadFiles";
import { imageBaseUrl } from "../../api/baseUrl";
import { useTranslation } from "react-i18next";
import { useFetchSubSubCategoryBySubId } from "../../hooks/subSubCategories.hooks";
import DraftEditor from "../../Components/globals/draftEditor/DraftEditor";
import ProductQualitiesImages from "../../Components/product/ProductQualitiesImages";
import SelectMultiTag from "../../Components/globals/SelectMultiTag";
import { useFetchNeighborhoodsByCityId } from "../../hooks/neighborhood.hooks";
import { useFetchAllCities } from "../../hooks/cities.hooks";
const EditProductPage = () => {
  const { id } = useParams();
  const { product } = useGetProductById(id);
  const [productImages, setProductImages] = useState([]);
  const { colors, btnStyle, customColors, breakpoints } = useTheme();
  const staticUploadedImageName = "my-upload-file";
  const [_, { language }] = useTranslation();
  const [uploadFiles, { isLoading: uploadFilesLoading }] =
    useUploadFilesMutation();

  const [updateProductInfo, { isLoading }] = useUpdateProductInfo();
  const formik = useFormik({
    initialValues: productValues,
    validationSchema: productErrors(language),
    onSubmit: (values) => {
      if (productImages[0] || coverPhoto) {
        const formData = new FormData();
        if (coverPhoto) {
          [coverPhoto, ...productImages].forEach((file) => {
            return formData.append(`files`, file);
          });
        } else {
          productImages.forEach((file) => {
            return formData.append(`files`, file);
          });
        }
        uploadFiles(formData)
          .unwrap()
          .then((res) => {
            if (coverPhoto) {
              updteProductHelper({
                ...values,
                images: [
                  res.files[0],
                  ...values.images.filter(
                    (image) => image !== staticUploadedImageName
                  ),
                  ...res.files.slice(1, res.files.length),
                ],
              });
            } else {
              updteProductHelper({
                ...values,
                priceBeforeDiscount: values.priceBeforeDiscount + 5,
                images: values.images
                  .filter((image) => image !== staticUploadedImageName)
                  .concat(res.files),
              });
            }
          });
      } else {
        updteProductHelper(values);
      }
    },
  });

  const updteProductHelper = (payload) => {
    const temp = JSON.parse(JSON.stringify(payload));
    !temp.title_meta ? delete temp.title_meta : undefined;
    !temp.desc_meta ? delete temp.desc_meta : undefined;
    !temp.extention ? delete temp.extention : undefined;
    !temp.subSubCategory ? delete temp.subSubCategory : undefined;
    !temp.cities ? delete temp.cities : undefined;
    !temp.neighborhoods ? delete temp.neighborhoods : undefined;
    delete temp.title;
    delete temp.role;
    delete temp.message;
    delete temp.receiver;
    temp.qualities.map((quality) => ({
      ...quality,
      values:
        quality.key_en === "colors"
          ? quality.values
          : quality.values.map((val) => {
            return {
              value_en: val.value_en,
              value_ar: val.value_ar,
              price: val.price,
            };
          }),
    }));
    updateProductInfo(temp, product?.data._id);
  };
  const navigate = useNavigate();
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
  } = formik;
  const [file, setFile] = useState();
  const [coverPhoto, setCoverPhoto] = useState();
  const handleUploadFile = (e) => {
    setFieldValue("images", [...values.images, staticUploadedImageName]);
    const files = e.target.files;
    const uploadedFiles = Object.values(files);
    setProductImages((prev) => [...prev, ...uploadedFiles]);
  };
  useEffect(() => {
    if (product?.data) {
      setDescriptionValues({
        ...descriptionValues,
        description_ar: product?.data?.description_ar,
        description_en: product?.data?.description_en,
      });
      Object.keys(product.data).forEach((key) => {
        if (key in values) {
          switch (key) {
            case "category":
              return setFieldValue(
                "category",
                product.data.category.map((v) => v._id) || []
              );
            case "subCategory":
              return setFieldValue(
                "subCategory",
                product.data.subCategory.map((v) => v._id) || []
              );

            case "cities":
              return setFieldValue(
                "cities",
                product.data.cities.map((v) => v._id) || []
              );

            case "neighborhoods":
              return setFieldValue(
                "neighborhoods",
                product.data.neighborhoods.map((v) => v._id) || []
              );

            case "attributes":
              return setFieldValue(
                "attributes",
                product.data.attributes.map((attribute) => ({
                  key_en: attribute.key_en,
                  key_ar: attribute.key_ar,
                  values: attribute.values.map((item) => ({
                    value_en: item.value_en,
                    value_ar: item.value_ar,
                  })),
                }))
              );
            case "qualities":
              return setFieldValue(
                "qualities",
                product.data.qualities.map((quality) => ({
                  key_en: quality.key_en,
                  key_ar: quality.key_ar,
                  values: quality.values.map((item) => ({
                    value_en: item.value_en,
                    value_ar: item.value_ar,
                    color: item.color,
                    price: item.price,
                  })),
                }))
              );
            case "qualitiesImages":
              return setFieldValue(
                "qualitiesImages",
                product.data.qualitiesImages.map((item) => ({
                  image: item.image,
                  qualities: item.qualities.map((qual) =>
                    qual.key_en === "colors"
                      ? {
                        key_en: qual.key_en,
                        key_ar: qual.key_ar,
                        value_en: qual.value_en,
                        value_ar: qual.value_ar,
                        color: qual.color,
                      }
                      : {
                        key_en: qual.key_en,
                        key_ar: qual.key_ar,
                        value_en: qual.value_en,
                        value_ar: qual.value_ar,
                      }
                  ),
                }))
              );
            default:
              setFieldValue(key, product.data[key]);
              break;
          }
        }
        setFieldValue("title_meta", product.data?.metaDataId?.title_meta || "");
        setFieldValue("desc_meta", product.data?.metaDataId?.desc_meta || "");
      });
      setFieldValue("subCategory", product.data.subCategory.map((v) => v._id) || []);
      setFieldValue("subSubCategory", product.data.subSubCategory.map((v) => v._id) || []);
      setFieldValue("cities", product.data.cities.map((v) => v._id) || []);
      setFieldValue("neighborhoods", product.data.neighborhoods.map((v) => v._id) || []);
    }
  }, [product]);
  const { categories } = useFetchAllCategories();
  const { subCategories } = useFetchSubCategoriesByCategoryId(values.category);
  const phoneScreen = useMediaQuery(breakpoints.down("lg"));
  const { subSubCategories } = useFetchSubSubCategoryBySubId(
    values.subCategory
  );

  const { cities } = useFetchAllCities();
  const { neighborhoods } = useFetchNeighborhoodsByCityId(
    values.cities
  );

  const [descriptionValues, setDescriptionValues] = useState({
    description_ar: "",
    description_en: "",
  });
  const handleUploadMainPicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPhoto(file);
      productImages.length === 0 && !coverPhoto
        ? setFieldValue("images", [...values.images, staticUploadedImageName])
        : undefined;
    }
  };
  const deleteImage = (file) => {
    if (typeof file === "string") {
      formik.setValues({
        ...values,
        images: values.images.filter((item) => item !== file),
      });
      if (file) setFile();
    } else {
      if (productImages.length === 1 && !coverPhoto) {
        setFieldValue(
          "images",
          values.images.filter((img) => img !== staticUploadedImageName)
        );
      }
      setProductImages(
        productImages.filter((_, index, self) => {
          const selectedImageIndex = self.findIndex(
            (el) => el.name === file.name
          );
          return index !== selectedImageIndex;
        })
      );
      if (file) setFile();
    }
  };


  console.log(values, 'zzzzzzzz')

  return (
    <Box
      sx={{
        p: {
          lg: 3,
          md: 2.5,
          xs: 1.5,
        },
        bgcolor: colors.bg_main,
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Box py={5}>
        <Typography variant="h4" mb={"10px"}>
          {language === "en" ? "products" : "المنتجات"}
        </Typography>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
            <Typography
              variant="h6"
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {language === "en" ? "Home" : "الصفحة الرئيسية"}
            </Typography>
            <ArrowForwardIosIcon
              sx={{
                transform: language === "ar" ? "rotateY(180deg)" : 0,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: "16px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/products")}
            >
              {language === "en" ? "products" : "المنتجات"}
            </Typography>
            {product.data && !product.error ? (
              <>
                <ArrowForwardIosIcon
                  sx={{
                    transform: language === "ar" ? "rotateY(180deg)" : 0,
                    fontSize: "16px",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: colors.main,
                    fontSize: "16px",
                  }}
                >
                  {product.data[`title_${language}`]}
                </Typography>
              </>
            ) : undefined}
          </Stack>
          <ArrowForwardIosIcon
            onClick={() => navigate(-1)}
            sx={{
              cursor: "pointer",
              transform: language === "ar" ? "rotateY(180deg)" : 0,
            }}
          />
        </Stack>
      </Box>
      <Grid container>
        {/* Grid Media */}
        <Grid item lg={6} xs={12}>
          <Stack
            sx={{
              flexDirection: {
                lg: "row",
                xs: "column-reverse",
              },
              gap: "15px",
            }}
          >
            {values.images.length + productImages.length > 0 || coverPhoto ? (
              <Stack
                sx={{
                  flexDirection: {
                    lg: "column",
                    xs: "row",
                  },
                  maxHeight: {
                    lg: 480,
                    xs: "auto",
                  },
                  overflowY: {
                    lg:
                      values.images.length + productImages.length > 3
                        ? "scroll"
                        : "auto",
                    xs: "auto",
                  },
                  overflowX: "hidden",
                  gap: {
                    lg: 0,
                    xs: "10px",
                  },
                  flexWrap: {
                    lg: "nowrap",
                    xs: "wrap",
                  },
                  "::-webkit-scrollbar": {
                    width: "7.5px",
                  },
                  width: {
                    lg: 100,
                    xs: 1,
                  },
                }}
              >
                {coverPhoto && (
                  <Box position={"relative"} mt={"10px"}>
                    <Button
                      sx={{
                        bgcolor: `${colors.dangerous} !important`,
                        minWidth: 0,
                        position: "absolute",
                        top: 0,
                        right: language === "ar" ? 0 : undefined,
                        left: language === "en" ? 0 : undefined,
                        height: 20,
                        width: 20,
                      }}
                      onClick={() => {
                        setCoverPhoto();
                        if (coverPhoto && productImages.length === 0) {
                          setFieldValue(
                            "images",
                            values.images.filter(
                              (i) => i !== staticUploadedImageName
                            )
                          );
                        }
                      }}
                    >
                      <CloseIcon
                        sx={{
                          color: "#fff",
                          fontSize: "15px",
                        }}
                      />
                    </Button>
                    <CardMedia
                      src={
                        coverPhoto ? URL.createObjectURL(coverPhoto) : undefined
                      }
                      component="img"
                      sx={{
                        height: 100,
                        width: 80,
                        objectFit: "cover",
                        borderRadius: "10px",
                        mt: {
                          lg: "15px",
                          xs: 0,
                        },
                        mb: {
                          lg: 0,
                          xs: "15px",
                        },
                      }}
                    />
                  </Box>
                )}
                {values.images
                  .filter((image) => image !== staticUploadedImageName)
                  .map((image, idx) => (
                    <Box position={"relative"} key={idx} mt={"10px"}>
                      <Button
                        sx={{
                          bgcolor: `${colors.dangerous} !important`,
                          minWidth: 0,
                          position: "absolute",
                          top: 0,
                          right: language === "ar" ? 0 : undefined,
                          left: language === "en" ? 0 : undefined,
                          height: 20,
                          width: 20,
                        }}
                        onClick={() => deleteImage(image)}
                      >
                        <CloseIcon
                          sx={{
                            color: "#fff",
                            fontSize: "15px",
                          }}
                        />
                      </Button>
                      <CardMedia
                        src={`${imageBaseUrl}${image}`}
                        component="img"
                        sx={{
                          height: 100,
                          width: 80,
                          objectFit: "cover",
                          borderRadius: "10px",
                          mt: {
                            lg: "15px",
                            xs: 0,
                          },
                          mb: {
                            lg: 0,
                            xs: "15px",
                          },
                        }}
                      />
                    </Box>
                  ))}
                {productImages?.map((image, idx) => (
                  <Box position={"relative"} key={idx} mt={"10px"}>
                    <Button
                      sx={{
                        bgcolor: `${colors.dangerous} !important`,
                        minWidth: 0,
                        position: "absolute",
                        top: 0,
                        right: language === "ar" ? 0 : undefined,
                        left: language === "en" ? 0 : undefined,
                        height: 20,
                        width: 20,
                      }}
                      onClick={() => deleteImage(image)}
                    >
                      <CloseIcon
                        sx={{
                          color: "#fff",
                          fontSize: "15px",
                        }}
                      />
                    </Button>
                    <CardMedia
                      src={image ? URL.createObjectURL(image) : image}
                      component="img"
                      sx={{
                        height: 100,
                        width: 80,
                        objectFit: "cover",
                        borderRadius: "10px",
                        mt: {
                          lg: "15px",
                          xs: 0,
                        },
                        mb: {
                          lg: 0,
                          xs: "15px",
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            ) : undefined}

            <UploadFiles
              error={errors.images}
              touched={touched.images?.length < 1}
              file={file}
              handleUploadFile={handleUploadFile}
              context={language ? "Uplaad product image" : "رفع صورة المنتج"}
              coverPhoto={true}
              handleUploadMainPicture={handleUploadMainPicture}
              extraStyle={{
                height: 500,
                width: {
                  lg: values.images.length > 0 ? "calc(100% - 100px)" : 1,
                  xs: 1,
                },
              }}
            />
          </Stack>
          {!phoneScreen && (
            <Box>
              <Box mt={"15px"}>
                <ProductQualities
                  language={language}
                  productQualities={values?.qualities || []}
                  produuctSetFieldValue={setFieldValue}
                />
              </Box>
              {/* FORM Qualities IMAGES LARGE */}

              <Box mt={"15px"}>
                <ProductQualitiesImages
                  language={language}
                  productQualities={values?.qualities || []}
                  productQualitiesImages={values.qualitiesImages}
                  produuctSetFieldValue={setFieldValue}
                />
              </Box>
              <Box mt={"15px"}>
                <ProductAttributes
                  language={language}
                  productAttributes={values.attributes}
                  setProductFieldValue={setFieldValue}
                />
              </Box>
              <Box mt={"15px"}>
                <MetaAccordions
                  metaTitle={values.title_meta}
                  metaDesc={values.desc_meta}
                  setFieldValue={setFieldValue}
                  isEdit={true}
                />
              </Box>
            </Box>
          )}
        </Grid>

        {/* Grid fields */}
        <Grid
          item
          lg={6}
          xs={12}
          sx={{
            px: {
              md: "20px",
              xs: 0,
            },
          }}
        >
          {/* FORM TITLE_EN */}
          <Box mt={"15px"}>
            <Typography
              sx={{
                color: customColors.text,
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              {language === "en" ? "English title" : "اللقب الانجليزى"}
            </Typography>
            <InputBase
              sx={{
                width: 1,
                border: 1,
                borderColor:
                  customColors[
                  errors.title_en && touched.title_en
                    ? "dangerous"
                    : "inputBorderColor"
                  ],
                borderRadius: "4px",
                p: "2px 4px",
                bgcolor: customColors.bg,
              }}
              name={"title_en"}
              type={"text"}
              value={values?.title_en}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.title_en && touched.title_en ? (
              <Typography
                sx={{
                  color: customColors.dangerous,
                }}
              >
                {errors.title_en}
              </Typography>
            ) : undefined}
          </Box>
          {/* FORM TITLE_AR */}
          <Box mt={"15px"}>
            <Typography
              sx={{
                color: customColors.text,
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              {language === "en" ? "Arabic title" : "اللقب العربي"}
            </Typography>
            <InputBase
              sx={{
                width: 1,
                border: 1,
                borderColor:
                  customColors[
                  errors.title_ar && touched.title_ar
                    ? "dangerous"
                    : "inputBorderColor"
                  ],
                borderRadius: "4px",
                p: "2px 4px",
                bgcolor: customColors.bg,
              }}
              name={"title_ar"}
              type={"text"}
              value={values?.title_ar}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.title_ar && touched.title_ar ? (
              <Typography
                sx={{
                  color: customColors.dangerous,
                }}
              >
                {errors.title_ar}
              </Typography>
            ) : undefined}
          </Box>
          {/* FORM DESCRIPTION_EN */}

          <Box mt={"15px"}>
            <Stack
              sx={{
                margin: "10px 0px",
                "line-height": "1.5",
                "letter-spacing": "0.00938em",
                "font-weight": "700",
                "font-size": "15px",
              }}
            >
              {language === "en" ? "english description" : "الوصف الانجليزي"}
            </Stack>
            <DraftEditor
              field="description_en"
              error={errors.description_en}
              touched={touched.description_en}
              value={descriptionValues?.description_en}
              edit={true}
              handleChange={(value) => {

                setFieldValue("description_en", value);
              }}
              handleBlur={() => {
                setFieldTouched("description_en", true);
              }}
            />
            {errors.description_en && touched.description_en ? (
              <Typography
                sx={{
                  color: customColors.dangerous,
                }}
              >
                {language === "en" ? "required" : "مطلوب"}{" "}
              </Typography>
            ) : undefined}
          </Box>

          {/* FORM DESCRIPTION_AR */}
          <Box mt={"15px"}>
            <Stack
              sx={{
                margin: "10px 0px",
                "line-height": "1.5",
                "letter-spacing": "0.00938em",
                "font-weight": "700",
                "font-size": "15px",
              }}
            >
              {language === "en" ? "Arabic description" : "الوصف بالعربي"}
            </Stack>

            <DraftEditor
              field="description_ar"
              error={errors.description_ar}
              value={descriptionValues?.description_ar}
              touched={touched.description_ar}
              handleChange={(value) => setFieldValue("description_ar", value)}
              handleBlur={() => {
                setFieldTouched("description_ar", true);
              }}
              edit={true}
              productId={id}
            />
            {errors.description_ar && touched.description_ar ? (
              <Typography
                sx={{
                  color: customColors.dangerous,
                }}
              >
                {language === "en" ? "required" : "مطلوب"}{" "}
              </Typography>
            ) : undefined}
          </Box>
          {/* FORM PRICE BEFORE DISCOUNT */}

          <Box mt={"15px"}>
            <Typography
              sx={{
                color: customColors.text,
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              {language === "en" ? "Price" : "السعر"}
              <Typography
                component="span"
                sx={{
                  fontSize: "small",
                }}
              >
                {` (${language === "en" ? "in Saudi riyalss" : "بالريال السعودي"
                  }) `}
              </Typography>
            </Typography>
            <InputBase
              sx={{
                width: 1,
                border: 1,
                borderColor:
                  customColors[
                  errors.priceBeforeDiscount && touched.priceBeforeDiscount
                    ? "dangerous"
                    : "inputBorderColor"
                  ],
                borderRadius: "4px",
                p: "2px 4px",
                bgcolor: customColors.bg,
              }}
              name={"priceBeforeDiscount"}
              type={"number"}
              value={values?.priceBeforeDiscount}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.priceBeforeDiscount && touched.priceBeforeDiscount ? (
              <Typography
                sx={{
                  color: customColors.dangerous,
                }}
              >
                {errors.priceBeforeDiscount}
              </Typography>
            ) : undefined}
          </Box>

          {/* FORM QUANTITY */}

          <Box mt={"15px"}>
            <Typography
              sx={{
                color: customColors.text,
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              {language === "en" ? "Quantity" : "الكمية"}
            </Typography>
            <InputBase
              sx={{
                width: 1,
                border: 1,
                borderColor:
                  customColors[
                  errors.quantity && touched.quantity
                    ? "dangerous"
                    : "inputBorderColor"
                  ],
                borderRadius: "4px",
                p: "2px 4px",
                bgcolor: customColors.bg,
              }}
              name={"quantity"}
              type={"number"}
              value={values.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.quantity && touched.quantity ? (
              <Typography
                sx={{
                  color: customColors.dangerous,
                }}
              >
                {errors.quantity}
              </Typography>
            ) : undefined}
          </Box>
          {/* FORM WEIGHT */}

          <Box mt={"15px"}>
            <Typography
              sx={{
                color: customColors.text,
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              {language === "en" ? "Weight" : "الوزن"}
              <Typography
                component="span"
                sx={{
                  fontSize: "small",
                }}
              >
                {` (${language === "en"
                  ? "in grams - 1000 gram equal 1 kg"
                  : "بالجرام - 1000 جرام يساوي كيلو جرام"
                  }) `}
              </Typography>
            </Typography>
            <InputBase
              sx={{
                width: 1,
                border: 1,
                borderColor:
                  customColors[
                  errors.weight && touched.weight
                    ? "dangerous"
                    : "inputBorderColor"
                  ],
                borderRadius: "4px",
                p: "2px 4px",
                bgcolor: customColors.bg,
              }}
              name={"weight"}
              type={"number"}
              value={values?.weight}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.weight && touched.weight ? (
              <Typography
                sx={{
                  color: customColors.dangerous,
                }}
              >
                {errors.weight}
              </Typography>
            ) : undefined}
          </Box>
          {/* FORM CATEGORY */}

          <Box mt={"15px"}>
            <SelectMultiTag
              label={language === "en" ? "category" : "القسم"}
              name="category"
              error={errors.category}
              value={values.category}
              touched={touched.category}
              handleChange={(e) => {
                handleChange(e);
                // setFieldValue("subSubCategory", []);
                // setFieldValue("subCategory", []);
              }}
              handleBlur={handleBlur}
              optionsData={categories.data}
              itemField={`name_${language}`}
            />
          </Box>
          {/* FORM SUB CATEGORY */}

          <Box mt={"15px"}>
            <SelectMultiTag
              label={language === "en" ? "sub category" : "القسم الفرعي"}
              name="subCategory"
              error={errors.subCategory}
              value={values.subCategory}
              touched={touched.subCategory}
              handleChange={(e) => {
                handleChange(e);
                // setFieldTouched("subSubCategory", []);
              }}
              handleBlur={handleBlur}
              optionsData={subCategories.data}
              itemField={`name_${language}`}
            />
          </Box>
          {/* FORM subSubCategory */}

          <Box mt={"15px"}>
            <SelectMultiTag
              label={language === "en" ? "Sub Sub category" : "قسم فرعى فرعى"}
              name="subSubCategory"
              error={errors.subSubCategory}
              value={values.subSubCategory}
              touched={touched.subSubCategory}
              handleChange={handleChange}
              handleBlur={handleBlur}
              optionsData={subSubCategories}
              itemField={`name_${language}`}
            />
          </Box>


          <Box mt={"15px"}>
            <SelectMultiTag
              label={language === "en" ? "City" : "المدينة"}
              name="cities"
              error={errors.cities}
              value={values.cities}
              touched={touched.cities}
              handleChange={handleChange}
              handleBlur={handleBlur}
              optionsData={cities.data}
              itemField={`name_${language}`}
            />
          </Box>


          <Box mt={"15px"}>
            <SelectMultiTag
              label={language === "en" ? "Neighborhood" : "الحي"}
              name="neighborhoods"
              error={errors.neighborhoods}
              value={values.neighborhoods}
              touched={touched.neighborhoods}
              handleChange={handleChange}
              handleBlur={handleBlur}
              optionsData={neighborhoods.data}
              itemField={`name_${language}`}
            />
          </Box>

          {/* FORM PAYMENT TYPE */}

          <Box mt={"15px"}>
            <SelectTag
              label={language === "en" ? "Payment type" : "نوع الدفع"}
              name="paymentType"
              error={errors.paymentType}
              value={values?.paymentType || ""}
              touched={touched.paymentType}
              handleChange={handleChange}
              itemField={language}
              handleBlur={handleBlur}
              optionsData={paymentTypes}
              link={values.link}
            />
          </Box>

          {/* FORM KEYWORDS */}

          <Box mt={"15px"}>
            <ProductKeywords
              language={language}
              keywordsValues={values?.keywords || []}
              keywordsErrors={errors.keywords}
              keywordsTouched={touched.keywords?.length < 1}
              setFieldValue={setFieldValue}
            />
          </Box>

          {/* FORM Link */}

          <Box mt={"15px"}>
            <Typography
              sx={{
                color: customColors.text,
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              {language === "en" ? "Link" : "الرابط"}
            </Typography>
            <InputBase
              sx={{
                width: 1,
                border: 1,
                borderColor:
                  customColors[
                  errors.link && touched.link
                    ? "dangerous"
                    : "inputBorderColor"
                  ],
                borderRadius: "4px",
                p: "2px 4px",
                bgcolor: customColors.bg,
              }}
              name={"link"}
              type={"text"}
              value={values?.link}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.link && touched.link ? (
              <Typography
                sx={{
                  color: customColors.dangerous,
                }}
              >
                {errors.link}
              </Typography>
            ) : undefined}
          </Box>
        </Grid>
      </Grid>
      {phoneScreen && (
        <Box>
          {/* FORM QUALITIES SMALL */}

          <Box mt="20px">
            <ProductQualities
              language={language}
              productQualities={values.qualities}
              produuctSetFieldValue={setFieldValue}
            />
          </Box>
          {/* FORM QUALITIES IMAGES SMALL */}

          <Box mt="20px">
            <ProductQualitiesImages
              language={language}
              productQualities={values.qualities}
              productQualitiesImages={values.qualitiesImages}
              produuctSetFieldValue={setFieldValue}
            />
          </Box>
          {/* FORM ATTRIBUTES SMALL */}

          <Box mt="20px">
            <ProductAttributes
              language={language}
              productAttributes={values.attributes}
              setProductFieldValue={setFieldValue}
            />
          </Box>

          {/* FORM META TITLE SMALL */}
          <Box mt="20px">
            <MetaAccordions
              metaTitle={formik.values.title_meta}
              metaDesc={formik.values.desc_meta}
              setFieldValue={formik.setFieldValue}
              isEdit={true}
            />
          </Box>
          {/* FORM META DESCRIPTION SMALL */}
        </Box>
      )}
      <Stack direction={"row"} justifyContent={"center"} mt={"30px"}>
        <Button
          disabled={isLoading || uploadFilesLoading}
          sx={{
            ...btnStyle,
            color: "#fff",
            mt: "30px",
            fontSize: "17px",
          }}
          type="submit"
        >
          {isLoading || uploadFilesLoading
            ? language === "en"
              ? "Updating product...."
              : "جارى التحديث..."
            : language === "en"
              ? "Update Product"
              : "تحديث المنتج"}
        </Button>
      </Stack>
    </Box>
  );
};
export default EditProductPage;
