import Modal from "react-modal";
import { HiOutlineXMark } from "react-icons/hi2";
import { SuccessAlert } from "../../../assets/export";
const AcceptedModal = ({ isOpen, setIsOpen }) => {
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
                        setIsOpen(!isOpen)
                    }} ><HiOutlineXMark /></button>
                </div>
                <div className="w-auto flex flex-col mt-4 justify-center items-center">
                    <div className="flex flex-col items-center gap-4">
                        <img src={SuccessAlert} className="w-20 h-20 " alt="mail-img" />
                        <h3 className="capitalize  text-[36px] text-[#181818] font-[600]">
                            Confirm Acceptance!
                        </h3>
                        <p className="text-[16px] font-[400] text-[#565656]">
                            You are about to accept this job. Once accepted, you are expected to complete the service as per the job details. Do you want to proceed?
                        </p>
                        <div className="flex gap-3 items-center mt-3" >
                            <button className="bg-[#21293514] text-[#212935] rounded-[8px] px-10 p-2" >Cancel</button>
                            <button className="bg-gradient-to-r from-[#00034A] to-[#27A8E2] text-[white] rounded-[8px] px-10 p-2"  >Accept Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AcceptedModal;
