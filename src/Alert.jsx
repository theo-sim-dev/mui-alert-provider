"use client";
import React, {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Alert as MuiAlert, Stack} from "@mui/material";

const Alert = ({
  alerts,
  removeAlert,
  duration,
  muiAlertProps,
  muiStackProps,
}) => {
  const [applyGap, setApplyGap] = useState(true); // Track whether the gap is applied to the last alert
  const durationInSeconds = duration * 0.001; // Convert milliseconds to seconds

  // Remove the gap from the last alert after duration
  useEffect(() => {
    if (alerts.length > 0) {
      setApplyGap(true); // Apply the gap initially
      const timer = setTimeout(() => {
        setApplyGap(false); // Remove the gap after duration
      }, duration);

      return () => {
        // Cleanup timeout on unmount
        return clearTimeout(timer);
      };
    }
  }, [alerts, duration]);

  const handleClose = useCallback(
    index => {
      removeAlert(index);
    },
    [removeAlert],
  );

  return (
    <Stack spacing={1} id="mui-alerts-provider-stack" {...muiStackProps}>
      {alerts.map((alert, index) => {
        const {isNewAlert} = alert;

        let transform;
        if (isNewAlert && applyGap) {
          transform = "translateY(16px)"; // Add a gap for the last alert
        } else {
          transform = "translateY(0)"; // Default transform
        }

        return (
          <MuiAlert
            key={index}
            id={`mui-alerts-provider-alert-${index}`}
            severity={alert.severity}
            onClose={() => {
              return handleClose(index);
            }}
            sx={{
              transform,
              transition:
                isNewAlert && applyGap
                  ? `transform ${durationInSeconds}s ease-in-out`
                  : `opacity ${durationInSeconds}s ease-in-out, transform ${durationInSeconds}s ease-in-out`,
            }}
            {...muiAlertProps}
          >
            {alert.message}
          </MuiAlert>
        );
      })}
    </Stack>
  );
};

Alert.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      severity: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }),
  ).isRequired,
  removeAlert: PropTypes.func.isRequired,
  duration: PropTypes.number, // Duration in milliseconds
  muiAlertProps: PropTypes.object,
  muiStackProps: PropTypes.object,
};

export default Alert;
