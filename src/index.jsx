/* eslint-disable react/no-deprecated */
import { ApolloProvider } from "@apollo/client";
import { ApolloProvider as ReactApolloProvider } from "react-apollo";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ComponentsProvider } from "@reactioncommerce/components-context";
// import { TranslationProvider } from "/imports/plugins/core/ui/client/providers";
import { defaultTheme } from "@reactioncommerce/catalyst";
import { SnackbarProvider } from "notistack";
import {
  loadRegisteredBlocks,
  loadRegisteredComponents
} from "./plugins/core/lib";
import { TranslationProvider } from "./plugins/core/ui/client/providers";

import RouterContext from "./context/RouterContext";
import appComponents from "./ui/appComponents";

import App from "./App";
import "./index.css";
// import reportWebVitals from "./reportWebVitals";
import theme from "./theme";
import snackbarPosition from "./utils/getSnackbarPosition";
// import initApollo from "@/imports/plugins/core/graphql/lib/helpers/initApollo";
import initApollo from "./plugins/core/graphql/lib/helpers/initApollo";

import "./i18n/startup";

loadRegisteredBlocks();
loadRegisteredComponents();

const apolloClient = initApollo();

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <ReactApolloProvider client={apolloClient}>
      <BrowserRouter>
        <TranslationProvider>
          <ComponentsProvider value={appComponents}>
            <ThemeProvider theme={theme}>
              <MuiThemeProvider theme={defaultTheme}>
                <SnackbarProvider anchorOrigin={snackbarPosition} maxSnack={3}>
                  <DndProvider
                    backend={HTML5Backend}
                    options={{
                      rootElement: document.getElementsByTagName("body")
                    }}
                  >
                    <Route>
                      {(routeProps) => (
                        <RouterContext.Provider value={routeProps}>
                          <App />
                        </RouterContext.Provider>
                      )}
                    </Route>
                  </DndProvider>
                </SnackbarProvider>
              </MuiThemeProvider>
            </ThemeProvider>
          </ComponentsProvider>
        </TranslationProvider>
      </BrowserRouter>
    </ReactApolloProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
