import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

export enum RefreshInterval {
  Interval30Seconds = "30 seconds",
  Interval1Minute = "1 minute",
  Interval5Minutes = "5 minutes",
}

type TRefreshButtonProps = {
  refreshInterval: RefreshInterval | undefined;
  setRefreshInterval: React.Dispatch<
    React.SetStateAction<RefreshInterval | undefined>
  >;
};

export const RefreshButton: React.FC<TRefreshButtonProps> = ({
  refreshInterval,
  setRefreshInterval,
}) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {refreshInterval
              ? `Refresh: ${refreshInterval}`
              : "Set Refresh Schedule"}
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() =>
                setRefreshInterval(RefreshInterval.Interval30Seconds)
              }
            >
              {RefreshInterval.Interval30Seconds}
            </MenuItem>
            <MenuItem
              onClick={() =>
                setRefreshInterval(RefreshInterval.Interval1Minute)
              }
            >
              {RefreshInterval.Interval1Minute}
            </MenuItem>
            <MenuItem
              onClick={() =>
                setRefreshInterval(RefreshInterval.Interval5Minutes)
              }
            >
              {RefreshInterval.Interval5Minutes}
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
