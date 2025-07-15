import Modal from "react-modal";
import { HiOutlineXMark } from "react-icons/hi2";
import { DangerIcon } from "../../../assets/export";
const RestrictedModal = ({ isOpen, setIsOpen }) => {
    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Page Not Found"
            shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
            shouldCloseOnEsc={false}
            className="flex items-center justify-center border-none outline-none z-[1000] "
            overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
        >
            <div className="bg-white rounded-[16px] shadow-lg p-2 w-[450px]   flex flex-col text-center justify-center gap-3 ">
                <div className="flex justify-end w-full">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <HiOutlineXMark size={23} />
                    </button>
                </div>
                <div className="flex items-center px-5  flex-col gap-2 mb-4">
                    <img src={DangerIcon} className="w-[60px] h-[60px]" alt="" srcset="" />
                    <h2 className="text-[#181818] mt-3 font-bold text-[20px]">Action Restricted!</h2>
                    <p className="text-[#18181880] text-[16px]">This job is currently in progress. You cannot edit or delete the post until the service is completed.</p>

                </div>

            </div>
        </Modal>
    );
};

export default RestrictedModal;
