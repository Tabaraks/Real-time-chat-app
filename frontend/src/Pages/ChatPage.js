import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [chat, setChat] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get("/api/chat");
    setChat(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chat.map((singleChat, index) => (
        <div key={index}>{singleChat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
