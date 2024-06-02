import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handleClick }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius={"lg"}
      m={1}
      mb={2}
      background={"#25D366"}
      color="white"
      fontSize={12}
      cursor={"pointer"}
      onClick={handleClick}
    >
      {user.name}
      <CloseIcon pl={1} />
    </Box>
  );
};

export default UserBadgeItem;
