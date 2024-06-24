//@ts-nocheck
import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { ICart } from "../interfaces/cart/cart.interface";
import { IQuery } from "../interfaces/factory/factory.interface";
import { IProduct } from "../interfaces/product/product.interface";
import { Status } from "../interfaces/status/status.enum";
import IUser from "../interfaces/user/user.interface";
import { Cart } from "../models/cart.model";
import { Coupon } from "../models/coupon.model";
import { Product } from "../models/product.model";
import ApiError from "../utils/ApiError";
import { ApiFeatures } from "../utils/ApiFeatures";
import { deleteOneItemById } from "./factory.controller";

// function sortByOrder(a: any, b: any): number {
//   const order = ["key_en", "key_ar", "value_en", "value_ar"];
//   return order.indexOf(a) - order.indexOf(b);
// }

// function sortArray(array: any[]): any[] {
//   return array.map((obj) =>
//     Object.fromEntries(
//       Object.entries(obj).sort(([keyA], [keyB]) => sortByOrder(keyA, keyB))
//     )
//   );
// }

function arePropertiesEqual(
  propertiesInCart: any[],
  properties: any[]
): boolean {

  const desiredFields = {
    "key_en": properties.key_en,
    "key_ar": properties.key_ar,
    "value_en": properties.value_en,
    "value_ar": properties.value_ar
  };
  const desiredFieldsInCart = {
    "key_en": propertiesInCart.key_en,
    "key_ar": propertiesInCart.key_ar,
    "value_en": propertiesInCart.value_en,
    "value_ar": propertiesInCart.value_ar
  };

  // sortArray(propertiesInCart);
  // sortArray(properties);

  if (
    JSON.stringify(desiredFieldsInCart) === JSON.stringify(desiredFields)
  ) {
    return true;
  }
  // If no equal values are found, return true
  return false;
}



export const cartResponse = ({
  cart,
  totalPrice,
  totalQuantity,
}: {
  cart: ICart;
  totalPrice: number;
  totalQuantity: number;
}) => {
  const onlineItems = {
    items: cart.cartItems.filter(
      (item) =>
        item.product.paymentType === "online" ||
        (item.product.paymentType === "both" && item.paymentType === "online")
    ),
    quantity: cart.cartItems
      .filter(
        (item) =>
          item.product.paymentType === "online" ||
          (item.product.paymentType === "both" && item.paymentType === "online")
      )
      .reduce((sum, item) => sum + item.quantity, 0),
    totalPriceWithoutShipping: cart.cartItems
      .filter(
        (item) =>
          item.product.paymentType === "online" ||
          (item.product.paymentType === "both" && item.paymentType === "online")
      )
      .reduce((sum, item) => sum + item.totalWithoutShipping, 0),
    totalPrice: cart.cartItems
      .filter(
        (item) =>
          item.product.paymentType === "online" ||
          (item.product.paymentType === "both" && item.paymentType === "online")
      )
      .reduce((sum, item) => sum + item.total, 0),
  };

  const cashItems = {
    items: cart.cartItems.filter(
      (item) =>
        item.product.paymentType === "cash" ||
        (item.product.paymentType === "both" && item.paymentType === "cash")
    ),
    quantity: cart.cartItems
      .filter(
        (item) =>
          item.product.paymentType === "cash" ||
          (item.product.paymentType === "both" && item.paymentType === "cash")
      )
      .reduce((sum, item) => sum + item.quantity, 0),
    totalPriceWithoutShipping: cart.cartItems
      .filter(
        (item) =>
          item.product.paymentType === "cash" ||
          (item.product.paymentType === "both" && item.paymentType === "cash")
      )
      .reduce((sum, item) => sum + item.totalWithoutShipping, 0),
    totalPrice: cart.cartItems
      .filter(
        (item) =>
          item.product.paymentType === "cash" ||
          (item.product.paymentType === "both" && item.paymentType === "cash")
      )
      .reduce((sum, item) => sum + item.total, 0),
  };

  const isCash = cashItems.items.length > 0;
  const isOnline = onlineItems.items.length > 0;
  // cash online both
  const transactionType =
    isCash && isOnline ? "both" : isCash ? "cash" : "online";

  if (cart.isPointsUsed && cart.totalUsedFromPoints) {
    const applyPoints = (items: any) => {
      const diff = Math.abs(
        items.totalPriceWithoutShipping - cart.totalUsedFromPoints
      );
      items.totalPriceWithoutShipping = diff;
      items.totalPrice -= cart.totalUsedFromPoints;
    };

    switch (transactionType) {
      case "online":
        applyPoints(onlineItems);
        break;
      case "cash":
        applyPoints(cashItems);
        break;
      case "both":
        if (cart.totalUsedFromPoints <= cashItems.totalPriceWithoutShipping) {
          applyPoints(cashItems);
        } else {
          const temp = Math.abs(
            cart.totalUsedFromPoints - cashItems.totalPriceWithoutShipping
          );
          cashItems.totalPriceWithoutShipping -=
            cart.totalUsedFromPoints - temp;
          cashItems.totalPrice -= cart.totalUsedFromPoints - temp;
          onlineItems.totalPriceWithoutShipping -= temp;
          onlineItems.totalPrice -= temp;
        }
        break;
    }
  }

  return {
    user: cart.user,
    couponUsed: cart.coupon?.used,
    transactionType,
    totalQuantity,
    totalPrice,
    onlineItems,
    cashItems,
    isPointUsed: cart?.isPointsUsed,
  };
};

