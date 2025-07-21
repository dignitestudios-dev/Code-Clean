import { useState } from "react";
import { useNavigate } from "react-router";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate("");
  const roles = [
    {
      id: "user",
      title: "I'm a User",
      description: "Find and book professional service providers easily.",
    },
    {
      id: "provider",
      title: "I'm a Service Provider",
      description:
        "Offer your services, manage bookings, and grow your business.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center px-4">
      <h2 className="text-[38px] font-[600] text-center mb-2">
        What’s your main goal?
      </h2>
      <p className="text-[#585858] text-center text-[16px] font-[400] mb-6">
        We’ll streamline your account setup accordingly.
      </p>

      <div className="flex flex-col md:flex-row gap-8 mb-6">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`cursor-pointer rounded-[14px] px-6 py-8 flex flex-col items-center justify-center w-[460px] h-[350px] text-center transition-all shadow-md ${
                isSelected
                  ? "text-white"
                  : "text-gray-600 bg-white border border-gray-200"
              }`}
              style={{
                background: isSelected
                  ? "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)"
                  : "",
              }}
            >
              <h3 className={`text-[30px]  font-bold  mb-2`}>{role.title}</h3>
              <p className="text-[16px] font-[400]">{role.description}</p>
            </div>
          );
        })}
      </div>

      <button
        disabled={!selectedRole}
        onClick={() =>
          navigate("/auth/signup", { state: { role: selectedRole } })
        }
        className={`w-72 py-3 rounded text-white font-semibold transition-all ${
          selectedRole
            ? "bg-gradient-to-r from-[#27A8E2] to-[#00034A] hover:opacity-90"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        {selectedRole === "user"
          ? "Join as a User"
          : selectedRole === "provider"
          ? "Join as a Provider"
          : "Create Account"}
      </button>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <span className="text-[#27A8E2] cursor-pointer">Log In</span>
      </p>
    </div>
  );
};

export default RoleSelection;
