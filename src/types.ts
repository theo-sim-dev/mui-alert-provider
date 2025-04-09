import {ReactNode} from "react";
import {AlertColor, AlertProps, StackProps, SxProps} from "@mui/material";

export interface Alert {
  message: string;
  severity?: AlertColor;
}

export interface AlertType extends Alert {
  isNewAlert?: boolean;
}

export interface AlertProviderProps {
  children: ReactNode;
  limit?: number;
  mobileLimit?: number;
  width?: string;
  minWidth?: string;
  containerSx?: SxProps;
  duration?: number;
  mobileBreakpoint?: string;
  muiAlertProps?: AlertProps;
  muiStackProps?: StackProps;
}

export type AlertContextType = {
  addAlert: (alert: Alert) => void;
};
