import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";

import { router } from "./router";
import { ToastProvider } from "./components/ToastProvider";
import { LoadingProvider } from "./contexts/loading-context";
import { setLoadingState } from "./libs/axios";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(
  <StrictMode>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
  </StrictMode>,
);
