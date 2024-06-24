import { useEffect, useState } from "react";
import { useLazyGetAllCategoriesWithSubAndSubSubsQuery } from "../APIs/categoriesApi";
import { useDispatch } from "react-redux";
import { getCategories } from "../APIs/categoriesSlice";
const useFetchCategoriesWithSubAndSubSubs = () => {
  const [getAllCategoriesWithSubAndSubSubs] =
    useLazyGetAllCategoriesWithSubAndSubSubsQuery();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllCategoriesWithSubAndSubSubs()
      .unwrap()
      .then((res) => {
        const navDepartments = res?.data.map((item) => {
          return {
            id: item.category["id"],
            title_en: item.category.name_en,
            title_ar: item.category.name_ar,
            subs: item.subCategories.map((el) => ({
              id: el.subCategory.id,
              title_en: el.subCategory.name_en,
              title_ar: el.subCategory.name_ar,
              subSubCategories: el.subSubCategory.map((subSub) => ({
                id: subSub._id,
                title_en: subSub.name_en,
                title_ar: subSub.name_ar,
              })),
            })),
          };
        });
        setCategories(navDepartments);
        dispatch(getCategories(navDepartments));
      })
      .catch(() => {
        setCategories([]);
        dispatch(getCategories([]));
      });
  }, []);
  return categories;
};
export default useFetchCategoriesWithSubAndSubSubs;
