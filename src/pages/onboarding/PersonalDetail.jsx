import React, { useState } from "react";
import { Button } from "../../components/global/GlobalButton";
import Input from "../../components/global/Input";
import { useLogin } from "../../hooks/api/Post";
import { useFormik } from "formik";
import { personalDetailsValues } from "../../init/authentication/AuthValues";
import { personalDetailsSchema } from "../../schema/authentication/AuthSchema";
import { MapImg } from "../../assets/export";
import { useDispatch } from "react-redux";
import { CompleteUserProfile } from "../../redux/slices/auth.slice";

export default function PersonalDetail({ handleNext }) {
  const { loading, postData } = useLogin();
  const [previewImage, setPreviewImage] = useState(); // Default image
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: personalDetailsValues,
    validationSchema: personalDetailsSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("phone", values.phone);
      formData.append("location", values.location);
      formData.append("profilePic", values.profilePic);
      const data = {
        name: values.fullName,
        phone_number: values.phone,
        lat: 24.8607,
        long: 67.0011,
        state: "Florida",
        country: "Us",
        city: "Miami",
        location: values.location,
      };
      await dispatch(CompleteUserProfile(data)).unwrap();
      handleNext();
      action.resetForm();
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
          <Button text="Next" loading={loading} />
        </div>
      </form>
    </div>
  );
}
