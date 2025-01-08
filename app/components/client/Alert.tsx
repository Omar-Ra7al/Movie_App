"use client";
// Models Type >>
import { SignupMsgType } from "@/app/models/types";
// Redux Toolkit Types >>
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { closeAlert, rsetMsg } from "@/app/redux/auth/userSlice";

// Icons >>
import { FaCheck } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";
import { useEffect } from "react";

const Alert = () => {
  const dipatch = useDispatch<AppDispatch>();
  const { status, alert } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dipatch(closeAlert());
      // dipatch(rsetMsg({ type: null, message: null }));
    }, 3000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [alert]);

  return (
    <div
      className={`
        z-[51]
        ${alert ? "opacity-1" : "opacity-0 -z-50"}
        min-w-60 fixed top-3 left-1/2 transform -translate-x-1/2
        flex justify-center items-center gap-x-2
        transition-opacity duration-500 bg-white px-2 py-4 rounded-md border-l-4 
        ${
          SignupMsgType.sucsses === status.type
            ? "border-green-500"
            : "border-red-500"
        }`}>
      {SignupMsgType.sucsses === status.type ? (
        <FaCheck className="text-green-500 text-xl" />
      ) : (
        <MdErrorOutline className="text-red-500 text-xl" />
      )}
      <p className="text-black">{status.message}</p>
    </div>
  );
};

export default Alert;
