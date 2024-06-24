import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useDeleteFromCartMutation } from "../../APIs/cartApi";

function useDeleteFromCart() {
  const [addToCart] = useDeleteFromCartMutation();
  const [_, { language: lang }] = useTranslation();

  function mutateDeleteCart(cartId) {
    if (cartId) {
      addToCart(cartId).then(({ data, error }) => {
        if (data) {
          toast.success(data[`success_${lang}`]);
        } else {
          toast.error(error?.data[`error_${lang}`]);
        }
      });
    } else {
      toast.error(error?.data[`error_${lang}`]);
    }
  }
  return [mutateDeleteCart];
}

export default useDeleteFromCart;
