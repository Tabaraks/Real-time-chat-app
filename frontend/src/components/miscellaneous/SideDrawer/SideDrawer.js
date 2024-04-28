import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import React, { useState } from "react";
import { ChatState } from "../../../Context/ChatProvider";
import ProfileModal from "../ProfileModal";
import axios from "axios";
import ChatLoading from "./../ChatLoading";
import UserListItem from "../../User/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");

  const history = useHistory();

  const [searchResult, setSearchResult] = useState([]);

  const [loading, setLoading] = useState(false);

  const [loadingChat, setLoadingChat] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const { user, selectedChat, setSelectedChat, chat, setChat } = ChatState();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Enter name or email to search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);

      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to load search result",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleChatClick = async (id) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId: id }, config);

      if (!chat.find((item) => item._id === data._id)) setChat([data, ...chat]);

      console.log(data);

      setLoadingChat(false);

      setSelectedChat(data);

      onClose();
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

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        background={"white"}
        width={"100%"}
        padding={"5px 10px"}
        borderWidth={"5px"}
      >
        <Tooltip label="Search Users" hasArrow placeContent={"bottom-end"}>
          <Button
            onClick={onOpen}
            variant={"ghost"}
            display={"flex"}
            gap={"8px"}
            justifyItems={"center"}
          >
            <i class="fa fa-search" aria-hidden="true"></i>
            <Text display={{ base: "none", md: "flex" }}>Search User</Text>
          </Button>
        </Tooltip>

        <Text
          fontSize={"2xl"}
          fontFamily={"Work sans"}
          color={"black"}
          fontWeight={"bold"}
        >
          Talkie
        </Text>
        <div>
          <Menu>
            <MenuButton padding={1}>
              <BellIcon fontSize="2xl" margin={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user.name}
                src={user.picture}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal userInfo={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} paddingBottom={2}>
              <Input
                placeContent={"Search by name or email"}
                marginRight={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button colorScheme="green" onClick={handleSearch}>
                Go
              </Button>
            </Box>
            {!loading ? (
              searchResult.map((result) => (
                <UserListItem
                  key={result._id}
                  user={result}
                  handleClick={() => handleChatClick(result._id)}
                />
              ))
            ) : (
              <ChatLoading />
            )}
            {loadingChat && <Spinner ml={"auto"} display={"flex"} />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
