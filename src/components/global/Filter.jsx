import React from 'react'

export default function Filter({ setIsFilter }) {
    return (
        <div className="space-y-4 w-[400px] bg-[#FFFFFF] rounded-[14px] absolute  right-20 p-4 shadow-lg -mt-10 ">
            {/* Location */}
            <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <select className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option>Select</option>
                </select>
            </div>

            {/* Price */}
            <div>
                <label className="text-sm font-medium text-gray-700">Price</label>
                <div className="flex gap-2 mt-1">
                    <input
                        type="number"
                        placeholder="Min"
                        className="w-1/2 border border-gray-300 rounded-md px-2 py-2 text-sm"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        className="w-1/2 border border-gray-300 rounded-md px-2 py-2 text-sm"
                    />
                </div>
            </div>

            {/* Experience */}
            <div>
                <label className="text-sm font-medium text-gray-700">Experience</label>
                <input
                    type="text"
                    className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Experience"
                />
            </div>

            {/* Rating */}
            <div>
                <label className="text-sm font-medium text-gray-700">Rating</label>
                <select className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option>Rating</option>
                </select>
            </div>

            {/* Distance Slider */}
            <div>
                <label className="text-sm font-medium text-gray-700">Distance</label>
                <input type="range" min="0" max="100" className="bg-gradient-to-r from-[#373856] to-[#27A8E2] w-full mt-2" />
                <p className="text-xs text-right mt-1">20 MI</p>
            </div>

            {/* Buttons */}
            <div className="flex  items-center gap-3 pt-2">
                <button onClick={() => setIsFilter(false)} className="bg-[#F8F8F8] px-6 py-3 w-full rounded-[8px] text-sm">Clear All</button>
                <button onClick={() => setIsFilter(false)} className="bg-gradient-to-r w-full from-[#00034A] to-[#27A8E2] text-white px-6 py-3 rounded-md text-sm font-semibold">
                    Apply
                </button>
            </div>
        </div>
    )
}
