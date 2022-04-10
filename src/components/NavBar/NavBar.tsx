import { Box, Flex, Text } from "@chakra-ui/layout";
import styles from "./NavBar.module.scss";

export const NavBar = () => {
  return (
    <Box w="100%" h="50px" background="#7673FF">
      <Flex
        ml="35px"
        w="11%"
        h="100%"
        justify="space-between"
        alignItems="center"
      >
        <Text
          className={styles.navLink}
          color="#FFF"
          fontSize="medium"
          fontWeight="bold"
        >
          Favorites
        </Text>
        <Text
          className={styles.navLink}
          color="#FFF"
          fontSize="medium"
          fontWeight="bold"
        >
          Chart
        </Text>
      </Flex>
    </Box>
  );
};
