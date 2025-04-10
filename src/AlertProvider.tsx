import React, {useCallback, useMemo, useState} from "react";
import AlertComponent from "./Alert";
import {Box, useMediaQuery} from "@mui/material";
import {AlertType, AlertContextType, AlertProviderProps} from "./types";

const AlertContext = React.createContext<AlertContextType | undefined>(
  undefined,
);

const AlertProvider: React.FC<AlertProviderProps> = ({
  children,
  limit = 4,
  mobileLimit = 1,
  position = "top-right",
  width = "20%",
  minWidth = "280px",
  containerSx = {},
  duration = 300,
  mobileBreakpoint = "600px",
  muiAlertProps = {},
  muiStackProps = {},
}) => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const isMobile = useMediaQuery(`(max-width:${mobileBreakpoint})`);
  const limitToApply = useMemo(() => {
    return isMobile ? mobileLimit : limit;
  }, [isMobile, limit, mobileLimit]);

  const addAlert = useCallback(
    ({message, severity}: AlertType) => {
      const newAlert = {message, severity, isNewAlert: true};

      setAlerts(prevAlerts => {
        if (prevAlerts.length >= limitToApply) {
          // Remove the oldest alert if the max number is reached.
          return [...prevAlerts.slice(1), newAlert];
        }

        return [...prevAlerts, newAlert];
      });

      // Remove the isNewAlert property after the duration.
      setTimeout(() => {
        setAlerts(prevAlerts => {
          return prevAlerts.map(alert => {
            return {...alert, isNewAlert: false};
          });
        });
      }, duration);
    },
    [limitToApply, duration],
  );

  const removeAlert = useCallback((index: number) => {
    setAlerts(prevAlerts => {
      // Reduce prevAlerts to exclude prevAlerts[index].
      // Also remove the isNewAlert property from the alert.
      return prevAlerts.reduce(
        (acc: AlertType[], alert: AlertType, i: number) => {
          if (i !== index) {
            acc.push({...alert, isNewAlert: false});
          }
          return acc;
        },
        [],
      );
    });
  }, []);

  const getSxPosition = useCallback(() => {
    if (position === "top-right") {
      return {
        top: 0,
        right: 0,
      };
    } else if (position === "top-left") {
      return {
        top: 0,
        left: 0,
      };
    } else if (position === "bottom-right") {
      return {
        bottom: 0,
        right: 0,
      };
    } else if (position === "bottom-left") {
      return {
        bottom: 0,
        left: 0,
      };
    } else {
      // Default to top-right if the position is not recognized.
      console.warn(
        `Unrecognized position "${position}". Defaulting to "top-right".`,
      );

      return {
        top: 0,
        right: 0,
      };
    }
  }, [position]);

  return (
    <AlertContext.Provider value={{addAlert}}>
      <Box>
        <Box
          id="mui-alerts-provider-container"
          sx={{
            width: !isMobile ? width : "100%",
            minWidth: !isMobile ? minWidth : "100%",
            position: "absolute",
            zIndex: 9999,
            p: 1,
            ...getSxPosition(),
            ...containerSx,
          }}
        >
          <AlertComponent
            alerts={alerts}
            removeAlert={removeAlert}
            duration={duration}
            muiAlertProps={muiAlertProps}
            muiStackProps={muiStackProps}
          />
        </Box>
        <Box>{children}</Box>
      </Box>
    </AlertContext.Provider>
  );
};

export {AlertContext};

export default AlertProvider;
