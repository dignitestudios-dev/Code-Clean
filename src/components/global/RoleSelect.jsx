import React from "react";

const RoleSelectModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const roles = [
    {
      id: "user",
      title: "I'm a User",
      description: "Find and book professional service providers easily.",
    },
    {
      id: "service_provider",
      title: "I'm a Service Provider",
      description:
        "Offer your services, manage bookings, and grow your business.",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Choose Your Role
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Please select your role to continue with login
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => onSelect(role.id)}
              className="border rounded-xl p-4 text-center hover:shadow-md transition-all
                         hover:border-blue-500 focus:ring-2 focus:ring-blue-400"
            >
              <h3 className="text-lg font-semibold mb-1">{role.title}</h3>
              <p className="text-sm text-gray-500">{role.description}</p>
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectModal;
