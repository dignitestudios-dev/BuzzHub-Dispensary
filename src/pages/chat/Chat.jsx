import React, { useState } from "react";
import { FaEllipsisV, FaPaperPlane } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import ChatList from "./ChatList";
import ChatScreen from "./ChatScreen";

const Chat = () => {
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate(); // Initialize the navigation function

  const location = useLocation();
  // const { existingChatRoomId } = location?.state;
  // console.log("existingChatRoomId- ", existingChatRoomId);

  const chats = [
    { id: 1, name: "Mike Smith", message: "Hi, how are you?", date: "1 Jan" },
    { id: 2, name: "Rose Mary", message: "Hi, how are you?", date: "1 Jan" },
    {
      id: 3,
      name: "George Adrian",
      message: "Hi, how are you?",
      date: "1 Jan",
    },
    { id: 4, name: "Mike Clark", message: "Hi, how are you?", date: "1 Jan" },
    { id: 5, name: "Julia James", message: "Hi, how are you?", date: "1 Jan" },
  ];

  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleBackClick = () => {
    setSelectedChat(null); // Go back to chat list
  };

  const user = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  return (
    <div className="w-full h-full p-6 mx-auto bg-white rounded-2xl shadow-lg flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
      {/* Left Side - Chat List (Always Visible on Web, Hidden on Mobile when Chat is selected) */}
      <div className={`w-full sm:w-1/3 bg-white p-6 rounded-lg border ${selectedChat ? 'hidden sm:block' : ''}`}>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight mb-6">
          Chats
        </h1>

        <ChatList
          userId={user?.uid || null}
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
          setUpdate={setUpdate}
          update={update}
        />
      </div>

      {/* Right Side - Chat Screen (Visible only when a chat is selected) */}
      {selectedChat && (
        <div className="w-full sm:w-2/3 bg-white p-4 rounded-lg border flex flex-col h-full">
          {/* Back Button on Chat Screen */}
          <div className="flex items-center mb-4 block lg:hidden">
            <BsArrowLeft
              className="text-gray-600 cursor-pointer hover:text-indigo-600 transition-all duration-300"
              onClick={handleBackClick}
            />
            <h1 className="ml-4 text-md font-semibold text-gray-800 truncate ">
              back
            </h1>
          </div>

          <ChatScreen
            selectedChat={selectedChat}
            chatId={selectedChat?.id}
            userId={user?.uid || null}
            setUpdate={setUpdate}
            update={update}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
