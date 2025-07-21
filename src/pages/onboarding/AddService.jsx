import React, { useState } from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import AddServiceModal from "../../components/onboarding/AddServiceModal";
import { EditIcon } from "../../assets/export";

export default function AddServicesForm({ isOpen, setIsOpen }) {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddService = (newService) => {
    setServices((prev) => [...prev, newService]);
  };

  return (
    <div className="w-full max-w-lg mx-auto py-6">
      <h2 className="text-[32px] font-bold text-[#181818] text-center">
        Add Your Services
      </h2>
      <p className="text-center text-[#565656] text-[16px] mt-2">
        Please enter your services details with pricing
      </p>
      <div className="h-[200px] mt-10 w-full">
        <label className="block text-sm font-semibold mb-1">Services</label>
        <div className="flex justify-center items-center h-[100%] w-full w-full border rounded-[8px] border-dashed border-[#00034A] ">
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent"
          >
            + Add Service
          </button>
        </div>
      </div>

      {showModal && (
        <AddServiceModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddService}
        />
      )}
      {/* Services List */}
      <div className="mt-16 flex flex-col gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="border rounded-[10px] p-4 bg-white shadow-sm relative"
          >
            <div className="absolute top-4 right-4 flex gap-2">
              <img src={EditIcon} className="w-4" alt="" srcset="" />
              <FaTrashAlt
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(index)}
              />
            </div>
            <h4 className="font-[600] text-[12px]">{service.title}</h4>
            <p className="text-[#727272] text-[12px] mt-1">
              {service.description}
            </p>
            <p className="font-[600] text-[12px] mt-2">${service.price}</p>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        className="mt-6 w-full rounded-xl py-3 text-white text-[16px] font-semibold"
        style={{
          background:
            "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
        }}
      >
        Next
      </button>
    </div>
  );
}
