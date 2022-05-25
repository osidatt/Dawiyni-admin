import { Button, IconButton, Snackbar } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";

const NotifyBanner = ({ message, setMsg }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={message ? true : false}
      autoHideDuration={3000}
      message={message}
      severity="success"
      onClose={() => {
        setMsg(null);
      }}
      action={
        <React.Fragment>
          <Button
            color="secondary"
            size="small"
            onClick={() => {
              setMsg(null);
            }}
          ></Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              setMsg(null);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default NotifyBanner;
