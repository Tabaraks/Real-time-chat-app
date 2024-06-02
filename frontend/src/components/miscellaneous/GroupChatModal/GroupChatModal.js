import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../../User/UserListItem";
import UserBadgeItem from "../../User/UserBadgeItem/UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [groupChatName, setGroupChatName] = useState("");

  const [selectedUsers, setSelectedUsers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchResult, setSearchResult] = useState([]);

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const { user, chat, setChat } = ChatState();

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/user?search=${searchQuery}`,
        config
      );

      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to load search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleGroup = (user) => {
    if (selectedUsers.includes(user))
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    else setSelectedUsers([...selectedUsers, user]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please Fill all the Fields",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((sel) => sel._id)),
        },
        config
      );

      console.log({ data });
      setChat([data, ...chat]);
      onClose();
      toast({
        title: "New Group Chat Created",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily={"Work sans"}
            display={"flex"}
            justifyContent={"center"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"}>
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder={"Add Users"}
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box display={"flex"} flexWrap={"wrap"} w={"100%"}>
              {selectedUsers.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleClick={() => handleDelete(user)}
                />
              ))}
            </Box>
            {loading ? (
              <div>Loading</div>
            ) : (
              searchResult
                .slice(0, 4)
                .map((user, index) => (
                  <UserListItem
                    key={"user" + index}
                    user={user}
                    handleClick={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
