import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { deepOrange, orange, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    position: "relative",
  },
}));

// f37d29
// ffd128

export default function Palette() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress color="primary" size="10rem" />
    </div>
  );
}
