import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useDeleteSavedProductMutation } from "../../APIs/SavedProductApi";

function useDeleteSavedProduct() {
  const [deleteSavedProduct] = useDeleteSavedProductMutation();
  const [_, { language: lang }] = useTranslation();
  function mutateDeleteSavedProduct(id) {
    deleteSavedProduct(id).then(({ data, error }) => {
      if (data) {
        toast.success(data[`success_${lang}`]);
      } else {
        toast.error(error?.data[`error_${lang}`]);
      }
    });
  }
  return [mutateDeleteSavedProduct];
}

export default useDeleteSavedProduct;
