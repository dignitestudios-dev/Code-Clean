import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useLogin } from "../../../hooks/api/Post";
import { useFormik } from "formik";
import { personalDetailsValues } from "../../../init/authentication/AuthValues";
import { personalDetailsSchema } from "../../../schema/authentication/AuthSchema";
import { MapImg, usertwo } from "../../../assets/export";
import Input from "../../global/Input";
import { FaPlus } from "react-icons/fa";
import { Button } from "../../global/GlobalButton";
import AddAvailabilityModal from "../../onboarding/AddAvaliabilityModal";
import { HiOutlineXMark } from "react-icons/hi2";
import { FiTrash2 } from "react-icons/fi";
import SuccessModal from "../../global/SuccessModal";
export default function ProviderEditProfile({ isOpen, setIsOpen }) {
  const { loading, postData } = useLogin();
  const [previewImage, setPreviewImage] = useState(null); // ✅ Real preview comes later via `handleImageChange`
  const fallbackImage = usertwo;
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const formik = useFormik({
    initialValues: personalDetailsValues,
    validationSchema: personalDetailsSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setIsOpen(!isOpen);
      setSuccessModal(!successModal);
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
      setFieldValue("profilePic", file); // for Formik validation
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl); // for preview display
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        contentLabel="Page Not Found"
        shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
        shouldCloseOnEsc={false}
        className="flex items-center justify-center border-none outline-none z-[1000] "
        overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
      >
        <div className="bg-white rounded-[16px] shadow-lg py-4 w-auto px-4   flex flex-col justify-center gap-3 ">
          <div className="flex justify-end w-full">
            <button onClick={() => setIsOpen(!isOpen)}>
              <HiOutlineXMark size={23} />
            </button>
          </div>
          <div className="">
            <h3 className="font-[600] text-center text-[28px] text-[#181818]">
              Edit Profile
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              className="w-full md:w-[700px] mx-auto  mt-5 gap-4"
            >
              <div>
                <label htmlFor="profilePic" className="cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 relative bg-gradient-to-br from-green-300 to-green-400 rounded-full flex items-center justify-center">
                      <img
                        src={previewImage || fallbackImage}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                      <button className="absolute bottom-1 right-0 w-5 h-5  bg-gradient-to-r from-[#27A8E2] to-[#00034A] rounded-full flex items-center justify-center shadow-lg transition-colors">
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.profilePic}
                  </p>
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
                    handleChange={handleChange}
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
                    value={values.fullName}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.fullName}
                    touched={touched.fullName}
                  />
                  <div className="w-full mt-4 h-auto flex flex-col justify-start items-start gap-1">
                    <label
                      htmlFor=""
                      className="font-[700] capitalize text-[12px]"
                    >
                      Set Availability
                    </label>
                    <div
                      className={`h-[49px] flex items-center cursor-pointer justify-between bg-[#FFFFFF] w-full relative border-[0.8px]  border-[#D9D9D9] rounded-[8px] `}
                    >
                      <div className="bg-[#F1F1F1D1] flex gap-2 items-center p-2 h-[38px] rounded-[8px] ml-1">
                        <p className="text-[14px]">
                          09:00 AM - 08:00 PM (Mon - Fri)
                        </p>
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
                    <label
                      htmlFor=""
                      className="font-[700] capitalize text-[12px]"
                    >
                      Set Availability
                    </label>
                    <textarea
                      name=""
                      rows={8}
                      className="flex resize-none justify-start bg-[#FFFFFF] items-start w-full relative border-[0.8px]  border-[#D9D9D9] rounded-[8px]"
                      id=""
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Button text="Update" type={"submit"} loading={loading} />
              </div>
            </form>
            {showModal && (
              <AddAvailabilityModal onClose={() => setShowModal(false)} edit={true} />
            )}
          </div>
        </div>
      </Modal>
      <SuccessModal
        isOpen={successModal}
        setIsOpen={setSuccessModal}
        des={"Your profile has been updated successfully."}
        title={"Profile Updated!"}
      />
    </>
  );
}
