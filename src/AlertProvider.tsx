"use client";
import React, {useCallback, useState} from "react";
import AlertComponent from "./Alert";
import {Box, useMediaQuery} from "@mui/material";
import { AlertType } from './types';
import { AlertContextType, AlertProviderProps } from "./index.d";

const AlertContext = React.createContext<AlertContextType | undefined>(undefined);

const AlertProvider: React.FC<AlertProviderProps> = ({
  children,
  limit = 4,
  mobileLimit = 1,
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
  const limitToApply = isMobile ? mobileLimit : limit;

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
      return prevAlerts.reduce((acc: AlertType[], alert: AlertType, i: number) => {
        if (i !== index) {
          acc.push({...alert, isNewAlert: false});
        }
        return acc;
      }, []);
    });
  }, []);

  return (
    <AlertContext.Provider value={{addAlert}}>
      <Box>
        <Box
          id="mui-alerts-provider-container"
          sx={{
            width: !isMobile ? width : "100%",
            minWidth: !isMobile ? minWidth : "100%",
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 9999,
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