const calculateCartItemPrice = ({
  product,
  quantity,
  properties,
}: {
  product: IProduct;
  quantity: number;
  properties?: [
    { key_en: string; key_ar: string; value_en: string; value_ar: string }
  ];
}): number => {
  let totalPrice =
    ((product.priceAfterDiscount || product.priceBeforeDiscount) +
      (product.shippingPrice || 0)) *
    quantity;

  if (properties && properties.length > 0 && product.qualities) {
    const selectedProperties = product.qualities.filter(
      (quality) =>
        properties.findIndex(
          (prop) =>
            prop.key_en === quality.key_en && prop.key_ar === quality.key_ar
        ) > -1
    );

    const prices = selectedProperties.map((quality) => {
      const values = quality.values.find((value) =>
        properties.find(
          (prop) =>
            prop.value_en === value.value_en && prop.value_ar === value.value_ar
        )
      );

      return values || { price: 0 };
    });

    let extraPrice = prices.reduce((sum, price) => sum + price.price, 0);

    if (product.offer) {
      extraPrice = extraPrice - (extraPrice * product.offer.percentage) / 100;
    }



    totalPrice =
      ((product.priceAfterDiscount || product.priceBeforeDiscount) +
        (product.shippingPrice || 0) +
        extraPrice) *
      quantity;


  }


  return totalPrice;
};


