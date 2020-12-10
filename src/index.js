import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import "./firebase/config";

// import { ThemeProvider } from "@material-ui/core/styles";

// import { createMuiTheme } from "@material-ui/core/styles";

// const theme = createMuiTheme({
// palette: {
//   primary: {
//     light: "#616161",
//     main: "#757575",
//   },
//   secondary: deepOrange,
//   green: green,
// },
// });

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* <ThemeProvider theme={theme}> */}
      <App />
      {/* </ThemeProvider> */}
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
