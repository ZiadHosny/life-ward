import i18next from "i18next";
import * as Yup from "yup";
let lang = i18next.language;
const updateLanguage = () => {
  lang = i18next.language;
};
i18next.on("languageChanged", () => {
  updateLanguage();
});

const { language } = i18next;
export const inputsData = [
  {
    type: "text",
    name: "fullname",
    label_en: "fullname",
    label_ar: "الأسم",
  },
  {
    type: "text",
    name: "phone",
    label_en: "phone number",
    label_ar: "رقم الجوال",
  },
  {
    type: "text",
    name: "email",
    label_en: "email address",
    label_ar: "البريد الإلكتروني",
  },
  {
    type: "text",
    name: "country",
    label_en: "country",
    label_ar: "الدولة",
  },
  {
    type: "text",
    name: "city",
    label_en: "city",
    label_ar: "المدينة",
  },
  {
    type: "text",
    name: "address",
    label_en: "address",
    label_ar: "العنوان",
  },

  {
    type: "text",
    name: "orderNotes",
    label_en: "order notes (Optional)",
    label_ar: "ترتيب ملاحظفات (أختياري)",
  },
];

export const formikData = {
  values: {
    fullname: "",
    phone: "",
    email: "",
    country: "Saudi Arabia",
    city: "Gadda",
    address: "",
    payInCash: false,
    formalName: "",
    creditCard: "",
    expirationDate: "",
    protectionSymbol: "",
    orderNotes: "",
    fastDelivery: false,
    receiveDate: "",
    congratzStatus: false,
    congratz: {
      type: "",
      content: {
        from: "",
        to: "",
        data: "",
      },
    },
  },
  errors: {
    fullname: Yup.string().required(
      lang === "en" ? "Fullname is required" : "الأسم  مطلوب"
    ),
    phone: Yup.string().required(
      lang === "en" ? "Phone is required" : "رقم الجوال مطلوب"
    ),
    email: Yup.string()
      .email(() => (lang === "en" ? "Invalid email" : "بريد إلكتروني خاطئ"))
      .required(
        lang === "en" ? "Email is Required" : "البريد الإلكتروني مطلوب"
      ),
    country: Yup.string().required("Country is required"),
    fastDelivery: Yup.boolean().required(),
    receiveDate: Yup.date().when("fastDelivery", {
      is: (boolean) => boolean === false,
      then: Yup.date().required(),
      otherwise: Yup.date(),
      city: Yup.string().required(
        lang === "en" ? "City is required" : "المدينة مطلوبة"
      ),
      address: Yup.string().required(
        lang === "en" ? "Address is required" : "العنوان مطلوب"
      ),
      formalName: Yup.string().when("payInCash", {
        is: false,
        then: () =>
          Yup.string().required(
            lang === "en" ? "Card name is required" : "اسم البطاقة مطلوب"
          ),
        otherwise: Yup.string(),
      }),
      creditCard: Yup.string().when("payInCash", {
        is: false,
        then: Yup.string().required(
          lang === "en" ? "Credit number is required" : "رقم بالبطاقة مطلوب"
        ),
        otherwise: Yup.string().notRequired(),
      }),
    }),
    expirationDate: Yup.date().when("payInCash", {
      is: false,
      then: Yup.date().typeError("Expiration Date is required"),
    }),
    protectionSymbol: Yup.string().when("payInCash", {
      is: false,
      then: Yup.string()
        .length(3)
        .required(
          lang === "en" ? "Security code is required" : "الرقم السري مطلوب"
        ),
      otherwise: Yup.string().notRequired(),
    }),
    congratzStatus: Yup.boolean().required(),
    congratz: Yup.object().when("congratzStatus", {
      is: (boolean) => boolean === true,
      then: Yup.object({
        type: Yup.string().oneOf(["text", "voice", "video"]).required(),
        content: Yup.object({
          from: Yup.string().required(),
          to: Yup.string().required(),
          data: Yup.string().required(),
        }),
      }).required(),
    }),
  },
};

