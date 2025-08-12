import React, { useState } from "react";
import { Button } from "../../components/global/GlobalButton";
import Input from "../../components/global/Input";
import { useFormik } from "formik";
import {
  personalDetailsValues,
  providerDetailsValues,
} from "../../init/authentication/AuthValues";
import {
  personalDetailsSchema,
  providerDetailsSchema,
} from "../../schema/authentication/AuthSchema";
import { MapImg } from "../../assets/export";
import { FaPlus } from "react-icons/fa";
import AddAvailabilityModal from "../../components/onboarding/AddAvaliabilityModal";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { CompleteProviderProfile } from "../../redux/slices/auth.slice";

export default function ProviderDetail({ handleNext }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [availability, setAvailability] = useState(null); // store availability data
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: providerDetailsValues,
    validationSchema: providerDetailsSchema,
    onSubmit: async (values, action) => {
      const payload = {
        name: values.fullName,
        working_radius: values.radius,
        phone_number: values.phone,
        lat: 24.8607,
        long: 67.0011,
        city: "miami",
        state: "Florida",
        country: "US",
        location: values.location,
        experience: Number(values.experience),
        biography: values.biography,
        avatar: null,
        availability: availability, // collected from modal
      };

      await dispatch(CompleteProviderProfile(payload)).unwrap();
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
  console.log(errors);
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
          handleSubmit(e);
        }}
        className="w-full md:w-[700px] mx-auto mt-5 gap-4"
      >
        {/* Profile Pic */}
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
                className="text-gradient text-[16px] font-medium cursor-pointer"
              >
                Upload Profile Picture
              </label>
            </div>
          </label>
          {errors.profilePic && touched.profilePic && (
            <p className="text-red-500 text-sm mt-1">{errors.profilePic}</p>
          )}
        </div>

        {/* Left Column */}
        <div className="grid mt-4 grid-cols-2 gap-4">
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
                if (/^\d*$/.test(value) && value.length <= 12) {
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
            <img src={MapImg} alt="map.png" className="mt-4 h-[150px]" />
          </div>

          {/* Right Column */}
          <div>
            <Input
              text="Working Radius"
              name="radius"
              type="number"
              holder="Enter working radius"
              value={values.radius}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.radius}
              touched={touched.radius}
            />
            <div className="mt-4">
              <Input
                text="Experience (Years)"
                name="experience"
                type="number"
                holder="Enter years of experience"
                value={values.experience}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.experience}
                touched={touched.experience}
              />
            </div>

            {/* Availability */}
            <div className="w-full mt-4">
              <label className="font-[700] text-[12px]">Set Availability</label>
              <div className="h-[49px] flex items-center justify-between bg-[#FFFFFF] w-full border border-[#D9D9D9] rounded-[8px]">
                {availability && (
                  <div className="bg-[#F1F1F1D1] flex gap-2 items-center p-2 h-[38px] rounded-[8px] ml-1">
                    <p className="text-[14px]">
                      {availability.start_time} - {availability.end_time} (
                      {availability.days.join(", ")?.slice(0,15)},...)
                    </p>
                    <FiTrash2
                      color={"#F01A1A"}
                      size={14}
                      className="cursor-pointer"
                      onClick={() => setAvailability(null)}
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  style={{
                    background:
                      "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
                  }}
                  className="w-[13%]  ml-auto rounded-[8px] h-[38px]   mr-2 bg-transparent text-md text-[#959393] flex items-center justify-center"
                >
                  <FaPlus color="white" />
                </button>
              </div>
            </div>

            {/* Biography */}
            <div className="mt-3">
              <label className="font-[700] text-[12px]">Biography</label>
              <textarea
                name="biography"
                rows={5}
                value={values.biography}
                onChange={handleChange}
                onBlur={handleBlur}
                className="px-3 py-3 resize-none bg-[#FFFFFF] w-full border border-[#D9D9D9] rounded-[8px]"
              />
              {errors.biography && touched.biography ? (
                <p className="text-red-700 text-sm font-medium">
                  {errors.biography}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="w-[360px] mt-10 mx-auto">
          <Button text="Next" type={"submit"} />
        </div>
      </form>

      {showModal && (
        <AddAvailabilityModal
          onClose={() => setShowModal(false)}
          onSave={(data) => {
            setAvailability(data);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
