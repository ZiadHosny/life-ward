import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAddToCartMutation } from "../../APIs/cartApi";
import { DecrementCart, incrementCart } from "../../APIs/cartSlice";

function useAddToCart() {
  const [addToCart] = useAddToCartMutation();
  const [_, { language: lang }] = useTranslation();
  const dispatch = useDispatch();
  function mutateAddToCart(cart) {
    if (cart && localStorage.getItem("token")) {
      addToCart(cart).then(({ data, error }) => {
        if (data) {
          toast.success(data[`success_${lang}`]);
          if (data.status == "added") {
            dispatch(incrementCart());
          } else {
            dispatch(DecrementCart());
          }
        } else {
          toast.error(error?.data[`error_${lang}`]);
        }
      });
    } else {
      toast.error(error?.data[`error_${lang}`]);
    }
  }
  return [mutateAddToCart];
}

export default useAddToCart;
