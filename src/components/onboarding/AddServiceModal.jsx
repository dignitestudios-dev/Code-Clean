import React, { useState } from "react";

export default function AddServiceModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: "", price: "", description: "" });

  const handleSubmit = () => {
    if (form.title && form.price) {
      onAdd(form);
      setForm({ title: "", price: "", description: "" });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-[16px] p-6 w-full max-w-md shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-[20px] font-bold mb-6">Add New Service</h2>

        {/* Service Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Service Name
          </label>
          <input
            type="text"
            placeholder="Enter Service Name"
            className="w-full border border-[#BEBEBE] rounded-md px-3 py-2 text-sm outline-none"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Service Price */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Service Price
          </label>
          <div
            className={`h-[49px] flex cursor-pointer justify-start bg-[#FFFFFF] items-start w-full relative border-[0.8px]  border-[#D9D9D9] rounded-[8px] `}
          >
            {" "}
            <button
              type="button"
              className="w-[15%] h-full rounded-[8px] border-r-1 h-[38px] mt-1 -ml-2  bg-transparent text-md text-[#959393] flex items-center justify-center"
            >
              $
            </button>
            <input
              type={"text"}
              id={""}
              name={""}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className={`w-full h-[49px] bg-transparent  outline-none border-0 rounded-[8px] placeholder:text-[#959393] text-[#262626] text-[16px] font-normal leading-[20.4px] `}
            />
          </div>
        </div>

        {/* Service Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">
            Service Description
          </label>
          <textarea
            placeholder="Briefly explain the service required"
            className="w-full border border-[#BEBEBE] rounded-md px-3 py-2 text-sm outline-none min-h-[80px] resize-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Add Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-lg text-white font-semibold"
          style={{
            background:
              "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
