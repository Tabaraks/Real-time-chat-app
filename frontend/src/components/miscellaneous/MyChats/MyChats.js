import React, { useEffect, useState } from "react";
import { ChatState } from "../../../Context/ChatProvider";
import { Box, Button, Stack, useToast, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import getSender from "../../config/chats";
import GroupChatModal from "../GroupChatModal";

const MyChats = ({ fetchChat }) => {
  const { user, selectedChat, setSelectedChat, chat, setChat } = ChatState();

  const [loggedUser, setLoggedUser] = useState();

  const toast = useToast();

  const getAllChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);

      console.log(data);

      setChat(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Errow fetching the chat.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    getAllChats();
  }, [fetchChat]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg={"white"}
      w={{ base: "100%", md: "31%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={"Work sans"}
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        fontWeight={"bold"}
      >
        My Chats
        <GroupChatModal>
          <Button
            display={"flex"}
            rightIcon={<AddIcon />}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display={"flex"}
        flexDir={"column"}
        p={3}
        bg={"#F8F8F8"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chat ? (
          <Stack overflowY={"scroll"}>
            {chat.map((chatItem) => (
              <Box
                key={chatItem._id}
                onClick={() => setSelectedChat(chatItem)}
                cursor={"pointer"}
                bg={selectedChat === chatItem ? "#25D366" : "#E8E8E8"}
                color={selectedChat === chatItem ? "white" : "black"}
                px={3}
                py={2}
                borderRadius={"lg"}
              >
                <Text>
                  {!chatItem.isGroupChat
                    ? getSender(loggedUser, chatItem.users)
                    : chatItem.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
