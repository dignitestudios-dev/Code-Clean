import React, { useEffect, useState } from 'react';
import { FaCheck, FaStar } from 'react-icons/fa';
import { HiOutlineXMark, HiXMark } from 'react-icons/hi2';
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { submitBookingReview } from '../../../redux/slices/users.slice';
import { Button } from '../../global/GlobalButton';
export default function ServiceRatingUI({ isOpen, setIsOpen, booking_id }) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
    const navigate = useNavigate("");
    const dispatch = useDispatch();
    const {bookingReviewLoading}=useSelector(state=>state?.user)



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
            // Dispatch the API call to submit the review
            const data = {
                booking_id: booking_id,
                rating: rating,
                feedback: feedback
            }
            dispatch(submitBookingReview(data))
                .then(() => {
                    setIsThankYouModalOpen(true); // Show thank you modal
                    setIsOpen(false);

                    // Optionally reset form after showing the modal
                    setTimeout(() => {
                        navigate("/home");
                    }, 1000);

                    setRating(0);
                    setFeedback('');
                })
                .catch((error) => {
                    // Handle error if the API call fails
                    alert('Something went wrong while submitting your review. Please try again.');
                });
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
                contentLabel="Rate Service Modal"
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                className="flex items-center justify-center z-[1000] outline-none"
                overlayClassName="fixed inset-0 bg-[#C6C6C6]/50 backdrop-blur-sm flex items-center justify-center z-[1000]"
            >
                <div className="bg-white w-[480px] px-6 py-4 rounded-[16px] shadow-lg text-left">
                    {/* Close Button */}
                    <div className="w-full flex justify-end mb-2">
                        <button onClick={() => setIsOpen(false)}>
                            <HiOutlineXMark size={24} className="text-gray-600 hover:text-black" />
                        </button>
                    </div>

                    {/* Header */}
                    <h1 className="text-[28px] font-bold text-gray-900 mb-4">
                        Rate Your Service Experience
                    </h1>
                    <p className="text-sm text-gray-700 leading-relaxed mb-6 px-0">
                        Thank you for using our platform! Please take a moment to rate your
                        experience with [Service Provider’s Name]. Your feedback helps improve
                        service quality and assists other users in making informed decisions.
                    </p>

                    {/* Rating */}
                    <div className="mb-6">
                        <div className="flex items-center justify-start gap-3">
                            {[0, 1, 2, 3, 4].map((index) => {
                                const isActive = index < (hoveredRating || rating);
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleStarClick(index)}
                                        onMouseEnter={() => handleStarHover(index)}
                                        onMouseLeave={handleStarLeave}
                                        className="transition-all duration-150 hover:scale-110"
                                    >
                                        <FaStar
                                            size={28}
                                            className={`${isActive ? 'text-yellow-400' : 'text-gray-300'
                                                } transition-colors duration-200`}
                                        />
                                    </button>
                                );
                            })}
                            <span className="text-[15px] font-medium text-gray-700 ml-2">Rating</span>
                        </div>
                        {rating > 0 && (
                            <p className="text-xs text-gray-600 mt-2">
                                You rated: {rating} star{rating > 1 ? 's' : ''}
                            </p>
                        )}
                    </div>

                    {/* Feedback Textarea */}
                    <div className="mb-6 text-left w-full">
                        <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                            Write your Feedback
                        </label>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Share your experience with us..."
                            className="w-full h-[100px] p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm"
                        />
                    </div>

                    {/* Submit Button */}
                    <Button text={"Submit"} loading={bookingReviewLoading} onClick={handleSubmit} />
                   
                </div>
            </Modal>
            <Modal
                isOpen={isThankYouModalOpen}
                onRequestClose={() => setIsThankYouModalOpen(false)}
                className="flex items-center justify-center z-[1000] outline-none"
                overlayClassName="fixed inset-0 bg-[#C6C6C6]/50 backdrop-blur-sm flex items-center justify-center z-[1000]"
            >
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-5 md:w-[30em] shadow-2xl text-center">
                        {/* Checkmark Icon */}
                        <div className="flex justify-end items-center">
                            <button onClick={() => setIsThankYouModalOpen(false)}>
                                <HiXMark size={22} />
                            </button>
                        </div>
                        <div className="mb-4 flex justify-center items-center">
                            <div className="bg-gradient-to-r from-[#27A8E2] to-[#00034A] w-[70px] h-[70px] rounded-full flex justify-center items-center">
                                <FaCheck color='white' size={30} />
                            </div>
                        </div>
                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Feedback submitted!</h2>
                        {/* Message */}
                        <p className="text-gray-600 text-sm mb-4">
                            Thank You for Your Feedback. Your feedback has been successfully submitted. We appreciate your time in helping us improve our services. Your review will assist other users in making informed decisions.
                        </p>
                    </div>
                </div>
            </Modal>


        </>
    );
}