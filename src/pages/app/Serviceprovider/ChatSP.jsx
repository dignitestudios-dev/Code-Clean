import React, { useState, useRef } from 'react';

import { IoSend } from 'react-icons/io5';
import { MdAttachFile } from 'react-icons/md';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import userone from "../../../assets/image.png";
import usertwo from "../../../assets/usertwo.png";
import user from "../../../assets/user.png";
import { useNavigate } from 'react-router';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import { HeroBg } from '../../../assets/export';
import { CiSearch } from 'react-icons/ci';

const users = [
    { id: 1, name: 'Mike Smith (258496)', initials: 'MS', image: userone },
    { id: 2, name: 'Darlene Steward (123456)', initials: 'DS', image: usertwo },
    { id: 3, name: 'Maria Steward (456789)', initials: 'MS', image: user },
];

const initialChats = {
    1: [
        { sender: 'them', type: 'text', text: 'Hi John, I’ve uploaded the move-in photos.', time: '09:20 AM' },
        { sender: 'me', type: 'text', text: 'Thanks Mike! Will check.', time: '09:21 AM' },
        { sender: 'me', type: 'text', text: 'Got it. All good!', time: '09:24 AM' },
    ],
    2: [
        { sender: 'them', type: 'text', text: 'Hey, can you confirm the lease terms?', time: '10:00 AM' },
        { sender: 'me', type: 'text', text: 'Yes, I’ll confirm today.', time: '10:01 AM' },
    ],
    3: [
        { sender: 'them', type: 'text', text: 'Upload complete. Waiting for your review.', time: '11:15 AM' },
    ],
};

