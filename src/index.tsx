import { ApolloClient, ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ComponentsProvider } from "@reactioncommerce/components-context";
import { TranslationProvider } from "/imports/plugins/core/ui/client/providers";
import { defaultTheme } from "@reactioncommerce/catalyst";
import { loadRegisteredBlocks, loadRegisteredComponents } from "@reactioncommerce/reaction-components";
import { SnackbarProvider } from "notistack";

import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import initApollo from "@/imports/plugins/core/graphql/lib/helpers/initApollo";

loadRegisteredBlocks();
loadRegisteredComponents();

const apolloClient = initApollo() as ApolloClient<unknown>;

/* eslint-disable function-paren-newline */
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <TranslationProvider>
          <ComponentsProvider value={appComponents}>
            <ThemeProvider theme={theme}>
              <MuiThemeProvider theme={defaultTheme}>
                <SnackbarProvider anchorOrigin={snackbarPosition} maxSnack={3}>
                  <DndProvider backend={HTML5Backend} options={{ rootElement: el }}>
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
    </ApolloProvider>
  </React.StrictMode>
);
/* eslint-enable function-paren-newline */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
