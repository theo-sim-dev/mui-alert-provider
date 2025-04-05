import { ReactNode } from "react";
import { AlertColor } from "@mui/material";

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
	containerSx?: object;
	duration?: number;
	mobileBreakpoint?: string;
	muiAlertProps?: object;
	muiStackProps?: object;
}

export type AlertContextType = {
	addAlert: (alert: Alert) => void;
}