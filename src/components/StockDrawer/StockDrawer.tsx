import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import { TStockData, TStockHistory } from "../StockCard/types";

type TStockDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  data: TStockData;
};

type TChartProps = {
  history: TStockHistory;
};

const Chart: React.FC<TChartProps> = ({ history }: TChartProps) => {
  return (
    <Box h="400px">
      <ResponsiveLine
        data={[
          {
            id: "price",
            color: "#7673FF",
            data: history,
          },
        ]}
        margin={{ top: 20, right: 30, bottom: 20, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        colors={() => "#ff7673"}
        lineWidth={3}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[]}
      />
    </Box>
  );
};

export const StockDrawer: React.FC<TStockDrawerProps> = ({
  isOpen,
  onClose,
  data,
}: TStockDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {data.ticker} - {data.companyName}
        </DrawerHeader>

        <DrawerBody>
          <Chart history={data.history} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