// @desc    Add Product To Cart
// @route   POST /api/v1/cart/:productId
// @body    { quantity }
// @access  Private (user)
export const addToCart = expressAsyncHandler(async (req, res, next) => {
  const { _id } = req.user! as any;

  const { quantity, paymentType, properties } = req.body as {
    quantity: number;
    properties?: [
      { key_en: string; key_ar: string; value_en: string; value_ar: string }
    ];
  };

  const { productId } = req.params;

  // check if the product exists
  const product = await Product.findById(productId).populate
    ([{ path: "offer", model: "Offer", select: "percentage" }]);
  if (!product) {
    return next(
      new ApiError(
        {
          en: "Product Not Found",
          ar: "المنتج غير موجود",
        },
        StatusCodes.NOT_FOUND
      )
    );
  }

  // check if the quantity is more than the available quantity
  if (quantity > product.quantity || product.quantity === 0) {
    return next(
      new ApiError(
        {
          en: "Quantity Not Available",
          ar: "الكمية غير متوفرة",
        },
        StatusCodes.BAD_REQUEST
      )
    );
  }
  ////////////////////////////////////////////////////
  // check if the quantity available by subtracting the quantity in the cart from the quantity in the product
  const cartForQuantity = await Cart.findOne({ user: _id });
  if (cartForQuantity) {
    const cartQuantity = cartForQuantity.cartItems.reduce(
      (sum, item) =>
        item.product.toString() === productId && item.paymentType !== paymentType ? sum + item.quantity : sum,
      0
    );
    if (cartQuantity + quantity > product.quantity) {
      return next(
        new ApiError(
          {
            en: "Quantity Not Available",
            ar: "الكمية غير متوفرة",
          },
          StatusCodes.BAD_REQUEST
        )
      );
    }
  }

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // check if the value in each quantity in qualities greater than or equal the value of quantity from the body
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  // get the cart of the user
  const cart = await Cart.findOne({ user: _id });

  // *******if no cart, create a new one*******
  if (!cart) {
    let totalPrice = calculateCartItemPrice({
      product,
      quantity,
      properties,
    });
    let totalShipping = product.shippingPrice * quantity;
    const singlePrice = totalPrice / quantity;

    // create a new cart
    const cart = await Cart.create({
      user: _id,
      cartItems: [
        {
          properties,
          product: product._id,
          quantity,
          paymentType,
          singlePrice,
          totalWithoutShipping: totalPrice,
          totalShipping: totalShipping,
          total: totalPrice + totalShipping,
        },
      ],
      totalCartPriceWithoutShipping: totalPrice,
      totalCartPrice: totalPrice + totalShipping,
    });
    const totalCartPrice = cart.cartItems.reduce(
      (sum, item) => sum + item.total,
      0
    );

    const populatedCart = await cart.populate([
      { path: "user", model: "User", select: "name email image" },
      {
        path: "cartItems.product",
        model: "Product",
        select:
          "title_en title_ar priceBeforeDiscount priceAfterDiscount shippingPrice images quantity paymentType",
      },
    ]);

    res.status(StatusCodes.CREATED).json({
      status: Status.SUCCESS,
      data: cartResponse({
        cart: populatedCart.toJSON(),
        totalPrice: totalCartPrice,
        totalQuantity: quantity,
      }),
      totalCartPriceWithoutShipping: cart?.totalCartPriceWithoutShipping,
      totalCartPrice: cart?.totalCartPrice,
      success_en: "Product Saved To Cart Successfully",
      success_ar: "تم حفظ المنتج في عربة التسوق بنجاح",
    });
    return;
  }
  // *******end of creating a new cart *******

  let itemIndex = -1;

  // if there is a cart, check if the product is already in the cart
  if (properties && properties?.length > 0) {
    itemIndex = cart.cartItems.findIndex((item) => {
      const isSameProduct =
        item.product._id.toString() === productId &&
        item.paymentType === paymentType;
      const isPropertyEqual = arePropertiesEqual(item.properties, properties);
      return isSameProduct && isPropertyEqual;
    });
  } else {
    itemIndex = cart.cartItems.findIndex(
      (item) =>
        item.product._id.toString() === productId &&
        item.paymentType === paymentType
    );
  }

  let fondedQuality;
  if (itemIndex > -1 && properties?.length > 0) {
    fondedQuality = arePropertiesEqual(
      cart.cartItems[itemIndex].properties,
      properties
    );
  }

  const isProductInCart =
    itemIndex > -1 &&
    (fondedQuality || !properties) &&
    cart.cartItems[itemIndex].paymentType === paymentType;

  if (isProductInCart) {
    // if the product is already in the cart, update the quantity
    cart.cartItems[itemIndex].quantity = quantity;
    cart.cartItems[itemIndex].totalShipping = product.shippingPrice * quantity;

    cart.cartItems[itemIndex].totalWithoutShipping = calculateCartItemPrice({
      product,
      quantity,
      properties: properties || cart.cartItems[itemIndex].properties,
    });

    cart.cartItems[itemIndex].total =
      calculateCartItemPrice({
        product,
        quantity,
        properties: properties || cart.cartItems[itemIndex].properties,
      }) + cart.cartItems[itemIndex].totalShipping;

    const totalQuantity = cart.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    if (properties && properties.length > 0) {
      cart.cartItems[itemIndex].properties = properties;
    }

    const totalCartPriceWithoutShipping = cart.cartItems.reduce(
      (sum, item) => sum + item.totalWithoutShipping,
      0
    );

    const totalCartPrice = cart.cartItems.reduce(
      (sum, item) => sum + item.total,
      0
    );

    cart["totalCartPriceWithoutShipping"] = totalCartPriceWithoutShipping;
    cart["totalCartPrice"] = totalCartPrice;

    await cart.save();

    const populatedCart = await cart.populate([
      { path: "user", model: "User", select: "name email image" },
      {
        path: "cartItems.product",
        model: "Product",
        select:
          "title_en title_ar priceBeforeDiscount priceAfterDiscount shippingPrice images quantity paymentType",
      },
    ]);

    res.status(StatusCodes.CREATED).json({
      status: Status.SUCCESS,
      data: cartResponse({
        cart: populatedCart.toJSON(),
        totalPrice: totalCartPrice,
        totalQuantity,
      }),
      totalCartPriceWithoutShipping: cart?.totalCartPriceWithoutShipping,
      totalCartPrice: cart?.totalCartPrice,
      success_en: "Product Saved To Cart Successfully",
      success_ar: "تم حفظ المنتج في عربة التسوق بنجاح",
    });
    return;
  }

  // if the product is not in the cart, add it
  const total = calculateCartItemPrice({ product, quantity, properties });
  const totalShipping = product.shippingPrice * quantity;

  const singlePrice = total / quantity;

  cart.cartItems.push({
    product: product._id,
    paymentType,
    singlePrice,
    quantity,
    totalWithoutShipping: total,
    totalShipping,
    total: total + totalShipping,
    properties,
  });

  const cartUPdated = await Cart.findOneAndUpdate(
    { user: _id },
    {
      totalCartPrice: cart.totalCartPrice + total + totalShipping,
      totalCartPriceWithoutShipping: cart.totalCartPriceWithoutShipping + total,
    },
    { new: true }
  );

  const totalQuantity = cart.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  await cart.save();
  const totalCartPrice = cart.cartItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const populatedCart = await cart.populate([
    { path: "user", model: "User", select: "name email image" },
    {
      path: "cartItems.product",
      model: "Product",
      select:
        "title_en title_ar priceBeforeDiscount priceAfterDiscount shippingPrice images quantity paymentType",
    },
  ]);

  res.status(StatusCodes.CREATED).json({
    status: Status.SUCCESS,
    data: cartResponse({
      cart: populatedCart.toJSON(),
      totalPrice: totalCartPrice,
      totalQuantity,
    }),
    totalCartPriceWithoutShipping: cartUPdated?.totalCartPriceWithoutShipping,
    totalCartPrice: cartUPdated?.totalCartPrice,
    success_en: "Product Saved To Cart Successfully",
    success_ar: "تم حفظ المنتج في عربة التسوق بنجاح",
  });
});

