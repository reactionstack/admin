import React from "react";
// import { Components } from "./plugins/core/lib";
import useAuth from "./hooks/useAuth";
import Dashboard from "./Dashboard";
import useIsAppLoading from "./hooks/useIsAppLoading";

import "./plugins/core/tags/client/index";
import "./plugins/core/dashboard/client/index";
import "./plugins/core/orders/client/index";

/**
 * App component
 * @returns {React.ReactElement} React component
 */
function App() {
  const { viewer, refetchViewer } = useAuth();
  const [isAppLoading] = useIsAppLoading();

  if (isAppLoading) return null;

  return (
    <Dashboard viewer={viewer} refetchViewer={refetchViewer}/>
  );
}

export default App;
