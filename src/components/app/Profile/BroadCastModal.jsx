import React, { useState, useEffect, useRef } from 'react';
import { RxCross2 } from "react-icons/rx";
import { GoTrash } from "react-icons/go";
import { stripe } from '../../../assets/export';
import { getPaymentMethoduser, HireServiceProvider } from '../../../redux/slices/users.slice';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { ErrorToast } from '../../global/Toaster';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

export default function BroadCastModal({ custombooking, setCustombooking, setCustombookingtwo }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { paymentMethoduser } = useSelector((s) => s.user);
    const [paymentmethoduser, setPaymentmethoduser] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        price: '',
        duration: '',
        city: '',
        state: '',
        country: '',
        lat: '',
        long: '',
    });

    const formatDate = (d) => d; // "YYYY-MM-DD"
    const formatTime = (t) => t; // "HH:mm"

    useEffect(() => {
        dispatch(getPaymentMethoduser());
    }, [dispatch]);

    const handlePlaceChangeded = () => {
        if (!autocompleteRef.current) return;
        const place = autocompleteRef.current.getPlace();

        if (!place.geometry) return;

        // Get Latitude & Longitude
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        // Initialize variables
        let city = "";
        let state = "";
        let country = "";

        // Loop through address components
        place.address_components.forEach(component => {
            const types = component.types;

            if (types.includes("locality")) {
                city = component.long_name;
            }

            if (types.includes("administrative_area_level_1")) {
                state = component.long_name;
            }

            if (types.includes("country")) {
                country = component.long_name;
            }
        });

        // Update state with extracted values
        setFormData(prev => ({
            ...prev,
            lat,
            long: lng,
            city,
            state,
            country,
            location: place.formatted_address, // full address
        }));

        // Optional: update input field
        setLocations(place.formatted_address);
    };

    const autocompleteRef = useRef(null);

    const handleOnLoads = (autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    useEffect(() => {
        if (paymentMethoduser) {
            setPaymentmethoduser(paymentMethoduser);
            // preselect first card for UX
            if (!selectedCard && paymentMethoduser.length > 0) {
                setSelectedCard(paymentMethoduser[0]);
            }
        }
    }, [paymentMethoduser]);

    const handleCardSelect = (card) => setSelectedCard(card);

    const [files, setFiles] = useState([]); // [{ file, preview, fileName, size }]
    const MAX_SIZE = 20 * 1024 * 1024; // 20MB
    const MAX_FILES = 3;

    const handleFileChange = (e) => {
        const list = Array.from(e.target.files || []);
        if (!list.length) return;

        const current = [...files];
        for (const f of list) {
            if (!f.type.startsWith('image/')) continue;
            if (f.size > MAX_SIZE) continue;
            if (current.length >= MAX_FILES) {
                ErrorToast(`You can only upload up to ${MAX_FILES} images.`);
                break;
            }
            const preview = URL.createObjectURL(f);
            current.push({ file: f, preview, fileName: f.name, size: f.size });
        }
        setFiles(current);
        e.target.value = '';
    };

    const handleRemoveFile = (index) => {
        setFiles(prev => {
            const next = [...prev];
            const removed = next.splice(index, 1)[0];
            if (removed?.preview) URL.revokeObjectURL(removed.preview);
            return next;
        });
    };

    useEffect(() => {
        return () => {
            files.forEach(f => f.preview && URL.revokeObjectURL(f.preview));
        };
    }, [files]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleHireNow = async () => {

        const providerData = {
            title: formData.title,
            date: formData.date,   // already "YYYY-MM-DD"
            time: formData.time,   // already "HH:mm"
            location: formData.location,
            amount: formData.price,
            description: formData.description,
            duration: formData.duration || '',
            city: formData.city || '',
            state: formData.state || '',
            country: formData.country || '',
            lat: formData.lat || 0,
            long: formData.long || 0,
            payment_method_id: selectedCard.id,
        };

        const payload = {
            providerData,
        };

        dispatch(HireServiceProvider(payload));  // Dispatch the action
    };

    if (!custombooking) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-[36em] rounded-lg shadow-lg p-0 pt-6 pb-6 relative max-h-[43rem] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b-[1px] pb-3 pl-6 pr-6">
                    <h2 className="text-[24px] font-semibold">Broadcast Request form</h2>
                    <button onClick={() => setCustombooking(false)} aria-label="Close">
                        <RxCross2 size={26} />
                    </button>
                </div>

                {/* Form */}
                <div className="space-y-4 pl-6 pr-6">
                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-medium">Service Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter your Title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2 focus:outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-medium">Service Description</label>
                        <textarea
                            name="description"
                            rows={3}
                            placeholder="Briefly explain the service required"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2 focus:outline-none"
                        />
                    </div>

                    {/* Upload with preview/remove */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Upload Images <span className="text-gray-500">(Optional, max 3)</span>
                        </label>

                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer border border-dashed rounded p-6 text-center w-full block hover:bg-gray-50 transition"
                        >
                            <div className="text-gray-700 font-medium">Upload Images</div>
                            <p className="text-sm text-gray-500 mt-1">
                                Up to 20MB • JPG, PNG • Max 3 images
                            </p>
                            <input
                                id="file-upload"
                                type="file"
                                name="files"
                                accept="image/*"
                                onChange={handleFileChange}
                                multiple
                                className="hidden"
                            />
                        </label>

                        {/* Previews */}
                        {files.length > 0 && (
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {files.map((f, index) => (
                                    <div key={index} className="relative flex justify-center items-center">
                                        <img
                                            src={f.preview}
                                            alt={f.fileName}
                                            className="h-[10em] w-48 object-cover rounded-md border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFile(index)}
                                            className="absolute top-1 right-1 bg-white/90 rounded-full px-2 leading-none text-gray-700 hover:text-black shadow"
                                            aria-label={`Remove ${f.fileName}`}
                                            title="Remove"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Single Date & Time */}
                    <div className="space-y-2">
                        <label className="block mb-1 font-medium">Preferred Date & Time</label>
                        <div className="flex gap-3">
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-1/2 px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                className="w-1/2 px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block mb-1 font-medium">Location</label>

                        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API} libraries={['places']}>
                            <Autocomplete onLoad={handleOnLoads} onPlaceChanged={handlePlaceChangeded}>
                                <input
                                    type="text"
                                    value={formData.location} // bind location state
                                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))} // handle user input
                                    placeholder="Type or select your location"
                                    className="w-full border rounded-lg px-4 py-2 pr-10"
                                />

                            </Autocomplete>
                        </LoadScript>
                    </div>

                    {/* Price & Duration */}
                    <div className="flex justify-between">
                        {/* Price */}
                        <div>
                            <label className="block mb-1 font-medium">Proposed Price*</label>
                            <div className="flex items-center border rounded px-2">
                                <span className="text-gray-500">$</span>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Enter amount"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full py-2 ml-1 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block mb-1 font-medium">Duration*</label>
                            <div className="flex items-center border rounded px-2">
                                <span className="text-gray-500">🕒</span>
                                <input
                                    type="text"
                                    name="duration"
                                    placeholder="Enter Duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full py-2 ml-1 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                        <label className="block mb-1 font-medium">Payment Method</label>
                        {paymentmethoduser?.length > 0 ? (
                            paymentmethoduser.map((card) => (
                                <div
                                    key={card.id}
                                    className={`flex justify-between items-center border cursor-pointer rounded p-2 mb-2
                    ${selectedCard?.id === card.id ? 'bg-blue-100 border-blue-500' : ''}
                  `}
                                    onClick={() => handleCardSelect(card)}
                                >
                                    <div className="flex gap-3 items-center">
                                        <span className="text-gray-700">**** **** **** **{card.last_digits}</span>
                                        <img src={stripe} className="h-6" alt={card.brand || 'stripe'} />
                                    </div>
                                    <button
                                        type="button"
                                        className="text-blue-500 hover:text-blue-700 text-lg"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate("/app/payment-method");
                                        }}
                                        title="Edit payment methods"
                                    >
                                        <FaEdit />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-gray-600">
                                No saved cards found.
                                <button
                                    type="button"
                                    onClick={() => navigate("/app/payment-method")}
                                    className="ml-2 text-blue-600 underline"
                                >
                                    Add a card
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleHireNow}
                            disabled={isSubmitting}
                            className={`w-[30em] flex justify-center mt-2 bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white py-2 rounded-[10px] font-semibold
                ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'}
              `}
                        >
                            {isSubmitting ? 'Submitting…' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
