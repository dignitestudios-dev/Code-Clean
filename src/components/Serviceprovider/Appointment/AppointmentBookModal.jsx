import Modal from "react-modal";
import { HiOutlineXMark } from "react-icons/hi2";
import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
const AppointmentBookModal
    = ({ isOpen, setIsOpen }) => {
        const [requests, setRequests] = useState([
            {
                id: 'ID12345',
                name: 'Sophia Rose',
                time: '18:00 AM',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&auto=format',
                bgColor: 'bg-green-200'
            },
            {
                id: 'ID12345',
                name: 'Sophia Rose',
                time: '12:00 AM',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face&auto=format',
                bgColor: 'bg-pink-200'
            },
            {
                id: 'ID12345',
                name: 'Sophia Rose',
                time: '08:00 AM',
                avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&crop=face&auto=format',
                bgColor: 'bg-pink-100'
            },
            {
                id: 'ID12345',
                name: 'Sophia Rose',
                time: '10:00 AM',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&auto=format',
                bgColor: 'bg-green-200'
            }
        ]);

        const handleApprove = (index) => {
            setRequests(requests.filter((_, i) => i !== index));
        };

        const handleDecline = (index) => {
            setRequests(requests.filter((_, i) => i !== index));
        };

        return (
            <Modal
                isOpen={isOpen}
                contentLabel="Page Not Found"
                shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
                shouldCloseOnEsc={false}
                className="flex items-center justify-center border-none outline-none z-[1000] "
                overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
            >
                <div className="bg-white w-[500px] px-4 p-3 rounded-[16px] shadow-lg flex flex-col justify-center gap-3 ">
                    <div className="w-full flex justify-between" >
                        <h3 className="text-[28px] font-bold text-[#181818]" >Appointment Booked</h3>
                        <button onClick={() => {
                            setIsOpen(!isOpen)
                        }} ><HiOutlineXMark /></button>
                    </div>
                    <span className="text-[#181818] text-[16px] font-[500]" >Tuesday, 03</span>
                    <div className="w-full flex flex-col mt-4 items-center">
                        <div className="px-4 pb-6 w-full space-y-4 max-h-[60vh] overflow-y-auto">
                            {requests.map((request, index) => (
                                <div
                                    key={index}
                                    className="bg-[#fafafa] border-[#E8E8E8] border-2  rounded-[12px] p-4 "
                                >
                                    <div className="flex justify-between items-center w-full">
                                        <p className="mb-2 text-[12px] text-[#353535] font-medium">{request.id}</p>
                                        <p className="mb-2 text-[14px] text-[#EC8325] font-medium">Upcoming</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="">

                                                <div className={`w-14 h-14 rounded-full ${request.bgColor} flex items-center justify-center overflow-hidden`}>
                                                    <img
                                                        src={request.avatar}
                                                        alt={request.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div>

                                                <h3 className="font-semibold text-gray-900 text-lg">{request.name}</h3>
                                                <p className="text-gray-600">{request.time}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">

                                            <button
                                                onClick={() => handleApprove(index)}
                                                className="w-8 h-8 bg-gradient-to-tr from-[#00034A] to-[#27A8E2] rounded-full flex items-center justify-center transition-colors"
                                            >
                                                <MdOutlineKeyboardArrowRight size={20} className="text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {requests.length === 0 && (
                            <div className="px-6 pb-6 text-center text-gray-500">
                                No booking requests at the moment.
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        );
    };

export default AppointmentBookModal
    ;
