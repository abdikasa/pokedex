import React, { lazy, Suspense } from "react";

const Tab = lazy(() =>
  import("semantic-ui-react").then((mod) => ({
    default: mod.Tab,
  }))
);

const TabWrapper = ({ menu, panes }) => {
  return (
    <Suspense fallback={<div></div>}>
      <Tab menu={menu} panes={panes}></Tab>
    </Suspense>
  );
};

export default TabWrapper;
