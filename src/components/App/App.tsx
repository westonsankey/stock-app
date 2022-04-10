import { ChakraProvider } from "@chakra-ui/react";
import { DashboardController } from "../Dashboard/DashboardController";
import { NavBar } from "../NavBar";

function App() {
  return (
    <ChakraProvider>
      <NavBar />
      <DashboardController />
    </ChakraProvider>
  );
}

export default App;
