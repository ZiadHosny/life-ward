 
export const ProductDiscountForProduct = (product) => {

    if (JSON.parse(localStorage.getItem('couponData'))) {
        const { products, couponEnter, persentage } = JSON.parse(
            localStorage.getItem('couponData')
        )


        if (products?.length && couponEnter !== '') {
            const FoundedProduct = products?.some((item) => item === product?.product?._id);
            if (FoundedProduct) {
                const { total, product: { shippingPrice } } = product;
                const TotalItemBeforeShipping = Math.abs(total - shippingPrice)
                const itemAfterDiscount = Math.abs(TotalItemBeforeShipping - (TotalItemBeforeShipping * (persentage / 100)))

                return   itemAfterDiscount 

                
            }
            else{
                return false

            }
        }


    }



}