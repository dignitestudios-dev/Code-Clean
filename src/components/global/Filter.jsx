import { Autocomplete } from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { getDiscoverJobs, getFilteredJobs } from "../../redux/slices/provider.slice";
import { fetchallservices, getFilteredProviders } from "../../redux/slices/users.slice";
import { ErrorToast } from "./Toaster";

export default function Filter({ endPoint, setIsFilter }) {
  const dispatch = useDispatch();
  const [locations, setLocations] = useState("");
  const autocompleteRef = useRef(null);
  const handleOnLoads = (autocomplete) => {
    if (!autocompleteRef.current) {
      autocompleteRef.current = autocomplete; // ✅ only set once
    }
  };

  const [formData, setFormData] = useState({
    lat: "",
    long: "",
    min_price: "",
    max_price: "",
    experience: "",
    rating: 0,
    miles: 20,
  });

  const handlePlaceChangeded = () => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setFormData((prev) => ({ ...prev, lat, long: lng }));
    setLocations(place.formatted_address);
  };

  const handleApply = () => {
    // Validation check before applying filter
    if (
      !formData.lat ||
      !formData.long ||
      !formData.min_price ||
      !formData.max_price ||
      !formData.experience ||
      formData.rating === 0 ||
      formData.miles === 0
    ) {
      ErrorToast("Please fill all the fields before applying.");
      return;
    }

    if (endPoint == "providers/filter") {
      dispatch(getFilteredProviders(JSON.parse(JSON.stringify(formData))));
      setIsFilter(false); 
    } else {
      dispatch(getFilteredJobs({ ...formData }));
      setIsFilter(false);
    }
  };

  return (
    <div className="space-y-4 w-[400px] bg-[#FFFFFF] rounded-[14px] absolute right-20 p-4 shadow-lg -mt-10">
      {/* Location */}
      <div className="relative fle mt-1">
        <label className="text-sm font-medium text-gray-700">Location</label>
        <Autocomplete
          onLoad={handleOnLoads}
          onPlaceChanged={handlePlaceChangeded}
        >
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Abc, suite CN"
            className="w-full border rounded-lg px-4 py-2 pr-10"
          />
        </Autocomplete>
        <span className="absolute right-3 top-9 text-blue-500">
          <IoLocationOutline size={20} />
        </span>
      </div>
      {/* Price */}
      <div>
        <label className="text-sm font-medium text-gray-700">Price</label>
        <div className="flex gap-2 mt-1">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 border border-gray-300 rounded-md px-2 py-2 text-sm"
            value={formData.min_price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, min_price: e.target.value }))
            }
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 border border-gray-300 rounded-md px-2 py-2 text-sm"
            value={formData.max_price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, max_price: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Experience */}
      <div>
        <label className="text-sm font-medium text-gray-700">Experience</label>
        <input
          type="number"
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
          placeholder="Years"
          value={formData.experience}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, experience: e.target.value }))
          }
        />
      </div>

      {/* Rating */}
      <div>
        <label className="text-sm font-medium text-gray-700">Rating</label>
        <select
          className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={formData.rating}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, rating: e.target.value }))
          }
        >
          <option value="0">Any</option>
          <option value="1">1+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      {/* Distance */}
      <div>
        <label className="text-sm font-medium text-gray-700">Distance</label>
        <input
          type="range"
          min="0"
          max="100"
          value={formData.miles}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, miles: e.target.value }))
          }
          className="bg-gradient-to-r from-[#373856] to-[#27A8E2] w-full mt-2"
        />
        <p className="text-xs text-right mt-1">{formData.miles} MI</p>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => {
            setLocations("");
            setFormData({
              lat: "",
              long: "",
              min_price: "",
              max_price: "",
              experience: "",
              rating: 0,
              miles: 20,
            });
            if (endPoint == "providers/filter") {
              dispatch(fetchallservices("/users/providers"));
            } else {
              dispatch(getDiscoverJobs("/provider/discover/jobs"));
            }
            setIsFilter(false); // Close the modal here
          }}
          className="bg-[#F8F8F8] px-6 py-3 w-full rounded-[8px] text-sm"
        >
          Clear All
        </button>
        <button
          onClick={handleApply}
          className="bg-gradient-to-r w-full from-[#00034A] to-[#27A8E2] text-white px-6 py-3 rounded-md text-sm font-semibold"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
