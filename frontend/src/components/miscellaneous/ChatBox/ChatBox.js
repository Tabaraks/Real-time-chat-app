import React from "react";
import { ChatState } from "../../../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "../../SingleChat";

const ChatBox = ({ fetchChat, setFetchChat }) => {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems={"center"}
      flexDir={"column"}
      p={3}
      bg={"white"}
      w={{ base: "100%", md: "68%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <SingleChat fetchAgain={fetchChat} setFetchAgain={setFetchChat} />
    </Box>
  );
};

export default ChatBox;
