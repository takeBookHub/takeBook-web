import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./routes/App.tsx";
import TermsOfService from "./routes/TermsOfService.tsx";
import PrivacyPolicy from "./routes/PrivacyPolicy.tsx";
import RefundPolicy from "./routes/RefundPolicy.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/refund-policy",
    element: <RefundPolicy />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
