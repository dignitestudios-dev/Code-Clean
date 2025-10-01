import { useState } from "react";
import { useNavigate } from "react-router";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
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
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center px-4 sm:px-6 lg:px-8">
      <h2 className="text-[24px] pt-10 md:pt-0 sm:text-[38px] font-[600] text-center mb-2">
        What’s your main goal?
      </h2>
      <p className="text-[#585858] text-center text-[14px] sm:text-[16px] font-[400] mb-6">
        We’ll streamline your account setup accordingly.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-6 w-full">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`group cursor-pointer rounded-[14px] px-6 py-8 flex flex-col items-center justify-center w-full sm:w-[460px] h-[250px] md:h-[350px] text-center transition-all shadow-md
                ${
                  isSelected
                    ? "text-white bg-gradient-to-br from-[#27A8E2] to-[#00034A]"
                    : "text-gray-600 bg-white border border-gray-200 hover:bg-gradient-to-br hover:from-[#27A8E2] hover:to-[#00034A]"
                }`}
            >
              <h3
                className={`text-[24px] sm:text-[30px] font-bold mb-2 ${
                  isSelected ? "" : "group-hover:text-white"
                }`}
              >
                {role.title}
              </h3>
              <p
                className={`text-[14px] sm:text-[16px] font-[400] ${
                  isSelected ? "" : "group-hover:text-white"
                }`}
              >
                {role.description}
              </p>
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
          ? "Join as Service Provider"
          : "Create Account"}
      </button>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <span
          className="text-[#27A8E2] cursor-pointer"
          onClick={() => {
            navigate("/auth/login");
          }}
        >
          Log In
        </span>
      </p>
    </div>
  );
};

export default RoleSelection;
