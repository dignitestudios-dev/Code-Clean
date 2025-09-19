import React, { useEffect, useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../redux/slices/users.slice";
import { Autocomplete } from "@react-google-maps/api";

const DEFAULT_AVATAR =
  "https://img.freepik.com/premium-vector/icono-perfil-simple-color-blanco-icon_1076610-50204.jpg";

export default function EditProfileModal({
  isOpen,
  setIsOpen,
  updateProfile,
  setUpdateProfile,
}) {
  const dispatch = useDispatch();
  const { userProfile, updateLoading } = useSelector((s) => s.user || {});

  const autocompleteRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
  });

  const [coords, setCoords] = useState({
    lat: null,
    lng: null,
    city: "",
    state: "",
    country: "",
  });

  const [selectedImage, setSelectedImage] = useState(DEFAULT_AVATAR);
  const [imageFile, setImageFile] = useState(null);

  // hydrate
  useEffect(() => {
    if (isOpen && userProfile) {
      setFormData({
        fullName: userProfile.name || "",
        email: userProfile.email || "",
        phone: userProfile.phone_number || "+1",
        location: userProfile.address || "",
      });
      setCoords({
        lat: userProfile.lat || null,
        lng: userProfile.long || null,
        city: userProfile.city || "",
        state: userProfile.state || "",
        country: userProfile.country || "",
      });
      setSelectedImage(
        userProfile?.avatar
          ? `https://code-clean-bucket.s3.us-east-2.amazonaws.com/${userProfile?.avatar}`
          : DEFAULT_AVATAR
      );
      setImageFile(null);
    }
  }, [isOpen, userProfile]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place?.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        let city = "";
        let state = "";
        let country = "";

        place.address_components?.forEach((comp) => {
          if (comp.types.includes("locality")) city = comp.long_name;
          if (comp.types.includes("administrative_area_level_1"))
            state = comp.long_name;
          if (comp.types.includes("country")) country = comp.long_name;
        });

        setFormData((prev) => ({
          ...prev,
          location: place.formatted_address,
        }));

        setCoords({ lat, lng, city, state, country });
      }
    }
  };

  const handleSave = async () => {
    let payload;

    if (imageFile) {
      payload = new FormData();
      payload.append("name", formData.fullName);
      payload.append("phone_number", formData.phone);
      payload.append("location", formData.location);
      payload.append("lat", coords.lat);
      payload.append("long", coords.lng);
      payload.append("city", coords.city);
      payload.append("state", coords.state);
      payload.append("country", coords.country);
      payload.append("avatar", imageFile);
    } else {
      payload = {
        name: formData.fullName,
        phone_number: formData.phone,
        location: formData.location,
        lat: coords.lat,
        long: coords.lng,
        city: coords.city,
        state: coords.state,
        country: coords.country,
      };
    }

    try {
      await dispatch(updateUserProfile(payload)).unwrap();
      setUpdateProfile?.(true);
      setIsOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      className="flex items-center justify-center border-none outline-none z-[1000]"
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000] flex justify-center items-center"
    >
      <div className="bg-white rounded-[16px] shadow-lg px-10 py-6 w-[800px] max-h-[90vh] overflow-y-auto flex flex-col gap-3">
        <div className="flex justify-end px-6">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-red-500 transition-colors"
            disabled={updateLoading}
          >
            <HiOutlineXMark size={22} />
          </button>
        </div>

        <h2 className="text-center text-[28px] font-[900] text-[#181818]">
          Edit Profile
        </h2>

        <div className="ml-20 mr-20">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-green-300 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Profile"
                  className="w-full h-full object-cover border-2 rounded-full"
                />
              </div>
              <label
                htmlFor="upload"
                className="absolute bottom-1 right-0 w-8 h-8 cursor-pointer bg-gradient-to-r from-[#27A8E2] to-[#00034A] rounded-full flex items-center justify-center shadow-lg"
              >
                <FaPlus size={16} className="text-white" />
              </label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Location</label>
              <Autocomplete
                onLoad={(ref) => (autocompleteRef.current = ref)}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Enter your address"
                />
              </Autocomplete>
            </div>
          </div>

          {/* Save */}
          <div className="pt-6">
            <button
              onClick={handleSave}
              disabled={updateLoading}
              className="w-full bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white py-4 rounded-xl font-semibold shadow-lg"
            >
              {updateLoading ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
