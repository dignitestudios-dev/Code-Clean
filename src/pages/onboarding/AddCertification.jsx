import React, { useState } from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { deleteIcon, EditIcon } from "../../assets/export";
import AddCertificationModal from "../../components/onboarding/AddCertificationModal";
import EditCertificateModal from "../../components/Serviceprovider/profile/EditCertificationModal";
import DeleteProServices from "../../components/Serviceprovider/profile/DeleteProServices";
import { useSelector } from "react-redux";

export default function AddCertification({ handleNext }) {
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const { certificates } = useSelector((state) => state?.provider);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddService = (newService) => {
    // setServices((prev) => [...prev, newService]);
  };

  return (
    <div className="w-full max-w-lg mx-auto py-6">
      <h2 className="text-[32px] font-bold text-[#181818] text-center">
        Add Certification{" "}
      </h2>
      <p className="text-center text-[#565656] text-[16px] mt-2">
        Please enter your certification details to add certification
      </p>
      <div className="h-[200px] mt-10 w-full">
        <label className="block text-sm font-semibold mb-1">
          Certification
        </label>
        <div className="flex justify-center items-center h-[100%] w-full w-full border rounded-[8px] border-dashed border-[#00034A] ">
          <button
            onClick={() => {
              setShowModal(true);
              setActionType("add");
            }}
            className="bg-gradient-to-r from-[#00034A] border-b border-[#00034A] to-[#27A8E2] bg-clip-text text-transparent"
          >
            + Add New Certification
          </button>
        </div>
      </div>

      {showModal && actionType == "add" && (
        <AddCertificationModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddService}
        />
      )}
      {showModal && actionType == "edit" && (
        <EditCertificateModal
          selectedItem={selectedItem}
          onClose={() => setShowModal(false)}
          onAdd={handleAddService}       
        />
      )}
      {showModal && actionType == "delete" && (
        <DeleteProServices
          selectedItem={selectedItem}
          detail={{
            title: "Delete Certification",
            bio: "Are you sure you want to delete this certification?",
          }}
          setIsOpen={setShowModal}
          dell="certificate"
          isOpen={showModal}
        />
      )}
      {/* Services List */}
      <div className="mt-16 flex flex-col gap-4">
        <div className="mt-0 flex flex-col gap-4 h-[200px] overflow-auto ">
          {certificates?.map((service, index) => (
            <div
              key={index}
              className="border rounded-[10px] p-4 bg-white shadow-sm relative"
            >
              <div className="absolute top-4 right-4 flex gap-2">
                <img
                  src={EditIcon}
                  onClick={() => {
                    setSelectedItem(service);
                    setShowModal(true);
                    setActionType("edit");
                  }}
                  className="w-[20px] cursor-pointer h-[20px]"
                  alt=""
                />
                <img
                  src={deleteIcon}
                  onClick={() => {
                    setSelectedItem(service);
                    setShowModal(true);
                    setActionType("delete");
                  }}
                  className="w-[20px] cursor-pointer h-[20px]"
                  alt=""
                />
              </div>
              <h3 className="font-semibold text-[16px]">{service?.name}</h3>
              <h4 className="font-[400] text-[#3A3A3A] text-[12px]">
                {service?.institution}
              </h4>
              <p className="text-[#727272] text-[12px] mt-1">
                {service?.description}
              </p>
              <p className="font-[600] text-[12px] mt-2">12 Jan, 2024</p>
            </div>
          ))}
        </div>
        <div>
          <label
            htmlFor="check"
            className="flex items-center cursor-pointer text-[13px] font-[400]  text-[#000000] gap-2"
          >
            <input
              type="checkbox"
              className="border  border-[#AEAEAE] bg-white"
              name="check"
              id="check"
            />
            I am just starting out
          </label>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="mt-6 w-full rounded-xl py-3 text-white text-[16px] font-semibold"
        style={{
          background:
            "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
        }}
      >
        Next
      </button>
      <button
        onClick={handleNext}
        className="mt-3 w-full rounded-xl py-3 text-[#212935] text-[16px] font-semibold"
        style={{
          background: "#F2F1F1",
        }}
      >
        Skip
      </button>
    </div>
  );
}
