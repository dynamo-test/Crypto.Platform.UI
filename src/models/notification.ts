import { AlertColor } from "@mui/material/Alert";

export enum NotificationType {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
}

export interface Notification {
  type: AlertColor;
  message: string;
}
