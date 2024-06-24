import marryIcon from "../../assets/events/marry.png";
import apologizeIcon from "../../assets/events/apologize.png";
import bornIcon from "../../assets/events/born.png";
import newYearIcon from "../../assets/events/newYear.png";
import ringIcon from "../../assets/events/ring.png";
import thankIcon from "../../assets/events/thanks.png";
import flowerIcon from "../../assets/events/flower.png";
import { useLazyGetAllAttsQuery } from "../../APIs/ProductApis";
import { useState } from "react";
import { useEffect } from "react";

// export const attributesData = [
//   {
//     key_ar: "الورود",
//     key_en: "Roses",
//     values: [
//       { en: "Gory", ar: "الجوري" },
//       { en: "Rose", ar: "روز" },
//       { en: "Baby Rose", ar: "بيبي روز" },
//       { en: "Stoma", ar: "الستواما" },
//       { en: "Gysophila", ar: "جيسوفيليا" },
//       { en: "Hydrangea", ar: "هيدرنجا" },
//       { en: "Tulip", ar: "توليب" },
//       { en: "Lavender", ar: "لافيندر" },
//       { en: "Casablanca", ar: "كازابلانكا" },
//       { en: "Sunflower", ar: "عباد الشمس" },
//     ],
//   },
//   {
//     key_ar: "اللون",
//     key_en: "color",
//     values: [
//       { en: "red", ar: "احمر" },
//       { en: "pink", ar: "زهري" },
//       { en: "light pink", ar: "زهري فاتح" },
//       { en: "yellow", ar: "اصفر" },
//       { en: "white", ar: "ابيض" },
//       { en: "purple", ar: "بنفسجي" },
//       { en: "orange", ar: "برتقالي" },
//       { en: "blue", ar: "ازرق" },
//     ],
//   },
//   {
//     key_ar: "الشكل",
//     key_en: "shape",
//     values: [
//       { en: "bokeh", ar: "بوكيه" },
//       { en: "flower vase", ar: "مزهرية" },
//       { en: "Basket", ar: "سلة" },
//       { en: "Box", ar: "صندوق" },
//     ],
//   },
//   {
//     key_ar: "المناسبة",
//     key_en: "occasion",
//     values: [
//       { en: "birthday", ar: "عيد ميلاد" },
//       { en: "anniversary", ar: "عيد زواج" },
//       { en: "Valentine's Day", ar: "عيد الحب" },
//       { en: "mother's Day", ar: "عيد الأم" },
//       { en: "new year", ar: "السنة الجديدة" },
//       { en: "Congratulations on the newborn", ar: "تهنئة بالمولود" },
//       { en: "Congratulations newlyweds", ar: "تهنئة عروسين" },
//       { en: "An expression of love", ar: "تعبير عن الحب" },
//       { en: "graduation congratulations", ar: "تهنئة تخرج" },
//       { en: "visit a patient", ar: "زيارة مريض" },
//       { en: "thanks", ar: "شكر" },
//       { en: "Congrats!", ar: "الف مبروك" },
//       { en: "without occasion", ar: "بدون مناسبة" },
//       { en: "sympathy", ar: "تعاطف" },
//       { en: "apology", ar: "إعتذار" },
//     ],
//   },
// ];

export default function GenerateAttributeData() {
  const occasionsData = [
    {
      name: "marry.png",
      image: marryIcon,
    },
    {
      name: "apologize.png",
      image: apologizeIcon,
    },
    {
      name: "born.png",
      image: bornIcon,
    },
    {
      name: "newYear.png",
      image: newYearIcon,
    },
    {
      name: "ring.png",
      image: ringIcon,
    },
    {
      name: "thanks.png",
      image: thankIcon,
    },
    {
      name: "flower.png",
      image: flowerIcon,
    },
  ];
  const [getAllAtts] = useLazyGetAllAttsQuery();
  const [attributesData, setAtts] = useState();
  useEffect(() => {
    getAllAtts()
      .unwrap()
      .then((res) => {
        setAtts(res.data);
      })
      .catch(() => {
        setAtts();
      });
  }, []);
  return {
    occasionsData,
    attributesData,
  };
}
