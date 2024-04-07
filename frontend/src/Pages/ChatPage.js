import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {/* {user && <SideDrawer />}
      <Box></Box> */}
    </div>
  );
};

export default ChatPage;
