import Modal from "react-modal";
import { HiOutlineXMark } from "react-icons/hi2";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
const LogOutModal = ({ isOpen, setIsOpen, detail }) => {
  const navigate = useNavigate("");
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Page Not Found"
      shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
      shouldCloseOnEsc={false}
      className="flex items-center justify-center border-none outline-none z-[1000] "
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
    >
      <div className="bg-white rounded-[16px] shadow-lg p-2 w-[450px]   flex flex-col justify-center gap-3 ">
        <div className="flex justify-end w-full">
          <button onClick={() => setIsOpen(!isOpen)}>
            <HiOutlineXMark size={23} />
          </button>
        </div>
        <div className="flex items-start px-5 flex-col gap-2 mb-4">
          <h2 className="text-[#181818] font-bold text-[20px]">log out</h2>
          <p className="text-[#18181880] text-[16px]">
            Are you sure you want to log out?
          </p>
          <div className="flex gap-3 items-center mt-3">
            <button
              className="bg-[#21293514] text-[#212935] rounded-[8px] px-10 p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              No
            </button>
            <button
              className="bg-[#EE3131] text-[white] rounded-[8px] px-10 p-2"
              onClick={() => {
                navigate("/app/landing");
                Cookies.remove("role");
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
