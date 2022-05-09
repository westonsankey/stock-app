import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

export const RefreshInterval = {
  INTERVAL_30_SECONDS: {
    displayName: "30 seconds",
    intervalMs: 30 * 1000,
  },
  INTERVAL_1_MINUTE: {
    displayName: "1 minute",
    intervalMs: 60 * 1000,
  },
  INTERVAL_5_MINUTES: {
    displayName: "5 minute",
    intervalMs: 5 * 60 * 1000,
  },
} as const;

export type TRefreshInterval =
  typeof RefreshInterval[keyof typeof RefreshInterval];

// export type TRefreshInterval = typeof RefreshInterval;

type TRefreshButtonProps = {
  refreshInterval: TRefreshInterval | undefined;
  setRefreshInterval: React.Dispatch<React.SetStateAction<TRefreshInterval>>;
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
              ? `Refresh: ${refreshInterval.displayName}`
              : "Set Refresh Schedule"}
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() =>
                setRefreshInterval(RefreshInterval.INTERVAL_30_SECONDS)
              }
            >
              {RefreshInterval.INTERVAL_30_SECONDS.displayName}
            </MenuItem>
            <MenuItem
              onClick={() =>
                setRefreshInterval(RefreshInterval.INTERVAL_1_MINUTE)
              }
            >
              {RefreshInterval.INTERVAL_1_MINUTE.displayName}
            </MenuItem>
            <MenuItem
              onClick={() =>
                setRefreshInterval(RefreshInterval.INTERVAL_5_MINUTES)
              }
            >
              {RefreshInterval.INTERVAL_5_MINUTES.displayName}
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
