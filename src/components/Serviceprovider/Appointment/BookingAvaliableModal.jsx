import { HiX } from "react-icons/hi";

const BookingAvaliable
    = ({ isOpen, setIsOpen }) => {
        const timeSlots = [
            { time: '09:00am', status: 'available' },
            { time: '10:00am', status: 'available' },
            { time: '11:00am', status: 'available' },
            { time: '12:00pm', status: 'busy' },
            { time: '01:00pm', status: 'available' },
            { time: '02:00pm', status: 'available' },
            { time: '03:00pm', status: 'available' },
            { time: '04:00pm', status: 'busy' },
            { time: '05:00pm', status: 'available' }
        ];
        const TimeSlot = ({ time, status }) => (
            <div className="flex items-stretch gap-2 py-2">
                <p className="w-[70px] text-sm text-[#181818] -mt-3">{time}</p>
                <div className="border-t border-[#18181852] pt-2 w-full" >
                    <div
                        className={`flex-1 w-full  rounded-md py-3 text-center font-medium ${status === "available"
                            ? "bg-[#00B0FF40] text-[#00B0FF]"
                            : "bg-[#FFD6D6] bg-[#EE313140] text-[#FF1E1E]"
                            }`}
                    >
                        {status}
                    </div>
                </div>
            </div>
        );

        return (
            <div className="min-h-screen  bg-gray-50 p-4">
                {/* Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* Modal */}
                <div className={`
        fixed top-0 right-0 h-full w-full rounded-tl-[12px] rounded-bl-[12px] max-w-md bg-white z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">Booking Requests</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <HiX size={24} className="text-gray-600" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto h-full pb-20">
                        {timeSlots.map((slot, index) => (
                            <TimeSlot key={index} time={slot.time} status={slot.status} />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

export default BookingAvaliable
    ;
