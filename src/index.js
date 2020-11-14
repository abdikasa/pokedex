import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";

const App = lazy(() => import("./components/App"));

ReactDOM.render(
  <Suspense fallback={<div />}>
    <App></App>
  </Suspense>,
  document.getElementById("root")
);
