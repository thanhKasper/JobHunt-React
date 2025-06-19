import { createBrowserRouter } from "react-router";
import RootLayout from "@layouts/RootLayout";
import JobPage from "@pages/JobPage";
import JobFilterPage from "@pages/JobFilter/JobFilterPage";
import JobFilterPageDetail from "@pages/JobFilter/JobFilterPageDetail";

let router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <JobPage />,
      },
      {
        path: "jobs",
        element: <JobPage />,
      },
      {
        path: "job-filters",
        element: <JobFilterPage />,
        children: [
          {
            path: "/job-filters/:jobFilterId",
            element: <JobFilterPageDetail />,
          },
        ],
      },
    ],
  },
]);

export default router;
