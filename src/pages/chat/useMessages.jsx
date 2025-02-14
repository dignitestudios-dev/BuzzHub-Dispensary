import { useEffect, useState } from "react";
import { getMessages } from "../../firebase/firestoreService";

const useMessages = (chatId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = getMessages(chatId, setMessages);
    return () => unsubscribe(); // Cleanup on unmount
  }, [chatId]);

  return messages;
};

export default useMessages;
