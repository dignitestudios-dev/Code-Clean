import Modal from "react-modal";
import { HiOutlineXMark } from "react-icons/hi2";
const BadgeModal = ({ isOpen, setIsOpen, detail }) => {
    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Page Not Found"
            shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
            shouldCloseOnEsc={false}
            className="flex items-center justify-center border-none outline-none z-[1000] "
            overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
        >
            <div className="bg-white rounded-[16px] shadow-lg p-5 w-[450px]  items-center flex flex-col justify-center gap-3   text-center">
                <div className="flex justify-end w-full">
                    <button onClick={()=>setIsOpen(!isOpen)}>
                        <HiOutlineXMark size={23} />
                    </button>
                </div>
                <div className="flex items-center flex-col gap-2 mb-4">
                    <img
                        src={detail?.icon}
                        alt=""
                        className="h-[120px] w-[120px]  rounded-[16px]"
                    />
                    <h3 className="text-[#181818] text-[32px] font-[600] " >Congratulations!</h3>
                    <p className="text-[#565656] text-[16px] font-[400]">{detail?.bio}</p>
                </div>

            </div>
        </Modal>
    );
};

export default BadgeModal;
