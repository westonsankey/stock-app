import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../styles/theme";
import { DashboardController } from "../Dashboard/DashboardController";
import { NavBar } from "../NavBar";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <DashboardController />
    </ChakraProvider>
  );
}

export default App;
