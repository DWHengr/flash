import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