export const checkoutValues = {
  first: {
    name: "",
    phone: ``,
    email: "",
    country: "Saudi Arabia",
    city: "",
    neighborhood: "",
    for: 'yourself',
    address: "",
    receiveDate: "",
    congratzStatus: false,
    fastDelivery: false,
    time: ''
  },
  second: {
    code: "",
  },
  last: {
    formalName: "",
    creditCard: "",
    expirationDate: "",
    protectionSymbol: "",
  },
};
const creditRegex =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
export const checkoutValidaions = {
  first: {
    name: Yup.string().required(
      language === "en" ? "Fullname is required" : "الأسم  مطلوب"
    ),
    phone: Yup.string()
      // .matches(
      //   /^966\d{9}$/,
      //   language == "en"
      //     ? "Number must start by 966 then 9 numbers"
      //     : "يجب أن يبدأ الرقم بـ 966 ثم 9 أرقام"
      // )
      .matches(
        // /^966\d{9}$/,
        /^\d+$/,
        language == "en"
          ? "Phone must be numbers only"
          : "رقم الجوال يجب ان يكون أرقام فقط"
      )
      .min(
        9,
        language == "en"
          ? "Phone must be 9 numbers"
          : "رقم الجوال يجب ان يكون 9 أرقام"
      )
      .max(
        9,
        language == "en"
          ? "Phone must be 9 numbers"
          : "رقم الجوال يجب ان يكون 9 أرقام"
      )
      .required(language === "en" ? "Phone is required" : "رقم الجوال مطلوب"),
    email: Yup.string()
      .email(() => (language === "en" ? "Invalid email" : "بريد إلكتروني خاطئ"))
      .required(
        language === "en" ? "Email is Required" : "البريد الإلكتروني مطلوب"
      ),
    country: Yup.string().required(
      language === "en" ? "Country is required" : "الدولة مطلوبة"
    ),
    city: Yup.string().required(
      language === "en" ? "City is required" : "المدينة مطلوبة"
    ),
    neighborhood: Yup.string().required(
      language === "en" ? "Neighborhood is required" : "الحي مطلوب"
    ),
    time: Yup.string().required(
      language === "en" ? "Time is required" : "الوقت مطلوب"
    ),
    address: Yup.string().when("city", {
      is: (data) => data,
      then: Yup.string().required(
        language === "en" ? "Address is required" : "العنوان مطلوب"
      ),
    }),
    for: Yup.string().required(),
    fastDelivery: Yup.boolean().required(),
    receiveDate: Yup.date().when("fastDelivery", {
      is: false,
      then: Yup.date().required(
        language === "en" ? "Recieve date is required" : "تاريخ الإستلام مطلوب"
      ),
      otherwise: Yup.date(),
      city: Yup.string().required(
        language === "en" ? "City is required" : "المدينة مطلوبة"
      ),
      // address: Yup.string().when("city", {
      //   is: (data) => data,
      //   then: Yup.string().required(
      //     language === "en" ? "Address is required" : "العنوان مطلوب"
      //   ),
      // }),
    }),
    congratzStatus: Yup.boolean().required(),
    congratz: Yup.object().when("congratzStatus", {
      is: true,
      then: Yup.object({
        type: Yup.string().oneOf(["text", "voice", "video"]).required(),
        content: Yup.object({
          from: Yup.string().required(
            language === "en" ? "Sender is required" : "المرسل مطلوب"
          ),
          to: Yup.string().required(
            language === "en" ? "Reciever is required" : "المستلم مطلوب"
          ),
          data: Yup.string().required(
            language === "en"
              ? "add something for sending"
              : "إضف شئ ما للإرسال"
          ),
        }),
      }).required(),
    }),
  },
  second: {
    code: Yup.string().required(
      language === "en" ? "SMS code is required" : "كورد الرسالة  مطلوب"
    ),
  },
  last: {
    formalName: Yup.string()
      .matches(
        /^[a-z]+(?: [a-z]+)*$/,
        language === "en"
          ? " lowercase english letters only"
          : "أحرف انجليزية صغيرة فقط"
      )
      .required(
        language === "en" ? "formal name is required" : "الإسم بالبطاقة مطلوب"
      ),
    expirationDate: Yup.string()
      .typeError(
        language == "en"
          ? "Enter A Valid Expiratioin Date"
          : "ادخل تاريخ انتهاء صحيح"
      )
      .required(
        language === "en"
          ? "Expiration Date is required"
          : "تاريخ الانتهاء مطلوب"
      ),
    creditCard: Yup.string()
      .length(16, language === "en" ? "Enter 16 numbers" : "أدخل 16 رقم")
      .matches(
        creditRegex,
        language === "en" ? "invalid Credit card" : "بطاقة إئتمان غير صالحة"
      )

      .required(
        language === "en" ? "Credit card is required" : "رقم البطاقة مطلوب"
      ),
    protectionSymbol: Yup.string()
      .length(3, language === "en" ? "Enter 3 numbers" : "ادخل 3 ارفام")
      .required(
        language === "en" ? "Security code is required" : "الرقم السري مطلوب"
      ),
  },
};
