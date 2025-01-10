"use client";
// React >>
import { useRef } from "react";
import { useSelector } from "react-redux";

// Redux >>
import { RootState, AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import {
  deleteAccount,
  fetchAdditionalUserData,
  openAlert,
  rsetMsg,
  updateUserData,
} from "@/app/redux/auth/userSlice";

// Componets >>
import Form from "@/app/components/shared/Form";
import Title from "@/app/components/shared/Title";
import Button from "@/app/components/shared/Button";
import FormField from "@/app/components/shared/FormField";

// Types >>
import { AuthStatus } from "@/app/models/types";

// Icons >>
import { FaUser } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

const page = () => {
  const dipatch = useDispatch<AppDispatch>();
  const { name, status, alert, authStatus, loading } = useSelector(
    (state: RootState) => state.user
  );

  // Feilds Ref
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // Styles >>
  const feildClass = `bg-black bg-opacity-10 text-white dark:border-main`;

  // Handel form submit >>
  const handelSubmit = () => {
    if (firstNameRef.current?.value) {
      dipatch(
        updateUserData({
          first: firstNameRef.current?.value,
        })
      );
    }
    if (lastNameRef.current?.value) {
      dipatch(
        updateUserData({
          last: lastNameRef.current?.value,
        })
      );
    }

    if (
      passwordRef.current?.value === confirmPasswordRef.current?.value &&
      passwordRef.current?.value
    ) {
      dipatch(
        updateUserData({
          password: passwordRef.current?.value,
        })
      );
    }
    if (authStatus == AuthStatus.loggedOut) {
      dipatch(rsetMsg({ type: "error", message: "login at first" }));
      dipatch(openAlert());
    }
    dipatch(fetchAdditionalUserData());
    formRef.current?.reset();
  };
  return (
    <div className="w-full ">
      <Title title="Settings" />

      <div
        className={`w-full mt-8 space-y-6 bg-secondary p-4 rounded-lg ${
          loading && "animate-pulse"
        } `}>
        <div className="space-y-6">
          <div className="flex items-center flex-wrap gap-2 ">
            <div className="w-20 h-20 flex justify-center  items-center bg-active rounded-full border-2 border-white">
              <FaUser className="text-4xl text-white" />
            </div>
            <p className="text-xl flex gap-x-2 items-center text-white  ">
              Welcome
              {!loading ? (
                <span className="font-semibold text-white">
                  {authStatus == AuthStatus.loggedIn && name.first}
                </span>
              ) : (
                <ImSpinner9 className="animate-spin" />
              )}
            </p>
          </div>
        </div>

        <Form
          ref={formRef}
          className="w-3/4 backdrop-blur-0 bg-transparent "
          formBody={[
            <div
              key={"submit_parent"}
              className="flex justify-between flex-wrap gap-2 items-center">
              <p className="text-gray-400 text-sm">
                Here u can update your profile
              </p>
              <Button
                onClick={handelSubmit}
                type="submit"
                text="Save"
                className={`bg-active rounded-md w-20 text-white`}
              />
            </div>,

            <FormField
              key={"first"}
              type="text"
              id="first_name"
              text="First name"
              ref={firstNameRef}
              className={feildClass}
              required={false}
            />,
            <FormField
              key={"last"}
              type="text"
              id="last_name"
              text="Last name"
              ref={lastNameRef}
              className={feildClass}
              required={false}
            />,
            <FormField
              key={"password"}
              type="password"
              id="password"
              text="Password"
              ref={passwordRef}
              className={feildClass}
              required={false}
            />,
            <FormField
              key={"confirm_password"}
              type="password"
              id="confirm_password"
              text="Confirm Password"
              ref={confirmPasswordRef}
              className={feildClass}
              required={false}
            />,
            <div key={"delete"} className="w-full space-y-2  ">
              <p className="text-sm text-gray-400">
                You will not have the ability to recover your account{" "}
              </p>
              <Button
                onClick={() => {
                  authStatus == AuthStatus.loggedIn && dipatch(deleteAccount());
                }}
                type="submit"
                text="Delete Account"
                className="bg-red-700 rounded-md text-white"
              />
            </div>,
          ]}
        />
      </div>
    </div>
  );
};

export default page;
