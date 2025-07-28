import { LoginRight, SuccessIcon } from "../../assets/export";

export default function PasswordUpdate() {
  return (
    <div className="w-full  h-screen grid grid-cols-2 gap-4 rounded-[19px] bg-white">
      <div className="w-auto flex flex-col mt-4 justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <img src={SuccessIcon} className="w-20 h-20 " alt="mail-img" />
          <h3 className="capitalize  text-[36px] text-[#181818] font-[600]">
            check your email
          </h3>
          <p className="text-[16px] font-[400] text-[#565656]">
            We have sent a password recover instructions to your email.
          </p>
        </div>
      </div>
      <div
        className="p-4 rounded-[20px]"
        style={{
          backgroundImage: `linear-gradient(234.85deg, rgba(39, 168, 226, 0.8) -20.45%, rgba(0, 3, 74,1) 124.53%), url(${LoginRight})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col justify-end h-full ">
          <h3 className="text-white text-[52px] font-[600]">
            Connect. Book. Serve
          </h3>
          <p className="text-white capitalize text-[32px] font-[400]">
            Book top-rated experts or grow your business—all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
