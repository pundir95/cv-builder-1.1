import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";

import { router } from "./router";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.querySelector("#root")!);

console.log('Application is initializing...');

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
