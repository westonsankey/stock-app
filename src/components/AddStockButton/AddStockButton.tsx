import { Box } from "@chakra-ui/layout";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { AutocompleteInput } from "../AutocompleteInput";
import styles from "./AddStockButton.module.scss";

type TAddStockButton = {
  addStock: (symbol: string) => void;
};

export const AddStockButton: React.FC<TAddStockButton> = ({
  addStock,
}: TAddStockButton) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [symbol, setSymbol] = useState("");

  return (
    <>
      <Box
        className={styles.button}
        background="#8c8c8c"
        color="white"
        p="5px 10px"
        borderRadius="5px"
        onClick={onOpen}
      >
        Add Stock
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Stock</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AutocompleteInput symbol={symbol} setSymbol={setSymbol} />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} size="sm">
              Cancel
            </Button>
            <Button
              size="sm"
              backgroundColor="#018c11"
              color="#FFF"
              onClick={() => {
                addStock(symbol);
                setSymbol("");
                onClose();
              }}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
