import React, { lazy, Suspense } from "react";

const Tab = lazy(() =>
  import("semantic-ui-react").then((mod) => ({
    default: mod.Tab.Pane,
  }))
);

const TabHelper = ({ children, isAttached }) => {
  return (
    <Suspense fallback={<div></div>}>
      <Tab attached={isAttached}>{children}</Tab>
    </Suspense>
  );
};

export default TabHelper;
