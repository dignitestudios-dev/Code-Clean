import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { HiOutlineXMark } from 'react-icons/hi2';
import Modal from "react-modal";
export default function ServiceRatingUI({ isOpen, setIsOpen }) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleStarClick = (starIndex) => {
        setRating(starIndex + 1);
    };

    const handleStarHover = (starIndex) => {
        setHoveredRating(starIndex + 1);
    };

    const handleStarLeave = () => {
        setHoveredRating(0);
    };

    const handleSubmit = () => {
        if (rating > 0) {
            alert(`Thank you for your ${rating}-star rating and feedback!`);
            // Reset form
            setRating(0);
            setFeedback('');
        } else {
            alert('Please select a rating before submitting.');
        }
    };

    const handleLater = () => {
        alert('Thank you! You can rate your experience anytime.');
    };

    return (
        <>
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
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">
                            Rate Your Service Experience
                        </h1>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Thank you for using our platform! Please take a moment to rate your experience with [Service Provider's Name]. Your feedback helps improve service quality and assists other users in making informed decisions.
                        </p>
                    </div>

                    {/* Rating Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="flex gap-1">
                                {[0, 1, 2, 3, 4].map((index) => {
                                    const isActive = index < (hoveredRating || rating);
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleStarClick(index)}
                                            onMouseEnter={() => handleStarHover(index)}
                                            onMouseLeave={handleStarLeave}
                                            className="transition-all duration-200 hover:scale-110"
                                        >
                                            <FaStar
                                                size={40}
                                                className={`${isActive
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'fill-gray-300 text-gray-300'
                                                    } transition-colors duration-200`}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                            <span className="text-xl font-semibold text-gray-700">Rating</span>
                        </div>
                        {rating > 0 && (
                            <p className="text-sm text-gray-600 ml-1">
                                You rated: {rating} star{rating !== 1 ? 's' : ''}
                            </p>
                        )}
                    </div>

                    {/* Feedback Section */}
                    <div className="mb-8">
                        <label className="block text-xl font-semibold text-gray-900 mb-4">
                            Write your Feedback
                        </label>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Share your experience with us..."
                            className="w-full h-48 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-end">
                        <button
                            onClick={handleLater}
                            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200 text-lg"
                        >
                            Later
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 text-lg shadow-lg hover:shadow-xl"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}