import React, { useEffect, useState } from "react";
import { Button } from "../../components/global/GlobalButton";
import Input from "../../components/global/Input";
import { useLogin } from "../../hooks/api/Post";
import { useFormik } from "formik";
import { personalDetailsValues } from "../../init/authentication/AuthValues";
import { personalDetailsSchema } from "../../schema/authentication/AuthSchema";
import { MapImg } from "../../assets/export";
import { useDispatch, useSelector } from "react-redux";
import {
  CompleteUserProfile,
  resetAuthState,
} from "../../redux/slices/auth.slice";
import { ErrorToast } from "../../components/global/Toaster";

export default function PersonalDetail({ handleNext }) {
  const { loading, postData } = useLogin();
  const [previewImage, setPreviewImage] = useState(); // Default image
  const { isLoading, error, userData, success, accessToken } = useSelector(
    (state) => state.auth
  ); // Get loading, error, and user data from Redux

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: personalDetailsValues,
    validationSchema: personalDetailsSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      try {
        const formData = new FormData();

        // Append form values
        formData.append("name", values.fullName);
        formData.append("phone_number", values.phone);
        formData.append("location", values.location);

        // Append file/image
        if (values.profilePic) {
          formData.append("avatar", values.profilePic);
        }

        // Append extra fields
        formData.append("lat", 24.8607);
        formData.append("long", 67.0011);
        formData.append("state", "Florida");
        formData.append("country", "Us");
        formData.append("city", "Miami");

        // Dispatch with FormData
        await dispatch(CompleteUserProfile(formData)).unwrap();

        handleNext();
        action.resetForm();
      } catch (err) {
        console.error("Profile update failed:", err);
      }
    },
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
  } = formik;
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("profilePic", file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <div className="w-auto h-[98%]">
      <h3 className="font-[600] text-center text-[36px] text-[#181818]">
        Personal Details
      </h3>
      <p className="text-[#565656] mt-3 text-center font-[400] text-[16px]">
        Please enter your details to create an account.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="w-full mx-auto  md:w-[393px] mt-5 flex flex-col justify-start items-start gap-4"
      >
        <div>
          <label htmlFor="profilePic" className="cursor-pointer">
            <div className="flex items-center gap-4">
              <label
                htmlFor="profilePic"
                className="w-16 h-16 rounded-full border-2 border-dashed border-[#00034A] flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg text-gradient">+</span>
                )}
                <input
                  id="profilePic"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <label
                htmlFor="profilePic"
                className="text-gradient font-medium text-[16px] cursor-pointer"
              >
                Upload Profile Picture
              </label>
            </div>
          </label>
          <input
            type="file"
            name="profilePic"
            id="profilePic"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
            onBlur={handleBlur}
          />
          {errors.profilePic && touched.profilePic && (
            <p className="text-red-500 text-sm mt-1">{errors.profilePic}</p>
          )}
        </div>

        <Input
          text="Full Name"
          name="fullName"
          type="text"
          holder="Enter full name"
          value={values.fullName}
          handleBlur={handleBlur}
          handleChange={handleChange}
          error={errors.fullName}
          touched={touched.fullName}
        />

        <Input
          text="Phone Number"
          name="phone"
          type="text"
          holder="000 000 00"
          value={values.phone}
          handleBlur={handleBlur}
          handleChange={(e) => {
            const { value } = e.target;
            if (/^\d*$/.test(value) && value.length <= 10) {
              handleChange(e);
            }
          }}
          error={errors.phone}
          touched={touched.phone}
        />

        <Input
          text="Location"
          name="location"
          type="text"
          holder="Enter address here"
          value={values.location}
          handleBlur={handleBlur}
          handleChange={handleChange}
          error={errors.location}
          touched={touched.location}
        />

        <img src={MapImg} alt="map.png" />
        <div className="w-[100%] mx-auto">
          <Button text="Next" loading={isLoading} />
        </div>
      </form>
    </div>
  );
}
