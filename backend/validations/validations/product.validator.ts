// Packages NPM Import
import { body, check, param } from "express-validator";

// Middleware Import
import { validate } from "../../middlewares/validation-express-validator";
import { Category } from "../../models/category.model";
import { Product } from "../../models/product.model";
import { Brand } from "../../models/brand.model";
import { SubCategory } from "../../models/subCategory.model";
import { SubSubCategory } from "../../models/subSubCategory.model";
import { Repository } from "../../models/repository.model";

export const getProductByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage({
      en: "Product id is required",
      ar: "معرف المنتج مطلوب",
    })
    .isMongoId()
    .withMessage({
      en: "Product id is not valid",
      ar: "معرف المنتج غير صالح",
    }),
  validate,
];

export const createProductValidator = [
  //#region *Start of Product Title en and ar*
  body("title_en")
    .trim()
    .notEmpty()
    .withMessage({
      en: "Title in english is required",
      ar: "الاسم باللغة الإنجليزية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Title in english Must be string",
      ar: "يجب أن يكون الاسم باللغة الإنجليزية حروف",
    })
    .custom(async (value, { req }) => {
      req.body.slug_en = value.replace(/\s/g, "_");
      const product = await Product.findOne({ title_en: value });
      if (product) {
        return Promise.reject({
          en: "title_en already used",
          ar: "الاسم باللغة الإنجليزية مستخدم بالفعل",
        });
      }
    }),
  body("slug_en").isString(),
  body("title_ar")
    .trim()
    .notEmpty()
    .withMessage({
      en: "Title in arabic is required",
      ar: "الاسم باللغة العربية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Title in arabic Must be string",
      ar: "يجب أن يكون الاسم باللغة العربية حروف",
    })
    .custom(async (value, { req }) => {
      req.body.slug_ar = value.replace(/\s/g, "_");
      const product = await Product.findOne({ title_ar: value });
      if (product) {
        return Promise.reject({
          en: "title_ar already used",
          ar: "الاسم باللغة العربية مستخدم بالفعل",
        });
      }
    }),
  body("slug_ar").isString(),
  //#endregion *End of Product Title en and ar*

  //#region *Start of Product Description en and ar*
  body("description_en")
    .notEmpty()
    .withMessage({
      en: "Description in english is required",
      ar: "الوصف باللغة الإنجليزية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Description in english Must be string",
      ar: "يجب أن يكون الوصف باللغة الإنجليزية حروف",
    })
    .trim(),
  body("description_ar")
    .notEmpty()
    .withMessage({
      en: "Description in arabic is required",
      ar: "الوصف باللغة العربية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Description in arabic Must be string",
      ar: "يجب أن يكون الوصف باللغة العربية حروف",
    })
    .trim(),
  //#endregion *End of Product Description en and ar*

  //#region *Start of Product Price and Quantity*
  body("priceBeforeDiscount")
    .notEmpty()
    .withMessage({
      en: "Price is required",
      ar: "السعر مطلوب",
    })
    .isFloat({ min: 1 })
    .withMessage({
      en: "Price Must be number and greater than 0",
      ar: "يجب أن يكون السعر رقم وأكبر من 0",
    }),
  body("shippingPrice").optional().isFloat({ min: 0 }).withMessage({
    en: "Shipping Price Must be number and greater than or  equal to 0",
    ar: "يجب أن يكون سعر الشحن رقمًا وأكبر من أو يساوي 0",
  }),
  body("quantity")
    .notEmpty()
    .withMessage({
      en: "Quantity is required",
      ar: "الكمية مطلوبة",
    })
    .isInt({ min: 0 })
    .withMessage({
      en: "Quantity Must be number and positive",
      ar: "يجب أن تكون الكمية رقم موجب",
    }),
  //#endregion *End of Product Price and Quantity*

  //#region *Start of Product Images *
  body("images")
    .isArray({
      min: 1,
    })
    .withMessage({
      en: "Images must be array and at least one image",
      ar: "يجب أن تكون الصور مصفوفة ويجب أن تحتوي على صورة واحدة على الأقل",
    }),
  //#endregion *End of Product Images*

  //#region *Start of Product paymentType and deliveryType*
  body("paymentType")
    .notEmpty()
    .withMessage({
      en: "Payment Type is required",
      ar: "نوع الدفع مطلوب",
    })
    .isString()
    .withMessage({
      en: "Payment Type Must be string",
      ar: "يجب أن يكون نوع الدفع حروف",
    })
    .trim()
    .isIn(["online", "cash", "both"]),
  //#endregion *End of Product paymentType and deliveryType*

  //#region *Start of Product Keywords*
  body("keywords").optional().isArray().withMessage({
    en: "Keywords must be array",
    ar: "يجب أن تكون الكلمات الدلالية مصفوفة",
  }),
  //#endregion *End of Product Keywords*

  //#region *Start of Attributes*
  body("attributes").optional().isArray().withMessage({
    en: "Attributes must be array",
    ar: "يجب أن تكون السمات مصفوفة",
  }),
  body("attributes.*.key_en")
    .notEmpty()
    .withMessage({
      en: "Key in english is required",
      ar: "الاسم باللغة الإنجليزية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Key in english Must be string",
      ar: "يجب أن يكون الاسم باللغة الإنجليزية حروف",
    })
    .trim(),
  body("attributes.*.key_ar")
    .notEmpty()
    .withMessage({
      en: "Key in arabic is required",
      ar: "الاسم باللغة العربية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Key in arabic Must be string",
      ar: "يجب أن يكون الاسم باللغة العربية حروف",
    })
    .trim(),
  body("attributes.*.values").isArray({ min: 1 }).withMessage({
    en: "Values must be array and at least one value should be provided.",
    ar: "يجب أن تكون القيم مصفوفة ويجب أن تحتوي على قيمة واحدة على الأقل.",
  }),
  body("attributes.*.values.*.value_en")
    .notEmpty()
    .withMessage({
      en: "Value in english is required",
      ar: "القيمة باللغة الإنجليزية مطلوبة",
    })
    .isString()
    .withMessage({
      en: "Value in english Must be string",
      ar: "يجب أن تكون القيمة باللغة الإنجليزية حروف",
    })
    .trim(),
  body("attributes.*.values.*.value_ar")
    .notEmpty()
    .withMessage({
      en: "Value in arabic is required",
      ar: "القيمة باللغة العربية مطلوبة",
    })
    .isString()
    .withMessage({
      en: "Value in arabic Must be string",
      ar: "يجب أن تكون القيمة باللغة العربية حروف",
    })
    .trim(),
  //#endregion *End of Attributes*

  //#region *Start of Qualities*
  body("qualities").optional().isArray().withMessage({
    en: "Qualities must be array",
    ar: "يجب أن تكون الصفات مصفوفة",
  }),
  body("qualities.*.key_en")
    .notEmpty()
    .withMessage({
      en: "Key in english is required",
      ar: "الاسم باللغة الإنجليزية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Key in english Must be string",
      ar: "يجب أن يكون الاسم باللغة الإنجليزية حروف",
    })
    .trim(),
  body("qualities.*.key_ar")
    .notEmpty()
    .withMessage({
      en: "Key in arabic is required",
      ar: "الاسم باللغة العربية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Key in arabic Must be string",
      ar: "يجب أن يكون الاسم باللغة العربية حروف",
    })
    .trim(),
  body("qualities.*.values").isArray({ min: 1 }).withMessage({
    en: "Values must be array and at least one value should be provided.",
    ar: "يجب أن تكون القيم مصفوفة ويجب أن تحتوي على قيمة واحدة على الأقل",
  }),
  body("qualities.*.values.*.value_en")
    .notEmpty()
    .withMessage({
      en: "Value in english is required",
      ar: "القيمة باللغة الإنجليزية مطلوبة",
    })
    .isString()
    .withMessage({
      en: "Value in english Must be string",
      ar: "يجب أن تكون القيمة باللغة الإنجليزية حروف",
    })
    .trim(),
  body("qualities.*.values.*.value_ar")
    .notEmpty()
    .withMessage({
      en: "Value in arabic is required",
      ar: "القيمة باللغة العربية مطلوبة",
    })
    .isString()
    .withMessage({
      en: "Value in arabic Must be string",
      ar: "يجب أن تكون القيمة باللغة العربية حروف",
    })
    .trim(),
  body("qualities.*.values.*.price")
    .notEmpty()
    .withMessage({
      en: "Price is required",
      ar: "السعر مطلوب",
    })
    .isFloat()
    .withMessage({
      en: "Price Must be number ",
      ar: "يجب أن يكون السعر رقم ",
    }),
  body("qualities.*.values.*.color")
    .optional()
    .isString()
    .withMessage({
      en: "Color Must be string",
      ar: "يجب أن يكون اللون حروف",
    })
    .trim(),
  //#endregion *End of Qualities*

  //#region *Start of Qualities Images*
  body("qualitiesImages").optional().isArray().withMessage({
    en: "Qualities Images must be array",
    ar: "يجب أن تكون صور الصفات مصفوفة",
  }),
  body("qualitiesImages.*.image")
    .notEmpty()
    .withMessage({
      en: "Image is required",
      ar: "الصورة مطلوبة",
    })
    .isString()
    .withMessage({
      en: "Image Must be string",
      ar: "يجب أن تكون الصورة حروف",
    })
    .trim(),
  body("qualitiesImages.*.qualities").isArray({ min: 1 }).withMessage({
    en: "Qualities must be array and at least one value should be provided.",
    ar: "يجب أن تكون الصفات مصفوفة ويجب أن تحتوي على صفة واحدة على الأقل",
  }),
  body("qualitiesImages.*.qualities.*.key_en")
    .notEmpty()
    .withMessage({
      en: "Key in english is required",
      ar: "الاسم باللغة الإنجليزية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Key in english Must be string",
      ar: "يجب أن يكون الاسم باللغة الإنجليزية حروف",
    })
    .trim(),
  body("qualitiesImages.*.qualities.*.key_ar")
    .notEmpty()
    .withMessage({
      en: "Key in arabic is required",
      ar: "الاسم باللغة العربية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Key in arabic Must be string",
      ar: "يجب أن يكون الاسم باللغة العربية حروف",
    })
    .trim(),
  body("qualitiesImages.*.qualities.*.value_en")
    .notEmpty()
    .withMessage({
      en: "Value in english is required",
      ar: "القيمة باللغة الإنجليزية مطلوبة",
    })
    .isString()
    .withMessage({
      en: "Value in english Must be string",
      ar: "يجب أن تكون القيمة باللغة الإنجليزية حروف",
    })
    .trim(),
  body("qualitiesImages.*.qualities.*.value_ar")
    .notEmpty()
    .withMessage({
      en: "Value in arabic is required",
      ar: "القيمة باللغة العربية مطلوبة",
    })
    .isString()
    .withMessage({
      en: "Value in arabic Must be string",
      ar: "يجب أن تكون القيمة باللغة العربية حروف",
    })
    .trim(),
  //#endregion *End of Qualities Images*

  //#region *Start of Product Category, SubCategory, subSubCategory and Brand*
  body("category")
    .notEmpty()
    .withMessage({
      en: "Category is required",
      ar: "الفئة مطلوبة",
    })
    .isArray()
    .withMessage({
      en: "Category Must be string",
      ar: "يجب أن تكون الفئة حروف",
    })
    .trim()
    .isMongoId()
    .withMessage({
      en: "Category must be mongo id",
      ar: "يجب أن تكون الفئة معرف mongo",
    })
    .custom(async (value) => {
      const category = await Category.findOne({ _id: value });
      if (!category) {
        return Promise.reject({
          en: "Category not found",
          ar: "الفئة غير موجودة",
        });
      }
    }),

  body("subCategory")
    .optional()
    .isArray()
    .withMessage({
      en: "Sub Category Must be string",
      ar: "يجب أن تكون الفئة الفرعية حروف",
    })
    .trim()
    .isMongoId()
    .withMessage({
      en: "Sub Category must be mongo id",
      ar: "يجب أن تكون الفئة الفرعية معرف mongo",
    }),
  // .custom(async (value, { req }) => {
  //   const subCategory = await SubCategory.findOne({
  //     _id: value,
  //     category: req.body.category,
  //   });
  //   if (!subCategory) {
  //     return Promise.reject({
  //       en: "Sub Category not found",
  //       ar: "الفئة الفرعية غير موجودة",
  //     });
  //   }
  // })
  body("subSubCategory")
    .optional()
    .isArray()
    .withMessage({
      en: "Sub Sub Category Must be string",
      ar: "يجب أن تكون الفئة الفرعية الفرعية حروف",
    })
    .trim()
    .isMongoId()
    .withMessage({
      en: "Sub Sub Category must be mongo id",
      ar: "يجب أن تكون الفئة الفرعية الفرعية معرف mongo",
    })
    .custom(async (value, { req }) => {
      const subSubCategory = await SubSubCategory.findOne({
        _id: value,
        subCategory: req.body.subCategory,
      });
      if (!subSubCategory) {
        return Promise.reject({
          en: "Sub Sub Category not found",
          ar: "الفئة الفرعية الفرعية غير موجودة",
        });
      }
    }),

  body("brand")
    .optional()
    .isString()
    .withMessage({
      en: "Brand Must be string",
      ar: "يجب أن تكون الماركة حروف",
    })
    .trim()
    .isMongoId()
    .withMessage({
      en: "Brand must be Mongo id",
      ar: "يجب أن تكون الماركة معرف mongo",
    })
    .custom(async (value) => {
      const brand = await Brand.findOne({ _id: value });
      if (!brand) {
        return Promise.reject({
          en: "Brand not found",
          ar: "الماركة غير موجودة",
        });
      }
    }),

  //#endregion *End of Product Category and SubCategory and Brand*

  //#region *Start of Product Weight*
  body("weight")
    .notEmpty()
    .withMessage({
      en: "Weight is required",
      ar: "الوزن مطلوب",
    })
    .isInt({ min: 1 })
    .withMessage({
      en: "Weight Must be number and greater than 0",
      ar: "يجب أن يكون الوزن رقم وأكبر من 0",
    }),
  //#endregion *End of Product Weight*

  //#region *Start of Product Meta Data*
  body("title_meta")
    .optional()
    .isString()
    .withMessage({
      en: "Title meta Must be string",
      ar: "يجب أن يكون عنوان الميتا حروف",
    })
    .trim(),
  body("desc_meta")
    .optional()
    .isString()
    .withMessage({
      en: "Description meta Must be string",
      ar: "يجب أن يكون وصف الميتا حروف",
    })
    .trim(),
  //#endregion *End of Product Meta Data*

  //#region *Start of Product Notification*
  body("title")
    .optional()
    .isString()
    .withMessage({
      en: "Title Must be string",
      ar: "يجب أن يكون العنوان حروف",
    })
    .trim(),
  body("message")
    .optional()
    .isString()
    .withMessage({
      en: "Message Must be string",
      ar: "يجب أن يكون الرسالة حروف",
    })
    .trim(),
  //#endregion *End of Product Notification*

  //#region *Start of Product Drive*
  body("link")
    .optional()
    .isString()
    .withMessage({
      en: "Link Must be string",
      ar: "يجب أن يكون الرابط حروف",
    })
    .trim(),
  body("extention")
    .optional()
    .isString()
    .withMessage({
      en: "Extention Must be string",
      ar: "يجب أن يكون الامتداد حروف",
    })
    .trim(),
  //#endregion *End of Product Drive*

  //#region *Start of Product Repositires*
  body("repositoryId")
    .optional()
    .isString()
    .withMessage({
      en: "Repository Id Must be string",
      ar: "يجب أن يكون معرف المستودع حروف",
    })
    .trim()
    .isMongoId()
    .withMessage({
      en: "Repository Id must be mongo id",
      ar: "يجب أن يكون معرف المستودع معرف mongo",
    })
    .custom(async (value) => {
      const repository = await Repository.findOne({ _id: value });
      if (!repository) {
        return Promise.reject({
          en: "Repository not found",
          ar: "المستودع غير موجود",
        });
      }
    }),

  //#endregion *End of Product Repositires*
  validate,
];

