import { Box } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import { TStockHistory } from "../../StockCard";

type TChartProps = {
  history: TStockHistory;
};

export const Chart: React.FC<TChartProps> = ({ history }: TChartProps) => {
  return (
    <Box h="400px" mb="35px">
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
        colors={() => "#FF9575"}
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
