import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { AppleImage, GoogleImage } from "../../assets/export";
import { Button } from "../global/GlobalButton";
import Input from "../../components/global/Input";
import { SignUpValues } from "../../init/authentication/AuthValues";
import { signUpSchema } from "../../schema/authentication/AuthSchema";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Register,
  resetAuthState,
  SocialLogin,
} from "../../redux/slices/auth.slice";
import { ErrorToast } from "../global/Toaster";
import { useGoogleLogin } from "@react-oauth/google";
import RoleSelectModal from "../global/RoleSelect";

export default function RegisterForm({ handleNext, setEmail, role }) {
  const { isLoading, error, userData, success, accessToken } = useSelector(
    (state) => state.auth
  ); // Get loading, error, and user data from Redux
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSelect = () => {
    setShowRoleModal(false);
    setSelectedRole(role);
    if (selectedProvider === "google") {
      Googlelogin();
    } else if (selectedProvider === "apple") {
      handleAppleLogin();
    }
  };
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: SignUpValues,
      validationSchema: signUpSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        setEmail(values?.email);
        const data = {
          email: values?.email,
          password: values?.password,
          password_confirmation: values?.confirmPassword,
          role: role,
        };

        try {
          // Await the Register dispatch and unwrap the result
          await dispatch(Register(data)).unwrap();

          // If success, go to the next step
          handleNext();

          // Optionally reset form
          action.resetForm();
        } catch (error) {
          // ErrorToast()
          // If register fails, show error (e.g., toast or log)
          console.log("Registration failed:", error);
        }
      },
    });

  useEffect(() => {
    dispatch(resetAuthState()); // reset success, error, and loading
    return () => dispatch(resetAuthState());
  }, [dispatch]);
  // useEffect for Error Toast
  useEffect(() => {
    if (error) {
      ErrorToast(error); // Show error toast if there's an error
      dispatch(resetAuthState()); // clear error after toast
    }
  }, [error]);

  const Googlelogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const data = {
        token: tokenResponse?.access_token,
        role: role,
      };
      await dispatch(SocialLogin(data));
    },
    onError: () => {},
  });
  const handleAppleLogin = async (role) => {
    setShowRoleModal(false);
    try {
      const response = await window.AppleID.auth.signIn({
        clientId: "YOUR_CLIENT_ID", // Apple Service ID
        redirectURI: "YOUR_REDIRECT_URI",
        scope: "email name",
        state: role, // role pass kar sakte ho
        nonce: "random_nonce_string",
        usePopup: true,
      });
    } catch (err) {
      console.error("Apple login failed:", err);
    }
  };

  return (
    <div className="w-auto flex flex-col justify-center h-[100%] ">
      <h3 className="font-[600] text-center text-[36px] text-[#181818]">
        SignUp
      </h3>
      <p className="text-[#565656] text-center font-[400] text-[16px] pt-2">
        Please enter your details to create an account.
      </p>
      <div className="w-full mx-auto  md:w-[393px] mt-8 flex flex-col justify-start items-start gap-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="w-full mx-auto  md:w-[393px] mt-8 flex flex-col justify-start items-start gap-4"
        >
          <Input
            text={"email address"}
            name={"email"}
            type={"email"}
            holder={"chris.tom@gmail.com"}
            value={values.email}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.email}
            touched={touched?.email}
          />
          <Input
            text={"Password"}
            name={"password"}
            type={"password"}
            holder={"Enter password here"}
            value={values.password}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.password}
            touched={touched?.password}
          />
          <Input
            text={"Confirm password"}
            name={"confirmPassword"}
            type={"password"}
            holder={"Re-enter password here"}
            value={values.confirmPassword}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.confirmPassword}
            touched={touched?.confirmPassword}
          />

          <Button text={"Sign Up"} loading={isLoading} />

          <div className="text-center w-full">
            <p className="font-[500] text-[12px] text-[#565656]">
              Already have an account?{" "}
              <span
                className="text-[#27A8E2] cursor-pointer"
                onClick={() => {
                  navigate("/auth/login");
                }}
              >
                Log In
              </span>
            </p>
            <p className="font-[500] mt-2 text-[12px] text-[#565656]">
              I accept the{" "}
              <NavLink to={""} className={"font-[600]"}>
                Terms & conditions
              </NavLink>{" "}
              and{" "}
              <NavLink className={"font-[600]"} to={""}>
                Privacy policy{" "}
              </NavLink>{" "}
            </p>
          </div>
        </form>

        <div className="flex w-full items-center rounded-full">
          <div className="flex-1 border-b border-gray-350" />
          <span className="text-[#959393] text-[20px] font-normal leading-8 px-8 ">
            Or
          </span>
          <div className="flex-1 border-b border-gray-350" />
        </div>
        <div className="w-full">
          <button
            onClick={() => {
              Googlelogin();
            }}
            className="border flex items-center p-2 border-[#181818] rounded-full w-full "
          >
            <img src={GoogleImage} alt="" className="w-8" />
            <span className="mx-auto text-[14px] font-[500] text-[#181818]">
              {" "}
              Continue With Google
            </span>
          </button>
          <button className="border flex items-center mt-4 p-2 border-[#181818] rounded-full w-full ">
            <img src={AppleImage} alt="" className="w-8" />
            <span className="mx-auto text-[14px] font-[500] text-[#181818]">
              {" "}
              Continue With Apple
            </span>
          </button>
        </div>
      </div>

      <RoleSelectModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onSelect={handleRoleSelect}
      />
    </div>
  );
}
