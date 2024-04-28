import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user, handleClick }) => {
  return (
    <Box
      onClick={handleClick}
      cursor={"pointer"}
      background={"#F2F2F2"}
      _hover={{ background: "#25D366", color: "white" }}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      color={"black"}
      px={3}
      py={2}
      mb={2}
      borderRadius={"lg"}
    >
      <Avatar
        mr={2}
        size={"sm"}
        cursor={"pointer"}
        name={user.name}
        src={user.picture}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize={"xs"}>
          <b>Email: {user.email}</b>
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
