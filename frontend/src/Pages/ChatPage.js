import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";

const ChatPage = () => {
  const { user } = ChatState();

  const [fetchChat, setFetchChat] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        height={"91vh"}
        padding={"10px"}
      >
        {user && <MyChats fetchChat={fetchChat} />}
        {user && <ChatBox fetchChat={fetchChat} setFetchChat={setFetchChat} />}
      </Box>
    </div>
  );
};

export default ChatPage;
