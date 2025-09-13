import React, { useState, useEffect, useRef } from 'react';
import { RxCross2 } from "react-icons/rx";
import { stripe } from '../../../assets/export';
import { fetchUserProfile, getPaymentMethoduser, HireServiceProvider } from '../../../redux/slices/users.slice';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { ErrorToast } from '../../global/Toaster';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

export default function BroadCastModal({ custombooking, setCustombooking, setCustombookingtwo }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { paymentMethoduser, hireProviderSuccess } = useSelector((s) => s.user);
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

    // Validation state
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const autocompleteRef = useRef(null);

    useEffect(() => {
        dispatch(getPaymentMethoduser());
    }, [dispatch]);

    useEffect(() => {
        if (paymentMethoduser) {
            setPaymentmethoduser(paymentMethoduser);
            if (!selectedCard && paymentMethoduser?.payment_methods?.length > 0) {
                setSelectedCard(paymentMethoduser.payment_methods[0]);
            }
        }
    }, [paymentMethoduser]);

    // Files
    const [files, setFiles] = useState([]); // [{ file, preview, fileName, size }]
    const MAX_SIZE = 20 * 1024 * 1024; // 20MB
    const MAX_FILES = 3;

    const handleFileChange = (e) => {
        const list = Array.from(e.target.files || []);
        if (!list.length) return;

        const current = [...files];
        for (const f of list) {
            if (!f.type.startsWith('image/')) continue;
            if (f.size > MAX_SIZE) {
                ErrorToast('One of the images exceeds 20MB.');
                continue;
            }
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

    // Google Places
    const handleOnLoads = (autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const handlePlaceChangeded = () => {
        if (!autocompleteRef.current) return;
        const place = autocompleteRef.current.getPlace();
        if (!place?.geometry) return;

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        let city = "";
        let state = "";
        let country = "";

        (place.address_components || []).forEach(component => {
            const types = component.types || [];
            if (types.includes("locality")) city = component.long_name;
            if (types.includes("administrative_area_level_1")) state = component.long_name;
            if (types.includes("country")) country = component.long_name;
        });

        setFormData(prev => ({
            ...prev,
            lat,
            long: lng,
            city,
            state,
            country,
            location: place.formatted_address || prev.location,
        }));

        // Re-run validation because location-related fields changed
        setErrors(prev => ({ ...prev, ...validate({ ...formData, lat, long: lng, city, state, country, location: place.formatted_address || formData.location }, selectedCard) }));
    };

    // Helpers
    const parseDateTime = (d, t) => {
        if (!d || !t) return null;
        try {
            // Expecting "YYYY-MM-DD" and "HH:mm"
            const [y, m, day] = d.split('-').map(Number);
            const [hh, mm] = t.split(':').map(Number);
            return new Date(y, (m - 1), day, hh, mm, 0, 0);
        } catch {
            return null;
        }
    };

    const isPositiveNumber = (v) => {
        if (v === '' || v === null || v === undefined) return false;
        const n = Number(v);
        return Number.isFinite(n) && n > 0;
    };

    const validate = (data, card) => {
        const e = {};

        const title = (data.title || '').trim();
        const description = (data.description || '').trim();
        const location = (data.location || '').trim();
        const duration = (data.duration || '').trim();

        if (!title) e.title = 'Title is required.';
        if (!description) e.description = 'Description is required.';
        if (!data.date) e.date = 'Date is required.';
        if (!data.time) e.time = 'Time is required.';

        // Date/time not in the past (allow 2 min buffer)
        const dt = parseDateTime(data.date, data.time);
        if (dt) {
            const now = new Date();
            if (dt.getTime() < now.getTime() - 2 * 60 * 1000) {
                e.time = 'Selected date/time is in the past.';
            }
        } else if (data.date || data.time) {
            e.time = 'Invalid date/time.';
        }

        if (!location) e.location = 'Location is required.';
        // If you want to enforce map selection only, uncomment below:
        // if (!data.lat || !data.long) e.location = 'Please pick a location from suggestions.';

        if (!isPositiveNumber(data.price)) e.price = 'Enter a valid amount greater than 0.';
        if (!duration) e.duration = 'Duration is required.';

        if (!card?.id) e.payment_method = 'Please select a payment method.';

        // Optional: max images already guarded; you could surface here too
        if (files.length > MAX_FILES) e.files = `You can only upload up to ${MAX_FILES} images.`;

        return e;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const next = { ...formData, [name]: value };
        setFormData(next);

        // Live-validate the field if it was touched
        if (touched[name]) {
            const v = validate(next, selectedCard);
            setErrors(v);
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const v = validate(formData, selectedCard);
        setErrors(v);
    };

    const handleCardSelect = (card) => {
        setSelectedCard(card);
        // Re-validate when card changes
        const v = validate(formData, card);
        setErrors(v);
    };

    const handleHireNow = async () => {
        const v = validate(formData, selectedCard);
        setErrors(v);
        setTouched({
            title: true,
            description: true,
            date: true,
            time: true,
            location: true,
            price: true,
            duration: true,
        });

        if (Object.keys(v).length > 0) {
            const firstError = v[Object.keys(v)[0]];
            ErrorToast(firstError || 'Please fix the highlighted fields.');
            return;
        }

        try {
            setIsSubmitting(true);

            const providerData = {
                title: formData.title.trim(),
                date: formData.date,   // "YYYY-MM-DD"
                time: formData.time,   // "HH:mm"
                location: formData.location.trim(),
                amount: Number(formData.price),
                description: formData.description.trim(),
                duration: formData.duration.trim(),
                city: formData.city || '',
                state: formData.state || '',
                country: formData.country || '',
                lat: formData.lat || 0,
                long: formData.long || 0,
                payment_method_id: selectedCard.id,
            };

            const payload = { providerData };
            await dispatch(HireServiceProvider(payload));
            dispatch(fetchUserProfile());
            // Optionally close modal on success
        } catch (err) {
            // Thunk handles its own errors typically
        } finally {
            setIsSubmitting(false);
        }
    };




    useEffect(() => {
        if (hireProviderSuccess) {
            setCustombooking(false);
            navigate("/app/profile")
        }
    })

    if (!custombooking) return null;

    // Utilities for UI classes
    const inputClass = (name) =>
        `w-full border rounded p-2 focus:outline-none ${touched[name] && errors[name] ? 'border-red-500' : 'border-gray-300'}`;

    const smallError = (name) =>
        touched[name] && errors[name] ? <p className="mt-1 text-xs text-red-600">{errors[name]}</p> : null;

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
                        <label className="block mb-1 font-medium">Service Title<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter your Title"
                            value={formData.title}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={inputClass('title')}
                            aria-invalid={!!(touched.title && errors.title)}
                        />
                        {smallError('title')}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-medium">Service Description<span className="text-red-500">*</span></label>
                        <textarea
                            name="description"
                            rows={3}
                            placeholder="Briefly explain the service required"
                            value={formData.description}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={inputClass('description')}
                            aria-invalid={!!(touched.description && errors.description)}
                        />
                        {smallError('description')}
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
                        {errors.files ? <p className="mt-1 text-xs text-red-600">{errors.files}</p> : null}

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
                        <label className="block mb-1 font-medium">Preferred Date & Time<span className="text-red-500">*</span></label>
                        <div className="flex gap-3">
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={`w-1/2 px-3 py-2 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${touched.date && errors.date ? 'border border-red-500' : 'border border-gray-300'}`}
                                aria-invalid={!!(touched.date && errors.date)}
                            />
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={`w-1/2 px-3 py-2 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${touched.time && errors.time ? 'border border-red-500' : 'border border-gray-300'}`}
                                aria-invalid={!!(touched.time && errors.time)}
                            />
                        </div>
                        <div className='flex justify-between'>
                            {smallError('date')}
                            {touched.time && errors.time ? <p className="mt-1 text-xs text-red-600">{errors.time}</p> : null}

                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block mb-1 font-medium">Location<span className="text-red-500">*</span></label>
                        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API} libraries={['places']}>
                            <Autocomplete onLoad={handleOnLoads} onPlaceChanged={handlePlaceChangeded}>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    placeholder="Type or select your location"
                                    className={inputClass('location')}
                                    aria-invalid={!!(touched.location && errors.location)}
                                />
                            </Autocomplete>
                        </LoadScript>
                        {smallError('location')}
                    </div>

                    {/* Price & Duration */}
                    <div className="flex justify-between gap-4">
                        {/* Price */}
                        <div className="w-1/2">
                            <label className="block mb-1 font-medium">Proposed Price* </label>
                            <div className={`flex items-center rounded px-2 border ${touched.price && errors.price ? 'border-red-500' : 'border-gray-300'}`}>
                                <span className="text-gray-500">$</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    name="price"
                                    placeholder="Enter amount"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    required
                                    className="w-full py-2 ml-1 focus:outline-none"
                                    aria-invalid={!!(touched.price && errors.price)}
                                />
                            </div>
                            {smallError('price')}
                        </div>

                        {/* Duration */}
                        <div className="w-1/2">
                            <label className="block mb-1 font-medium">Duration* </label>
                            <div className={`flex items-center rounded px-2 border ${touched.duration && errors.duration ? 'border-red-500' : 'border-gray-300'}`}>
                                <span className="text-gray-500">🕒</span>
                                <input
                                    type="text"
                                    name="duration"
                                    placeholder="e.g., 2 hours"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    required
                                    className="w-full py-2 ml-1 focus:outline-none"
                                    aria-invalid={!!(touched.duration && errors.duration)}
                                />
                            </div>
                            {smallError('duration')}
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                        <label className="block mb-1 font-medium">Payment Method<span className="text-red-500">*</span></label>
                        {paymentmethoduser?.payment_methods?.length > 0 ? (
                            paymentmethoduser.payment_methods?.map((card) => (
                                <div
                                    key={card.id}
                                    className={`flex justify-between items-center border cursor-pointer rounded p-2 mb-2
                    ${selectedCard?.id === card.id ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}
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
                        {errors.payment_method ? <p className="mt-1 text-xs text-red-600">{errors.payment_method}</p> : null}
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
                            {isSubmitting ? 'Submitting…' : 'Send Request To Providers'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