export const updateProductValidator = [
  //#region *Start of Product Id*
  param("id")
    .notEmpty()
    .withMessage({
      en: "Id is required",
      ar: "المعرف مطلوب",
    })
    .isMongoId()
    .withMessage({
      en: "Id must be mongo id",
      ar: "يجب أن يكون المعرف معرف mongo",
    })
    .custom(async (value) => {
      const product = await Product.findOne({ _id: value });
      if (!product) {
        return Promise.reject({
          en: "Product not found",
          ar: "المنتج غير موجود",
        });
      }
    }),
  //#endregion *End of Product Id*

  //#region *Start of Product Title en and ar*
  body("title_en")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Title in english is required",
      ar: "الاسم باللغة الإنجليزية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Title in english Must be string",
      ar: "يجب أن يكون الاسم باللغة الإنجليزية حروف",
    })
    .trim()
    .custom(async (value, { req }) => {
      const product = await Product.findOne({ title_en: value });
      if (product && product._id.toString() !== req.params!.id) {
        return Promise.reject({
          en: "title_en already used",
          ar: "الاسم باللغة الإنجليزية مستخدم بالفعل",
        });
      }
    }),

  body("title_ar")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Title in arabic is required",
      ar: "الاسم باللغة العربية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Title in arabic Must be string",
      ar: "يجب أن يكون الاسم باللغة العربية حروف",
    })
    .trim()
    .custom(async (value, { req }) => {
      const product = await Product.findOne({ title_ar: value });
      if (product && product._id.toString() !== req.params!.id) {
        return Promise.reject({
          en: "title_ar already used",
          ar: "الاسم باللغة العربية مستخدم بالفعل",
        });
      }
    }),
  //#endregion *End of Product Title en and ar*

  //#region *Start of Product Description en and ar*
  body("description_en")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Description in english is required",
      ar: "الوصف باللغة الإنجليزية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Description in english Must be string",
      ar: "يجب أن يكون الوصف باللغة الإنجليزية حروف",
    })
    .trim(),
  body("description_ar")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Description in arabic is required",
      ar: "الوصف باللغة العربية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Description in arabic Must be string",
      ar: "يجب أن يكون الوصف باللغة العربية حروف",
    })
    .trim(),
  //#endregion *End of Product Description en and ar*

  //#region *Start of Product Price and Quantity*
  body("priceBeforeDiscount")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Price is required",
      ar: "السعر مطلوب",
    })
    .isFloat({ min: 1 })
    .withMessage({
      en: "Price Must be number and greater than 0",
      ar: "يجب أن يكون السعر رقم وأكبر من 0",
    }),
  body("shippingPrice").optional().isFloat({ min: 0 }).withMessage({
    en: "Shipping Price Must be number and greater than or  equal to 0",
    ar: "يجب أن يكون سعر الشحن رقمًا وأكبر من أو يساوي 0",
  }),
  body("quantity")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Quantity is required",
      ar: "الكمية مطلوبة",
    })
    .isInt({ min: 0 })
    .withMessage({
      en: "Quantity Must be number and positive",
      ar: "يجب أن تكون الكمية رقم موجب",
    }),
  //#endregion *End of Product Price and Quantity*

  //#region *Start of Product Images *
  body("images")
    .optional()
    .isArray({
      min: 1,
    })
    .withMessage({
      en: "Images must be array and at least one image",
      ar: "يجب أن تكون الصور مصفوفة ويجب أن تحتوي على صورة واحدة على الأقل",
    }),
  //#endregion *End of Product Images*

  //#region *Start of Product paymentType*
  body("paymentType")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Payment Type is required",
      ar: "نوع الدفع مطلوب",
    })
    .isString()
    .withMessage({
      en: "Payment Type Must be string",
      ar: "يجب أن يكون نوع الدفع حروف",
    })
    .trim()
    .isIn(["online", "cash", "both"]),
  //#endregion *End of Product paymentType*

  //#region *Start of Product Keywords*
  body("keywords").optional().isArray().withMessage({
    en: "Keywords must be array",
    ar: "يجب أن تكون الكلمات الدلالية مصفوفة",
  }),
  //#endregion *End of Product Keywords*

  //#region *Start of Attributes*
  body("attributes").optional().isArray().withMessage({
    en: "Attributes must be array",
    ar: "يجب أن تكون السمات مصفوفة",
  }),
  body("attributes.*.key_en")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Key in english is required",
      ar: "الاسم باللغة الإنجليزية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Key in english Must be string",
      ar: "يجب أن يكون الاسم باللغة الإنجليزية حروف",
    })
    .trim(),
  body("attributes.*.key_ar")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Key in arabic is required",
      ar: "الاسم باللغة العربية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Key in arabic Must be string",
      ar: "يجب أن يكون الاسم باللغة العربية حروف",
    })
    .trim(),
  body("attributes.*.values").optional().isArray({ min: 1 }).withMessage({
    en: "Values must be array and at least one value should be provided.",
    ar: "يجب أن تكون القيم مصفوفة ويجب أن تحتوي على قيمة واحدة على الأقل.",
  }),
  body("attributes.*.values.*.value_en")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Value in english is required",
      ar: "القيمة باللغة الإنجليزية مطلوبة",
    })
    .isString()
    .withMessage({
      en: "Value in english Must be string",
      ar: "يجب أن تكون القيمة باللغة الإنجليزية حروف",
    })
    .trim(),
  body("attributes.*.values.*.value_ar")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Value in arabic is required",
      ar: "القيمة باللغة العربية مطلوبة",
    })
    .isString()
    .withMessage({
      en: "Value in arabic Must be string",
      ar: "يجب أن تكون القيمة باللغة العربية حروف",
    })
    .trim(),
  //#endregion *End of Attributes*

  //#region *Start of Qualities*
  body("qualities").optional().isArray().withMessage({
    en: "Qualities must be array",
    ar: "يجب أن تكون الصفات مصفوفة",
  }),
  body("qualities.*.key_en")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Key in english is required",
      ar: "الاسم باللغة الإنجليزية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Key in english Must be string",
      ar: "يجب أن يكون الاسم باللغة الإنجليزية حروف",
    })
    .trim(),
  body("qualities.*.key_ar")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Key in arabic is required",
      ar: "الاسم باللغة العربية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Key in arabic Must be string",
      ar: "يجب أن يكون الاسم باللغة العربية حروف",
    })
    .trim(),
  body("qualities.*.values").optional().isArray({ min: 1 }).withMessage({
    en: "Values must be array and at least one value should be provided.",
    ar: "يجب أن تكون القيم مصفوفة ويجب أن تحتوي على قيمة واحدة على الأقل",
  }),
  body("qualities.*.values.*.value_en")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Value in english is required",
      ar: "القيمة باللغة الإنجليزية مطلوبة",
    })
    .isString()
    .withMessage({
      en: "Value in english Must be string",
      ar: "يجب أن تكون القيمة باللغة الإنجليزية حروف",
    })
    .trim(),
  body("qualities.*.values.*.value_ar")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Value in arabic is required",
      ar: "القيمة باللغة العربية مطلوبة",
    })
    .isString()
    .withMessage({
      en: "Value in arabic Must be string",
      ar: "يجب أن تكون القيمة باللغة العربية حروف",
    })
    .trim(),
  body("qualities.*.values.*.price")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Price is required",
      ar: "السعر مطلوب",
    })
    .isFloat()
    .withMessage({
      en: "Price Must be number ",
      ar: "يجب أن يكون السعر رقم ",
    }),
  body("qualities.*.values.*.color")
    .optional()
    .isString()
    .withMessage({
      en: "Color Must be string",
      ar: "يجب أن يكون اللون حروف",
    })
    .trim(),
  //#endregion *End of Qualities*

  //#region *Start of Qualities Images*
  body("qualitiesImages").optional().isArray().withMessage({
    en: "Qualities Images must be array",
    ar: "يجب أن تكون صور الصفات مصفوفة",
  }),
  body("qualitiesImages.*.image")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Image is required",
      ar: "الصورة مطلوبة",
    })
    .isString()
    .withMessage({
      en: "Image Must be string",
      ar: "يجب أن تكون الصورة حروف",
    })
    .trim(),
  body("qualitiesImages.*.qualities")
    .optional()
    .isArray({ min: 1 })
    .withMessage({
      en: "Qualities must be array and at least one value should be provided.",
      ar: "يجب أن تكون الصفات مصفوفة ويجب أن تحتوي على صفة واحدة على الأقل",
    }),
  body("qualitiesImages.*.qualities.*.key_en")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Key in english is required",
      ar: "الاسم باللغة الإنجليزية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Key in english Must be string",
      ar: "يجب أن يكون الاسم باللغة الإنجليزية حروف",
    })
    .trim(),
  body("qualitiesImages.*.qualities.*.key_ar")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Key in arabic is required",
      ar: "الاسم باللغة العربية مطلوب",
    })
    .isString()
    .withMessage({
      en: "Key in arabic Must be string",
      ar: "يجب أن يكون الاسم باللغة العربية حروف",
    })
    .trim(),
  body("qualitiesImages.*.qualities.*.value_en")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Value in english is required",
      ar: "القيمة باللغة الإنجليزية مطلوبة",
    })
    .isString()
    .withMessage({
      en: "Value in english Must be string",
      ar: "يجب أن تكون القيمة باللغة الإنجليزية حروف",
    })
    .trim(),
  body("qualitiesImages.*.qualities.*.value_ar")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Value in arabic is required",
      ar: "القيمة باللغة العربية مطلوبة",
    })
    .isString()
    .withMessage({
      en: "Value in arabic Must be string",
      ar: "يجب أن تكون القيمة باللغة العربية حروف",
    })
    .trim(),
  //#endregion *End of Qualities Images*

  //#region *Start of Product Category and SubCategory and Brand*
  body("category")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Category is required",
      ar: "الفئة مطلوبة",
    })
    .isArray({ min: 1 })
    .withMessage({
      en: "Category Must be array[mongoId]",
      ar: "يجب أن تكون الفئة حروف",
    })
    .trim()
    .isMongoId()
    .withMessage({
      en: "Category must be mongo id",
      ar: "يجب أن تكون الفئة معرف mongo",
    })
    .custom(async (value) => {
      const category = await Category.findOne({ _id: value });
      if (!category) {
        return Promise.reject({
          en: "Category not found",
          ar: "الفئة غير موجودة",
        });
      }
    }),

  body("subCategory")
    .optional()
    .isArray({ min: 1 })
    .withMessage({
      en: "Sub Category Must be string",
      ar: "يجب أن تكون الفئة الفرعية حروف",
    })
    .trim()
    .isMongoId()
    .withMessage({
      en: "Sub Category must be mongo id",
      ar: "يجب أن تكون الفئة الفرعية معرف mongo",
    })
    .custom(async (value) => {
      const subCategory = await SubCategory.findOne({ _id: value });
      if (!subCategory) {
        return Promise.reject({
          en: "Sub Category not found",
          ar: "الفئة الفرعية غير موجودة",
        });
      }
    }),
  body("subSubCategory")
    .optional()
    .isArray({ min: 1 })
    .withMessage({
      en: "Sub Category Must be string",
      ar: "يجب أن تكون الفئة الفرعية حروف",
    })
    .trim()
    .isMongoId()
    .withMessage({
      en: "Sub Category must be mongo id",
      ar: "يجب أن تكون الفئة الفرعية معرف mongo",
    })
    .custom(async (value) => {
      const subSubCategory = await SubSubCategory.findOne({ _id: value });
      if (!subSubCategory) {
        return Promise.reject({
          en: "Sub Sub Category not found",
          ar: "الفئة الفرعية  الفرعية غير موجودة",
        });
      }
    }),
  body("brand")
    .optional()
    .isString()
    .withMessage({
      en: "Brand Must be string",
      ar: "يجب أن تكون الماركة حروف",
    })
    .trim()
    .isMongoId()
    .withMessage({
      en: "Brand must be Mongo id",
      ar: "يجب أن تكون الماركة معرف mongo",
    })
    .custom(async (value) => {
      const brand = await Brand.findOne({ _id: value });
      if (!brand) {
        return Promise.reject({
          en: "Brand not found",
          ar: "الماركة غير موجودة",
        });
      }
    }),

  //#endregion *End of Product Category and SubCategory and Brand*

  //#region *Start of Product Weight*
  body("weight")
    .optional()
    .notEmpty()
    .withMessage({
      en: "Weight is required",
      ar: "الوزن مطلوب",
    })
    .isInt({ min: 1 })
    .withMessage({
      en: "Weight Must be number and greater than 0",
      ar: "يجب أن يكون الوزن رقم وأكبر من 0",
    }),
  //#endregion *End of Product Weight*

  //#region *Start of Product Meta Data*
  body("title_meta")
    .optional()
    .isString()
    .withMessage({
      en: "Title meta Must be string",
      ar: "يجب أن يكون عنوان الميتا حروف",
    })
    .trim(),
  body("desc_meta")
    .optional()
    .isString()
    .withMessage({
      en: "Description meta Must be string",
      ar: "يجب أن يكون وصف الميتا حروف",
    })
    .trim(),
  //#endregion *End of Product Meta Data*

  //#region *Start of Product Notification*
  body("title")
    .optional()
    .isString()
    .withMessage({
      en: "Title Must be string",
      ar: "يجب أن يكون العنوان حروف",
    })
    .trim(),
  body("message")
    .optional()
    .isString()
    .withMessage({
      en: "Message Must be string",
      ar: "يجب أن يكون الرسالة حروف",
    })
    .trim(),
  //#endregion *End of Product Notification*

  //#region *Start of Product Drive*
  body("link")
    .optional()
    .isString()
    .withMessage({
      en: "Link Must be string",
      ar: "يجب أن يكون الرابط حروف",
    })
    .trim(),
  body("extention")
    .optional()
    .isString()
    .withMessage({
      en: "Extention Must be string",
      ar: "يجب أن يكون الامتداد حروف",
    })
    .trim(),
  //#endregion *End of Product Drive*

  //#region *Start of Product Repositires*
  body("repositoryId")
    .optional()
    .isString()
    .withMessage({
      en: "Repository Id Must be string",
      ar: "يجب أن يكون معرف المستودع حروف",
    })
    .trim()
    .isMongoId()
    .withMessage({
      en: "Repository Id must be mongo id",
      ar: "يجب أن يكون معرف المستودع معرف mongo",
    })
    .custom(async (value) => {
      const repository = await Repository.findOne({ _id: value });
      if (!repository) {
        return Promise.reject({
          en: "Repository not found",
          ar: "المستودع غير موجود",
        });
      }
    }),
  // #endregion *End of Product Repositires*
  validate,
];

export const deleteProductValidator = [
  param("id")
    .notEmpty()
    .withMessage({
      en: "Id is required",
      ar: "المعرف مطلوب",
    })
    .isMongoId()
    .withMessage({
      en: "Id must be mongo id",
      ar: "يجب أن يكون المعرف معرف mongo",
    })
    .custom(async (value) => {
      const product = await Product.findOne({ _id: value });
      if (!product) {
        return Promise.reject({
          en: "Product not found",
          ar: "المنتج غير موجود",
        });
      }
    }),
  validate,
];
