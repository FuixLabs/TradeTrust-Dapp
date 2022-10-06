import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "./mui/mui.theme";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={muiTheme}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ThemeProvider>
    ,
  </BrowserRouter>,
  document.querySelector("#root")
);
