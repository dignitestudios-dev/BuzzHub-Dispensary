import { useEffect, useState } from "react";
import { getMessages } from "../../firebase/firestoreService";

const useMessages = (chatId, selectedChat, userId, update) => {
  const [messages, setMessages] = useState([]);

  return messages;
};

export default useMessages;
