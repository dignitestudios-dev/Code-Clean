import { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { HeroBg } from "../../../assets/export";
import { useDispatch, useSelector } from "react-redux";
import {
  clearChat,
  listenMessages,
  listenUserChats,
  markMessagesAsSeen,
  sendMessage,
} from "../../../redux/slices/chat.slice";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chats, messages } = useSelector((state) => state.chat);
  const { user_data } = useSelector((state) => state.auth);

  const loc = useLocation();
  const user = loc?.state?.user;
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [input, setInput] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useEffect(() => {
    if (user?.uid && user_data?.uid) {
      setReceiverId(user.uid);
      const chatId = [user.uid, user_data.uid].sort().join("_");
      setSelectedChatId(chatId);
    }
    if (user_data?.uid) {
      dispatch(listenUserChats({ userId: user_data.uid }));
    }
  }, [dispatch, user?.uid, user_data?.uid]);

  // ✅ Listen to messages of selected chat
  useEffect(() => {
    if (selectedChatId) {
      const unsubPromise = dispatch(listenMessages({ chatId: selectedChatId }));
      return () => {
        unsubPromise.then((unsubscribe) => unsubscribe && unsubscribe());
        dispatch(clearChat(selectedChatId));
      };
    }
  }, [dispatch, selectedChatId]);

  // ✅ Mark messages as seen
  useEffect(() => {
    if (selectedChatId && user_data?.uid) {
      dispatch(
        markMessagesAsSeen({ chatId: selectedChatId, userId: user_data.uid })
      );
    }
  }, [dispatch, selectedChatId, user_data?.uid]);

  const getUnseenCount = (chatId) => {
    if (!messages?.[chatId]) return 0;
    return messages[chatId].filter(
      (msg) =>
        msg.receiverId === user_data?.uid &&
        !msg.seenBy?.includes(user_data?.uid)
    ).length;
  };

  const handleSendMessage = () => {
    if (!input.trim() || !receiverId || !selectedChatId) return;

    dispatch(
      sendMessage({
        chatId: selectedChatId,
        senderId: user_data?.uid,
        receiverId, // 👈 fixed spelling
        senderInfo: {
          name: user_data?.name,
          avatar: user_data?.avatar,
          role: user_data?.role,
        },
        receiverInfo: {
          name: user?.name,
          avatar: user?.avatar,
        },
        text: input.trim(),
      })
    );

    setInput("");
  };

  return (
    <>
      <div className="bg-[#F6FAFF] min-h-screen">
        <Navbar />
        <div
          className="flex items-center bg-cover bg-center -mt-[6em] pt-[10em] pb-[18em] border"
          style={{
            backgroundImage: `linear-gradient(234.85deg, rgba(39,168,226,1) -20.45%, rgba(0,3,74,0.8) 124.53%), url(${HeroBg})`,
          }}
        ></div>

        <div className="max-w-[1260px] mb-0 -mt-80 mx-auto px-6 py-10">
          <div className="flex items-center gap-2 mb-6">
            <button type="button" onClick={() => navigate(-1)}>
              <FaArrowLeft color="white" size={16} />
            </button>
            <h1 className="text-2xl font-semibold text-white">Messages</h1>
          </div>

          {/* Overlay for Drawer */}
          {isDrawerOpen && (
            <div
              className="fixed inset-0 bg-white w-[70%] rounded-lg z-40 md:hidden"
              onClick={() => setIsDrawerOpen(false)}
            >
              <div className="px-4 py-4 relative">
                <CiSearch
                  className="absolute left-[20px] top-7 text-[#18181880]"
                  size={24}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-[#EDEDED] text-[#18181880] h-[50px] outline-none px-8 py-2 mb-2 rounded-xl border text-sm"
                />
              </div>

              <div className="space-y-3">
                {chats?.map((chat) => {
                  // const lastMessage =
                  //   Array.isArray(messages?.[chat.id]) &&
                  //   messages[chat.id][messages[chat.id].length - 1];
                  const otherMemberId = chat.members.find(
                    (id) => id !== user_data?.uid
                  );
                  const otherMember = chat.memberInfo?.[otherMemberId] || {};

                  return (
                    <div
                      key={chat.id}
                      onClick={() => {
                        setSelectedChatId(chat.id);
                        setSelectedUser(otherMember);
                        setReceiverId(otherMemberId);
                      }}
                      className={`flex items-start gap-3 p-4 cursor-pointer transition-all ${
                        selectedChatId === chat.id
                          ? "bg-[#E8F0FE] rounded-md"
                          : "hover:bg-gray-100"
                      }
                       ${chat.unseenCount > 0 && "bg-[#E8F0FE] rounded-md"}
                      `}
                    >
                      <img
                        src={
                          otherMember.avatar
                            ? import.meta.env.VITE_APP_AWS_URL +
                              otherMember.avatar
                            : "/default-avatar.png"
                        }
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold">
                          {otherMember.name || "Chat"}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {chat.lastMessage?.text
                            ? `${
                                chat.lastMessage.senderId === user_data.uid
                                  ? "You: "
                                  : ""
                              }${chat.lastMessage.text.slice(0, 25)}`
                            : "No messages yet"}
                        </p>
                      </div>
                      {chat.unseenCount > 0 && (
                        <span className="bg-[#208BC733] text-[#082166] text-xs font-semibold w-[20px] flex justify-center items-center h-[20px] rounded-full">
                          {chat.unseenCount}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="bg-white hidden md:block rounded-2xl  p-3 shadow-sm">
              <div className="px-4 py-4 relative">
                <CiSearch
                  className="absolute left-[20px] top-7 text-[#18181880]"
                  size={24}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-[#EDEDED] text-[#18181880] h-[50px] outline-none px-8 py-2 mb-2 rounded-xl border text-sm"
                />
              </div>

              <div className="space-y-3">
                {chats?.map((chat) => {
                  // const lastMessage =
                  //   Array.isArray(messages?.[chat.id]) &&
                  //   messages[chat.id][messages[chat.id].length - 1];
                  const otherMemberId = chat.members.find(
                    (id) => id !== user_data?.uid
                  );
                  const otherMember = chat.memberInfo?.[otherMemberId] || {};

                  return (
                    <div
                      key={chat.id}
                      onClick={() => {
                        setSelectedChatId(chat.id);
                        setSelectedUser(otherMember);
                        setReceiverId(otherMemberId);
                      }}
                      className={`flex items-start gap-3 p-4 cursor-pointer transition-all ${
                        selectedChatId === chat.id
                          ? "bg-[#E8F0FE] rounded-md"
                          : "hover:bg-gray-100"
                      }
                       ${chat.unseenCount > 0 && "bg-[#E8F0FE] rounded-md"}
                      `}
                    >
                      <img
                        src={
                          otherMember.avatar
                            ? import.meta.env.VITE_APP_AWS_URL +
                              otherMember.avatar
                            : "/default-avatar.png"
                        }
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold">
                          {otherMember.name || "Chat"}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {chat.lastMessage?.text
                            ? `${
                                chat.lastMessage.senderId === user_data.uid
                                  ? "You: "
                                  : ""
                              }${chat.lastMessage.text.slice(0, 25)}`
                            : "No messages yet"}
                        </p>
                      </div>
                      {chat.unseenCount > 0 && (
                        <span className="bg-[#208BC733] text-[#082166] text-xs font-semibold w-[20px] flex justify-center items-center h-[20px] rounded-full">
                          {chat.unseenCount}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chat Window */}
            <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              {selectedChatId && (
                <>
                  {/* Header */}
                  <div className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-100"
                        onClick={() => setIsDrawerOpen(true)}
                      >
                        <HiOutlineMenuAlt2 size={22} />
                      </button>
                      <div className="w-10 h-10 rounded-full">
                        <img
                          className="w-full h-full rounded-full"
                          src={
                            selectedUser?.avatar
                              ? import.meta.env.VITE_APP_AWS_URL +
                                selectedUser.avatar
                              : import.meta.env.VITE_APP_AWS_URL + user.avatar
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold">
                          {selectedUser?.name || user?.name}
                        </h4>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => navigate(-1)}
                        className="cursor-pointer border-b border-[#00034A] bg-gradient-to-r from-[#00034A] to-[#27A8E2] bg-clip-text text-transparent"
                      >
                        Job Detail
                      </button>
                    </div>
                  </div>
                </>
              )}

              {selectedChatId ? (
                <>
                  <div className="py-6 space-y-6 overflow-y-auto text-sm text-gray-800 h-[500px] pr-2">
                    {Array.isArray(messages?.[selectedChatId]) &&
                    messages[selectedChatId].length > 0 ? (
                      messages[selectedChatId].map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${
                            msg.senderId === user_data?.uid
                              ? "items-end"
                              : "items-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs px-4 py-2 rounded-xl ${
                              msg.senderId === user_data?.uid
                                ? "bg-gradient-to-l from-[#00034A] to-[#27A8E2] text-white rounded-tr-none"
                                : "bg-[#E6E6E6] text-[#181818] rounded-tl-none"
                            }`}
                          >
                            {msg.text}
                          </div>
                          <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            {msg.createdAt
                              ? new Date(
                                  msg.createdAt.seconds * 1000
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : ""}
                            {msg.senderId === user_data.uid && (
                              <span>{msg.seenBy?.length > 1 ? "✓✓" : "✓"}</span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-400">
                        No messages yet, start chatting...
                      </div>
                    )}
                  </div>
                  <div className="flex items-center h-[50px] bg-[#EEEEEE] gap-3 rounded-[12px] border-t mt-3">
                    <input
                      type="text"
                      placeholder="Type Here..."
                      className="flex-1 px-4 outline-none bg-transparent border-none py-2 text-sm"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />
                    <button
                      className="mr-2 flex justify-center items-center bg-gradient-to-r from-[#00034A] to-[#27A8E2] h-[40px] rounded-[8px] w-[40px]"
                      onClick={handleSendMessage}
                    >
                      <IoSend size={24} color="white" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center h-full text-gray-400">
                  Select a chat to start messaging
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chat;
