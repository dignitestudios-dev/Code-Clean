import { useState, useRef, useEffect } from "react";
import { Button } from "../../components/global/GlobalButton";
import Input from "../../components/global/Input";
import { useFormik } from "formik";
import { providerDetailsValues } from "../../init/authentication/AuthValues";
import { providerDetailsSchema } from "../../schema/authentication/AuthSchema";
import { FaPlus } from "react-icons/fa";
import AddAvailabilityModal from "../../components/onboarding/AddAvaliabilityModal";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  CompleteProviderProfile,
  resetAuthState,
} from "../../redux/slices/auth.slice";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import { ErrorToast } from "../../components/global/Toaster";

export default function ProviderDetail({ handleNext }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [availability, setAvailability] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 38.7946, lng: 106.5348 }); // default Karachi
  const autocompleteRef = useRef(null);
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.auth);

  const dayAbbreviations = {
    monday: "MON",
    tuesday: "TUE",
    wednesday: "WED",
    thursday: "THU",
    friday: "FRI",
    saturday: "SAT",
    sunday: "SUN",
  };

  const formik = useFormik({
    initialValues: providerDetailsValues,
    validationSchema: providerDetailsSchema,
    onSubmit: async (values, action) => {
      try {
        const formData = new FormData();

        // Basic info
        formData.append("name", values.fullName);
        // formData.append("working_radius", values.radius);
        formData.append("phone_number", values.phone);
        formData.append("lat", mapCenter.lat);
        formData.append("long", mapCenter.lng);
        formData.append("city", values.city);
        formData.append("state", values.state);
        formData.append("country", values.country);
        formData.append("location", values.location);
        formData.append("experience", Number(values.experience));
        formData.append("biography", values.biography);

        // Avatar
        if (values.profilePic) {
          formData.append("avatar", values.profilePic);
        }

        // Availability
        if (availability) {
          formData.append("availability[start_time]", availability.start_time);
          formData.append("availability[end_time]", availability.end_time);

          if (Array.isArray(availability.days)) {
            availability.days.forEach((day, i) => {
              formData.append(`availability[days][${i}]`, day);
            });
          }
        }

        await dispatch(CompleteProviderProfile(formData)).unwrap();
        handleNext();
        action.resetForm();
      } catch (err) {
        console.error("Profile submission failed:", err);
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
    if (error) {
      ErrorToast(error);
      dispatch(resetAuthState());
    }
  }, [error]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // ✅ File size limit: 2MB
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

      // ✅ Allowed file types
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];

      if (!allowedTypes.includes(file.type)) {
        ErrorToast("Please upload a valid image (JPEG, PNG, JPG, or WEBP).");
        return;
      }

      if (file.size > maxSizeInBytes) {
        ErrorToast("File size should not exceed 2MB.")
        return;
      }

      // ✅ Set file and preview if valid
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

        // extract city, state, country
        let city = "";
        let state = "";
        let country = "";

        if (place.address_components) {
          for (const comp of place.address_components) {
            if (comp.types.includes("locality")) city = comp.long_name;
            if (comp.types.includes("administrative_area_level_1"))
              state = comp.long_name;
            if (comp.types.includes("country")) country = comp.long_name;
          }
        }
        console.log(city, state, country, "countr test");
        setFieldValue("city", city);
        setFieldValue("state", state);
        setFieldValue("country", country);
      }
    }
  };

  return (
    <div className="w-auto h-[98%]">
      <h3 className="font-[600] text-center text-[36px] text-[#181818]">
        Provider Details
      </h3>
      <p className="text-[#565656] mt-3 text-center font-[400] text-[16px]">
        Please enter your details to create an account.
      </p>

      <form
        onSubmit={handleSubmit}
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

        {/* Form Fields */}
        <div className="grid mt-4 grid-cols-2 gap-4">
          {/* Left column */}
          <div className="flex flex-col gap-4">
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

            {/* Location with Google Autocomplete */}
            <div className="w-full">
              <label className="font-[700] text-[12px]">Location</label>
              <Autocomplete
                onLoad={(ref) => (autocompleteRef.current = ref)}
                onPlaceChanged={handlePlaceChanged}
              >
                <input
                  type="text"
                  name="location"
                  defaultValue={values.location}
                  onBlur={handleBlur}
                  placeholder="Enter address here"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Autocomplete>

              {/* Live Google Map */}
              <div className="mt-10 w-full h-[150px] rounded-[7px]">
                <GoogleMap
                  center={mapCenter}
                  zoom={12}
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
          </div>

          {/* Right column */}
          <div>
            {/* <Input
              text="Working Radius"
              name="radius"
              type="number"
              holder="Enter working radius"
              value={values.radius}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.radius}
              touched={touched.radius}
            /> */}

            <div className="">
              <Input
                text="Experience (Years)"
                name="experience"
                type="number"
                holder="Enter years of experience"
                value={values.experience}
                handleBlur={handleBlur}
                handleChange={(e) => {
                  let { value } = e.target;

                  // Prevent negative or decimal values
                  if (Number(value) < 0) value = "";
                  if (!/^\d*$/.test(value)) return; // allow only digits

                  e.target.value = value;
                  handleChange(e);
                }}
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
                      {availability.days
                        .map((day) => dayAbbreviations[day] || day)
                        .join(", ")}
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
                  className="w-[13%] ml-auto rounded-[8px] h-[38px] mr-2 flex items-center justify-center"
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
              {errors.biography && touched.biography && (
                <p className="text-red-700 text-sm font-medium">
                  {errors.biography}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="w-[360px] mt-10 mx-auto">
          <Button text="Next" type="submit" loading={isLoading} />
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
