import { useState } from "react";
import Modal from "react-modal";
import { useLogin } from "../../../hooks/api/Post";
import { useFormik } from "formik";
import Input from "../../global/Input";
import { Button } from "../../global/GlobalButton";
import AddAvailabilityModal from "../../onboarding/AddAvaliabilityModal";
import { HiOutlineXMark } from "react-icons/hi2";
import { FiTrash2 } from "react-icons/fi";
import SuccessModal from "../../global/SuccessModal";
import AddServiceModal from "../../onboarding/AddServiceModal";
import { FaTrashAlt } from "react-icons/fa";
import { EditIcon } from "../../../assets/export";
import EditServiceModal from "./EditServiceModal";
import DeleteProServices from "./DeleteProServices";
export default function ProviderEditServices({ isOpen, setIsOpen }) {
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [actionType, setActionType] = useState(false);
  const [services, setServices] = useState([
    {
      title: "Service Title",
      price: "50$",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
    {
      title: "Service Title",
      price: "50$",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    },
  ]);

  const handleAddService = (newService) => {
    setServices((prev) => [...prev, newService]);
  };
  const handleDelete = (index) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
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
        <div className="bg-white rounded-[16px] shadow-lg py-4 w-[500px] px-4   flex flex-col justify-center gap-3 ">
          <div className="flex justify-end w-full">
            <button onClick={() => setIsOpen(!isOpen)}>
              <HiOutlineXMark size={23} />
            </button>
          </div>
          <div className="">
            <h3 className="text-[32px] font-bold text-[#181818] text-center">
              Edit Your services
            </h3>
            <p className="text-center text-[#565656] text-[16px]">
              Edit your service details or add new services
            </p>
            <div className="h-[130px] mt-10 w-full">
              <label className="block text-sm font-semibold mb-1">
                Services
              </label>
              <div className="flex justify-center items-center h-[100%] w-full w-full border rounded-[8px] border-dashed border-[#00034A] ">
                <button
                  onClick={() => {
                    setShowModal(true);
                    setActionType("add");
                  }}
                  className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent"
                >
                  + Add New Services
                </button>
              </div>
            </div>

            {showModal && actionType == "add" && (
              <AddServiceModal
                onClose={() => setShowModal(false)}
                onAdd={handleAddService}
              />
            )}
            {showModal && actionType == "edit" && (
              <EditServiceModal
                onClose={() => setShowModal(false)}
                onAdd={handleAddService}
              />
            )}
            {showModal && actionType == "delete" && (
              <DeleteProServices
                detail={{
                  title: "Delete Service",
                  bio: "Are you sure you want to delete this service?",
                }}
                setIsOpen={setShowModal}
                isOpen={showModal}
              />
            )}
            {/* Services List */}
            <div className="mt-16 flex flex-col h-[240px] overflow-auto gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="border rounded-[10px] p-4 bg-white shadow-sm relative"
                >
                  <div className="absolute top-4 right-4 flex gap-2">
                    <img
                      src={EditIcon}
                      className="w-4 cursor-pointer "
                      onClick={() => {
                        setShowModal(true);
                        setActionType("edit");
                      }}
                      alt=""
                    />
                    <FaTrashAlt
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setActionType("delete");
                      }}
                    />
                  </div>
                  <h4 className="font-[600] text-[12px]">{service.title}</h4>
                  <p className="text-[#727272] text-[12px] mt-1">
                    {service.description}
                  </p>
                  <p className="font-[600] text-[12px] mt-2">
                    ${service.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                setSuccessModal(true);
              }}
              className="mt-6 w-full rounded-xl py-3 text-white text-[16px] font-semibold"
              style={{
                background:
                  "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
      <SuccessModal
        isOpen={successModal}
        setIsOpen={setSuccessModal}
        des={"Your services has been updated successfully."}
        title={"Services Updated!"}
      />
    </>
  );
}