const ChatSP = () => {
    const [selectedUserId, setSelectedUserId] = useState(1);
    const [chats, setChats] = useState(initialChats);
    const [input, setInput] = useState('');
    const [attachments, setAttachments] = useState([]);
    const fileInputRef = useRef();
    const navigate = useNavigate("");

    const selectedMessages = chats[selectedUserId] || [];

    const handleSendMessage = () => {
        const newMessages = [...(chats[selectedUserId] || [])];

        if (input.trim()) {
            newMessages.push({
                sender: 'me',
                type: 'text',
                text: input,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });
        }

        attachments.forEach(file => {
            newMessages.push({
                file: URL.createObjectURL(file.file),
                name: file.file.name,
                type: file.type,
                sender: 'me',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });
        });

        setChats(prev => ({ ...prev, [selectedUserId]: newMessages }));
        setInput('');
        setAttachments([]);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => ({
            file,
            type: file.type.startsWith('image/') ? 'image' : 'file',
        }));
        setAttachments(prev => [...prev, ...previews]);
    };

    const removeAttachment = (index) => {
        const updated = [...attachments];
        updated.splice(index, 1);
        setAttachments(updated);
    };

    return (
        <>

            <div className="bg-[#F6FAFF] min-h-screen">
                <Navbar type="serviceprovider" />
                <div
                    className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] border "

                    style={{
                        backgroundImage: `linear-gradient(234.85deg, rgb(39, 168, 226, 1) -20.45%, rgb(0, 3, 74, 0.8) 124.53%), url(${HeroBg})`,
                    }}
                >
                </div>
                <div className="max-w-[1260px] mb-0 -mt-80 bottom-0 mx-auto px-6 py-10">
                    <div className='flex items-center gap-2 mb-6'>
                        <button type="button" onClick={() => navigate("/app/dashboard")} >
                            <FaArrowLeft color='white' size={16} />
                        </button>
                        <h1 className="text-2xl font-semibold text-white">Messages</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Sidebar */}
                        <div className="bg-white rounded-2xl shadow-sm">
                            <div className='px-4 py-4 relative ' >
                                <CiSearch className='absolute left-[20px] top-7 text-[#18181880]' size={24} />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full  bg-[#EDEDED] text-[#18181880] h-[50px] outline-none px-8 py-2 mb-2 rounded-xl border text-sm"
                                />
                            </div>
                            <div className="space-y-3 ">
                                {users.map(user => (
                                    <div
                                        key={user.id}
                                        onClick={() => setSelectedUserId(user.id)}
                                        className={`flex items-start gap-3 p-4 cursor-pointer transition-all ${selectedUserId === user.id ? 'bg-[#E8F0FE]' : 'hover:bg-gray-100'}`}
                                    >
                                        <div className={`w-10 h-10 rounded-full ${user.color}`}>
                                            <img src={user.image} className='w-full h-full rounded-full' alt="" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold">{user.name}</h4>
                                            <p className="text-xs text-gray-600">
                                                {chats[user.id]?.[chats[user.id].length - 1]?.text?.slice(0, 25) || 'No messages yet'}
                                            </p>
                                        </div>
                                        <span className={`text-xs ${selectedUserId === user.id ? 'text-[#208BC7]' : 'text-[#BCBCBC]'} `}>
                                            {chats[user.id]?.[chats[user.id].length - 1]?.time || ''}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chat Window */}
                        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                            {/* Header */}
                            <div className="flex items-center gap-3 justify-between">
                                <div className='flex items-center gap-3' >
                                    <div className="w-10 h-10 rounded-full">
                                        <img className='w-full h-full rounded-full' src={users.find(u => u.id === selectedUserId).image} alt="" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold">{users.find(u => u.id === selectedUserId).name}</h4>
                                        <p className="text-xs text-gray-500">Tenant</p>
                                    </div>
                                </div>
                                <div>
                                    <button className='border-b border-[#00034A] bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent' >Job Detail</button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="py-6 space-y-6 overflow-y-auto text-sm text-gray-800 h-[500px] pr-2">
                                <div className="text-center text-xs bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent "> <span className='bg-[#208BC71F]  p-1 rounded-[4px] '> Today </span></div>

                                {selectedMessages.map((msg, idx) => (
                                    <div key={idx} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                                        {msg.type === 'text' ? (
                                            <>
                                                {
                                                    msg.sender != 'me' && (
                                                        <div className='flex items-center gap-3 mb-3' >
                                                            <div className="w-10 h-10 rounded-full">
                                                                <img className='w-full h-full rounded-full' src={users.find(u => u.id === selectedUserId).image} alt="" />
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <h4 className="text-sm font-semibold">{users.find(u => u.id === selectedUserId).name}</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                <div className='max-w-xs'>
                                                    <div className={`${msg.sender === 'me' ? 'bg-gradient-to-l from-[#00034A] to-[#27A8E2] text-white rounded-tr-none rounded-xl ' : 'bg-[#E6E6E6] rounded-tl-none rounded-xl text-[#181818]'}  px-4 py-2  max-w-xs`}>
                                                        {msg.text}
                                                    </div>
                                                    <div className={` flex ${msg.sender == 'me' ? "text-end" : "text-end"}`} >
                                                        <div className={`text-xs w-full text-gray-400 mt-1  `}>{msg.time}</div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : msg.type === 'image' ? (
                                            <img src={msg.file} alt="attachment" className="w-10 rounded-xl shadow" />
                                        ) : (
                                            <a href={msg.file} download={msg.name} className="bg-gray-200 px-4 py-2 rounded-xl text-blue-700 underline">
                                                {msg.name}
                                            </a>
                                        )}

                                    </div>
                                ))}
                            </div>

                            {/* Chat Input */}
                            <div className="flex items-center h-[50px] bg-[#EEEEEE] gap-3 rounded-[12px]  border-t">
                                <input
                                    type="text"
                                    placeholder="Type Here..."
                                    className="flex-1  px-4 outline-none bg-transparent border-none  py-2  border text-sm"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button className=" mr-2 flex justify-center items-center bg-gradient-to-r from-[#00034A] to-[#27A8E2] h-[40px] rounded-[8px] w-[40px] " onClick={handleSendMessage}>
                                    <IoSend size={24} color='white' />
                                </button>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default ChatSP;