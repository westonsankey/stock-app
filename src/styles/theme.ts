import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    primary: "#7673FF",
    secondary: "#FF9575",
  },
  components: {
    Alert: {
      variants: {
        solid: () => {
          return {
            container: {
              bg: "#00821e",
            },
          };
        },
      },
    },
  },
});
