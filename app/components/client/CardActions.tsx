"use client";
// Next >>
import { useRouter } from "next/navigation";

// Components >>
import Button from "../shared/Button";

// Redux >>
import {
  addToWishList,
  fetchWishList,
  reomveFromWishList,
} from "@/app/redux/wishList/wishListSlice";
import { openAlert, rsetMsg } from "@/app/redux/auth/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";

// Icons >>
import { FaHeart } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { AuthStatus } from "@/app/models/types";
const CardActions = ({ id }: { id: string }) => {
  const router = useRouter();

  const authStatus = useSelector((state: RootState) => state.user.authStatus);
  const { items, loaded } = useSelector((state: RootState) => state.wishList);
  const dispatch = useDispatch<AppDispatch>();
  const iconsClass = "text-xl transition duration-200 hover:scale-110";

  const handelAddToWishList = (e: React.MouseEvent) => {
    dispatch(addToWishList(id));
    dispatch(fetchWishList());

    dispatch(openAlert());
    if (authStatus == AuthStatus.loggedIn) {
      dispatch(rsetMsg({ type: "sucsses", message: "Item added to wishlist" }));
    } else {
      dispatch(rsetMsg({ type: "error", message: "Please login first" }));
    }
  };

  const handelRemoveFromWishList = (e: React.MouseEvent) => {
    dispatch(reomveFromWishList(id));
    dispatch(fetchWishList());

    dispatch(openAlert());
    dispatch(
      rsetMsg({ type: "sucsses", message: "Item Removed from wishlist" })
    );
  };

  return (
    <>
      <Button
        aria="wish-list"
        disabled={false}
        type="button"
        icon={<FaHeart />}
        className={` hover:text-red-200 ${iconsClass}  ${
          loaded && items.includes(id)
            ? "text-red-500  hover:text-red-600"
            : "dark:text-white"
        }`}
        onClick={(e) => {
          // if the item is already in the wishlist, remove it, else add it
          items.includes(id)
            ? handelRemoveFromWishList(e)
            : handelAddToWishList(e);
        }}
      />
      <Button
        aria="details"
        disabled={false}
        type="button"
        icon={<FaLocationArrow />}
        className={`${iconsClass} `}
        onClick={() => router.push(`/movie-id/${id}`)}
      />
    </>
  );
};

export default CardActions;
