import { useState } from "react";
import Modal from "react-modal";
import { useLogin } from "../../../hooks/api/Post";
import { useFormik } from "formik";
import { updateProviderDetailsSchema } from "../../../schema/authentication/AuthSchema";
import { MapImg, usertwo } from "../../../assets/export";
import Input from "../../global/Input";
import { FaPlus } from "react-icons/fa";
import { Button } from "../../global/GlobalButton";
import AddAvailabilityModal from "../../onboarding/AddAvaliabilityModal";
import { HiOutlineXMark } from "react-icons/hi2";
import { FiTrash2 } from "react-icons/fi";
import SuccessModal from "../../global/SuccessModal";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProviderProfile } from "../../../redux/slices/auth.slice";

export default function ProviderEditProfile({ isOpen, setIsOpen }) {
  const { loading } = useLogin();
  const { user_data } = useSelector((state) => state?.auth);
  const [previewImage, setPreviewImage] = useState(
    `http://family-phys-ed-s3.s3.amazonaws.com/${user_data?.avatar}`
  );
  const fallbackImage = usertwo;
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [availability, setAvailability] = useState(null);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullName: user_data?.name || "",
      radius: user_data?.working_radius || "",
      phone: user_data?.phone_number || "",
      location: user_data?.address || "",
      biography: user_data?.biography || "",
      experience: user_data?.experience || "",
      profilePic: user_data?.avatar,
    },
    validationSchema: updateProviderDetailsSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append("name", values.fullName);
        formData.append("working_radius", values.radius);
        formData.append("phone_number", values.phone);
        formData.append("lat", 39.7508948);
        formData.append("long", -104.9331132);
        formData.append("city", "Denver");
        formData.append("state", "Colorado");
        formData.append("country", "United States");
        formData.append("location", values.location);
        formData.append("working_radius", values.radius);
        formData.append("experience", values.experience);
        formData.append("biography", values.biography);

        if (values.profilePic && typeof values.profilePic != "string") {
          formData.append("avatar", values.profilePic);
        }

        // ✅ Proper array style for availability
        if (availability) {
          formData.append(
            "availability[0][start_time]",
            availability.start_time
          );
          formData.append("availability[0][end_time]", availability.end_time);

          availability.days.forEach((day, index) => {
            formData.append(`availability[0][days][${index}]`, day);
          });
        }
        await dispatch(UpdateProviderProfile(formData)).unwrap();
        setIsOpen(!isOpen);
        setSuccessModal(true);
      } catch (err) {
        console.error("Update failed:", err);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("profilePic", file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        contentLabel="Edit Profile"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        className="flex items-center justify-center border-none outline-none z-[1000]"
        overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000] flex justify-center items-center"
      >
        <div className="bg-white rounded-[16px] shadow-lg py-4 w-auto px-4 flex flex-col justify-center gap-3 overflow-auto h-[650px] ">
          <div className="flex justify-end mt-14 w-full">
            <button onClick={() => setIsOpen(!isOpen)}>
              <HiOutlineXMark size={23} />
            </button>
          </div>

          <h3 className="font-[600] text-center text-[28px] text-[#181818]">
            Edit Profile
          </h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="w-full md:w-[700px] mx-auto mt-5 gap-4"
          >
            {/* Profile Picture */}
            <div>
              <label htmlFor="profilePic" className="cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 relative bg-gradient-to-br from-green-300 to-green-400 rounded-full flex items-center justify-center">
                    <img
                      src={previewImage || fallbackImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                    <button className="absolute bottom-1 right-0 w-5 h-5 bg-gradient-to-r from-[#27A8E2] to-[#00034A] rounded-full flex items-center justify-center shadow-lg transition-colors">
                      <FaPlus size={12} className="text-white" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="underline text-nowrap text-[#208BC7]">
                      Change Profile picture
                    </span>
                  </div>
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

            {/* Form Fields */}
            <div className="grid mt-4 grid-cols-2 gap-3">
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
                <div className="mt-2">
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
                </div>
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
                <img src={MapImg} alt="map.png" className="mt-4" />
              </div>

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
                <div className="mt-6">
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
                <div className="w-full mt-4 flex flex-col gap-1">
                  <label className="font-[700] capitalize text-[12px]">
                    Set Availability
                  </label>
                  <div className="h-[49px] flex items-center justify-between bg-[#FFFFFF] w-full border-[0.8px] border-[#D9D9D9] rounded-[8px]">
                    {availability ? (
                      <div className="bg-[#F1F1F1D1] flex gap-2 items-center p-2 h-[38px] rounded-[8px] ml-1">
                        <p className="text-[14px]">
                          {availability.start_time} - {availability.end_time} (
                          {availability.days.join(", ")?.slice(0, 15)},...)
                        </p>
                        <button
                          type="button"
                          onClick={() => setAvailability(null)}
                        >
                          <FiTrash2 color={"#F01A1A"} size={14} />
                        </button>
                      </div>
                    ) : (
                      <p className="ml-2 text-sm text-gray-400">
                        No availability set
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => setShowModal(true)}
                      style={{
                        background:
                          "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
                      }}
                      className="w-[13%] mt-1 rounded-[8px] h-[38px] mr-2 flex items-center justify-center"
                    >
                      <FaPlus color="white" />
                    </button>
                  </div>
                </div>

                {/* Biography */}
                <div className="mt-3">
                  <label className="font-[700] capitalize text-[12px]">
                    Biography
                  </label>
                  <textarea
                    name="biography"
                    rows={4}
                    value={values.biography}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="flex px-2 py-2 resize-none justify-start bg-[#FFFFFF] items-start w-full border-[0.8px] border-[#D9D9D9] rounded-[8px]"
                  />
                  {errors.biography && touched.biography && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.biography}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 w-[360px] mx-auto">
              <Button text="Update" type={"submit"} loading={loading} />
            </div>
          </form>

          {/* Availability Modal */}
          {showModal && (
            <AddAvailabilityModal
              onClose={() => setShowModal(false)}
              edit={true}
              onSave={(data) => {
                setAvailability(data);
                setShowModal(false);
              }}
            />
          )}
        </div>
      </Modal>

      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal}
        setIsOpen={setSuccessModal}
        des={"Your profile has been updated successfully."}
        title={"Profile Updated!"}
      />
    </>
  );
}
