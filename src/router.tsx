import { createBrowserRouter } from "react-router";
import RootLayout from "@layouts/RootLayout";
import JobPage from "@pages/JobPage";
import JobFilterPage from "@pages/JobFilter/JobFilterPage";
import JobFilterPageDetail from "@pages/JobFilter/JobFilterPageDetail";
import PortfolioPage from "@pages/Portfolio/PortfolioPage";
import ProjectDetailPage from "@pages/Portfolio/ProjectDetailPage";
import ProjectEditPage from "./pages/Portfolio/ProjectEditPage";
import ProfilePage from "./pages/Profile/ProfilePage";

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
      {
        path: "portfolio",
        children: [
          {
            index: true,
            element: <PortfolioPage />,
          },
          {
            path: ":projectId",
            element: <ProjectDetailPage />,
          },
          {
            path: ":projectId/edit",
            element: <ProjectEditPage />,
          },
        ],
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
