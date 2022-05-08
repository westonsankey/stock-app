import { Box, Flex, Text } from "@chakra-ui/layout";
import { CardWidget, TStockData } from "./types";
import { Quote } from "./components/Quote";
import { useState } from "react";
import { Info } from "./components/Info";
import { Chart } from "./components/Chart";
import styles from "./StockCard.module.scss";
import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDisclosure } from "@chakra-ui/react";
import { StockDrawer } from "../StockDrawer";

type TStockCardViewProps = {
  data: TStockData;
  addStock: (symbol: string) => void;
  removeStock: (symbol: string) => void;
};

type TStockCardToggleButtonProps = {
  text: string;
  widget: CardWidget;
  isActive: boolean;
  setWidget: React.Dispatch<React.SetStateAction<CardWidget>>;
};

const StockCardToggleButton: React.FC<TStockCardToggleButtonProps> = ({
  text,
  widget,
  isActive,
  setWidget,
}: TStockCardToggleButtonProps) => {
  return (
    <Box
      className={classNames(styles.toggleButton, {
        [styles.inactive]: !isActive,
      })}
      fontSize="12px"
      marginTop="4px"
      background={isActive ? "#7673FF" : "white"}
      color={isActive ? "white" : "black"}
      borderRadius="8px"
      w="55px"
      h="22px"
      textAlign="center"
      onClick={(e) => {
        e.stopPropagation();
        setWidget(widget);
      }}
    >
      <Text mt="1px">{text}</Text>
    </Box>
  );
};

type TStockCardToggleProps = {
  currentActiveWidget: CardWidget;
  setWidget: React.Dispatch<React.SetStateAction<CardWidget>>;
};

const StockCardToggle: React.FC<TStockCardToggleProps> = ({
  currentActiveWidget,
  setWidget,
}: TStockCardToggleProps) => {
  return (
    <Flex
      w="190px"
      h="30px"
      background="#F4F3F3"
      borderRadius="8px"
      justify="space-evenly"
    >
      <StockCardToggleButton
        widget="QUOTE"
        setWidget={setWidget}
        isActive={currentActiveWidget === "QUOTE"}
        text="Quote"
      />
      <StockCardToggleButton
        widget="CHART"
        setWidget={setWidget}
        isActive={currentActiveWidget === "CHART"}
        text="Chart"
      />
      <StockCardToggleButton
        widget="INFO"
        setWidget={setWidget}
        isActive={currentActiveWidget === "INFO"}
        text="Info"
      />
    </Flex>
  );
};

const getWidgetComponent = (widget: CardWidget, data: TStockData) => {
  switch (widget) {
    case "QUOTE":
      return (
        <Quote
          regularMarketPrice={data.regularMarketPrice}
          regularMarketChange={data.regularMarketChange}
          regularMarketChangePercent={data.regularMarketChangePercent}
        />
      );
    case "CHART":
      return <Chart history={data.history} />;
    case "INFO":
      return (
        <Info
          grossProfit={data.grossProfit}
          marketCap={data.marketCap}
          revenueGrowth={data.revenueGrowth}
          totalRevenue={data.totalRevenue}
        />
      );
  }
};

export const StockCardView: React.FC<TStockCardViewProps> = ({
  data,
  addStock,
  removeStock,
}) => {
  const [widget, setWidget] = useState<CardWidget>("QUOTE");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const WidgetComponent = getWidgetComponent(widget, data);

  return (
    <Box
      className={styles.cardContainer}
      m="20px"
      w="350px"
      h="300px"
      borderRadius="5px"
      boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
    >
      <Flex className={styles.cardHeader} justify="space-between">
        <Text fontSize="2xl" ml="15px" mt="10px">
          {data.ticker} - {data.companyName}
        </Text>
        <Box
          className={styles.trashIcon}
          mt="10px"
          mr="10px"
          onClick={(e) => {
            e.stopPropagation();
            removeStock(data.ticker);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Box>
      </Flex>

      <Box>{WidgetComponent}</Box>
      <Flex justifyContent="center" w="100%">
        <StockCardToggle currentActiveWidget={widget} setWidget={setWidget} />
      </Flex>

      <StockDrawer
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        addStock={addStock}
      />
    </Box>
  );
};
