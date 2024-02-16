import { forwardRef, useEffect, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { Notification } from "../../models/notification";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function NotificationMessage({ notific }: { notific: Notification }) {
  const [open, setOpen] = useState<boolean>();
  const [state, setState] = useState<SnackbarOrigin>({
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal } = state;

  useEffect(() => {
    if (notific) {
      setOpen(true);
    }
  }, [notific]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "22vw", maxWidth: 900 }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={handleClose}
          severity={notific.type}
          sx={{ width: "22vw", maxWidth: 900 }}
        >
          {notific.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default NotificationMessage;
