import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const App = lazy(() => import("./components/App"));

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Suspense fallback={<div />}>
    <Provider store={store}>
      <App></App>
    </Provider>
  </Suspense>,
  document.getElementById("root")
);
