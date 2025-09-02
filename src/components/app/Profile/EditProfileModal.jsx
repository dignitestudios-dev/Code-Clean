import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiOutlineXMark } from 'react-icons/hi2';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
// ✅ Only need update thunk here (Profile page already fetches the user)
import { updateUserProfile } from '../../../redux/slices/users.slice';

const DEFAULT_AVATAR =
  'https://img.freepik.com/premium-vector/icono-perfil-simple-color-blanco-icon_1076610-50204.jpg';

const makeLocation = (u = {}) => {
  if (u.address) return u.address;
  const parts = [u.city, u.state, u.country].filter(Boolean);
  return parts.length ? parts.join(', ') : '';
};

export default function EditProfileModal({ isOpen, setIsOpen, updateProfile, setUpdateProfile }) {
  const dispatch = useDispatch();
  const { userProfile, updateLoading } = useSelector((s) => s.user || {});

  // ----- Local form state (controlled) -----
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    tel: '',
    location: '',
  });

  // Avatar preview + selected file
  const [selectedImage, setSelectedImage] = useState(DEFAULT_AVATAR);
  const [imageFile, setImageFile] = useState(null);

  // ----- Hydrate form when modal opens & user data is ready -----
  useEffect(() => {
    if (isOpen && userProfile) {
      setFormData({
        fullName: userProfile.name || '',
        email: userProfile.email || '',
        phone: userProfile.phone_number || '-', // default to +1
        location: makeLocation(userProfile),
      });

      // Use server avatar if present, else keep default
      setSelectedImage(`http://family-phys-ed-s3.s3.amazonaws.com/${userProfile?.avatar}` || DEFAULT_AVATAR);
      setImageFile(null);
    }
  }, [isOpen, userProfile]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    // Build payload — use FormData if user picked a new image
    let payload;
    if (imageFile) {
      const fd = new FormData();
      fd.append('name', formData.fullName);
      fd.append('phone_number', formData.phone);     // change to "phone_number" if your backend expects that
      fd.append('tel', formData.tel);
      fd.append('location', formData.location);
      fd.append('avatar', imageFile);         // backend field name "avatar"
      payload = fd;
    } else {
      payload = {
        name: formData.fullName,
        phone_number: formData.phone,                // change to "phone_number" if needed
        location: formData.location,
      };
    }

    try {
      await dispatch(updateUserProfile(payload)).unwrap();
      // Trigger your "Profile Updated" modal AFTER success
      setUpdateProfile?.(true);
      setIsOpen(false);
    } catch (e) {
      // Toasts are shown in thunk; keep modal open
      console.error('Update failed:', e);
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
        {/* Close Button */}
        <div className="flex justify-end px-6 pt-0">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-red-500 transition-colors"
            disabled={updateLoading}
            title={updateLoading ? 'Updating…' : 'Close'}
          >
            <HiOutlineXMark size={22} />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-center text-[28px] font-[900] text-[#181818]">Edit Profile</h2>

        <div className="ml-20 mr-20">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-green-300 rounded-full overflow-hidden flex items-center justify-center">
                <img src={selectedImage} alt="Profile" className="w-full h-full object-cover border-2 rounded-full" />
              </div>
              <label
                htmlFor="upload"
                className="absolute bottom-1 right-0 w-8 h-8 cursor-pointer bg-gradient-to-r from-[#27A8E2] to-[#00034A] rounded-full flex items-center justify-center shadow-lg"
              >
                <FaPlus size={16} className="text-white" />
              </label>
              <input id="upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
          </div>

          {/* Form Fields */}
          <div className="px-6 text-start space-y-4">
            <div>
              <label className="block text-[#181818] text-[15px] font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={formData.fullName ?? ''}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-[#181818] text-[15px] font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email ?? ''}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-[#181818] text-[15px] font-medium mb-2">Phone Number</label>
             <input
  type="tel"
  value={formData.phone ?? '+1'}
  onChange={(e) => {
    let value = e.target.value;

    // Always start with +1
    if (!value.startsWith('+1')) {
      value = '+1' + value.replace(/[^0-9]/g, '');
    }

    // Allow only digits after +1
    const cleaned = '+1' + value.slice(2).replace(/[^0-9]/g, '');

    // Limit to US number length (+1 + 10 digits)
    if (cleaned.length > 12) return;

    setFormData((prev) => ({ ...prev, phone: cleaned }));
  }}
  placeholder="+1 123 456 7890"
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
/>

            </div>



            <div>
              <label className="block text-[#181818] text-[15px] font-medium mb-2">Location</label>
              <input
                type="text"
                value={formData.location ?? ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Enter your location"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="p-6 pt-6">
            <button
              onClick={handleSave}
              disabled={updateLoading}
              className={`w-full ${updateLoading ? 'opacity-70 cursor-not-allowed' : ''
                } bg-gradient-to-r from-[#27A8E2] to-[#00034A] text-white py-4 rounded-xl font-semibold shadow-lg transition-colors`}
            >
              {updateLoading ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
