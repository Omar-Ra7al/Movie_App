"use client";
// Components >>
import Form from "@/app/components/shared/Form";
import FormField from "@/app/components/shared/FormField";
import Button from "@/app/components/shared/Button";

// Redux Toolkit >>
import { useDispatch, useSelector } from "react-redux";
import { userSingup, rsetMsg, alertTimeout } from "@/app/redux/auth/userSlice";
// Redux Toolkit Types >>
import { AppDispatch, RootState } from "@/app/redux/store";

// Models Types TS >>
import { AuthStatus, SignupMsgType } from "@/app/models/types";

// NextJS Router >>
import { useRouter } from "next/navigation";

// React Hooks >>
import { useEffect, useRef } from "react";
const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { email, uid, loading, status, authStatus } = useSelector(
    (state: RootState) => state.user
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLInputElement>(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);

  const handleSignupUser = () => {
    // Dispatch the action of Thunk
    if (
      nameRef.current?.value &&
      lastRef.current?.value &&
      mailRef.current?.value &&
      passRef.current?.value &&
      confirmPassRef.current?.value
    ) {
      if (passRef.current?.value == confirmPassRef.current?.value) {
        dispatch(
          userSingup({
            email: mailRef.current?.value,
            password: passRef.current?.value,
            firstName: nameRef.current?.value,
            lastName: lastRef.current?.value,
          })
        );
      } else {
        dispatch(
          rsetMsg({
            type: SignupMsgType.error,
            message: "Passwords do not match",
          })
        );
        dispatch(alertTimeout());
      }
    } else {
      dispatch(
        rsetMsg({
          type: SignupMsgType.error,
          message: "Please fill all fields",
        })
      );
      dispatch(alertTimeout());
    }
    if (status.type == SignupMsgType.sucsses) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 2500);
    }
  };
  // useEffect(() => {
  //   if (uid && email && status.type === SignupMsgType.sucsses) {
  //     if (authStatus == AuthStatus.loggedIn) {
  //       const timer = setTimeout(() => {
  //         router.push("/login");
  //       }, 1500);
  //       return () => clearTimeout(timer);
  //     }
  //   }
  // }, [uid, email, status]);
  return (
    <div className="flex justify-center items-center w-full h-screen p-4">
      <Form
        tilte="Signup"
        alert={
          <div>
            {status.type == SignupMsgType.error ? (
              <p className="text-red-400">{status.message}</p>
            ) : (
              <p className="text-emerald-400">{status.message}</p>
            )}
          </div>
        }
        formBody={[
          <FormField
            key={"name"}
            type="text"
            id="name"
            text="Name"
            ref={nameRef}
          />,
          <FormField
            key={"last"}
            type="text"
            id="last"
            text="Last Name"
            ref={lastRef}
          />,
          <FormField
            key={"mail"}
            type="email"
            id="mail"
            text="Email"
            ref={mailRef}
          />,
          <FormField
            key={"pass"}
            type="password"
            id="pass"
            text="Password"
            ref={passRef}
          />,
          <FormField
            key={"confirm-pass"}
            type="password"
            id="confirm-pass"
            text="Confirm Password"
            ref={confirmPassRef}
          />,
          <Button
            key={"submit"}
            type="submit"
            text="Submit"
            className={"w-full bg-secondary rounded-md text-white"}
            disabled={loading}
            onClick={handleSignupUser}
          />,
        ]}
      />
    </div>
  );
};

export default Signup;
