import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="w-full h-[380px] bg-white rounded-lg shadow-md p-4 relative cursor-pointer transition-transform hover:scale-105">
        <div className="flex justify-end"></div>

        {/* Product Image */}
        <Link
          to={`${
            isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
          }`}
        >
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="w-full h-[180px] object-contain"
          />
        </Link>

        {/* Shop Name */}
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name} mt-2 text-center text-gray-700 font-semibold`}>
            {data.shop.name}
          </h5>
        </Link>

        {/* Product Name */}
        <Link
          to={`${
            isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
          }`}
        >
          <h4 className="pb-2 font-medium text-center">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          {/* Ratings */}
          <div className="flex justify-center">
            <Ratings rating={data?.ratings} />
          </div>

          {/* Price & Sold Items */}
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice} text-lg font-bold text-red-600`}>
                {data.originalPrice === 0 ? "Rs. 0" : `Rs. ${data.discountPrice}`}
              </h5>
              <h4 className={`${styles.price} ml-2 line-through text-gray-500`}>
                {data.originalPrice ? `Rs. ${data.originalPrice}` : null}
              </h4>
            </div>
            <span className="font-medium text-[15px] text-green-600">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>

        {/* Icons (Wishlist, View, Cart) */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-3 top-5 text-red-500 hover:scale-110"
              onClick={() => removeFromWishlistHandler(data)}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-3 top-5 text-gray-600 hover:text-red-500 hover:scale-110"
              onClick={() => addToWishlistHandler(data)}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-3 top-14 text-gray-600 hover:text-blue-500 hover:scale-110"
            onClick={() => setOpen(!open)}
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-3 top-24 text-gray-700 hover:text-green-500 hover:scale-110"
            onClick={() => addToCartHandler(data._id)}
            title="Add to cart"
          />
          {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
