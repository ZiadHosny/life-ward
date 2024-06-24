import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddToSavedProductMutation,
  useDeleteSavedProductMutation,
  useGetAllSavedProductsQuery,
} from "../../APIs/SavedProductApi";
import { incrementSaved, descrementSaved } from "../../APIs/savedSlice";
import useGetUserInfo from "./../Profile/useGetUserInfo";

function useAddToSavedProduct() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state);
  const { data: savedProducts, isError: isErrSaved } =
    useGetAllSavedProductsQuery();
  const [addToSavedProduct] = useAddToSavedProductMutation();
  const [deleteSavedProduct] = useDeleteSavedProductMutation();
  const dispatch = useDispatch();
  const [_, { language: lang }] = useTranslation();
  const { userinfo } = useGetUserInfo();
  function addSavedProduct(savedId) {
    const productInSaved =
      savedProducts &&
      !isErrSaved &&
      savedProducts?.data?.favourite.find((saved) => saved?.product?._id === savedId);

      if ((savedId && currentUser?.email) || currentUser?.phone) {
      if (!productInSaved) {
        addToSavedProduct(savedId).unwrap().then(({data})=>{
          console.log(data)
          toast.success(data[`success_${lang}`]);

        }).catch(({data})=>{
          toast.error(data[`error_${lang}`]);
        })
        // toast.success(data[`success_${lang}`]);

      } else {
        deleteSavedProduct(savedId)
          .unwrap()
          .then((res) => toast.success(res[`success_${lang}`]));
      }
    } else {
      setTimeout(() => {
        toast.error(
          lang == "en" ? "You should login first" : "ينبغي أن تسجل دخول أولاً"
        );
      }, 500);
      navigate("/sign-in");
    }
  }
  return [addSavedProduct];
}

export default useAddToSavedProduct;
