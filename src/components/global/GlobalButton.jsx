import { RiLoader5Line } from "react-icons/ri";

export const Button = ({ text, onClick, loading, type, disabled,className  }) => {
  const isDisabled = loading || disabled; // ✅ combine both

  return (
    <div className="w-full">
          <button
        disabled={isDisabled}
        type={type}
        onClick={onClick}
        style={{
          background:
            "linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
        }}
        className={`px-3 rounded-[12px] w-full text-white font-[500] text-[16px] h-[49px] ${isDisabled && "cursor-not-allowed"} ${className}`}
      >
        <div className="flex justify-center text-center w-full items-center">
          <span className="mr-1 text-nowrap">{text}</span>
          {loading && <RiLoader5Line className="animate-spin text-lg" />}
        </div>
      </button>
    </div>
  );
};

export const LightButton = ({ text, onClick, loading, type }) => {
  return (
    <div className="w-full">
      <button
        disabled={loading}
        type={type}
        onClick={onClick}
        // background: linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%);

        className="bg-transparent px-3 rounded-[8px] w-full border border-[#FFFFFF] text-white  font-[500] text-[16px] h-[49px] "
      >
        <div className="flex justify-center text-center w-full items-center">
          <span className="mr-1 text-nowrap">{text}</span>
          {loading && <RiLoader5Line className="animate-spin text-lg " />}
        </div>
      </button>
    </div>
  );
};
