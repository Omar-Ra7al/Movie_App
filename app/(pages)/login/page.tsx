"use client";
// Components >>
import Form from "@/app/components/shared/Form";
import FormField from "@/app/components/shared/FormField";
import Button from "@/app/components/shared/Button";

// Redux Toolkit >>
import { useDispatch, useSelector } from "react-redux";
import { userLogin, rsetMsg, alertTimeout } from "@/app/redux/auth/userSlice";
// Redux Toolkit Types >>
import { AppDispatch, RootState } from "@/app/redux/store";

// Models Types TS >>
import { SignupMsgType, AuthStatus } from "@/app/models/types";

// NextJS Router >>
import { useRouter } from "next/navigation";

// React Hooks >>
import { useEffect, useRef } from "react";
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { email, uid, loading, status, authStatus } = useSelector(
    (state: RootState) => state.user
  );
  console.log(authStatus);

  const mailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const handleSignupUser = () => {
    // Dispatch the action of Thunk
    if (mailRef.current?.value && passRef.current?.value) {
      dispatch(
        userLogin({
          email: mailRef.current?.value,
          password: passRef.current?.value,
        })
      );
    } else {
      dispatch(
        rsetMsg({
          type: SignupMsgType.error,
          message: "Please fill all fields",
        })
      );
      dispatch(alertTimeout());
    }
    if (authStatus == AuthStatus.loggedIn) {
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen p-4">
      <Form
        tilte="Login"
        formBody={[
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

export default Login;
