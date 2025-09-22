import React, { useEffect, useState, useRef } from "react";
import { Button } from "../../components/global/GlobalButton";
import Input from "../../components/global/Input";
import { useFormik } from "formik";
import { personalDetailsValues } from "../../init/authentication/AuthValues";
import { personalDetailsSchema } from "../../schema/authentication/AuthSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  CompleteUserProfile,
  resetAuthState,
} from "../../redux/slices/auth.slice";
import { ErrorToast } from "../../components/global/Toaster";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";

export default function PersonalDetail({ handleNext }) {
  const [previewImage, setPreviewImage] = useState();
  const [mapCenter, setMapCenter] = useState({ lat: 38.7946, lng: 106.5348 }); 
  const { isLoading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const autocompleteRef = useRef(null);

  const formik = useFormik({
    initialValues: personalDetailsValues,
    validationSchema: personalDetailsSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      try {
        const formData = new FormData();
        formData.append("name", values.fullName);
        formData.append("phone_number", values.phone);
        formData.append("location", values.location);
        formData.append("country", values.country);
        formData.append("state", values.state);
        formData.append("city", values.city);

        if (values.profilePic) {
          formData.append("avatar", values.profilePic);
        }

        // Send actual selected lat/lng
        formData.append("lat", mapCenter.lat);
        formData.append("long", mapCenter.lng);

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
    dispatch(resetAuthState());
    return () => dispatch(resetAuthState());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      ErrorToast(error);
      dispatch(resetAuthState());
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

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      if (place?.formatted_address) {
        setFieldValue("location", place.formatted_address);

        // update map center
        if (place.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setMapCenter({ lat, lng });
        }

        // Extract city, state, country
        let city = "";
        let state = "";
        let country = "";

        if (place.address_components) {
          for (const component of place.address_components) {
            if (component.types.includes("locality")) {
              city = component.long_name;
            }
            if (
              component.types.includes("administrative_area_level_1") ||
              component.types.includes("administrative_area_level_2")
            ) {
              state = component.long_name;
            }
            if (component.types.includes("country")) {
              country = component.long_name;
            }
          }
        }

        // Save extra fields into Formik
        setFieldValue("city", city);
        setFieldValue("state", state);
        setFieldValue("country", country);
      }
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
        {/* Profile Picture Upload */}
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

        {/* Full Name */}
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

        {/* Phone */}
        <Input
          text="Phone Number"
          name="phone"
          type="text"
          holder="000 000 00"
          value={values.phone}
          handleBlur={handleBlur}
          handleChange={(e) => {
            let { value } = e.target;
            // Remove non-digits
            value = value.replace(/\D/g, "");

            if (value.length > 10) return; // max 10 digits

            // Auto-format (xxx) xxx-xxxx
            if (value.length > 6) {
              value = `(${value.slice(0, 3)}) ${value.slice(
                3,
                6
              )}-${value.slice(6)}`;
            } else if (value.length > 3) {
              value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            }

            e.target.value = value;
            handleChange(e);
          }}
          error={errors.phone}
          touched={touched.phone}
        />

        {/* Location with Google Autocomplete */}
        <div className="w-full">
          <label className="block mb-1 text-sm font-medium">Location</label>

          <Autocomplete
            onLoad={(ref) => (autocompleteRef.current = ref)}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              name="location"
              defaultValue={values.location} // ✅ use defaultValue instead of value
              onBlur={handleBlur}
              placeholder="Enter address here"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Autocomplete>

          {/* Google Map replaces static image */}
          <div className="mt-3 w-full h-[100px] rounded-[7px]  md:h-[150px]">
            <GoogleMap
              center={mapCenter}
              zoom={10}
              mapContainerStyle={{
                width: "100%",
                height: "100%",
                borderRadius: "7px",
              }}
            >
              <Marker position={mapCenter} />
            </GoogleMap>
          </div>

          {errors.location && touched.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        <div className="w-[100%] mx-auto">
          <Button text="Next" loading={isLoading} />
        </div>
      </form>
    </div>
  );
}
