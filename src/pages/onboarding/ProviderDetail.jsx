import React, { useState } from "react";
import { Button } from "../../components/global/GlobalButton";
import Input from "../../components/global/Input";
import { useLogin } from "../../hooks/api/Post";
import { useFormik } from "formik";
import { personalDetailsValues } from "../../init/authentication/AuthValues";
import { personalDetailsSchema } from "../../schema/authentication/AuthSchema";
import { MapImg, UploadImg } from "../../assets/export";
import { IconFilePlus } from "@tabler/icons-react";
import { FaPlus } from "react-icons/fa";
import AddAvailabilityModal from "../../components/onboarding/AddAvaliabilityModal";
import { FiTrash2 } from "react-icons/fi";

export default function ProviderDetail({ handleNext }) {
  const { loading, postData } = useLogin();
  const [previewImage, setPreviewImage] = useState(UploadImg); // Default image
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: personalDetailsValues,
    validationSchema: personalDetailsSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      handleNext();
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("phone", values.phone);
      formData.append("location", values.location);
      formData.append("profilePic", values.profilePic);

      // postData("/your-api-endpoint", false, null, formData, callbackFn);
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
        className="w-full md:w-[700px] mx-auto  mt-5 gap-4"
      >
        <div>
          <label htmlFor="profilePic" className="cursor-pointer">
            <img
              src={previewImage}
              className={`${
                previewImage == "/src/assets/upload-img.png"
                  ? "w-[280px]"
                  : "w-[100px] rounded-full  h-[100px]"
              } object-cover`}
              alt="UploadImg"
            />
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
        <div className="grid mt-4  grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-4">
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
                // Allow only digits and limit to 10
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
          </div>
          <div>
            <Input
              text="Enter working radius here"
              name="radius"
              type="text"
              holder="Enter working radius here"
              value={values.radius}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.radius}
              touched={touched.radius}
            />
            <div className="w-full mt-4 h-auto flex flex-col justify-start items-start gap-1">
              <label htmlFor="" className="font-[700] capitalize text-[12px]">
                Set Availability
              </label>
              <div
                className={`h-[49px] flex items-center cursor-pointer justify-between bg-[#FFFFFF] w-full relative border-[0.8px]  border-[#D9D9D9] rounded-[8px] `}
              >
                <div className="bg-[#F1F1F1D1] flex gap-2 items-center p-2 h-[38px] rounded-[8px] ml-1">
                  <p className="text-[14px]">09:00 AM - 08:00 PM (Mon - Fri)</p>
                  <FiTrash2 color={"#F01A1A"} size={14} />
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  style={{
                    background:
                      "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
                  }}
                  className="w-[13%] mt-1 rounded-[8px] h-[38px]   mr-2 bg-transparent text-md text-[#959393] flex items-center justify-center"
                >
                  <FaPlus color="white" />
                </button>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="" className="font-[700] capitalize text-[12px]">
                Set Availability
              </label>
              <textarea
                name=""
                rows={8}
                className="flex resize-none justify-start bg-[#F8F8F899] items-start w-full relative border-[0.8px]  border-[#D9D9D9] rounded-[8px]"
                id=""
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Button text="Sign Up" loading={loading} />
        </div>
      </form>
      {showModal && (
        <AddAvailabilityModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