// @desc    Get Cart
// @route   GET /api/v1/cart
// @body    {}
// @access  Private (user)
export const getCart = expressAsyncHandler(async (req, res, next) => {
  const { _id } = req.user! as IUser;
  const cart = await Cart.findOne({ user: _id }).populate([
    { path: "user", model: "User", select: "name email image points" },
    {
      path: "cartItems.product",
      model: "Product",
      select:
        "title_en title_ar description_en description_ar  rating priceBeforeDiscount priceAfterDiscount shippingPrice images quantity paymentType qualities",
    },
  ]);

  if (!cart) {
    return next(
      new ApiError(
        {
          en: "Cart is Empty",
          ar: "عربة التسوق فارغة",
        },
        StatusCodes.NOT_FOUND
      )
    );
  }

  // check if quantity still available for each cart item in quality



  const totalCartPrice = cart.cartItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const totalQuantity = cart.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  cart["totalCartPrice"] = totalCartPrice;
  cart["totalQuantity"] = totalQuantity;
  await cart.save();
  // check if length of cartItems is 0

  if (cart.cartItems.length < 1) {
    await Cart.findOneAndDelete({ user: _id });
    return next(
      new ApiError(
        {
          en: "Cart is Empty",
          ar: "عربة التسوق فارغة",
        },
        StatusCodes.NOT_FOUND
      )
    );
  }


  res.status(StatusCodes.OK).json({
    status: Status.SUCCESS,
    data: cartResponse({
      cart: cart,
      totalPrice: totalCartPrice,
      totalQuantity,
    }),
    totalCartPrice: cart?.totalCartPrice,
    _id: cart._id,
    success_en: "Cart Fetched Successfully",
    success_ar: "تم جلب عربة التسوق بنجاح",
  });
});

// @desc    Get Cart
// @route   GET /api/v1/cart
// @body    {}
// @access  Private (admin)
export const getAllCarts = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query as IQuery;
    const mongoQuery = Cart.find({ user: { $ne: null } })
      .populate([{ path: "user", model: "User", select: "name email" }])
      .select("-coupon  -isFreezed -isPointsUsed -updatedAt -__v");

    const { data, paginationResult } = await new ApiFeatures(mongoQuery, query)
      .populate()
      .filter()
      .limitFields()
      .search()
      .sort()
      .paginate();

    if (data.length === 0) {
      return next(
        new ApiError(
          {
            en: "No Carts Found",
            ar: "لا يوجد عربات تسوق",
          },
          StatusCodes.NOT_FOUND
        )
      );
    }

    res.status(StatusCodes.OK).json({
      status: Status.SUCCESS,
      result: data.length,
      paginationResult,
      data: data,
      success_en: "Carts Fetched Successfully",
      success_ar: "تم جلب عربات التسوق بنجاح",
    });
  }
);

