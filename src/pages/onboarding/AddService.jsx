import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import AddServiceModal from "../../components/onboarding/AddServiceModal";
import { deleteIcon, EditIcon } from "../../assets/export";
import EditServiceModal from "../../components/Serviceprovider/profile/EditServiceModal";
import DeleteProServices from "../../components/Serviceprovider/profile/DeleteProServices";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../redux/slices/provider.slice";

export default function AddServicesForm({ handleNext }) {
  const [actionType, setActionType] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state?.provider);
  const [selectedItem, setSelectedItem] = useState();
  const handleDelete = (index) => {
    return null;
  };

  useEffect(() => {
    dispatch(getServices());
  }, []);

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
        <div className="flex justify-center items-center h-[100%] w-full  border rounded-[8px] border-dashed border-[#27A8E2] ">
          <button
            onClick={() => {
              setActionType("add");
              setShowModal(true);
            }}
            className="bg-gradient-to-r from-[#00034A] border-b border-[#00034A] to-[#27A8E2] bg-clip-text text-transparent"
          >
            + Add New Services
          </button>
        </div>
      </div>

      {showModal && actionType == "add" && (
        <AddServiceModal onClose={() => setShowModal(false)} />
      )}
      {/* Services List */}
      <div className="mt-10 h-[200px] overflow-auto flex flex-col gap-4">
        {services?.map((service, index) => (
          <div
            key={index}
            className="border rounded-[10px] p-4 bg-white shadow-sm relative"
          >
            <div className="absolute top-4 right-4 flex gap-2">
              <img
                src={EditIcon}
                onClick={() => {
                  setShowModal(true);
                  setSelectedItem(service);
                  setActionType("edit");
                }}
                className="w-[20px] cursor-pointer h-[20px]"
                alt=""
              />
              <img
                src={deleteIcon}
                onClick={() => {
                  setShowModal(true);
                  setSelectedItem(service);
                  setActionType("delete");
                }}
                className="w-[20px] cursor-pointer h-[20px]"
                alt=""
              />
            </div>
            <h4 className="font-[600] text-[12px]">{service?.title}</h4>
            <p className="text-[#727272] font-[400] text-[12px] mt-1">
              {service?.description}
            </p>
            <p className="font-[600] text-[12px] mt-2">${service?.amount}</p>
          </div>
        ))}
      </div>

      {showModal && actionType == "edit" && (
        <EditServiceModal selectedItem={selectedItem} onClose={() => setShowModal(false)} />
      )}
      {showModal && actionType == "delete" && (
        <DeleteProServices
          detail={{
            title: "Delete Service",
            bio: "Are you sure you want to delete this service?",
          }}
          dell="service"
          selectedItem={selectedItem}
          setIsOpen={setShowModal}
          isOpen={showModal}
        />
      )}

      {/* Next Button */}
      <button
        onClick={() => handleNext()}
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
