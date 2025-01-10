"use client";
import { useState } from "react";
// Components >>
import Button from "../shared/Button";
// Icons >>
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import { AuthStatus } from "@/app/models/types";
const ProfileRender = () => {
  const router = useRouter();
  const { authStatus } = useSelector((state: RootState) => state.user);
  const btnClass = "bg-white z-[55] shadow-sm text-black rounded-md text-center px-4";
  const [loader, setLoader] = useState({ type: "" });
  return (
    <>
      {authStatus === AuthStatus.loggedIn ? (
        <div
          className="relative w-11 h-11 flex justify-center items-center rounded-2xl bg-active cursor-pointer shadow-md z-[100]"
          onClick={() => router.push("/settings")}>
          <FaUserAlt className="text-sm" />
          <span className="absolute top-0 right-0 h-3 w-3 flex justify-center items-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-[10px] w-[10px] bg-sky-500"></span>
          </span>
        </div>
      ) : (
        <div
          style={{ animationIterationCount: "1" }}
          className={`animate-pulse flex gap-x-2 `}>
          <Button
            type="button"
            text="Login"
            disabled={loader.type == "login"}
            className={btnClass}
            onClick={() => {
              router.push("/login");
              setLoader({ type: "login" });
            }}
          />
          <Button
            type="button"
            text="Signup"
            className={btnClass}
            disabled={loader.type == "signup"}
            onClick={() => {
              router.push("/signup");
              setLoader({ type: "signup" });
            }}
          />
        </div>
      )}
    </>
  );
};

export default ProfileRender;