// @desc    Delete Cart
// @route   DELETE /api/v1/cart/:productId
// @body    {}
// @access  Private (user)
export const deleteCartItem = expressAsyncHandler(async (req, res, next) => {
  const { _id } = req.user! as any;
  const { productId } = req.params;
  const { properties } = req.body;
  // check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(
      new ApiError(
        {
          en: "Product Not Found",
          ar: "المنتج غير موجود",
        },
        StatusCodes.NOT_FOUND
      )
    );
  }
  const cart = await Cart.findOne({ user: _id }).populate([
    { path: "user", model: "User", select: "name email image" },
    {
      path: "cartItems.product",
      model: "Product",
      select:
        "title_en title_ar priceBeforeDiscount priceAfterDiscount images quantity paymentType",
    },
  ]);

  /// Find the index of the item to be removed
  let indexToRemove = -1;
  if (properties && properties?.length > 0) {
    indexToRemove = cart.cartItems.findIndex((item) => {
      return (
        item.product.id.toString() === productId &&
        arePropertiesEqual(item.properties, properties)
      );
    });
  } else {
    indexToRemove = cart.cartItems.findIndex((item) => {
      return item.product.id.toString() === productId;
    });
  }

  // Check if the item was found
  if (indexToRemove !== -1) {
    // Remove the item using splice
    cart.cartItems.splice(indexToRemove, 1);

    // Save the updated cart
    await cart.save();
  }

  // get the cart of the user and delete the product from it
  // const cart = await Cart.findOneAndUpdate(
  //   { user: _id },
  //   { $pull: { cartItems: { 'product': productId, 'properties': properties } } },
  //   { new: true }
  // ).populate([
  //   { path: "user", model: "User", select: "name email image" },
  //   {
  //     path: "cartItems.product",
  //     model: "Product",
  //     select:
  //       "title_en title_ar priceBeforeDiscount priceAfterDiscount images quantity paymentType",
  //   },
  // ]);

  if (!cart) {
    return next(
      new ApiError(
        {
          en: "Cart is Empty",
          ar: "عربة التسوق فارغة",
        },
        StatusCodes.NOT_FOUND
      )
    );
  }

  // check if cart cartItems is empty
  if (cart.cartItems.length < 1) {
    await Cart.findOneAndDelete({ user: _id });
    res.status(StatusCodes.OK).json({
      status: Status.SUCCESS,
      data: null,
      success_en: "Product Deleted From Cart Successfully",
      success_ar: "تم حذف المنتج من عربة التسوق بنجاح",
    });
    return;
  }

  const totalCartPrice = cart.cartItems.reduce(
    (sum, item) => sum + item.total,
    0
  );
  const totalQuantity = cart.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  await Cart.findByIdAndUpdate(
    { _id: cart._id },
    { totalCartPrice },
    { new: true }
  );

  res.status(StatusCodes.OK).json({
    status: Status.SUCCESS,
    data: cartResponse({
      cart: cart.toJSON(),
      totalPrice: totalCartPrice,
      totalQuantity,
    }),
    success_en: "Product Deleted From Cart Successfully",
    success_ar: "تم حذف المنتج من عربة التسوق بنجاح",
  });
});

// @desc    Delete Cart
// @route   Delete /api/v1/cart/:id
// @body    {}
// @access  Private (admin)
export const deleteCart = deleteOneItemById(Cart);

