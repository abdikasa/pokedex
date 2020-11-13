import React from "react";
import { Tab } from "semantic-ui-react";

const TabHelper = ({ children, isAttached }) => {
  return <Tab.Pane attached={isAttached}>{children}</Tab.Pane>;
};

export default TabHelper;
