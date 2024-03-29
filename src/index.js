import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// set up redux-thunk
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import allReducer from "./redux/reducer";
import ReduxThunk from "redux-thunk";

const globalState = createStore(allReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={globalState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