// @desc    Verify Coupon
// @route   POST /api/v1/cart/coupon
// @body    { coupon }
// @access  Private (user)
export const verifyCoupon = expressAsyncHandler(async (req, res, next) => {
  // 1- get the data
  const { code, productsIds } = req.body;
  const { _id } = req.user! as IUser;

  // 2- check if the coupon is valid
  const CouponExist = await Coupon.findOne({ code });
  if (!CouponExist) {
    return next(
      new ApiError(
        {
          en: "Coupon Not Found",
          ar: "الكوبون غير موجود",
        },
        StatusCodes.NOT_FOUND
      )
    );
  }

  // 3- check if the cart used coupon before
  const cart = await Cart.findOne({
    user: (req.user! as IUser)._id,
    "coupon.used": false,
  });
  if (!cart) {
    return next(
      new ApiError(
        {
          en: "That Cart Used Coupon Before",
          ar: "عربة التسوق تم استخدام الكوبون بها من قبل",
        },
        StatusCodes.NOT_FOUND
      )
    );
  }

  // 4- check if the coupon is normal increase the used number
  if (CouponExist.type === "normal") {
    const checkUsedCoupon = await Coupon.findOne({
      _id: CouponExist._id,
      "users.user": (req.user! as IUser)._id,
    });

    if (!checkUsedCoupon) {
      await Coupon.findOneAndUpdate(
        { _id: CouponExist._id },
        {
          $push: {
            users: {
              user: (req.user! as IUser)._id,
              usedNumber: 1,
            },
          },
        },
        { new: true }
      );
    } else {
      const result = await Coupon.findOneAndUpdate(
        {
          _id: CouponExist._id,
          "users.user": (req.user! as IUser)._id,
          "users.usedNumber": { $lt: CouponExist.limit },
        },
        {
          $inc: {
            "users.$.usedNumber": 1,
          },
        },
        { new: true }
      );
      if (!result) {
        return next(
          new ApiError(
            {
              en: "Coupon Limit Exceeded",
              ar: "تجاوز الحد الأقصى للكوبون",
            },
            StatusCodes.NOT_FOUND
          )
        );
      }
    }

    let minusFromTotal = 0;
    const result: any = cart.cartItems.map((item) => {
      const product = productsIds.find(
        (productId: string) => productId === item.product.toString()
      );
      if (product) {
        const miuns = Math.floor(
          (item.totalWithoutShipping * CouponExist.discount) / 100
        );
        item.totalWithoutShipping = item.totalWithoutShipping - miuns;
        item.total = item.total - miuns;
        item.singlePrice = item.totalWithoutShipping / item.quantity;
        minusFromTotal = minusFromTotal + miuns;
      }
      return item;
    });

    // 8- update the cart
    const output = await Cart.findByIdAndUpdate(
      cart._id,
      {
        cartItems: result,
        coupon: { couponReference: CouponExist._id, used: true },
        totalCartPrice: cart.totalCartPrice - minusFromTotal,
      },
      { new: true }
    );
    if (!output) {
      return next(
        new ApiError(
          {
            en: "Cart Not Found",
            ar: "عربة التسوق غير موجودة",
          },
          StatusCodes.NOT_FOUND
        )
      );
    }

    // 5- response with the updated cart
    res.status(StatusCodes.OK).json({
      status: Status.SUCCESS,
      data: output,
      success_en: "Coupon Verified Successfully",
      success_ar: "تم التحقق من الكوبون بنجاح",
    });
  } else if (CouponExist.type === "marketing") {
    // 3- apply the coupon on the products
    let totalForMarketer = 0;
    let minusFromTotal = 0;
    const result: any = cart.cartItems.map((item) => {
      const product = productsIds.find(
        (productId: string) => productId === item.product.toString()
      );
      if (product) {
        const miuns = Math.floor(
          (item.totalWithoutShipping * CouponExist.discount) / 100
        );
        totalForMarketer =
          totalForMarketer +
          (item.total * CouponExist.commissionMarketer) / 100;
        item.totalWithoutShipping = item.totalWithoutShipping - miuns;
        item.total = item.total - miuns;
        item.singlePrice = item.totalWithoutShipping / item.quantity;
        minusFromTotal = minusFromTotal + miuns;
      }
      return item;
    });

    // 4- update the cart
    const output = await Cart.findByIdAndUpdate(
      cart._id,
      {
        cartItems: result,
        coupon: {
          couponReference: CouponExist._id,
          commissionMarketer: totalForMarketer,
          used: true,
        },
        totalCartPrice: cart.totalCartPrice - minusFromTotal,
      },
      { new: true }
    );
    if (!output) {
      return next(
        new ApiError(
          {
            en: "Cart Not Found",
            ar: "عربة التسوق غير موجودة",
          },
          StatusCodes.NOT_FOUND
        )
      );
    }

    // 5- response with the updated cart
    res.status(StatusCodes.OK).json({
      status: Status.SUCCESS,
      data: output,
      success_en: "Coupon Verified Successfully",
      success_ar: "تم التحقق من الكوبون بنجاح",
    });
  }
});

// @desc     Delete Cart By Id
// @route    DELETE/api/v1/cart/deleteMany
// @access   Private (Root) TODO: add the rest of the roles
export const deleteGroupOfCartsById = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ids } = req.body;
    const cart = await Cart.deleteMany({
      _id: ids,
    });

    if (!cart) {
      return next(
        new ApiError(
          { en: "cart not found", ar: "السلة غير موجود" },
          StatusCodes.NOT_FOUND
        )
      );
    }

    res.status(StatusCodes.OK).json({
      status: Status.SUCCESS,
      success_en: "Carts deleted successfully",
      success_ar: "تم حذف السلات بنجاح",
    });
  }
);
