// Packages NPM Import
import { body, param } from "express-validator";

// Middleware Import
import { validate } from "../../middlewares/validation-express-validator";
// Model Import
import { Product } from "../../models/product.model";
import { City } from "../../models/city.model";
import { Neighborhood } from "../../models/neighborhood.model";

export const getCityByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage({
      en: "Ciy id is required",
      ar: "معرف المدينة مطلوب",
    })
    .isMongoId()
    .withMessage({
      en: "Ciy id is not valid",
      ar: "معرف المدينة غير صالح",
    }),
  validate,
];

export const createCityValidator = [
  //#region *Start name_en and name_ar*
  body("name_en")
    .trim()
    .notEmpty()
    .withMessage({
      en: "Name in english is required",
      ar: "الاسم باللغة الإنجليزية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Name in english Must be string",
      ar: "يجب أن يكون الاسم باللغة الإنجليزية حروف",
    })
    .isLength({ min: 3, max: 50 })
    .withMessage({
      en: "Must be between 3 to 50 characters",
      ar: "يجب أن يكون بين 3 إلى 50 حرفا",
    })
    .custom(async (val, { req }) => {
      req.body.slug_en = val.replace(/\s/g, "_");
      const city = await City.findOne({ name_en: req.body.name_en });
      if (city) {
        return Promise.reject({
          en: "Name in english already Used Before",
          ar: "الاسم باللغة الإنجليزية مستخدم بالفعل",
        });
      }
      return Promise.resolve();
    }),
  body("name_ar")
    .trim()
    .notEmpty()
    .withMessage({
      en: "Name in arabic is required",
      ar: "الاسم باللغة العربية مطلوب",
    })
    .isString()
    .withMessage({ en: "Must be string", ar: "يجب أن يكون سلسلة" })
    .isLength({ min: 3, max: 50 })
    .withMessage({
      en: "Must be between 3 to 50 characters",
      ar: "يجب أن يكون بين 3 إلى 50 حرفا",
    })
    .custom(async (val, { req }) => {
      req.body.slug_ar = val.replace(/\s/g, "_");

      const city = await City.findOne({ name_ar: req.body.name_ar });
      if (city) {
        return Promise.reject({
          en: "Name in arabic already Used Before",
          ar: "الاسم باللغة العربية مستخدم بالفعل",
        });
      }
      return Promise.resolve();
    }),

  body("lat")
    .trim()
    .notEmpty()
    .isNumeric(),

  body("lng")
    .trim()
    .notEmpty()
    .isNumeric(),

  validate,
];

export const updateCityValidator = [
  //#region *Start id*
  param("id")
    .notEmpty()
    .withMessage({
      en: "City id is required",
      ar: "معرف المدينة مطلوب",
    })
    .isMongoId()
    .withMessage({
      en: "City id is not valid",
      ar: "معرف المدينة غير صالح",
    })
    .custom(async (val, { req }) => {
      const city = await City.findById(val);
      if (!city) {
        return Promise.reject({
          en: "City not found",
          ar: "المدينة غير موجودة",
        });
      }
      return Promise.resolve();
    }),
  //#endregion *End id*

  //#region *Start name_en and name_ar*
  body("name_en")
    .trim()
    .optional()
    .notEmpty()
    .withMessage({
      en: "Name in english is required",
      ar: "الاسم باللغة الإنجليزية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Name in english Must be string",
      ar: "يجب أن يكون الاسم باللغة الإنجليزية حروف",
    })
    .isLength({ min: 3, max: 50 })
    .withMessage({
      en: "Must be between 3 to 50 characters",
      ar: "يجب أن يكون بين 3 إلى 50 حرفا",
    })
    .custom(async (val, { req }) => {
      req.body.slug_en = val.replace(/\s/g, "_");
      const city = await City.findOne({ name_en: val });

      if (city && city._id.toString() !== req?.params?.id) {
        return Promise.reject({
          en: "Name in english already Used Before",
          ar: "الاسم باللغة الإنجليزية مستخدم بالفعل",
        });
      }
      return Promise.resolve();
    }),
  body("name_ar")
    .trim()
    .optional()
    .notEmpty()
    .withMessage({
      en: "Name in arabic is required",
      ar: "الاسم باللغة العربية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Name in arabic Must be string",
      ar: "يجب أن يكون الاسم باللغة العربية حروف",
    })
    .isLength({ min: 3, max: 50 })
    .withMessage({
      en: "Must be between 3 to 50 characters",
      ar: "يجب أن يكون بين 3 إلى 50 حرفا",
    })
    .trim()
    .custom(async (val, { req }) => {
      req.body.slug_ar = val.replace(/\s/g, "_");

      const city = await City.findOne({ name_ar: val });

      if (city && city._id.toString() !== req?.params?.id) {
        return Promise.reject({
          en: "Name in arabic already Used Before",
          ar: "الاسم باللغة العربية مستخدم بالفعل",
        });
      }
      return Promise.resolve();
    }),

  body("lat")
    .trim()
    .notEmpty()
    .isNumeric(),

  body("lng")
    .trim()
    .notEmpty()
    .isNumeric(),

  validate,
];

export const deleteCityValidator = [
  param("id")
    .notEmpty()
    .withMessage({
      en: "City id is required",
      ar: "معرف المدينة مطلوب",
    })
    .isMongoId()
    .withMessage({
      en: "City id is not valid",
      ar: "معرف المدينة غير صالح",
    })
    .custom(async (val, { req }) => {
      const city = await City.findById(val);
      if (!city) {
        return Promise.reject({
          en: "City not found",
          ar: "المدينة غير موجودة",
        });
      }
      // check if City contained any Neighborhood
      const neighborhoodCount = await Neighborhood.countDocuments({
        city: Object(val),
      });
      if (neighborhoodCount) {
        return Promise.reject({
          en: "this city can't be deleted because it has Neighborhoods",
          ar: "لا يمكن حذف هذه المدينة لأنها تحتوي على احياء",
        });
      }

      // check if city contained any products
      const productCount = await Product.countDocuments({
        city: Object(val),
      });
      if (productCount) {
        return Promise.reject({
          en: "this city can't be deleted because it has products",
          ar: "لا يمكن حذف هذه المدينة لأنها تحتوي على منتجات",
        });
      }
    }),
  validate,
];
