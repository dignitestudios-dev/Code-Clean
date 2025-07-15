import Modal from "react-modal";
import { HiOutlineXMark } from "react-icons/hi2";
import { SuccessIcon } from "../../../assets/export";
const ProfileUpdatedModal = ({ isOpen, setIsOpen }) => {
    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Page Not Found"
            shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
            shouldCloseOnEsc={false}
            className="flex items-center justify-center border-none outline-none z-[1000] "
            overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
        >
            <div className="bg-white w-[500px] p-4 rounded-[16px] shadow-lg   items-center flex flex-col justify-center gap-3   text-center">
                <div className="w-full flex justify-end" >
                    <button onClick={() => {
                        setIsOpen(false)
                    }} ><HiOutlineXMark /></button>
                </div>
                <div className="w-auto flex flex-col mt-4 justify-center items-center">
                    <div className="flex flex-col items-center gap-4">
                        <img src={SuccessIcon} className="w-20 h-20 " alt="mail-img" />
                        <h3 className="capitalize  text-[36px] text-[#181818] font-[600]">
                            Profile Updated!
                        </h3>
                        <p className="text-[16px] font-[400] text-[#565656]">
                            Your profile has been updated successfully.
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProfileUpdatedModal;
