"use client";
// React hooks >>
import { useEffect } from "react";

// Redux >>
import { useDispatch } from "react-redux";
import { changeAuthStatus, setUserAfterLoad } from "@/app/redux/auth/userSlice";

// firebase >>
import { auth } from "@/app/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// Redux >>
import { AppDispatch } from "@/app/redux/store";
// Models Types TS >>
import { fetchAdditionalUserData } from "@/app/redux/auth/userSlice";
import { AuthStatus } from "@/app/models/types";
import { fetchWishList } from "@/app/redux/wishList/wishListSlice";
const AuthChanged = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user loged in ");
        console.log(user);
        dispatch(
          setUserAfterLoad({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          })
        );
        dispatch(changeAuthStatus(AuthStatus.loggedIn));
        dispatch(fetchAdditionalUserData());
        dispatch(fetchWishList()); // get wish list data after login
      } else {
        console.log("user loged out ");
        dispatch(changeAuthStatus(AuthStatus.loggedOut));
        // reset data when is logout or have error
        dispatch(
          setUserAfterLoad({
            uid: null,
            email: null,
            name: null,
          })
        );
      }
    });

    // Clean up >>
    return () => unsubscribe();
  }, []);
  return <></>;
};

export default AuthChanged;
