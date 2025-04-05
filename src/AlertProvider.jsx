"use client";
import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import Alert from "./Alert";
import {Box, useMediaQuery} from "@mui/material";

const AlertContext = React.createContext();

const AlertProvider = ({
  children,
  limit = 4,
  mobileLimit = 1,
  defaultSeverity = "error",
  width = "20%",
  minWidth = "280px",
  containerSx = {},
  duration = 300,
  mobileBreakpoint = "600px",
  muiAlertProps = {},
  muiStackProps = {},
}) => {
  const [alerts, setAlerts] = useState([]);
  const isMobile = useMediaQuery(`(max-width:${mobileBreakpoint})`);
  const limitToApply = isMobile ? mobileLimit : limit;

  const addAlert = useCallback(
    ({message, severity = defaultSeverity}) => {
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
    [defaultSeverity, limitToApply, duration],
  );

  const removeAlert = useCallback(index => {
    setAlerts(prevAlerts => {
      // Reduce prevAlerts to exclude prevAlerts[index].
      // Also remove the isNewAlert property from the alert.
      return prevAlerts.reduce((acc, alert, i) => {
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
          <Alert
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

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
  limit: PropTypes.number,
  mobileLimit: PropTypes.number,
  defaultSeverity: PropTypes.string,
  width: PropTypes.string,
  minWidth: PropTypes.string,
  containerSx: PropTypes.object,
  duration: PropTypes.number,
  mobileBreakpoint: PropTypes.string,
  muiAlertProps: PropTypes.object,
  muiStackProps: PropTypes.object,
};

export default AlertProvider;
