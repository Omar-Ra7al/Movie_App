"use client";
// Types >>
import { AuthStatus } from "@/app/models/types";
// Icons >>
import { FiLogOut } from "react-icons/fi";
import { ImSpinner9 } from "react-icons/im";
// Componsnts >>
import Button from "../shared/Button";
// Redux >>
import {
  fetchAdditionalUserData,
  userLogout,
} from "@/app/redux/auth/userSlice";
// Redux Toolkit >>
import { useDispatch, useSelector } from "react-redux";
// Redux Toolkit Types >>
import { AppDispatch, RootState } from "@/app/redux/store";

const LogoutBtn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, authStatus } = useSelector((state: RootState) => state.user);
  if (authStatus === AuthStatus.loggedIn)
    return (
      <li
        className="rounded-2xl 
                group border-2 border-secondary w-10 h-10 cursor-pointer
                flex justify-center items-center hover:border-red-500 transition duration-300">
        <Button
          aria="log_out"
          key={"submit"}
          type="button"
          text=""
          className=" w-full h-full flex justify-center items-center p-0 mt-0"
          disabled={false}
          icon={
            loading ? (
              <ImSpinner9 className="animate-spin" />
            ) : (
              <FiLogOut className="group-hover:text-red-500 text-secondary transition duration-300" />
            )
          }
          onClick={() => {
            dispatch(userLogout());
            dispatch(fetchAdditionalUserData());
          }}
        />
      </li>
    );
};

export default LogoutBtn;
