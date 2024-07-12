import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store/Store";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import "./i18n";
import { ThemeProvider } from '@mui/material'
import { theme } from "./theme.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
